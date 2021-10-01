import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { MathUtility } from '../../../config/utility/math.utility';

@Component({
	selector: 'ddc-init-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent extends BaseComponent {
	@Input() bgClass: any;
	@Input() bgClassNegative: any;
	@Input() min: number;
	@Input() max: number;
	private _value: number;
	get value(): number {
		return this._value;
	}
	@Input('value')
	set value(val: number) {
		if (this.max && this.max !== 100) {
			this.width = MathUtility.percent(val, this.max);
		} else {
			this.width = val;
		}
		this.log.debug('width setted for ' + this.id, this.width);
		// width
		if (this.min && this.min < 0) {
			this.width -= Math.abs(this.min);
			// this.max += Math.abs(this.min);
			this.widthNegative = Math.abs(this.min);
		} else {
			this.widthNegative = 0;
		}
		this._value = val;
	}
	@Input() flgText: boolean;
	// used
	private _width: number;
	private _widthNegative: number;

	/**
	 * Getter width
	 * @return {number}
	 */
	public get width(): number {
		return this._width;
	}

	/**
	 * Getter widthNegative
	 * @return {number}
	 */
	public get widthNegative(): number {
		return this._widthNegative;
	}

	/**
	 * Setter width
	 * @param {number} value
	 */
	public set width(value: number) {
		this._width = value;
	}

	/**
	 * Setter widthNegative
	 * @param {number} value
	 */
	public set widthNegative(value: number) {
		this._widthNegative = value;
	}

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.min = 0;
		this.max = 100;
		this.value = 0;
		this.flgText = true;
		this.width = 0;
		this.widthNegative = 0;
	}

	ngOnInitForChildren() {
		if (!this.bgClassNegative) {
			this.bgClassNegative = this.bgClass;
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ProgressComponent';
	}
}
