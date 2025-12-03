const { ACMClient, RequestCertificateCommand, DescribeCertificateCommand } = require('@aws-sdk/client-acm');
const database = require('../../database');

const companyCollection = 'companies';

const limitRetry = 10;
let currentRetry = 0;
let delayBetweenRetries = 5000;

const TENANT_MARKETPLACE = process.env.TENANT_MARKETPLACE;
const DOMAIN_MARKETPLACE = process.env.DOMAIN_MARKETPLACE;

const acm = new ACMClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const requestCertificateDetail = async (certificateArn) => {
  if (currentRetry >= limitRetry) {
    return [];
  };
  const certificateDetail = await acm.send(new DescribeCertificateCommand({
    CertificateArn: certificateArn,
  }));

  console.log('Status do certificado:', certificateDetail.Certificate.Status);

  const domainValidationOptions = certificateDetail.Certificate.DomainValidationOptions;

  const cNameData = []

  domainValidationOptions.forEach(option => {
    const record = option.ResourceRecord;
    if (record) {
      cNameData.push({
        DomainName: option.DomainName,
        Name: record.Name,
        Type: record.Type,
        Value: record.Value
      });
    };
  });

  if (!cNameData.length) {
    console.log(`Dados de CNAME não disponíveis ainda. Aguardando ${delayBetweenRetries / 1000} segundos e tentando novamente...`);
    currentRetry += 1;
    delayBetweenRetries += 5000;
    await new Promise(resolve => setTimeout(resolve, delayBetweenRetries));
    return requestCertificateDetail(certificateArn);
  };

  return cNameData;
};

const updateCompanyCertificateArn = async (tenant, certificateArn) => {
  const setUpdateCompany = { certificateArn };
  await database.getCollection(companyCollection).updateOne({ tenant }, { $set: setUpdateCompany });
}

const buildSubjectAlternativeNames = (tenant, dns) => {
  const root = dns.replace(/^www\./, "");

  if (tenant === TENANT_MARKETPLACE) {
    return [
      root,
      `*.${root}`,
      `*.*.${root}`,
    ];
  }
  return [root];
};


const requestCertificate = async (tenant) => {
  const company = await database.getCollection(companyCollection).findOne({ tenant });
  if (!company) {
    throw new Error(`Company not found for tenant: ${tenant}`);
  };
  if (tenant !== TENANT_MARKETPLACE && company.dns.includes(DOMAIN_MARKETPLACE)) {
    const companyTenant = await database
      .getCollection(companyCollection)
      .findOne({ tenant: TENANT_MARKETPLACE });
    await updateCompanyCertificateArn(tenant, companyTenant.certificateArn);
    console.log('Usando certificado compartilhado do domínio do tenant.');
    return;
  }
  const command = new RequestCertificateCommand({
    DomainName: company.dns,
    SubjectAlternativeNames: buildSubjectAlternativeNames(tenant, company.dns),
    ValidationMethod: "DNS",
  });

  const responseRequestCertificate = await acm.send(command);
  const certificateArn = responseRequestCertificate.CertificateArn;

  await updateCompanyCertificateArn(tenant, certificateArn);

  console.log('Certificate ARN gerado:', certificateArn);

  await new Promise(resolve => setTimeout(resolve, delayBetweenRetries));

  const cNameData = await requestCertificateDetail(certificateArn);
  if (!cNameData.length) {
    throw new Error('Failed to retrieve CNAME data for DNS validation.');
  };
  console.log('Dados de CNAME para configuração de DNS:');
  cNameData.forEach(cname => {
    console.log(`- Domain: ${cname.DomainName}`);
    console.log(`  Name:  ${cname.Name} (obs: se for na Godaddy, retire o .${company.dns.slice(4)} do final)`);
    console.log(`  Type:  ${cname.Type}`);
    console.log(`  Value: ${cname.Value}\n`);
  });
}

module.exports = { requestCertificate };
