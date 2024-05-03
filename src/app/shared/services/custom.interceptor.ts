import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationStorageService } from '@ddc/kit';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
	constructor(private applicationStorage: ApplicationStorageService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			withCredentials: true,
		});

		// request = this.manageSID(request);
		return next.handle(request);
	}

	manageSID(request: HttpRequest<any>) {
		const appSID: string = this.applicationStorage.applicationSID.get();
		let newHeaders = request.headers;
		if (appSID) {
			newHeaders = newHeaders.set('SID', appSID);
			// newHeaders = newHeaders.set('Cookie', 'CAKEPHP=' + appSID);
		}
		return request.clone({
			headers: newHeaders,
			// withCredentials: true,
		});
	}
}
