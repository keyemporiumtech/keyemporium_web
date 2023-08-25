import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
	selector: 'wiki-test-a2fa',
	templateUrl: './test-a2fa.component.html',
	styleUrls: ['./test-a2fa.component.scss'],
})
export class TestA2FAComponent implements OnInit, OnDestroy {
	key: string;
	constructor() {
		this.key = environment.clientId;
	}

	ngOnInit() {}

	ngOnDestroy() {}
}
