import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InitService } from './init.service';
@Injectable()
export class InitGuard {
	initService: InitService;
	constructor(initService: InitService) {
		this.initService = initService;
	}
	canActivate(): Observable<boolean> {
		return this.initService.init();
	}

	canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate();
	}
}
