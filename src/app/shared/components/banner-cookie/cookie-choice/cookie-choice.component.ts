import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CookieUtils } from '../../../utils/cookie-utils';
import { EnumCookieType } from '../../../enums/cookie/cookie-type.enum';
import { EnumCookieOperation } from '../../../enums/cookie/cookie-operation.enum';
import {
	ApplicationStorageService,
	BaseComponent,
	ApplicationLoggerService,
	FileEmbedModel,
	PreviousRouteService,
} from '@ddc/kit';
import { Router } from '@angular/router';
import { EnumCookieNavigation } from '../../../enums/cookie/cookie-navigation.enum';
import { cookies } from '../../../../../config/cookie/cookies';
import { cookieInfo } from '../../../../../config/cookie/cookie-info';
import { environment } from '../../../../../environments/environment';
import { Subscription, forkJoin } from 'rxjs';
import { CookiemanagerService } from '../../../../modules/api/cakeutils-be/services/cookiemanager.service';
import { CookieModel } from '../../../../modules/api/cakeutils-be/models/cookie.model';
import { CookieConverter } from '../../../../modules/api/cakeutils-be/converters/cookie.converter';
import { CookieDTO } from '../../../../modules/api/cakeutils-be/dtos/cookie.dto';
import { CookieStatusModel } from '../../../../modules/api/cakeutils-be/models/cookie-status.model';

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
	cookieType = EnumCookieType;

	// sub
	subCookies: Subscription;
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
	@Input() isPage: boolean = false;

	@Output() operationEmit: EventEmitter<EnumCookieOperation> =
		new EventEmitter<EnumCookieOperation>();

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
	previouseRoute: PreviousRouteService;
	cookiemanager: CookiemanagerService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		router: Router,
		previouseRoute: PreviousRouteService,
		cookiemanager: CookiemanagerService,
	) {
		super(applicationLogger);
		this.converter = new CookieConverter();
		this.cookies = this.converter.convertToModelList(cookies as CookieDTO[]);
		this.lastUpdate = cookieInfo.lastUpdate;
		this.appName = environment.appName;
		// this.evalStatus();
		this.applicationStorage = applicationStorage;
		this.router = router;
		this.previouseRoute = previouseRoute;
		this.cookiemanager = cookiemanager;
	}

	ngOnInitForChildren() {
		if (this.flgRemote) {
			this.subCookies = forkJoin(
				this.cookiemanager.cookies(),
				this.cookiemanager.status(),
			).subscribe((data) => {
				this.cookies = data[0];
				this.filterList();
				this.evalInitiStatus(data[1]);
			});
		} else {
			this.filterList();
			this.evalStatus();
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subCookies) {
			this.subCookies.unsubscribe();
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

	private evalInitiStatus(status: CookieStatusModel) {
		CookieUtils.set(EnumCookieType.NECESSARY, status.isNecessary);
		CookieUtils.set(EnumCookieType.PREFERENCE, status.isPreference);
		CookieUtils.set(EnumCookieType.STATISTIC, status.isStatistic);
		CookieUtils.set(EnumCookieType.MARKETING, status.isMarketing);
		CookieUtils.set(EnumCookieType.NOT_CLASSIFIED, status.isNotClassified);
		this.evalStatus();
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
		if (!storageVariable && this.applicationStorage.get('cookieId')) {
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
			this.subRefuse = this.cookiemanager
				.update(false, false, false, false, true)
				.subscribe((res) => {
					this.evalPage();
				});
		} else {
			this.evalPage();
		}
	}

	toggleCheck(type: EnumCookieType, val: any) {
		if (val && val.target) {
			CookieUtils.set(type, val.target.checked);
		}
	}

	accept() {
		this.evalStatus();
		this.operationEmit.emit(EnumCookieOperation.ACCEPT);
		this.closeBanner();
		if (this.flgRemote) {
			this.subAccept = this.cookiemanager
				.update(this.isPreference, this.isStatistic, this.isMarketing, this.isNotClassified, true)
				.subscribe((res) => {
					this.evalPage();
				});
		} else {
			this.evalPage();
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
			this.subAcceptAll = this.cookiemanager
				.update(true, true, true, true, true)
				.subscribe((res) => {
					this.evalPage();
				});
		} else {
			this.evalPage();
		}
	}

	private evalPage() {
		if (this.isPage) {
			this.previouseRoute.back();
		}
	}

	// LINK

	goToPageCookie() {
		this.linkEmit.emit(EnumCookieNavigation.COOKIE_CHOICE);
		this.previouseRoute.navigate(['commons', 'cookies']);
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
