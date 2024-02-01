# EdID

## How to use

1) Clone das Repository auf Lokal und geh in dem Projekt Root:

<!-- #default-branch-switch -->

2) Install die packages:

```sh
npm install
```


## Develop
Start the application:
 - ```npm run dev``` dev mode with hot refresh und mocked database

## Datenbank auf lokal starten

Um die API auf Lokal zu mocken, wird json-server benutzt: https://github.com/typicode/json-server
Zuerst muss man json-server global installieren:

```sh
npm install -g json-server
```

Wenn man npm run dev ruft, wird zuerst dieses Befehl aufgeruft:

```sh
json-server db.json --port 3004 --middlewares file.js
```

Die Datenbank läuft auf port 3004
