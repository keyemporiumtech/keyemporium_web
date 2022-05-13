# CHANGELOG KIT

## 2.1.0 - XX/03/2022

> Versione che 

### changes

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
