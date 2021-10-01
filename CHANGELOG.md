# Changelog

## 3.1.1 - 30/09/2021

### changes

- `[fix]` Fix del changelog 3.1.0
- `[fix]` **scripts** Fix degli script `update-version.sh` e `new-version.sh`
## 3.1.0 - 30/09/2021

> Versione che aggiunge la versione del template usato da un progetto nel footer dell'home page locale.
> Inoltre corregge gli script di versions per il settaggio della versione corretta nel file `versioning.json` delle applicazioni modulare e di progetto

### changes

- `[fix]` **configs** : Aggiunta la gestione dell'api di oauth allo script di configurazione  `_BIN/config_environment.php` 
- `[fix]` **scripts**: Fix degli script di `versions` per il corretto settaggio delle versioni
- `[feature]` **scripts**: Aggiunta della proprietà `template` al file `versioning.json` e adeguamento degli script di versions
- `[feature]` **environment**: Aggiunta della proprietà `template` letta dal file `versioning.json` negli environments
- `[feature]` **component**: Aggiunta della proprietà `template` al componente `footer-public.component`

## 3.0.0 - 29/09/2021

> Versione che introduce la gestione dell'oauth login con google e facebook rimuovendo la libreria `angularx-social-login` e con l'introduzione della libreria `@ddc/oauth-social`

Rimozione della libreria `angularx-social-login`
```
npm uninstall angularx-social-login

```

### lib

- oauth-social@1.0.0 (*nuovo*)
- rest@2.0.0

### modules

- authentication@2.0.0
### changes

- `[fix]` **package**: Fix dello script `proxy-local-ssl` per puntare ai file di certificato interni all'applicazione
- `[feature]` **lib**: Aggiunta del modulo `oauth-social` e della libreria `@ddc/oauth-social`
- `[BREAKING CHANGE]` **rest**: Adeguamento alla libreria `rest@2.0.0`
- `[BREAKING CHANGE]` **package**: Rimozione della libreria `angularx-social-login`
- `[BREAKING CHANGE]` **environment**: Trasformazione degli scopes oauth di Google e Facebook in array di stringa
- `[feature]` **environment**: Aggiunta delle apiKey di Google e Facebook
- `[fix]` **script**: Fix dello script smart `4-update-versioning.sh` per la rimozione della ridondanza degli script di libreria 
- `[feature]` **script**: Aggiunta dello script di libreria `oauth-social.sh`
- `[BREAKING CHANGE]` **module**: Aggiornamento del modulo `authentication@2.0.0`
- `[BREAKING CHANGE]` Corretti gli import relativi alle librerie kit e rest
## 2.0.0 - 21/09/2021

> Versione che introduce la gestione dell'oauth login con google e facebook sfruttando la libreria `angularx-social-login`
### Package
Installare le libreria `angularx-social-login`, `ngx-device-detector` e `node-sass` con il comando
```
npm i angularx-social-login@2.2.1 --save
npm i ngx-device-detector@1.3.3 --save
npm i node-sass@4.14.1 --save-dev

```
### Script
Adesso negli script di avvio applicativo è possibile indicare la porta direttamente con il comando npm run (*anteporre -- per passare variabili*), esempio:

```
npm run proxy-local -- --port=4100

```
### Changes

- `[fix]` **app-keyemporium**: Fix import work_cv in work-cv
- `[fix]` **script**: Fix proxy config per protocollo https
- `[feature]` **package**: Aggiunta della libreria `angularx-social-login@2.2.1`
- `[BREAKING CHANGE]` **package**: Modificata la versione della libreria ngx-device-detector dalla 2 alla 1 `ngx-device-detector@1.3.3` per compatibilità angular
- `[update]` **package**: Inglobata in saveDev la libreria `node-sass@4.14.1` per compilazione indipendente dalla versione di node
- `[feature]` **script**: Rimossa in package l'indicazione della porta sugli script di run per poter avviare l'applicazione dinamicamente su porte differenti
- `[feature]` **wiki**: Aggiunta del componente `oauth-login` negli esempi del modulo rest
- `[feature]` **rest**: Aggiornata la libreria `rest@1.1.0`
- `[feature]` **environment**: Aggiunte le proprieta di oauth google e facebook
- `[feature]` **configs**: Gestione delle configurazioni di oauth in `_BIN/config_environment.php`
- `[feature]` **shared**: Adeguamento del componente `check-platform` alla classe BaseComponent
- `[fix]` **script**: Fix `install-project.sh` con posizionamento nella cartella di progetto prima del comando di allow version
- `[fix]` **script**: Fix `new-version-modulare.sh` per l'impostazione della versione corretta in versioning
- `[fix]` **script**: Fix `modulare-version.sh` in projects per la chiamata da root agli script set-props
- `[feature]` **angular**: Cambiato il `buildOptimizer` a false per evitare problemi di compilazione con pdfjs
- `[fix]` **script**: Aggiunto in `modules.sh` l'aggiornamento delle versioni di libreria
## X.y.z - DD/MM/YYYY

- `[fix]` patch z
- `[feature]` minor y
- `[update]` or `[BREAKING CHANGE]` major X
