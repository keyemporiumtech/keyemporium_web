import { Component } from '@angular/core';
import { MailModel } from '../../models/mail.model';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-communication',
	templateUrl: './test-communication.component.html',
	styleUrls: ['./test-communication.component.scss'],
})
export class TestCommunicationComponent extends BaseModuleWikiPage {
	idMail: string;
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}

	setDetailMail(mail?: MailModel) {
		this.idMail = mail ? mail.id : undefined;
		this.set('MAIL-UNIQUE');
	}
}
