const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const uploadPartnerLogo = async (company) => {
  if (!process.env.AWS_BUCKET_NAME || !process.env.AWS_REGION) {
    throw new Error('AWS_BUCKET_NAME e AWS_REGION são obrigatórios para enviar a logo.');
  }
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
  const contentTypes = {
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png'
  };
  const logoPath = path.join(__dirname, '../../../setup/files/assets', company.logoFileName);
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${company.tenant}/assets/${company.logoFileName}`,
    Body: fs.readFileSync(logoPath),
    ContentType: contentTypes[path.extname(company.logoFileName)]
  }));
};

module.exports = { uploadPartnerLogo };
