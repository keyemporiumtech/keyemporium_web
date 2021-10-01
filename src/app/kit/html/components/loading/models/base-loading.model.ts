import { Input } from '@angular/core';
import { BaseComponent } from '../../../../abstract/base.component';

export abstract class BaseLoadingModel extends BaseComponent {
	private _loadingColor: string = '#000';

	get color(): string {
		return this._loadingColor;
	}
	@Input()
	set color(val: string) {
		this._loadingColor = val;
		if (this.selectors() && this.selectors().length) {
			for (const selector of this.selectors()) {
				selector.style.setProperty('--loadingColor', this._loadingColor);
			}
		}
	}

	abstract selectors(): any[];
}
