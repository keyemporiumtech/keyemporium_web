# CHANGELOG REST

## 3.5.0 - XX/05/2023

> Versione che

### changes

- `[feature]` **request**: Aggiunta del campo `others` in `request-manager.interfare` per consentire il passaggio di parametri aggiuntivi
- `[feature]` **response**: Aggiunta del campo `others` in `response-manager.interfare` per consentire il passaggio di parametri aggiuntivi
- `[fix]` **abstract**: Fix di `sendToken` in `base-rest.service` per il check sulla property tokenManager
- `[feature]` **abstract**, **auth**: Aggiunta di `sendTokenAuth` in `base-auth.service` per l'invio rapido del token di authenticazione prima di una chiamata rest

## 3.4.0 - 14/04/2023

> Versione che aggiunge i parametri array di stringhe in `request.utility`

### changes

- `[feature]` **request**: Modificati in `request.utility` i metodi per il calcolo dei query parameters, con aggiunta di parametri array di stringhe oltre che stringa

## 3.3.0 - 14/03/2023

> Versione che rimuove il `forkJoin` deprecato

### changes

- `[feature]` **abstract**: Sostituzione della `forkJoin` con `combineLastest` in `base-auth.service`
- `[feature]` **abstract**: Sostituzione della `forkJoin` con `combineLastest` in `base-info-server.service`
- `[feature]` **openstreetmap**: Sostituzione della `forkJoin` con `combineLastest` in `openstreet.utility`

## 3.2.0 - 17/10/2022

> Versione che aggiunge l'invio in header del clientId e i metodi da utilizzare in previous route per la gestione dei parametri tramite oggetti queryParams

### changes

- `[feature]` **abstract** Aggiunto in `BaseReference` il fillReference dopo il loaded
- `[feature]` **abstract** Aggiunto in `BaseAddress` il fillAddress dopo il loaded
- `[feature]` **abstract** Aggiunto in `BaseRestService` l'invio del clientId letto dall'environment
- `[feature]` **request** Aggiunti i metodi `getObjQueryParametersByMap` e `getObjQueryParametersByMap` in `RequestUtility`

## 3.1.0 - 26/07/2022

> Versione che integra funzioni per la gestione dei query parameters in `RequestUtility` e aggiunge il modulo `maps` per consentire ad una utility di generare l'iframe html di google maps

- `[feature]` Aggiunto il nuovo modulo `maps` per integrare google maps con al momento utility per la creazione di iframe embed
- `[feature]` **request**: Aggiunte le funzioni `getQueryParametersByArray` e `getQueryParametersByMap` in `RequestUtility`

## 3.0.0 - 20/01/2022

- `[update]` **abstract**: Modifica del servizio `base-auth` con l'aggiunta della funzione BE di `changeProfile` durante il set di un profilo utente
- `[feature]` **module**: Modifica del modulo `SocialModule` per correggere il passaggio di parametro `SocialAuthServiceConfig` al modulo `OAuthSocialModule`

## 2.1.0 - 15/11/2021

- `[feature]` **module**: Aggiunta nel modulo `request` nella classe `RequestUtility` delle funzioni `debounceAsyncValidator` e `debounceAsyncByValue` per consentire di eseguire un debounce basato su input per i validatori asincroni e gli observable

## 2.0.0 - 23/09/2021

- `[BREAKING CHANGE]` **module**: Sostituzione del modulo `social-oauth` dipendente dalla libreria `angularx-social-login` con il modulo `social` che dipende dalla libreria `@ddc/oauth-social`

## 1.1.0 - 21/09/2021

- `[feature]` **module**: Aggiunta del modulo `social-oauth`

## X.y.z - DD/MM/YYYY

- `[fix]` patch z
- `[feature]` minor y
- `[update]` or `[BREAKING CHANGE]` major X
