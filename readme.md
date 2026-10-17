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
do endereço é opcional. Os contatos seguem o schema do Free, sem
obrigatoriedade de WhatsApp.

O fluxo grava company com `type: 'free'`, usuário vinculado ao tenant
e um registro de conclusão em `process`. Não cria theme, site, arquivos
no S3, certificado, CDN ou agendamentos. A company gratuita não recebe
`dns`, `siteMode`, `gtm`, `directory` ou `citiesAndDistricts`.

O exemplo do Complete fica em `setup/examples/config-example-complete.js`.
O arquivo anterior `setup/config-current.js` foi renomeado para
`setup/config-current-complete.js`, preservando sua configuração.

### Parceiro Portal

Preencher `setup/config-current-portal.js`, seguindo
`setup/examples/config-example-portal.js`, com `const company`, `const user`
e `module.exports = { company, user }`.

A company exige nome, tenant, contatos, CRECI, endereço e `logoFileName`.
O arquivo da logo deve estar diretamente em `setup/files/assets/`.
São aceitas extensões `.svg`, `.jpg`, `.jpeg` e `.png`, em minúsculas.
O nome não deve conter diretórios; a validação confere extensão, existência
e se o caminho corresponde a um arquivo. Não há conversão da imagem.
O tenant aceita letras, números e hífens entre os segmentos.

Definir no ambiente ou no `.env` o domínio da CDN compartilhada:

```dotenv
DNS_MEDIA_CDN=midia.cantinho.co
```

O valor deve conter somente o domínio, sem protocolo, porta, barra final
ou caminho. Não informar `dns` na configuração da company: o build monta
esse campo com o domínio da variável e o tenant em minúsculas.

Executar:

```bash
npm start -- portal
```

Exemplo do resultado para tenant `parceiro-a` e logo `logo.svg`:

```text
company.type: portal
company.dns: midia.cantinho.co/parceiro-a
company.logoFileName: logo.svg
Chave no bucket: parceiro-a/assets/logo.svg
URL: https://midia.cantinho.co/parceiro-a/assets/logo.svg
```

O upload utiliza `AWS_BUCKET_NAME`, `AWS_REGION`, `AWS_ACCESS_KEY_ID` e
`AWS_SECRET_ACCESS_KEY`, como o fluxo Complete. Envia somente a logo,
preservando o arquivo local. A CDN compartilhada precisa estar configurada
previamente para servir os caminhos do bucket.

O controller valida dados e logo, verifica execução anterior e disponibilidade
de tenant/e-mail, constrói as entidades, envia a logo, insere company e user
e registra a conclusão em `process` com etapa `portal`.
Se o upload falhar, não insere as entidades. Se uma etapa posterior falhar,
o arquivo já enviado pode permanecer no bucket; não há rollback automático.

Não cria theme, páginas, certificado, CDN própria ou agendamentos.
Não exige `siteMode`, `gtm`, `directory` ou `citiesAndDistricts`.
O consumo de `company.logoFileName` no login e importer é uma evolução
separada desses projetos.

### Validações e persistência

Free, Portal e Complete têm funções próprias de validação e inserção, com
verificação de disponibilidade de tenant e e-mail antes de cadastrar.
O tipo do usuário continua sendo `companyAdmin` ou
`companyUser`, independente do tipo da empresa.

A inserção é sequencial: Free e Portal gravam company e user; o Complete
grava company, user e theme.

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
