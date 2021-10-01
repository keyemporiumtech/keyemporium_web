import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationStorageService } from '@ddc/kit';
import { PayloadUserInterface } from '../../../interfaces/payload-user.interface';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../base/authentication.service';

@Component({
	selector: 'wiki-test-profiles',
	templateUrl: './test-profiles.component.html',
	styleUrls: ['./test-profiles.component.scss'],
})
export class TestProfilesComponent implements OnInit, OnDestroy {
	userLogged: PayloadUserInterface;
	permissions: string[];
	subProfile: Subscription;

	constructor(
		private applicationStorage: ApplicationStorageService,
		private authenticationService: AuthenticationService,
	) {
		this.userLogged = this.applicationStorage.userLogged.getObj();
		this.permissions = [];
	}

	ngOnInit() {
		this.subProfile = this.authenticationService.getProfile().subscribe((res) => {
			this.permissions = this.authenticationService.permissions;
		});
	}

	ngOnDestroy() {
		if (this.subProfile) {
			this.subProfile.unsubscribe();
		}
	}
}
