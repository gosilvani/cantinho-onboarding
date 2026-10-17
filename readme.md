# Aplicação que fará o processamento de um novo parceiro.

### Estrutura do repositório

- files/upload: Local onde deve estar os arquivos que serão utilados na interface e que serão enviados para o S3, como logo, favicon, hero-image e icons.
- builds: Onde estará os arquivos buildados que já foram processados e enviados para o S3, e que foram buildados mas ainda não foram para o S3.
- templates: Onde estará os arquivos de template das páginas.
- lib: Código de processamento.

### Passos de execução

- Inserir os arquivos de icons e images na pasta `setup/files`
- Inserir os dados da empresa, usuário e tema no arquivo `setup/config-current-complete.js`
- Executar explicitamente o fluxo `complete`, informando a etapa:

```bash
npm start -- complete stepOne
npm start -- complete stepTwo tenant
npm start -- complete stepThree tenant
npm start -- complete stepFour tenant
```

O `stepOne` utiliza o tenant definido na configuração. As demais etapas
recebem o tenant como argumento. Os comandos anteriores sem `complete`
devem ser atualizados para este formato.

Os controllers do parceiro Completo ficam em
`lib/process/controllers/complete/`. O índice de controllers expõe
esse fluxo como `complete`, mantendo os serviços compartilhados em
`lib/process/services/`.

### Parceiro Gratuito

Preencher `setup/config-current-free.js`, seguindo o exemplo em
`setup/examples/config-example-free.js`, e executar:

```bash
npm start -- free
```

A configuração usa `const company`, `const user` e
`module.exports = { company, user }`. São obrigatórios nome, tenant,
contatos, CRECI e endereço da empresa, além dos dados do usuário.
CRECI e endereço seguem as mesmas estruturas do Complete; o complemento
do endereço é opcional. É necessário pelo menos um WhatsApp comercial
com contexto `sale`, `rent` ou `both`.

O fluxo grava company com `type: 'free'`, usuário vinculado ao tenant
e um registro de conclusão em `process`. Não cria theme, site, arquivos
no S3, certificado, CDN ou agendamentos. A company gratuita não recebe
`dns`, `siteMode`, `gtm`, `directory` ou `citiesAndDistricts`.

O exemplo do Complete fica em `setup/examples/config-example-complete.js`.
O arquivo anterior `setup/config-current.js` foi renomeado para
`setup/config-current-complete.js`, preservando sua configuração.

### Validações e persistência

Free e Complete têm funções próprias de validação e inserção, com
verificação de disponibilidade de tenant e e-mail antes de cadastrar.
O tipo do usuário continua sendo `companyAdmin` ou
`companyUser`, independente do tipo da empresa.

A inserção é sequencial: o Free grava company e user; o Complete grava
company, user e theme.

### Cache de HTML, CSS e JS

O upload define `Cache-Control: public, max-age=28800, must-revalidate`
para os arquivos públicos HTML, CSS e JS (8 horas). Como o CloudFront é
criado com `MinTTL: 0` e `MaxTTL: 86400`, esse header também limita o cache
efetivo desses arquivos na CDN a 8 horas, mesmo com `DefaultTTL: 86400`.
Isso pressupõe que a distribuição existente mantenha essa configuração.
Arquivos HTML, CSS e JS em `administrativo/` recebem `no-cache`, para
revalidar no navegador e acompanhar o comportamento sem cache da CDN.
Os demais tipos de arquivo mantêm o comportamento anterior.

Não há invalidação automática. Uma cópia validada pouco antes da publicação
pode continuar sendo reutilizada por quase 8 horas. Uma aba já aberta não
é atualizada automaticamente.

Para aplicar a alteração aos parceiros existentes:

1. Republicar os arquivos pelo onboarding: editar o código não modifica
   os metadados dos objetos que já estão no S3.
2. Reempacotar e atualizar as Lambdas `builds-rentpage` e `builds-salepage`
   do projeto `cantinho-backend`. Elas incluem `shared/aws/index.js`, que
   também define o cache de 8 horas para os HTMLs e scripts das listagens.
3. Executar os builds de listagens após a publicação do onboarding, ou
   aguardar a execução agendada. As Lambdas usam seus próprios templates;
   alterações de layout nas listagens devem estar presentes também neles.
4. Aguardar a expiração dos caches anteriores e conferir `Cache-Control`
   nas respostas HTTP da home, CSS, JS e de uma listagem. As cópias antigas
   continuam seguindo os headers recebidos antes dessa mudança.

O comando `npm test` deste projeto executa o fluxo principal; não é uma
suíte isolada de testes e não deve ser usado como validação sem acesso à AWS.
