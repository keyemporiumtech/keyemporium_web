import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import * as _moment from 'moment-timezone';
const momentTz = _moment;
import * as _momentNS from 'moment';
import { Injectable } from '@angular/core';
const moment = _momentNS;
@Injectable({
	providedIn: 'root',
})
export class TimeService extends BaseService {
	private _timezoneClient: string;
	private _timezoneNameClient: string;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		// timezone
		this.timezoneClient = momentTz.tz(momentTz.tz.guess()).format('Z');
		this.timezoneNameClient = momentTz.tz.guess();
	}

	getClassName(): string {
		return 'TimeService';
	}

	/**
	 * Getter timezoneClient
	 * @return string
	 */
	public get timezoneClient(): string {
		return this._timezoneClient;
	}

	/**
	 * Setter timezoneClient
	 * @param string value
	 */
	public set timezoneClient(value: string) {
		this._timezoneClient = value;
	}

	/**
	 * Getter timezoneNameClient
	 * @return string
	 */
	public get timezoneNameClient(): string {
		return this._timezoneNameClient;
	}

	/**
	 * Setter timezoneNameClient
	 * @param string value
	 */
	public set timezoneNameClient(value: string) {
		this._timezoneNameClient = value;
	}
}
