# Aplicação que fará o processamento de um novo parceiro.

### Estrutura do repositório

- files/upload: Local onde deve estar os arquivos que serão utilados na interface e que serão enviados para o S3, como logo, favicon, hero-image e icons.
- builds: Onde estará os arquivos buildados que já foram processados e enviados para o S3, e que foram buildados mas ainda não foram para o S3.
- templates: Onde estará os arquivos de template das páginas.
- lib: Código de processamento.

### Passos de execução

- Inserir os arquivos de icons e images na pasta lib/setup/files
- Inserir os dados da empresa e do usuário no arquivo lib/setup/config.current.js
- Rodar o script process

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
