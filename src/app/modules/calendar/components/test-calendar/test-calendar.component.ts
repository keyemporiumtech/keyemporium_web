import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { EventModel } from '../../models/event.model';

@Component({
	selector: 'wiki-test-calendar',
	templateUrl: './test-calendar.component.html',
	styleUrls: ['./test-calendar.component.scss'],
})
export class TestCalendarComponent extends BaseModuleWikiPage {
	idEvent: string;
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}

	setDetailEvent(event?: EventModel) {
		this.idEvent = event ? event.id : undefined;
		this.set('EVENT-UNIQUE');
	}
}
