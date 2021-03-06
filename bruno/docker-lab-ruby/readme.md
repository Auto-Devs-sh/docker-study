#  Docker com Ruby on Rails
O docker facilita muito nas criações de projetos em Ruby por ser mais automatizado do que instalar na sua máquina local as ferramentas como Ruby Version Manager(rvm) ou Ruby Environment(rbenv), com apenas alguns comandos se tem um serviço em um contêiner.

##  Dockerfile e arquivo docker-compose
É nesses dois arquivos que tem todo o processo do serviço. Versões, em qual porta eles vão rodar e por ai vai.

##  Como executar seu aplicativo:

-  `docker-compose build` : Executar este comando obterá o Dockerfile e instalará todas as coisas necessárias para criar um ambiente de desenvolvimento Rails. Observe que a instalação pode demorar um pouco porque o docker precisará baixar os pacotes necessários.
-  `docker-compose run --rm --service-ports ruby_dev` : Este comando iniciará um terminal bash que será seu ambiente de desenvolvimento rails onde os comandos rails estão disponíveis. Observe que nosso comando tem alguns sinalizadores, `--rm` significa remover o contêiner após usá-lo, e` --service-ports` significa usar a porta 3000 em nosso contêiner para que possamos ver nosso servidor Rails em ação. Então, `ruby_dev` também veio de serviços encontrados em nosso` docker-compose.yml`

###  Teste a execução de um aplicativo Rails:

1. Execute `rails new awesomeApp && cd awesomeApp` este comando irá criar um novo aplicativo rails em uma pasta chamada awesomeApp.
2. Atualize e instale gems. Execute `bundle update && bundle install` , apenas certifique-se de que está na pasta do projeto.
3. Teste o servidor executando `rails server -p $ PORT -b 0.0.0.0` aqui podemos usá-lo em nosso caso a porta 3000. Não se esqueça de colocar` -b 0.0.0.0` porque você não vai veja o aplicativo em sua máquina local
4. Pare o servidor pressionando `ctrl-d`

###  Limpar

- Execute `docker-compose down` para limpar e remover o contêiner

##  Comandos do Docker:

-  `FROM ruby` - Isso significa que o docker irá puxar uma configuração pré-construída pelo ruby. Você não precisa se preocupar em atualizar em sua máquina a versão mais recente do ruby. Você verá a lista de imagens pré-construídas do Docker em seu DockerHub. Pense nisso como npm.
-  `WORKDIR / home / app` - Diretório de trabalho. O diretório de trabalho significa que este é o local da pasta padrão quando você inicia o ambiente de desenvolvimento. Você pode nomeá-lo como quiser.
-  `ENV PORT 3000` - Variável de ambiente. Isso definirá uma variável chamada $ PORT em seu terminal bash como `3000` .
-  `EXPOSE $ PORT` - Expõe a porta 3000 (que definimos anteriormente) do contêiner virtual para sua máquina local.
-  `RUN` - Os comandos de execução são algumas instruções de configuração que você deseja que o terminal execute antes de usá-lo. Em nosso caso, instalamos ruby ​​on rails, bundler e node.js antes mesmo de usar o ambiente de desenvolvimento, então está tudo pronto quando o usarmos.
-  `ENTRYPOINT [" / bin / bash "]` - Este comando diz ao docker qual comando executar quando executamos o contêiner. Em nosso caso, precisamos executar o terminal bash para que possamos ter acesso aos trilhos.

##  docker-compose:

Parece um arquivo docker, mas com um pequeno recuo.

-  `version` - Com o tempo, o arquivo docker-compose passou por mudanças. É por isso que nos arquivos docker-compose, eles precisam especificar a versão que estão usando. No nosso caso, usamos apenas a versão mais recente neste momento.
-  `services` - especifica a lista de serviços. Como eu disse antes, você pode ter muitos serviços como um servidor Rails e um servidor MySQL em seu projeto. Você pode nomear seus serviços como quiser. Eu chamei de `ruby_dev` .
-  `build` : ` .` - O ponto aqui significa um caminho de arquivo onde encontrar o Dockerfile, que é as instruções de compilação.
-  `container_name` - O nome do contêiner.
-  `portas` : - essas são as portas a serem expostas do contêiner docker para nossa máquina local host. O padrão aqui é HOST: CONTAINER. Em nosso caso, é `" 3000: 3000 "` . O que significa que estamos permitindo que a porta do servidor Rails padrão (3000) esteja disponível no "localhost: 3000" de nossa máquina local.
-  `volumes` : - volume significa que mesmo se fecharmos ou excluirmos o Docker, podemos especificar quais arquivos podemos manter em nossa máquina local. Colocamos `./:/ home / app` lá porque nomeamos anteriormente em nosso Dockerfile o diretório de trabalho como` / home / app` .