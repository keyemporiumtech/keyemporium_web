import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStorageService } from '@ddc/kit';
import { ExpirationInfo } from '@ddc/rest';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';
import { PayloadUserInterface } from '../../../modules/authentication/interfaces/payload-user.interface';

@Component({
	selector: 'reserve-header-reserve',
	templateUrl: './header-reserve.component.html',
	styleUrls: ['./header-reserve.component.scss'],
})
export class HeaderReserveComponent implements OnInit, OnDestroy {
	appTitle: string;
	router: Router;
	applicationStorage: ApplicationStorageService;
	user: PayloadUserInterface;
	userImage: string;
	expiration: string;

	// sub
	subLogout: Subscription;

	constructor(
		router: Router,
		applicationStorage: ApplicationStorageService,
		private authenticationService: AuthenticationService,
	) {
		this.appTitle = environment.appName;
		this.router = router;
		this.applicationStorage = applicationStorage;
		this.user = this.applicationStorage.userLogged.getObj();
		this.userImage = this.applicationStorage.userImage.get();
		// expiration
		const expirationInfo: ExpirationInfo = this.authenticationService.getExpirationInfo();
		if (
			expirationInfo &&
			expirationInfo.expireAt &&
			expirationInfo.expireAt.toString() !== '01/01/1970'
		) {
			this.expiration = expirationInfo.expireAt.toString();
		}
	}

	ngOnInit() {}
	ngOnDestroy() {
		if (this.subLogout) {
			this.subLogout.unsubscribe();
		}
	}

	home() {
		this.router.navigate(['reserve']);
	}
	logout() {
		this.subLogout = this.authenticationService.logout(this.user).subscribe((res) => {
			if (res) {
				this.router.navigate(environment.url.home);
			}
		});
	}
}
