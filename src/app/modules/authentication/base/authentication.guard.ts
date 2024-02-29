import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard {
	authenticationService: AuthenticationService;

	constructor(authenticationService: AuthenticationService) {
		this.authenticationService = authenticationService;
	}
	canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> {
		const permissions: string[] = snapshot.data.permissions;
		if (permissions) {
			return this.authenticationService.checkSession().pipe(
				map((res) => {
					if (res) {
						return this.authenticationService.checkPermissions(permissions);
					}
					return false;
				}),
			);
		}
		return this.authenticationService.checkSession();
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(childRoute);
	}
}
