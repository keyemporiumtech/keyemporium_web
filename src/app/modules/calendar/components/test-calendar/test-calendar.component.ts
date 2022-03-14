import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { EventModel } from '../../models/event.model';

@Component({
	selector: 'wiki-test-calendar',
	templateUrl: './test-calendar.component.html',
	styleUrls: ['./test-calendar.component.scss'],
})
export class TestCalendarComponent extends BaseModuleWikiPage implements OnInit {
	idEvent: string;
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}

	setDetailEvent(event?: EventModel) {
		this.idEvent = event ? event.id : undefined;
		this.set('EVENT-UNIQUE');
	}
}
