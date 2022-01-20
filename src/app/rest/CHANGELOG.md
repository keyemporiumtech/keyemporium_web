# CHANGELOG REST

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
