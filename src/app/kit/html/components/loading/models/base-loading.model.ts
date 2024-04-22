import { Input, Directive } from '@angular/core';
import { BaseComponent } from '../../../../abstract/base.component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseLoadingModel extends BaseComponent {
	private _loadingColor: string = '#000';
	selectorsLoading: any[] = [];

	get color(): string {
		return this._loadingColor;
	}
	@Input()
	set color(val: string) {
		this._loadingColor = val;
		this.workSelectors();
	}

	ngAfterViewInitForChildren() {
		setTimeout(() => {
			this.setSelectors();
			this.workSelectors();
		}, 500);
	}

	private workSelectors() {
		if (this.selectorsLoading && this.selectorsLoading.length) {
			for (const selector of this.selectorsLoading) {
				selector.style.setProperty('--loadingColor', this._loadingColor);
			}
		}
	}

	abstract setSelectors(): void;
}
