import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BootstrapUtils } from '../../utils/bootstrap-utils';

@Directive({
	selector: '[ddcBtsSize]',
})
export class BtsSizeDirective implements OnInit, OnChanges {
	/* eslint-disable @angular-eslint/no-input-rename */

	@Input('btsSize') btsSize: string;
	private _currentSize: string;
	@Input('btsPrefix') btsPrefix: string;
	el: ElementRef;

	memoToDel: string[] = [];

	constructor(el: ElementRef) {
		this.el = el;
	}

	ngOnInit() {
		this.manageSize();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.btsSize && changes.btsSize.currentValue !== this._currentSize) {
			this.memorizeToDel(this._currentSize);
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
						this.evalToDel(el);
						this.el.nativeElement.classList.add(el);
					}
				});
			}
		}
	}

	private memorizeToDel(size: string) {
		const sizeClass = BootstrapUtils.getSize(size, this.btsPrefix);
		this.memoToDel = sizeClass.split(' ');
	}

	private evalToDel(sizeClass: string) {
		if (this.memoToDel && this.memoToDel.length) {
			if (sizeClass.indexOf('xl-') !== -1) {
				this.removeSizeByPart('xl-');
			} else if (sizeClass.indexOf('lg-') !== -1) {
				this.removeSizeByPart('lg-');
			} else if (sizeClass.indexOf('md-') !== -1) {
				this.removeSizeByPart('md-');
			} else if (sizeClass.indexOf('sm-') !== -1) {
				this.removeSizeByPart('sm-');
			} else if (sizeClass.indexOf('xs-') !== -1) {
				this.removeSizeByPart('xs-');
			}
		}
	}

	private removeSizeByPart(part: string) {
		const index = this.memoToDel.findIndex((el) => el.indexOf(part) !== -1);
		if (index) {
			this.el.nativeElement.classList.remove(this.memoToDel[index]);
		}
	}
}
