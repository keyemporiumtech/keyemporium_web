import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	FileEmbedModel,
	FileService,
	InnerStorageService,
	LocaleService,
} from '@ddc/kit';
import { BaseInfoServerService } from '@ddc/rest';

import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiInitService extends BaseInfoServerService {
	declare fileService: FileService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		localeService: LocaleService,
		fileService: FileService,
	) {
		super(applicationLogger, applicationStorage, innerStorage, localeService, fileService);
		this.fileService = fileService;
	}

	callApiCookiePolicy(api: string): Observable<FileEmbedModel> {
		return of(undefined);
	}
	callApiPrivacyPolicy(api: string): Observable<FileEmbedModel> {
		return of(undefined);
	}
	callApiTermPolicy(api: string): Observable<FileEmbedModel> {
		return of(undefined);
	}
	fnManageOtherMaps(data: any): void {}

	getClassName(): string {
		return 'ApiInitServerService';
	}
}
