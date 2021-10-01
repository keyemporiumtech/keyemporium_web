import {
	CanActivateChild,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InitService } from './init.service';
@Injectable()
export class InitGuard implements CanActivate, CanActivateChild {
	initService: InitService;
	constructor(initService: InitService) {
		this.initService = initService;
	}
	canActivate(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.initService.init();
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(childRoute, state);
	}
}
