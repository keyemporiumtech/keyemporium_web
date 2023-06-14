import { Directive, OnDestroy } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	ArrayUtility,
	BaseService,
	BehaviourObserverModel,
	InnerStorageService,
} from '@ddc/kit';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExpirationInfo } from '../../auth/interfaces/expiration-info.interface';
import { AuthUtility } from '../../auth/utility/auth.utility';
import { RequestManagerInterface } from '../../request/interfaces/request-manager.interface';
import { ResponseManagerInterface } from '../../response/interfaces/response-manager.interface';
import { ResponseMessageInterface } from '../../response/interfaces/response-message.interface';

/**
 * Classe per la gestione delle informazioni utente e di sessione.
 *
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseAuthService extends BaseService implements OnDestroy {
	innerStorage: InnerStorageService;
	profileChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
	profile: Observable<string> = this.profileChange.asObservable();
	permissions: string[] = [];
	sedi: any[] = [];
	applicationStorage: ApplicationStorageService;
	// sub
	subProfile: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
	) {
		super(applicationLogger);
		this.applicationStorage = applicationStorage;
		this.innerStorage = innerStorage;
	}

	sendTokenAuth(responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		if (!responseManager.tokenManager) {
			responseManager.tokenManager = {};
		}
		responseManager.tokenManager.tokenKeyRequest =
			this.getRequestNameForSessionTokenAuthentication();
		responseManager.tokenManager.tokenValue = this.applicationStorage.authtoken.get();
	}

	/**
	 * Svuota la cache di autenticazione utente
	 */
	emptyAuthSession() {
		this.applicationStorage.authtoken.del();
		this.applicationStorage.payload.del();
		this.applicationStorage.userLogged.del();
		this.applicationStorage.userId.del();
		this.applicationStorage.userImage.del();
		this.applicationStorage.profile.del();
	}

	/**
	 * Registra un utente
	 * @param user Utente da registrare
	 */
	register(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		this.registerBehaviour().actionPre();
		return this.fnRegister(user, requestManager, responseManager).pipe(
			map((res) => {
				return this.registerBehaviour().actionResponse(res);
			}),
		);
	}

	/**
	 * Effettua il login di un utente e se l'esito è positivo memorizza
	 *
	 * [userLogged]{@link ApplicationStorage#userLogged}
	 * [userId]{@link ApplicationStorage#userId}
	 * [userImage]{@link ApplicationStorage#userImage}
	 * @param user Utente da loggare
	 */
	login(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		this.loginBehaviour().actionPre();
		return this.fnLogin(
			user,
			this.getResponseNameForSessionTokenAuthentication(),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				this.setProfile(this.getProfileFromLogin(res), this.getUsernameFromLogin(res));
				this.applicationStorage.userLogged.setObj(this.getUserLoggedByResponse(res));
				this.applicationStorage.userId.set(this.getUserLoggedIdByResponse(res));
				this.applicationStorage.userImage.set(this.getUserLoggedImageByResponse(res));
				return this.loginBehaviour().actionResponse(res);
			}),
		);
	}

	/**
	 * Verifica l'esistenza di una sessione utente dopo il login.
	 * Controlla il token <b>authtoken</b> memorizzato in [ApplicationStorage]{@link ApplicationStorage#authtoken}
	 */
	checkSession(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		this.checkSessionBehaviour().actionPre();
		return this.fnCheckSession(
			this.getRequestNameForSessionTokenAuthentication(),
			this.applicationStorage.authtoken.get(),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				return this.checkSessionBehaviour().actionResponse(res);
			}),
		);
	}

	getExpirationInfo(): ExpirationInfo {
		return AuthUtility.getExpirationInfo(this.applicationStorage.payload.getObj());
	}

	/**
	 * Effettua il logout di un utente e svuota la sessione utente
	 * @param user Utente loggato
	 */
	logout(
		user?: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		this.logoutBehaviour().actionPre();
		return this.fnLogout(user, requestManager, responseManager).pipe(
			map((res) => {
				this.emptyAuthSession();
				return this.logoutBehaviour().actionResponse(res);
			}),
		);
	}

	loadPermissions(
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string[]> {
		this.loadPermissionsBehaviour().actionPre();
		return this.fnLoadPermissions(profile, requestManager, responseManager).pipe(
			map((res) => {
				return this.loadPermissionsBehaviour().actionResponse(res);
			}),
		);
	}

	loadSedi(
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any[]> {
		this.loadSediBehaviour().actionPre();
		return this.fnLoadSedi(profile, requestManager, responseManager).pipe(
			map((res) => {
				return this.loadSediBehaviour().actionResponse(res);
			}),
		);
	}

	changeProfile(
		username: string,
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		this.changeProfileBehaviour().actionPre();
		return this.fnChangeProfile(username, profile, requestManager, responseManager).pipe(
			map((res) => {
				return this.changeProfileBehaviour().actionResponse(res);
			}),
		);
	}

	setProfile(profile: string, username?: string, callback?: () => any) {
		const $obsProfile = username ? this.changeProfile(username, profile) : of(true);
		this.subProfile = combineLatest([
			this.loadPermissions(profile),
			this.loadSedi(profile),
			$obsProfile,
		]).subscribe((data) => {
			this.permissions = data[0];
			this.sedi = data[1];
			if (callback) {
				callback();
			}
			this.applicationStorage.profile.set(profile);
			this.profileChange.next(profile);
		});
	}

	/**
	 * Aggiunge i permissions caricati al profilo corrente dell'utente.
	 * Nota che non viene eseguito nulla se l'utente non ha già un profilo settato.
	 * In tal caso biso è necessario fornire il profile per creare i permessi utente.
	 * @param loadPermissions observer per la chiamata che carica i permissions
	 * @param profile da fornire se si vuole aggiornare e/o settare il profilo utente
	 * @param callback chiamata da eseguire se loadPermissions ha risposto correttamente
	 */
	appendProfile(loadPermissions: Observable<string[]>, profile?: string, callback?: () => any) {
		if (!this.applicationStorage.profile.get()) {
			return;
		}
		if (!this.permissions) {
			this.permissions = [];
		}
		this.subProfile = loadPermissions.subscribe((data) => {
			ArrayUtility.addUniqueValues(this.permissions, data);
			if (callback) {
				callback();
			}
			if (profile) {
				this.applicationStorage.profile.set(profile);
				this.profileChange.next(profile);
			}
		});
	}

	getProfile(): Observable<string> {
		return this.profile;
	}

	/**
	 * Verifica se i permessi passati in input esistono nella lista dei permessi loggati.
	 * La condizione di verifica è in OR perciò basta ne sia verificato uno per ritornare true.
	 * Ritorna true anche nel caso di array vuoto o di lista nulla.
	 *
	 * @param permissions permessi da verificare
	 */
	checkPermissions(permissions: string[]): boolean {
		if (!permissions || permissions.length === 0) {
			return true;
		}

		if (this.applicationStorage.profile.get() || (this.permissions && this.permissions.length)) {
			for (const el of permissions) {
				if (
					el === this.applicationStorage.profile.get() ||
					(this.permissions && this.permissions.length && this.permissions.indexOf(el) > -1)
				) {
					return true;
				}
			}
		}

		return false;
	}

	// CODE - VERIFICATIONS
	/**
	 * Invia il pin per email all'utente
	 * @param user utente richiedente pin
	 * @param requestManager
	 * @param responseManager
	 */
	sendVerifyPinEmail(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return this.fnSendVerifyPinEmail(user, requestManager, responseManager);
	}
	/**
	 * Invia il pin per sms all'utente
	 * @param user utente richiedente pin
	 * @param requestManager
	 * @param responseManager
	 */
	sendVerifyPinPhone(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return this.fnSendVerifyPinPhone(user, requestManager, responseManager);
	}

	/**
	 * Effettua il login e memorizza l'utente request in memoLogin
	 * @param user utente richiedente
	 * @param requestManager
	 * @param responseManager
	 */
	loginVerify(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return this.fnLoginVerify(user, requestManager, responseManager).pipe(
			map((res) => {
				if (res) {
					this.applicationStorage.memoLogin.setObj(user);
				}
				return res;
			}),
		);
	}

	/**
	 * Effettua il login, memorizza l'utente in request e invia i pin sia per email che per telefono
	 * @param user
	 * @param requestManagerLogin
	 * @param responseManagerLogin
	 * @param requestManagerEmail
	 * @param responseManagerEmail
	 * @param requestManagerPhone
	 * @param responseManagerPhone
	 */
	loginVerifyAndSendCode(
		user: any,
		requestManagerLogin?: RequestManagerInterface,
		responseManagerLogin?: ResponseManagerInterface,
		requestManagerEmail?: RequestManagerInterface,
		responseManagerEmail?: ResponseManagerInterface,
		requestManagerPhone?: RequestManagerInterface,
		responseManagerPhone?: ResponseManagerInterface,
	): Observable<boolean> {
		return this.fnLoginVerify(user, requestManagerLogin, responseManagerLogin).pipe(
			switchMap((res) => {
				if (res) {
					this.applicationStorage.memoLogin.setObj(user);
					return combineLatest([
						this.fnSendVerifyPinEmail(user, requestManagerEmail, responseManagerEmail),
						this.fnSendVerifyPinPhone(user, requestManagerPhone, responseManagerPhone),
					]).pipe(
						map((data) => {
							return data[0] && data[1];
						}),
					);
				} else {
					return of(res);
				}
			}),
		);
	}

	/**
	 * Verifica la validità di un pin inviato per email
	 * @param pin pin utente
	 * @param user utente richiedente
	 * @param requestManager
	 * @param responseManager
	 */
	verifyPinEmail<T = any>(
		pin: string,
		user?: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		const memoUser: T = user ? user : (this.applicationStorage.memoLogin.getObj() as T);
		return this.fnVerifyPinEmail(pin, memoUser, requestManager, responseManager).pipe(
			map((res) => {
				return res;
			}),
		);
	}
	/**
	 * Verifica la validità di un pin inviato per sms
	 * @param pin pin utente
	 * @param user utente richiedente
	 * @param requestManager
	 * @param responseManager
	 */
	verifyPinPhone<T = any>(
		pin: string,
		user?: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		const memoUser: T = user ? user : (this.applicationStorage.memoLogin.getObj() as T);
		return this.fnVerifyPinPhone(pin, memoUser, requestManager, responseManager).pipe(
			map((res) => {
				return res;
			}),
		);
	}
	/**
	 * Verifica la validità sia del pin inviato per email che per sms
	 * @param pin_email pin inviato per email
	 * @param pin_phone pin inviato per sms
	 * @param user utente richiedente
	 * @param requestManagerEmail
	 * @param responseManagerEmail
	 * @param requestManagerPhone
	 * @param responseManagerPhone
	 */
	verifyPinDouble<T = any>(
		pin_email: string,
		pin_phone: string,
		user?: any,
		requestManagerEmail?: RequestManagerInterface,
		responseManagerEmail?: ResponseManagerInterface,
		requestManagerPhone?: RequestManagerInterface,
		responseManagerPhone?: ResponseManagerInterface,
	): Observable<boolean> {
		const memoUser: T = user ? user : (this.applicationStorage.memoLogin.getObj() as T);
		return combineLatest([
			this.fnVerifyPinEmail(pin_email, memoUser, requestManagerEmail, responseManagerEmail),
			this.fnVerifyPinPhone(pin_phone, memoUser, requestManagerPhone, responseManagerPhone),
		]).pipe(
			map((data) => {
				return data[0] && data[1];
			}),
		);
	}

	/**
	 * Verifica il pin inviato per email ed effettua il login con l'utente memoUser
	 * @param pin pin da verificare
	 * @param user utente richiedente
	 * @param requestManager
	 * @param responseManager
	 */
	verifyPinEmailWithLogin<T = any>(
		pin: string,
		user?: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		const memoUser: T = user ? user : (this.applicationStorage.memoLogin.getObj() as T);
		return this.fnVerifyPinEmail(pin, memoUser, requestManager, responseManager).pipe(
			switchMap((res) => {
				if (res) {
					return this.login(memoUser);
				} else {
					return of(undefined);
				}
			}),
		);
	}
	/**
	 * Verifica il pin inviato per sms ed effettua il login con l'utente memoUser
	 * @param pin pin da verificare
	 * @param user utente richiedente
	 * @param pin
	 * @param user
	 * @param requestManager
	 * @param responseManager
	 */
	verifyPinPhoneWithLogin<T = any>(
		pin: string,
		user?: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		const memoUser: T = user ? user : (this.applicationStorage.memoLogin.getObj() as T);
		return this.fnVerifyPinPhone(pin, memoUser, requestManager, responseManager).pipe(
			switchMap((res) => {
				if (res) {
					return this.login(memoUser);
				} else {
					return of(undefined);
				}
			}),
		);
	}
	/**
	 * Verifica sia il pin inviato per email che quello inviato per sms ed effettua il login con l'utente memoUser
	 * @param pin_email pin inviato per email
	 * @param pin_phone pin inviato per sms
	 * @param user utente richiedente
	 * @param requestManagerEmail
	 * @param responseManagerEmail
	 * @param requestManagerPhone
	 * @param responseManagerPhone
	 */
	verifyPinDoubleWithLogin<T = any>(
		pin_email: string,
		pin_phone: string,
		user?: any,
		requestManagerEmail?: RequestManagerInterface,
		responseManagerEmail?: ResponseManagerInterface,
		requestManagerPhone?: RequestManagerInterface,
		responseManagerPhone?: ResponseManagerInterface,
	): Observable<any> {
		const memoUser: T = user ? user : (this.applicationStorage.memoLogin.getObj() as T);
		return combineLatest([
			this.fnVerifyPinEmail(pin_email, memoUser, requestManagerEmail, responseManagerEmail),
			this.fnVerifyPinPhone(pin_phone, memoUser, requestManagerPhone, responseManagerPhone),
		]).pipe(
			switchMap((data) => {
				if (data[0] && data[1]) {
					return this.login(memoUser);
				} else {
					return of(undefined);
				}
			}),
		);
	}

	ngOnDestroy() {
		if (this.subProfile) {
			this.subProfile.unsubscribe();
		}
	}

	abstract getDefaultMessage(): ResponseMessageInterface;
	/**
	 * Definisce il nome del campo da passare al servizio rest per mandare il token di sessione con cui l'utente ha fatto login
	 */
	abstract getRequestNameForSessionTokenAuthentication(): string;
	/**
	 * Definisce il nome del campo passato dal servizio rest per mandare il token di sessione con cui l'utente ha fatto login
	 */
	abstract getResponseNameForSessionTokenAuthentication(): string;

	/**
	 * chiamata che verifica l'esistenza della sessione
	 * @param tokenAuthKeyRequest nome del token da inviare al servizio rest
	 * @param tokenAuthValue valore del token da inviare al servizio rest
	 */
	abstract fnCheckSession(
		tokenAuthKeyRequest: string,
		tokenAuthValue: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata checkSession().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract checkSessionBehaviour(): BehaviourObserverModel;

	/**
	 * chiamata che effettua il login di un utente
	 * @param user oggetto utente
	 * @param tokenAuthKeyResponse nome del token inviato dal servizio rest e da gestire in decodifica
	 */
	abstract fnLogin(
		user: any,
		tokenAuthKeyResponse: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata login().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract loginBehaviour(): BehaviourObserverModel;

	/**
	 * Ritorna un oggetto da memorizzare nella cache in <b>userLogged</b>
	 * @param res response ricevuta a seguito di un login o di un check utente loggato
	 */
	abstract getUserLoggedByResponse(res: any): any;
	/**
	 * Ritorna l'id dell'utente loggato da memorizzare nella cache in <b>userId</b>
	 * @param res response ricevuta a seguito di un login o di un check utente loggato
	 */
	abstract getUserLoggedIdByResponse(res: any): any;
	/**
	 * Ritorna l'immagine dell'utente loggato da memorizzare nella cache in <b>userImage</b>
	 * @param res response ricevuta a seguito di un login o di un check utente loggato
	 */
	abstract getUserLoggedImageByResponse(res: any): any;
	/**
	 * Ritona il valore del profilo utente dalla response del login.
	 * @param body body della response di login
	 */
	abstract getProfileFromLogin(body: any): string;

	/**
	 * Ritona il valore dello username utente dalla response del login.
	 * @param body body della response di login
	 */
	abstract getUsernameFromLogin(body: any): string;

	/**
	 * chiamata che effettua il logout di un utente
	 * @param user oggetto utente
	 */
	abstract fnLogout(
		user?: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata logout().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract logoutBehaviour(): BehaviourObserverModel;

	/**
	 * chiamata che registra un utente
	 * @param user oggetto utente
	 */
	abstract fnRegister(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata register().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract registerBehaviour(): BehaviourObserverModel;

	/**
	 * Chiamata che ritorna la lista dei permessi di un profilo
	 * @param profile profilo per il quale caricare i permessi
	 */
	abstract fnLoadPermissions(
		profile?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata loadPermissions().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract loadPermissionsBehaviour(): BehaviourObserverModel;

	/**
	 * Chiamata che memorizza il cambio profilo lato BE
	 * @param username nome utente
	 * @param profile profilo da settare per l'utente
	 */
	abstract fnChangeProfile(
		username: string,
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata changeProfile().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract changeProfileBehaviour(): BehaviourObserverModel;

	/**
	 * Chiamata che ritorna la lista delle sedi di competenza di un profilo
	 * @param profile profilo per il quale caricare le sedi di competenza
	 */
	abstract fnLoadSedi(
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata loadSedi().
	 * La funzione actionResponse deve ritornare il risultato della chiamata
	 */
	abstract loadSediBehaviour(): BehaviourObserverModel;

	// CODE - VERIFICATIONS

	/**
	 * chiamata che verifica l'esistenza di username e password
	 * @param user oggetto utente
	 */
	abstract fnLoginVerify(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean>;

	abstract fnVerifyPinEmail(
		pin: string,
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean>;
	abstract fnVerifyPinPhone(
		pin: string,
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean>;
	abstract fnSendVerifyPinEmail(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean>;
	abstract fnSendVerifyPinPhone(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean>;
}
