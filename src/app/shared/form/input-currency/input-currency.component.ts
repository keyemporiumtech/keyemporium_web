import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationLoggerService, ApplicationStorageService } from '@ddc/kit';
import { InputDecimalComponent } from '../input-decimal/input-decimal.component';

@Component({
	selector: 'ddc-init-input-currency',
	templateUrl: './input-currency.component.html',
	styleUrls: ['./input-currency.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCurrencyComponent extends InputDecimalComponent {
	@Input() currencySymbol: string;
	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.digits) {
			this.digits = 2;
		}
		super.ngOnInitForChildren();
		setTimeout(() => {
			if (!this.field.prepend || !this.field.append) {
				if (!this.field.append) {
					this.field.append = this.currencySymbol
						? this.currencySymbol
						: this.applicationStorage.currencySymbol.get();
				} else if (!this.field.prepend) {
					this.field.prepend = this.currencySymbol
						? this.currencySymbol
						: this.applicationStorage.currencySymbol.get();
				}
			}
		}, 0);
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputCurrencyComponent';
	}
}
