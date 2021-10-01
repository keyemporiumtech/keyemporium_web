import { Component, OnInit } from '@angular/core';
import { ApplicationLoggerService } from '../../services/application-logger.service';

@Component({
	selector: 'ddc-init-logger-layout-info',
	templateUrl: './logger-layout-info.component.html',
	styleUrls: ['./logger-layout-info.component.scss'],
})
export class LoggerLayoutInfoComponent implements OnInit {
	environment: any;
	applicationName: string = '';
	colorComponent: any = {};
	colorService: any = {};
	colorRequest: string = '';
	colorResponse: string = '';
	colorConstructor: string = '';
	colorSecurity: string = '';
	colorFunctions: string = '';
	constructor(applicationLogger: ApplicationLoggerService) {
		// this.environment = environmentLoader.getEnvironment();
		this.environment = applicationLogger.environment;
		this.applicationName = this.environment.appName;
		this.colorComponent = {
			info: this.environment.logger.color.component.info,
			debug: this.environment.logger.color.component.debug,
			error: this.environment.logger.color.component.error,
		};
		this.colorService = {
			info: this.environment.logger.color.service.info,
			debug: this.environment.logger.color.service.debug,
			error: this.environment.logger.color.service.error,
		};
		this.colorConstructor = this.environment.logger.color.constructors;
		this.colorRequest = this.environment.logger.color.request;
		this.colorResponse = this.environment.logger.color.response;
		this.colorSecurity = this.environment.logger.color.security;
		this.colorFunctions = this.environment.logger.color.serviceFunctions;
	}

	ngOnInit() {}
}
