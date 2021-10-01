import { Component, OnDestroy, OnInit } from '@angular/core';
import { InitService } from '../../services/init.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ddc-init-load-app',
	templateUrl: './load-app.component.html',
	styleUrls: ['./load-app.component.scss'],
})
export class LoadAppComponent implements OnInit, OnDestroy {
	loading: boolean;
	subInit: Subscription;

	constructor(private initService: InitService) {}

	ngOnInit() {
		if (environment.enable.init) {
			this.loading = true;
			this.subInit = this.initService.init().subscribe(
				(res) => {
					this.loading = res ? false : true;
				},
				(err) => {
					this.loading = true;
				},
			);
		}
	}

	ngOnDestroy() {
		if (this.subInit) {
			this.subInit.unsubscribe();
		}
	}
}
