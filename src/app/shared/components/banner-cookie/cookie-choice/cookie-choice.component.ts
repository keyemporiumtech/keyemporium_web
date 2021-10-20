import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CookieUtils } from '../../../utils/cookie-utils';
import { EnumCookieType } from '../../../enums/cookie/cookie-type.enum';
import { EnumCookieOperation } from '../../../enums/cookie/cookie-operation.enum';
import {
	ApplicationStorageService,
	BaseComponent,
	ApplicationLoggerService,
	FileEmbedModel,
} from '@ddc/kit';
import { Router } from '@angular/router';
import { EnumCookieNavigation } from '../../../enums/cookie/cookie-navigation.enum';
import { cookies } from '../../../../../config/cookie/cookies';
import { cookieInfo } from '../../../../../config/cookie/cookie-info';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { CookiemanagerService } from '../../../../modules/api/cakeutils-be/services/cookiemanager.service';
import { CookieModel } from '../../../../modules/api/cakeutils-be/models/cookie.model';
import { CookieConverter } from '../../../../modules/api/cakeutils-be/converters/cookie.converter';
import { CookieDTO } from '../../../../modules/api/cakeutils-be/dtos/cookie.dto';

@Component({
	selector: 'ddc-init-cookie-choice',
	templateUrl: './cookie-choice.component.html',
	styleUrls: ['./cookie-choice.component.scss'],
})
export class CookieChoiceComponent extends BaseComponent {
	cookies: CookieModel[];
	lastUpdate;
	appName;
	converter: CookieConverter;

	// sub
	subList: Subscription;
	subRefuse: Subscription;
	subAccept: Subscription;
	subAcceptAll: Subscription;

	private _operation: EnumCookieOperation;
	@Input() set operation(val: EnumCookieOperation) {
		this._operation = val;
		this.evalOperation();
	}
	get operation(): EnumCookieOperation {
		return this._operation;
	}

	@Input() flgRemote: boolean = true;

	@Output() operationEmit: EventEmitter<EnumCookieOperation> = new EventEmitter<
		EnumCookieOperation
	>();

	@Output() linkEmit: EventEmitter<EnumCookieNavigation> = new EventEmitter<EnumCookieNavigation>();

	isNecessary = true;
	listNecessary = [];
	isPreference = false;
	listPreference = [];
	isStatistic = false;
	listStatistic = [];
	isMarketing = false;
	listMarketing = [];
	isNotClassified = false;
	listNotClassified = [];

	// services
	applicationStorage: ApplicationStorageService;
	router: Router;
	cookiemanager: CookiemanagerService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		router: Router,
		cookiemanager: CookiemanagerService,
	) {
		super(applicationLogger);
		this.converter = new CookieConverter();
		this.cookies = this.converter.convertToModelList(cookies as CookieDTO[]);
		this.lastUpdate = cookieInfo.lastUpdate;
		this.appName = environment.appName;
		this.evalStatus();
		this.applicationStorage = applicationStorage;
		this.router = router;
		this.cookiemanager = cookiemanager;
	}

	ngOnInitForChildren() {
		if (this.flgRemote) {
			this.subList = this.cookiemanager.cookies().subscribe((res) => {
				this.cookies = res;
				this.filterList();
			});
		} else {
			this.filterList();
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subList) {
			this.subList.unsubscribe();
		}
		if (this.subRefuse) {
			this.subRefuse.unsubscribe();
		}
		if (this.subAccept) {
			this.subAccept.unsubscribe();
		}
		if (this.subAcceptAll) {
			this.subAcceptAll.unsubscribe();
		}
	}
	getClassName(): string {
		return 'CookieChoiceComponent';
	}

	private filterList() {
		if (this.cookies && this.cookies.length) {
			this.listNecessary = this.cookies.filter((el) => el.type === EnumCookieType.NECESSARY);
			this.listPreference = this.cookies.filter((el) => el.type === EnumCookieType.PREFERENCE);
			this.listStatistic = this.cookies.filter((el) => el.type === EnumCookieType.STATISTIC);
			this.listMarketing = this.cookies.filter((el) => el.type === EnumCookieType.MARKETING);
			this.listNotClassified = this.cookies.filter(
				(el) => el.type === EnumCookieType.NOT_CLASSIFIED,
			);
		}
	}

	private evalStatus() {
		this.isPreference = CookieUtils.check(EnumCookieType.PREFERENCE);
		this.isStatistic = CookieUtils.check(EnumCookieType.STATISTIC);
		this.isMarketing = CookieUtils.check(EnumCookieType.MARKETING);
		this.isNotClassified = CookieUtils.check(EnumCookieType.NOT_CLASSIFIED);
	}

	private evalOperation() {
		switch (this.operation) {
			case EnumCookieOperation.REFUSAL:
				this.refuse();
				break;
			case EnumCookieOperation.ACCEPT:
				this.accept();
				break;
			case EnumCookieOperation.ACCEPT_ALL:
				this.acceptAll();
				break;
			default:
				break;
		}
	}

	private closeBanner() {
		const storageVariable: string = this.applicationStorage.bannerStatus.get();
		if (!storageVariable) {
			const cookieId = this.applicationStorage.get('cookieId').get();
			this.applicationStorage.bannerStatus.set(cookieId);
		}
	}

	// operations
	refuse() {
		CookieUtils.set(EnumCookieType.PREFERENCE, false);
		CookieUtils.set(EnumCookieType.STATISTIC, false);
		CookieUtils.set(EnumCookieType.MARKETING, false);
		CookieUtils.set(EnumCookieType.NOT_CLASSIFIED, false);
		this.evalStatus();
		this.operationEmit.emit(EnumCookieOperation.REFUSAL);
		this.closeBanner();
		if (this.flgRemote) {
			this.subRefuse = this.cookiemanager.update(false, false, false, false, true).subscribe();
		}
	}

	accept() {
		CookieUtils.set(EnumCookieType.PREFERENCE, this.isPreference);
		CookieUtils.set(EnumCookieType.STATISTIC, this.isStatistic);
		CookieUtils.set(EnumCookieType.MARKETING, this.isMarketing);
		CookieUtils.set(EnumCookieType.NOT_CLASSIFIED, this.isNotClassified);
		this.operationEmit.emit(EnumCookieOperation.ACCEPT);
		this.closeBanner();
		if (this.flgRemote) {
			this.subAccept = this.cookiemanager
				.update(this.isPreference, this.isStatistic, this.isMarketing, this.isNotClassified, true)
				.subscribe();
		}
	}

	acceptAll() {
		CookieUtils.set(EnumCookieType.PREFERENCE, true);
		CookieUtils.set(EnumCookieType.STATISTIC, true);
		CookieUtils.set(EnumCookieType.MARKETING, true);
		CookieUtils.set(EnumCookieType.NOT_CLASSIFIED, true);
		this.evalStatus();
		this.operationEmit.emit(EnumCookieOperation.ACCEPT_ALL);
		this.closeBanner();
		if (this.flgRemote) {
			this.subAcceptAll = this.cookiemanager.update(true, true, true, true, true).subscribe();
		}
	}

	// LINK

	goToPageCookie() {
		this.linkEmit.emit(EnumCookieNavigation.COOKIE_CHOICE);
		this.router.navigate(['commons', 'cookies']);
	}
	goToPrivacyPolicy() {
		this.linkEmit.emit(EnumCookieNavigation.PRIVACY_POLICY);
		const fileEmbed = this.applicationStorage.privacyPolicyResource.getObj() as FileEmbedModel;
		fileEmbed.back = this.router.url;
		this.applicationStorage.fileEmbed.setObj(fileEmbed);
		this.router.navigate(['commons', 'file', 1]);
	}
	goToCookiePolicy() {
		this.linkEmit.emit(EnumCookieNavigation.COOKIE_POLICY);
		const fileEmbed = this.applicationStorage.cookiePolicyResource.getObj() as FileEmbedModel;
		fileEmbed.back = this.router.url;
		this.applicationStorage.fileEmbed.setObj(fileEmbed);
		this.router.navigate(['commons', 'file', 1]);
	}
}
