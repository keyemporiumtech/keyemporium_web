import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateModel } from '@ddc/kit';
import { DdcValidationDirective } from './ddc-validation.directive';

@Directive({
	selector: '[ddcDateValidation]',
})
export class DdcDateValidationDirective extends DdcValidationDirective {
	/* eslint-disable @angular-eslint/no-input-rename */
	@Input('timezoneName') timezoneName: string;
	@Input('isTime') isTime: boolean;

	private destroy$ = new Subject();
	private subChange: Subscription;
	constructor(el: ElementRef, translator: TranslateService) {
		super(el, translator);
	}

	updateValue(value: any | Date | string | number | DateModel) {
		if (value) {
			let date: DateModel;
			if (value instanceof DateModel) {
				date = value;
			} else {
				date = new DateModel(value);
			}
			this.setValue(date);
		}
	}
	setValue(value: DateModel) {
		const val: string = this.isTime
			? value.toString('YYYY-MM-DDTHH:mm:ss', this.timezoneName)
			: value.toString('YYYY-MM-DD', this.timezoneName);

		this.formControl.setValue(val, { emitEvent: false });
	}
	@HostListener('focus') onFocus() {
		const current = this.formControl.value;
		this.updateValue(current);
	}
	@HostListener('blur') onBlur() {
		const current = this.formControl.value;
		this.updateValue(current);
	}

	/* eslint-disable */
	ngOnInit() {
		super.ngOnInit();
		if (!this.timezoneName) {
			this.timezoneName = localStorage.getItem('timezoneNameServer');
		}
	}
	ngAfterViewInit() {
		super.ngAfterViewInit();
		this.subChange = this.formControl.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe(this.updateValue.bind(this));
	}
	ngOnDestroy() {
		super.ngOnDestroy();
		if (this.subChange) {
			this.subChange.unsubscribe();
		}
		this.destroy$.next();
		this.destroy$.complete();
	}
}
