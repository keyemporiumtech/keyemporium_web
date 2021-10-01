import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class EnvironmentLoaderService {
	environmentLocal: any;

	constructor() {
		// console.error('EnvironmentLoaderService: ' + Math.random());
	}

	getEnvironment() {
		return this.environmentLocal;
	}

	setEnviroment(env: any) {
		this.environmentLocal = env;
	}
}
