# Eddi

## How to use

1) Clone das Repository auf Lokal und geh in dem Projekt Root:

<!-- #default-branch-switch -->

2) Install die packages:

```sh
npm install
```

2) Database starten und App starten:

```sh
npm run dev
```

## Datenbank auf lokal starten

Um die API auf Lokal zu mocken, wird json-server benutzt: https://github.com/typicode/json-server
Wenn man npm run dev ruft, wird zuerst dieses Befehl aufgeruft:

```sh
json-server db.json --port 3004 --middlewares file.js
```

Die Datenbank läuft auf port 3004
