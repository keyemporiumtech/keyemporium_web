# CHANGELOG KIT

## 3.0.0 - XX/XX/2024

> Versione che

### changes

- `[feature]` **config**: Aggiunta la funzione `randomString` in `CryptoUtility` per la generazione di stringhe random
- `[fix]` **routing**: Fixati i metodi `navigateStore` e `navigateStoreEncode` in `PreviousRouteService` con la valutazione della proprietà urlNavigate che potrebbe essere undefined
- `[feature]` **message**: Aggiunto il campo `backUrl` in `MessageModel`
- `[update]` Modificato lo stile dell'icona da visualizzare nelle validazioni dei componenti con accesso alla configurazione del file `environment/template` e lettura dal campo `template.styles.inputIcon`
  - **html** Applicazione style icon in `AutocompleteComponent`
  - **filemanager** Applicazione style icon in `UploadComponent`
- `[feature]` **g-recaptcha**: Aggiunta del modulo `GRecaptcha` e relativo componente per la gestione di google re-captcha
- `[feature]` **tree-html**: Aggiunto il campo payload al `TreeHtmlModel`
- `[feature]` **config**: Modificati i metodi `sortAscByField` e `sortDescByField` in `ArrayUtility` per considerare anche l'ordinamento per DateModel
- `[feature]` **timing**: Aggiunti i metodi `getAge` e `getAgeAtDate` in `DateUtility` per calcolare gli anni trascorsi da una data o tra due date
- `[feature]` **asbtract**: Aggiunta la classe base `BaseModalComponent` da estendere in qualsiasi componente di modale
- `[feature]` **html**: Aggiunto il cursor pointer sulla lista del componente `AutocompleteComponent`
- `[feature]` **html**: Aggiunta la direttiva `ddcTooltip` e il componente `TooltipComponent`
- `[feature]` **config**: Aggiunto il metodo `shuffle` in `ArrayUtility` per mischiare un array
- `[feature]` **html**: Creazione del componente `GenericLoadingComponent` per l'uso del loading come componente senza patina a tutto schermo
- `[feature]` **html**: Refactoring di `BaseLoadingModel` per consentire la visualizzazione di più loading dello stesso tipo in una pagina
- `[feature]` **chatbot**: Aggiunta del modulo `Chatbot` e relativo componente per la creazione di chatbot
  - servizi per le chiamate a **StackOverflow**
- `[feature]` **config**: Aggiunta l'utility `JsUtility` con la funzione statica `moveCursor` per spostare un cursore all'interno di un elemento
- `[feature]` **config**: Aggiunta la funzione `objectParamsToUrl` per convertire un oggetto in query string
- `[feature]` **seo**: Aggiunta del modulo `SeoModule` per la gestione dei tag meta
- `[feature]` **asbtract**: Aggiunta la classe base `BaseIdModel` che contiene la gestione dell'id per ogni classe che la estende
- `[update]` refactoring con l'integrazione della classe base `BaseIdModel`
  - Aggiunta l'estensione in `BaseClassModel`
- `[feature]` **logger**: Aggiunta l'inject del servizio `MetaTagService` e del metodo `logMetaTag` per l'abilitazione del cambio dei tag meta in base al routing current url e alla SEO_LIST presente nel servizio
- `[feature]` **asbtract**: Aggiunta in `BasePageComponent` l'invocazione di `applicationLogger.logMetaTag` per abilitare i cambiamenti dei tag meta sui componenti di pagina
- `[fix]` **storage**: Rimosso import inutilizzato in `StorageModule`

## 2.6.0 - 25/08/2023

> Versione che aggiunge la gestione di activity loggata su profilo utente e il componente `progress-circle.component`

### changes

- `[feature]` **storage**: Aggiunta la chiave `activityPIVA` per settare la partita IVA di un'activity loggata
- `[feature]` **html**: Aggiunta della property `rounded` per il componente `progress-bar.component`
- `[feature]` **html**: Aggiunto il componente `progress-circle.component`
- `[feature]` **config**: Aggiunto il metodo `percentInverse` nell'utility `MathUtility`

## 2.5.0 - 14/04/2023

> Versione che aggiunge i componenti `quill-editor` e `download-file` e mette a disposizione la chiave `passauthtoken` in application storage

### changes

- `[feature]` **quill-editor**: Aggiunto il modulo `quill-editor` con integrazione della libreria `ngx-quill`
- `[feature]` **filemanager**: Aggiunto il componente `download-file` per gestire un link di download
- `[feature]` **storage**: Aggiunta la chiave `passauthtoken` per settare l'informazione di far mandare il token ai service rest

## 2.4.0 - 14/03/2023

> Versione che adegua la gestione dei wait parameters in `BasePageComponent` e rimuove il `forkJoin` deprecato

### changes

- `[fix]` **abstract**: Fix sulla gestione dei wait parameters in `BasePageComponent` con gestione dell'onInit dopo l'acquisizione dei parametri
- `[feature]` **translation**: Sostituzione della `forkJoin` con `combineLastest` in `multi-http.loader`

## 2.3.0 - 15/02/2023

> Versione che rimuove i declare

### changes

- `[fix]` **abstract**: Fix del campo id per le classi `BaseClass` e `BaseComponent`. Il declare non permetteva il recupero dell'id dalla superclasse
- `[fix]` **qrcode**: Rimozione della riscrittura dell'input id

## 2.2.0 - 17/10/2022

> Versione che perfeziona il servizio `BrowserService` e aggiunge una funzione al mode Edit di un form.
> Inoltre perfezione il metodo `splitUrlNavigationExtrasQueryParameters` di `PageUtility`.
> Inoltre in `upload-file` è stata introdotta la gestione di file singoli e la possibilità di non visualizzare la progress bar e la lista di files.

### changes

- `[fix]` **filemanager**: Fix `setFileContent` in `upload-file` per la gestione del content e del mimetype
- `[feature]` **abstract**: Aggiunto il metodo `reloadModel` in `BaseForm` per ricaricare un modello dopo l'ngOnInit
- `[fix]` **html** : Fix in `input-autocomplete` con aggiunta della pipe escapehtml per i testi in option
- `[feature]` **html** e **abstract** : Aggiunta la gestione degli eventi `termEmitter` e `focusEmitter` e un nuovo input `listAll` per far caricare una lista completa al focus sull'`input-autocomplete` con term vuoto
- `[feature]` **timing**: Aggiunta la pipe `datemodel`
- `[fix]` **filemanager**: reimpostata la gestione di content e resource all'upload del file in `upload-file`
- `[feature]` **filemanager**: Aggiunti gli input `showProgress` e `showFiles` in `upload-file`
- `[feature]` **filemanager**: Aggiunta la gestione di singolo file quando la property `multiple` è false in `upload-file`
- `[feature]` **config**: Modificato il metodo `getBrowserName` di `BrowserService` per consentire di trovare edge anche con il codice edg
- `[feature]` **abstract**: Aggiunto il parametro `initUpdate` alla funzione `changeMode` di `BaseForm` per consentire di eseguire una funzione al change mode edit
- `[fix]` **routing**: Fixato il metodo `splitUrlNavigationExtrasQueryParameters` di `PageUtility` per consentire che un parametro già presente in url venga aggiornato se richiesto

## 2.1.0 - 26/07/2022

> Versione che refactorizza il routing con l'introduzione degli extra navigation in `PreviousRouteService`. Inoltre aggiunge la pipe `showcurrency` e utility per date e array.

### changes

- `[feature]` **storage**: Aggiunta la variabile di storage `storedUrls`
- `[feature]` **routing**: Integrazione della navigazione con i NavigationExtras
  - Aggiunta l'interfaccia `MapRouteInterface`
  - Aggiunto il metodo `navigate` in `PreviousRouteService` e modifica del metodo `back`
  - Aggiunto dei metodi `cleanUrl`, `splitUrl` e `splitUrlNavigationExtrasQueryParameters` in `PageUtility`
- `[fix]` Aggiunto il controllo sull'esistenza dei campi in input nel metodo `getBase64ByContent` di `FileService` del modulo `filemanager`
- `[feature]` **locale**: Aggiunta la pipe `showcurrency`
- `[feature]` **timing**: Aggiunta l'interfaccia `DurationInterface` e tutti i metodi di utility in `DateUtility` per aggiungere o sottrarre valori ad una data
- `[feature]` **timing**: Aggiunti in `DateUtility` le funzioni `isBisestile`, per calcolare se un anno è bisestile, e `getMaxDayByMonth` per calcolare il numero di giorni di un mese
- `[feature]` **config**: Aggiunta in `ArrayUtility` la funzione `sum`, per calcolare la somma di una property presente in array
- `[feature]` **charts**: Aggiunti in `ChartComponent` l'input `appendText`, per aggiungere un testo ad un valore in tooltip

## 2.0.0 - 14/03/2022

> Versione che aggiunge il modulo `charts` per la gestione di grafici

### changes

- `[update]` Aggiunta del modulo `charts`

## 1.2.0 - 11/11/2021

> Versione che aggiunge la direttiva `DdcCssVar` per il settaggio dei valori css variabili

### changes

- `[feature]` Aggiunta la direttiva `DdcCssVar` nel modulo `html`

## 1.1.0 - 14/10/2021

> Versione che aggiunge ad `ApplicationStorageService` la possibilità di creare variabili di storage on flat

### changes

- `[feature]` Aggiunta in `ApplicationStorageService` dei metodi `create` e `get` per la creazione e il recupero di variabili da creare on flat nell'applicazione

## X.y.z - DD/MM/YYYY

- `[fix]` patch z
- `[feature]` minor y
- `[update]` or `[BREAKING CHANGE]` major X
