import { Injectable } from '@angular/core';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { ApplicationStorageModel } from '../models/application-storage.model';

@Injectable({
	providedIn: 'root',
})
export class ApplicationStorageService extends BaseService {
	private _environment: any;
	// test
	private _test: ApplicationStorageModel;
	// routing
	private _backUrl: ApplicationStorageModel;
	private _storedUrls: ApplicationStorageModel;
	// locale
	private _language: ApplicationStorageModel;
	private _languageName: ApplicationStorageModel;
	private _languagePayload: ApplicationStorageModel;
	private _currency: ApplicationStorageModel;
	private _currencySymbol: ApplicationStorageModel;
	private _currencyName: ApplicationStorageModel;
	private _currencyPayload: ApplicationStorageModel;
	private _nation: ApplicationStorageModel;
	private _nationName: ApplicationStorageModel;
	private _nationPayload: ApplicationStorageModel;
	// message
	private _messageType: ApplicationStorageModel;
	private _messageTitle: ApplicationStorageModel;
	private _messageText: ApplicationStorageModel;
	private _messageCode: ApplicationStorageModel;
	private _messageException: ApplicationStorageModel;
	// REST authhentication
	private _authtoken: ApplicationStorageModel;
	private _passauthtoken: ApplicationStorageModel;
	private _payload: ApplicationStorageModel;

	private _userLogged: ApplicationStorageModel;
	private _userId: ApplicationStorageModel;
	private _userImage: ApplicationStorageModel;
	private _profile: ApplicationStorageModel;
	private _memoLogin: ApplicationStorageModel;
	private _activityPIVA: ApplicationStorageModel;
	// REST init values
	private _cookiePolicyResource: ApplicationStorageModel;
	private _privacyPolicyResource: ApplicationStorageModel;
	private _termPolicyResource: ApplicationStorageModel;
	// SHARED banner
	private _bannerStatus: ApplicationStorageModel;
	// SHARED file-page
	private _fileEmbed: ApplicationStorageModel;
	// INIT load
	private _activityPrincipal: ApplicationStorageModel;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
		this.test = new ApplicationStorageModel('test');
		this.backUrl = new ApplicationStorageModel('back');
		this.storedUrls = new ApplicationStorageModel('storedUrls');
		this.language = new ApplicationStorageModel('lang');
		this.languageName = new ApplicationStorageModel('languageName');
		this.languagePayload = new ApplicationStorageModel('languagePayload');
		this.currency = new ApplicationStorageModel('currency');
		this.currencySymbol = new ApplicationStorageModel('currencySymbol');
		this.currencyName = new ApplicationStorageModel('currencyName');
		this.currencyPayload = new ApplicationStorageModel('currencyPayload');
		this.nation = new ApplicationStorageModel('nation');
		this.nationName = new ApplicationStorageModel('nationName');
		this.nationPayload = new ApplicationStorageModel('nationPayload');
		this.messageType = new ApplicationStorageModel('messageType');
		this.messageTitle = new ApplicationStorageModel('messageTitle');
		this.messageText = new ApplicationStorageModel('messageText');
		this.messageCode = new ApplicationStorageModel('messageCode');
		this.messageException = new ApplicationStorageModel('messageException');
		this.authtoken = new ApplicationStorageModel('authtoken');
		this.passauthtoken = new ApplicationStorageModel('passauthtoken'); // abilita il passaggio del token
		this.payload = new ApplicationStorageModel('payload');
		this.bannerStatus = new ApplicationStorageModel('banner');
		this.fileEmbed = new ApplicationStorageModel('fileEmbed');
		this.cookiePolicyResource = new ApplicationStorageModel('cookiePolicy');
		this.privacyPolicyResource = new ApplicationStorageModel('privacyPolicy');
		this.termPolicyResource = new ApplicationStorageModel('termPolicy');
		this.userLogged = new ApplicationStorageModel('userLogged');
		this.userId = new ApplicationStorageModel('userId');
		this.userImage = new ApplicationStorageModel('userImage');
		this.profile = new ApplicationStorageModel('currentProfile');
		this.activityPrincipal = new ApplicationStorageModel('activityPrincipal');
		this.memoLogin = new ApplicationStorageModel('memoLogin');
		this.activityPIVA = new ApplicationStorageModel('activityPIVA');
	}

	getClassName(): string {
		return 'ApplicationStorageService';
	}

	public create(key: string, value?: string | any) {
		this[key] = new ApplicationStorageModel(key);
		if (value && typeof value === 'string') {
			this[key].set(value);
		} else if (value) {
			this[key].setObj(value);
		}
	}

	public get(key: string): ApplicationStorageModel {
		return this[key];
	}

	/**
	 * Getter memoLogin
	 * @return {ApplicationStorageModel}
	 */
	public get memoLogin(): ApplicationStorageModel {
		return this._memoLogin;
	}

	/**
	 * Setter memoLogin
	 * @param {ApplicationStorageModel} value
	 */
	public set memoLogin(value: ApplicationStorageModel) {
		this._memoLogin = value;
	}

	/**
	 * Getter test
	 * @return ApplicationStorageModel
	 */
	public get test(): ApplicationStorageModel {
		return this._test;
	}

	/**
	 * Setter test
	 * @param ApplicationStorageModel value
	 */
	public set test(value: ApplicationStorageModel) {
		this._test = value;
	}

	/**
	 * Getter backUrl
	 * @return ApplicationStorageModel
	 */
	public get backUrl(): ApplicationStorageModel {
		return this._backUrl;
	}

	/**
	 * Setter backUrl
	 * @param ApplicationStorageModel value
	 */
	public set backUrl(value: ApplicationStorageModel) {
		this._backUrl = value;
	}

	/**
	 * Getter language
	 * @return ApplicationStorageModel
	 */
	public get language(): ApplicationStorageModel {
		return this._language;
	}

	/**
	 * Setter language
	 * @param ApplicationStorageModel value
	 */
	public set language(value: ApplicationStorageModel) {
		this._language = value;
	}

	/**
	 * Getter currency
	 * @return ApplicationStorageModel
	 */
	public get currency(): ApplicationStorageModel {
		return this._currency;
	}

	/**
	 * Setter currency
	 * @param ApplicationStorageModel value
	 */
	public set currency(value: ApplicationStorageModel) {
		this._currency = value;
	}

	/**
	 * Getter environment
	 * @return any
	 */
	public get environment(): any {
		return this._environment;
	}

	/**
	 * Setter environment
	 * @param any value
	 */
	public set environment(value: any) {
		this._environment = value;
	}

	/**
	 * Getter nation
	 * @return ApplicationStorageModel
	 */
	public get nation(): ApplicationStorageModel {
		return this._nation;
	}

	/**
	 * Setter nation
	 * @param ApplicationStorageModel value
	 */
	public set nation(value: ApplicationStorageModel) {
		this._nation = value;
	}

	/**
	 * Getter messageType
	 * @return ApplicationStorageModel
	 */
	public get messageType(): ApplicationStorageModel {
		return this._messageType;
	}

	/**
	 * Getter messageTitle
	 * @return ApplicationStorageModel
	 */
	public get messageTitle(): ApplicationStorageModel {
		return this._messageTitle;
	}

	/**
	 * Getter messageText
	 * @return ApplicationStorageModel
	 */
	public get messageText(): ApplicationStorageModel {
		return this._messageText;
	}

	/**
	 * Getter messageCode
	 * @return ApplicationStorageModel
	 */
	public get messageCode(): ApplicationStorageModel {
		return this._messageCode;
	}

	/**
	 * Getter messageException
	 * @return ApplicationStorageModel
	 */
	public get messageException(): ApplicationStorageModel {
		return this._messageException;
	}

	/**
	 * Setter messageType
	 * @param ApplicationStorageModel value
	 */
	public set messageType(value: ApplicationStorageModel) {
		this._messageType = value;
	}

	/**
	 * Setter messageTitle
	 * @param ApplicationStorageModel value
	 */
	public set messageTitle(value: ApplicationStorageModel) {
		this._messageTitle = value;
	}

	/**
	 * Setter messageText
	 * @param ApplicationStorageModel value
	 */
	public set messageText(value: ApplicationStorageModel) {
		this._messageText = value;
	}

	/**
	 * Setter messageCode
	 * @param ApplicationStorageModel value
	 */
	public set messageCode(value: ApplicationStorageModel) {
		this._messageCode = value;
	}

	/**
	 * Setter messageException
	 * @param ApplicationStorageModel value
	 */
	public set messageException(value: ApplicationStorageModel) {
		this._messageException = value;
	}

	/**
	 * Getter authtoken
	 * @return ApplicationStorageModel
	 */
	public get authtoken(): ApplicationStorageModel {
		return this._authtoken;
	}

	/**
	 * Setter authtoken
	 * @param ApplicationStorageModel value
	 */
	public set authtoken(value: ApplicationStorageModel) {
		this._authtoken = value;
	}

	/**
	 * Getter payload
	 * @return ApplicationStorageModel
	 */
	public get payload(): ApplicationStorageModel {
		return this._payload;
	}

	/**
	 * Setter payload
	 * @param ApplicationStorageModel value
	 */
	public set payload(value: ApplicationStorageModel) {
		this._payload = value;
	}

	/**
	 * Getter bannerStatus
	 * @return {ApplicationStorageModel}
	 */
	public get bannerStatus(): ApplicationStorageModel {
		return this._bannerStatus;
	}

	/**
	 * Setter bannerStatus
	 * @param {ApplicationStorageModel} value
	 */
	public set bannerStatus(value: ApplicationStorageModel) {
		this._bannerStatus = value;
	}

	/**
	 * Getter fileEmbed
	 * @return {ApplicationStorageModel}
	 */
	public get fileEmbed(): ApplicationStorageModel {
		return this._fileEmbed;
	}

	/**
	 * Setter fileEmbed
	 * @param {ApplicationStorageModel} value
	 */
	public set fileEmbed(value: ApplicationStorageModel) {
		this._fileEmbed = value;
	}

	/**
	 * Getter cookiePolicyResource
	 * @return {ApplicationStorageModel}
	 */
	public get cookiePolicyResource(): ApplicationStorageModel {
		return this._cookiePolicyResource;
	}

	/**
	 * Getter privacyPolicyResource
	 * @return {ApplicationStorageModel}
	 */
	public get privacyPolicyResource(): ApplicationStorageModel {
		return this._privacyPolicyResource;
	}

	/**
	 * Getter termPolicyResource
	 * @return {ApplicationStorageModel}
	 */
	public get termPolicyResource(): ApplicationStorageModel {
		return this._termPolicyResource;
	}

	/**
	 * Setter cookiePolicyResource
	 * @param {ApplicationStorageModel} value
	 */
	public set cookiePolicyResource(value: ApplicationStorageModel) {
		this._cookiePolicyResource = value;
	}

	/**
	 * Setter privacyPolicyResource
	 * @param {ApplicationStorageModel} value
	 */
	public set privacyPolicyResource(value: ApplicationStorageModel) {
		this._privacyPolicyResource = value;
	}

	/**
	 * Setter termPolicyResource
	 * @param {ApplicationStorageModel} value
	 */
	public set termPolicyResource(value: ApplicationStorageModel) {
		this._termPolicyResource = value;
	}

	/**
	 * Getter userLogged
	 * @return {ApplicationStorageModel}
	 */
	public get userLogged(): ApplicationStorageModel {
		return this._userLogged;
	}

	/**
	 * Setter userLogged
	 * @param {ApplicationStorageModel} value
	 */
	public set userLogged(value: ApplicationStorageModel) {
		this._userLogged = value;
	}

	/**
	 * Getter profile
	 * @return {ApplicationStorageModel}
	 */
	public get profile(): ApplicationStorageModel {
		return this._profile;
	}

	/**
	 * Setter profile
	 * @param {ApplicationStorageModel} value
	 */
	public set profile(value: ApplicationStorageModel) {
		this._profile = value;
	}

	/**
	 * Getter userId
	 * @return {ApplicationStorageModel}
	 */
	public get userId(): ApplicationStorageModel {
		return this._userId;
	}

	/**
	 * Getter userImage
	 * @return {ApplicationStorageModel}
	 */
	public get userImage(): ApplicationStorageModel {
		return this._userImage;
	}

	/**
	 * Setter userId
	 * @param {ApplicationStorageModel} value
	 */
	public set userId(value: ApplicationStorageModel) {
		this._userId = value;
	}

	/**
	 * Setter userImage
	 * @param {ApplicationStorageModel} value
	 */
	public set userImage(value: ApplicationStorageModel) {
		this._userImage = value;
	}

	/**
	 * Getter activityPrincipal
	 * @return {ApplicationStorageModel}
	 */
	public get activityPrincipal(): ApplicationStorageModel {
		return this._activityPrincipal;
	}

	/**
	 * Setter activityPrincipal
	 * @param {ApplicationStorageModel} value
	 */
	public set activityPrincipal(value: ApplicationStorageModel) {
		this._activityPrincipal = value;
	}

	/**
	 * Getter languageName
	 * @return {ApplicationStorageModel}
	 */
	public get languageName(): ApplicationStorageModel {
		return this._languageName;
	}

	/**
	 * Getter currencySymbol
	 * @return {ApplicationStorageModel}
	 */
	public get currencySymbol(): ApplicationStorageModel {
		return this._currencySymbol;
	}

	/**
	 * Getter currencyName
	 * @return {ApplicationStorageModel}
	 */
	public get currencyName(): ApplicationStorageModel {
		return this._currencyName;
	}

	/**
	 * Getter nationName
	 * @return {ApplicationStorageModel}
	 */
	public get nationName(): ApplicationStorageModel {
		return this._nationName;
	}

	/**
	 * Setter languageName
	 * @param {ApplicationStorageModel} value
	 */
	public set languageName(value: ApplicationStorageModel) {
		this._languageName = value;
	}

	/**
	 * Setter currencySymbol
	 * @param {ApplicationStorageModel} value
	 */
	public set currencySymbol(value: ApplicationStorageModel) {
		this._currencySymbol = value;
	}

	/**
	 * Setter currencyName
	 * @param {ApplicationStorageModel} value
	 */
	public set currencyName(value: ApplicationStorageModel) {
		this._currencyName = value;
	}

	/**
	 * Setter nationName
	 * @param {ApplicationStorageModel} value
	 */
	public set nationName(value: ApplicationStorageModel) {
		this._nationName = value;
	}

	/**
	 * Getter languagePayload
	 * @return {ApplicationStorageModel}
	 */
	public get languagePayload(): ApplicationStorageModel {
		return this._languagePayload;
	}

	/**
	 * Getter currencyPayload
	 * @return {ApplicationStorageModel}
	 */
	public get currencyPayload(): ApplicationStorageModel {
		return this._currencyPayload;
	}

	/**
	 * Getter nationPayload
	 * @return {ApplicationStorageModel}
	 */
	public get nationPayload(): ApplicationStorageModel {
		return this._nationPayload;
	}

	/**
	 * Setter languagePayload
	 * @param {ApplicationStorageModel} value
	 */
	public set languagePayload(value: ApplicationStorageModel) {
		this._languagePayload = value;
	}

	/**
	 * Setter currencyPayload
	 * @param {ApplicationStorageModel} value
	 */
	public set currencyPayload(value: ApplicationStorageModel) {
		this._currencyPayload = value;
	}

	/**
	 * Setter nationPayload
	 * @param {ApplicationStorageModel} value
	 */
	public set nationPayload(value: ApplicationStorageModel) {
		this._nationPayload = value;
	}

	/**
	 * Getter storedUrls
	 * @return {ApplicationStorageModel}
	 */
	public get storedUrls(): ApplicationStorageModel {
		return this._storedUrls;
	}

	/**
	 * Setter storedUrls
	 * @param {ApplicationStorageModel} value
	 */
	public set storedUrls(value: ApplicationStorageModel) {
		this._storedUrls = value;
	}

	/**
	 * Getter passauthtoken
	 * @return {ApplicationStorageModel}
	 */
	public get passauthtoken(): ApplicationStorageModel {
		return this._passauthtoken;
	}

	/**
	 * Setter passauthtoken
	 * @param {ApplicationStorageModel} value
	 */
	public set passauthtoken(value: ApplicationStorageModel) {
		this._passauthtoken = value;
	}

	/**
	 * Getter activityPIVA
	 * @return {ApplicationStorageModel}
	 */
	public get activityPIVA(): ApplicationStorageModel {
		return this._activityPIVA;
	}

	/**
	 * Setter activityPIVA
	 * @param {ApplicationStorageModel} value
	 */
	public set activityPIVA(value: ApplicationStorageModel) {
		this._activityPIVA = value;
	}
}
