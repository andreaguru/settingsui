# Eddi

## How to use

1) Clone das Repository auf Lokal und geh in dem Projekt Root:

<!-- #default-branch-switch -->

2) Install die packages:

```sh
npm install
```

2) App starten (achtung, die Datenbank muss vorher gestartet werden. Siehe dei Anwaisungen unten):

```sh
npm run dev
```

## Datenbank auf lokal starten

Um die API auf Lokal zu mocken, wird json-server benutzt: https://github.com/typicode/json-server
Der Ordner kann man von Google Drive herunterladen (json-db.rar): https://drive.google.com/drive/

In dem Projekt Root muss man dieses Befehl aufrufen, um die Datenbank zu starten:

```sh
json-server db.json --port 3004 --middlewares file.js
```

Jetzt läuft die Datenbank auf http://localhost:3004/
