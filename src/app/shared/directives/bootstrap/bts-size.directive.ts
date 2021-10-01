import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { element } from 'protractor';
import { BootstrapUtils } from '../../utils/bootstrap-utils';

@Directive({
	selector: '[ddcBtsSize]',
})
export class BtsSizeDirective implements OnInit, OnChanges {
	// tslint:disable:no-input-rename

	@Input('btsSize') btsSize: string;
	private _currentSize: string;
	@Input('btsPrefix') btsPrefix: string;
	el: ElementRef;
	constructor(el: ElementRef) {
		this.el = el;
	}

	ngOnInit() {
		this.manageSize();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.btsSize && changes.btsSize.currentValue !== this._currentSize) {
			this._currentSize = changes.btsSize.currentValue;
			this.manageSize();
		}
	}

	private manageSize() {
		if (this.btsSize) {
			const sizeClass = BootstrapUtils.getSize(this.btsSize, this.btsPrefix);
			const sizes = sizeClass.split(' ');
			if (sizes && sizes.length) {
				sizes.forEach((el) => {
					if (el && el !== '' && el !== ' ') {
						this.el.nativeElement.classList.add(el);
					}
				});
			}
		}
	}
}
