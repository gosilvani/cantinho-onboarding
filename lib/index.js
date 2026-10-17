const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const database = require('./database');
const controller = require('./process/controllers');

const partnerFlow = process.argv[2];
const processStep = process.argv[3];
const tenant = process.argv[4];

if (!['complete', 'free', 'portal'].includes(partnerFlow)) {
  console.log('Fluxo inválido. Use: npm start -- free, npm start -- portal ou npm start -- complete <step> [tenant].');
  process.exitCode = 1;
  return;
}

if (['free', 'portal'].includes(partnerFlow) && process.argv.length > 3) {
  console.log(`O fluxo ${partnerFlow} não recebe etapa ou tenant. Use: npm start -- ${partnerFlow}.`);
  process.exitCode = 1;
  return;
}

if (partnerFlow === 'complete' && !['stepOne', 'stepTwo', 'stepThree', 'stepFour'].includes(processStep)) {
  console.log('Step inválido. Use stepOne, stepTwo, stepThree ou stepFour.');
  process.exitCode = 1;
  return;
}

if (['stepTwo', 'stepThree', 'stepFour'].includes(processStep) && !tenant) {
  console.log(`Tenant é obrigatório para o ${processStep}.`);
  process.exitCode = 1;
  return;
}

(async () => {
  const processName = partnerFlow === 'complete' ? `complete ${processStep}` : partnerFlow;
  console.log(`Iniciando processo ${processName}`);
  try {
    await database.connect();
    let success;
    if (partnerFlow === 'free') {
      success = await controller.free.onboardFree();
    } else if (partnerFlow === 'portal') {
      success = await controller.portal.onboardPortal();
    } else {
      success = await controller.complete[processStep](tenant);
    }
    if (success) {
      console.log(`Processo ${processName} concluído com sucesso.`);
    };
  } catch (error) {
    process.exitCode = 1;
    console.log(`Falha no processo ${processName}: ${error.message || error}`);
  } finally {
    try {
      await database.disconnect();
    } catch (error) {
      console.log(`Falha ao encerrar conexão com o banco: ${error.message || error}`);
    }
  }
})()
