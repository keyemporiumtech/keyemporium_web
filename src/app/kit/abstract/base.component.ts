import { AfterViewInit, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationLoggerService } from '../logger/services/application-logger.service';
import { BaseClassModel } from './base-class.model';
/**
 * Da estendere nella creazione di componenti da includere nelle pagine
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseComponent
	extends BaseClassModel
	implements OnInit, OnDestroy, AfterViewInit
{
	@Input() id: string;
	/**
	 * Usato per passare il loading dall'esterno
	 */
	@Input() set setLoading(val: boolean) {
		this.loading = val;
	}
	private _loading: boolean;
	debugMode: boolean;
	loaders: number;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.applicationLogger.paintComponent(this.log);
		this.debugMode = this.applicationLogger.environment.enable.debugMode;
		this.loaders = 0;
	}

	ngOnInit() {
		if (!this.id) {
			this.id = super.getId();
		}
		this.ngOnInitForChildren();
	}

	ngOnDestroy(): void {
		// this.log.info('destroyed');

		// delete all subscription
		for (const prop in this) {
			if (Object.prototype.hasOwnProperty.call(this, prop)) {
				const property = this[prop];
				if (property && typeof property['unsubscribe'] === 'function') {
					property['unsubscribe']();
				}
			}
		}
		this.ngOnDestroyForChildren();
	}

	ngAfterViewInit() {
		this.ngAfterViewInitForChildren();
	}

	// LOADING
	startLoading() {
		// this.loading = true;
		this.loaders++;
	}
	stopLoading() {
		// this.loading = false;
		this.loaders--;
	}

	/**
	 * Definisce le prime operazioni da eseguire in ngOnInit
	 */
	abstract ngOnInitForChildren();

	/**
	 * Definisce le prime operazioni da eseguire in ngAfterViewInit
	 */
	abstract ngAfterViewInitForChildren();

	/**
	 * Definisce le prime operazioni da eseguire in ngOnDestroy
	 */
	abstract ngOnDestroyForChildren();

	get loading(): boolean {
		return this.loaders > 0;
	}
	set loading(val: boolean) {
		this._loading = val;
	}
}
