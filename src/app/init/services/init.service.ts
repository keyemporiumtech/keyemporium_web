import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInitService } from './api-init.service';

@Injectable()
export class InitService {
	constructor(private apiInitServer: ApiInitService) {}

	init(): Observable<boolean> {
		return this.apiInitServer.initValues();
	}
}
