# PHP Conference Brasil - App

## Descrição

Este repositório possui o código da Aplicação oficial da PHP Conference 2017. 

Você pode utilizar para criar suas próprias aplicações e eventos.

Existem alguns recursos a serem implementados, que estarão sendo feitos periodicamente. 

### Como utilizar

É necessário instalar o Ionic CLI para conseguir utilizar os recursos do Ionic

```bash
$ sudo npm install -g ionic cordova
```
Faça um clone deste projeto:

```bash
$ git clone https://github.com/jeffersonsouza/phpconferencebrasil-app
```

Entre na pasta do projeto e execute o comando do ionic responsável 
por levantar o ambiente de desenvolvimento.

```bash
$ cd phpconferencebrasil-app
$ ionic serve 
```

Para fazer o build da sua aplicação, basta executar os comandos abaixo. 
Lembrando que é necessário ter [instalado o SDK do Android](https://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial). 

```bash
$ ionic cordova platform add android
$ ionic cordova run android
```


