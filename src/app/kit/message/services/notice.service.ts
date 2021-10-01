import { Injectable } from '@angular/core';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { NoticeModel } from '../models/notice.model';
import { Observable, of, interval } from 'rxjs';
import { distinctUntilChanged, throttleTime, map, flatMap } from 'rxjs/operators';

/**
 * Servizio che istanza degli observable di notifica ai quali è possibile sottoscriversi
 * utilizzando il metodo obsNotice e definendo con quale throttleTime ritornare le notifiche distinte
 * del servizio
 */
@Injectable({
	providedIn: 'root',
})
export class NoticeService extends BaseService {
	private _environment: any;
	// component
	notices: NoticeModel[] = [];

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
	}

	createNotice<M>(id: string, notice?: Observable<M>) {
		this.notices.push(new NoticeModel(id, notice));
	}
	cleanNotice(id?: string) {
		if (id) {
			const index = this.notices.findIndex((el) => el.id === id);
			if (index !== -1) {
				this.notices.splice(index, 1);
			}
		} else {
			this.notices.length = 0;
		}
	}

	obsNotice<M>(id: string, time?: number): Observable<M> {
		const index = this.notices.findIndex((el) => el.id === id);
		return index !== -1 ? this.notices[index].notice : of(undefined);
	}
	obsNoticeThrottleTime<M>(id: string, time?: number): Observable<M> {
		const index = this.notices.findIndex((el) => el.id === id);
		return index !== -1
			? this.notices[index].notice.pipe(
					distinctUntilChanged(),
					throttleTime(time ? time : 1000),
					map((res) => res),
			  )
			: of(undefined);
	}
	obsNoticeInterval<M>(id: string, time?: number): Observable<M> {
		const index = this.notices.findIndex((el) => el.id === id);
		return index !== -1
			? interval(time ? time : 10000).pipe(
					distinctUntilChanged(),
					flatMap(() => this.notices[index].notice),
			  )
			: of(undefined);
	}

	getClassName(): string {
		return 'NoticeService';
	}

	/**
	 * Getter environment
	 * @return any
	 */
	public get environment(): any {
		return this._environment;
	}

	/**
	 * Setter environment
	 * @param any value
	 */
	public set environment(value: any) {
		this._environment = value;
	}
}
