import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationLoggerService, BaseComponent } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../../../modules/authentication/services/application.service';

@Component({
	selector: 'key-test-auth2fa',
	templateUrl: './test-auth2fa.component.html',
	styleUrls: ['./test-auth2fa.component.scss'],
})
export class TestAuth2faComponent extends BaseComponent {
	applicationName: string;
	userName: string;
	token: string;

	subGenerate: Subscription;
	constructor(
		applicationLogger: ApplicationLoggerService,
		private router: Router,
		private applicationService: ApplicationService,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TestAuth2faComponent';
	}

	generaAuth2fa(cod: string) {
		switch (cod) {
			case 'DDC':
				this.applicationName = 'DandyCorporation';
				this.userName = 'giuseppesassone00@gmail.com';
				break;
		}
		this.subGenerate = this.applicationService
			.generate(this.applicationName, this.userName)
			.subscribe((res) => {
				this.token = res;
			});
	}

	testAuth2fa() {
		this.router.navigate(['keys', 'auth2fa'], {
			queryParams: {
				p1: btoa(this.token),
				p2: btoa(this.applicationName + '.' + btoa(this.userName)),
			},
		});
	}
}
