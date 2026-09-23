const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const database = require('./database');
const controller = require('./process/controllers');

const processStep = process.argv[2];
const tenant = process.argv[3];

if (!['stepOne', 'stepTwo', 'stepThree', 'stepFour'].includes(processStep)) {
  console.log('Step inválido.');
  return;
}

if (['stepTwo', 'stepThree', 'stepFour'].includes(processStep) && !tenant) {
  console.log(`Tenant é obrigatório para o ${processStep}.`);
  return;
}

(async () => {
  console.log(`Iniciando processo ${processStep}`);
  try {
    await database.connect();
    const success = await controller[processStep](tenant);
    if (success) {
      console.log(`Processo ${processStep} concluído com sucesso.`);
    };
  } catch (error) {
    console.log(`Falha no processo ${processStep}: ${error.message || error}`);
  } finally {
    try {
      await database.disconnect();
    } catch (error) {
      console.log(`Falha ao encerrar conexão com o banco: ${error.message || error}`);
    }
  }
})()
