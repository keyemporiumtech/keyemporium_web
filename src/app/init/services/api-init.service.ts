import { Injectable } from '@angular/core';
import { BaseInfoServerService } from '@ddc/rest';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	LocaleService,
	InnerStorageService,
	FileService,
	FileEmbedModel,
} from '@ddc/kit';

import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiInitService extends BaseInfoServerService {
	fileService: FileService;

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
