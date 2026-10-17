const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const database = require('./database');
const controller = require('./process/controllers');

const partnerFlow = process.argv[2];
const processStep = process.argv[3];
const tenant = process.argv[4];

if (!['complete', 'free'].includes(partnerFlow)) {
  console.log('Fluxo inválido. Use: npm start -- free ou npm start -- complete <step> [tenant].');
  process.exitCode = 1;
  return;
}

if (partnerFlow === 'free' && process.argv.length > 3) {
  console.log('O fluxo free não recebe etapa ou tenant. Use: npm start -- free.');
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
  const processName = partnerFlow === 'free' ? 'free' : `complete ${processStep}`;
  console.log(`Iniciando processo ${processName}`);
  try {
    await database.connect();
    const success = partnerFlow === 'free'
      ? await controller.free.onboardFree()
      : await controller.complete[processStep](tenant);
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
