# CHANGELOG KIT

## 2.2.0 - XX/XX/2022

> Versione che perfeziona il servizio `BrowserService` e aggiunge una funzione al mode Edit di un form.
> Inoltre perfezione il metodo `splitUrlNavigationExtrasQueryParameters` di `PageUtility`.
> Inoltre in `upload-file` è stata introdotta la gestione di file singoli e la possibilità di non visualizzare la progress bar e la lista di files.

### changes

- `[fix]` **html** : Fix in `input-autocomplete` con aggiunta della pipe escapehtml per i testi in option
- `[feature]` **html** e **abstract** : Aggiunta la gestione degli eventi `termEmitter` e `focusEmitter` e un nuovo input `listAll` per far caricare una lista completa al focus sull'`input-autocomplete` con term vuoto
- `[feature]` **timing**: Aggiunta la pipe `datemodel`
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
