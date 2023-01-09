import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { template } from '../../../../environments/template/template';
@Directive({
	selector: '[ddcInputPassword]',
})
export class DdcInputPasswordDirective implements OnInit {
	private _shown = false;
	private _span: any;
	/* eslint-disable @angular-eslint/no-input-rename */
	@Input('styleSpan') styleSpan: any;
	@Input('cssShow') cssShow: any;
	@Input('cssHide') cssHide: any;
	@Input('textShow') textShow: string = undefined;
	@Input('textHide') textHide: string = undefined;
	@Input('titleShow') titleShow: string = undefined;
	@Input('titleHide') titleHide: string = undefined;

	constructor(private el: ElementRef) {
		this.setup();
	}

	ngOnInit() {
		if (!this.styleSpan) {
			this.styleSpan = template.styles.inputIcon;
		}
		if (!this.cssShow) {
			this.cssShow = template.icons.showField;
		}
		if (!this.cssHide) {
			this.cssHide = template.icons.hideField;
		}
		if (this.styleSpan) {
			this._span.setAttribute('style', this.styleSpan);
		}
		if (this.cssShow) {
			this._span.setAttribute('class', this.cssShow);
		}
		if (this.textShow) {
			this._span.innerHTML = this.textShow;
		}
		if (this.titleShow) {
			this._span.setAttribute('title', this.titleShow);
		}
	}

	toggle(span: HTMLElement) {
		this._shown = !this._shown;
		if (this._shown) {
			this.el.nativeElement.setAttribute('type', 'text');
			if (this.cssHide) {
				span.setAttribute('class', this.cssHide);
			}
			if (this.textHide) {
				span.innerHTML = this.textHide;
			}
			if (this.titleHide) {
				this._span.setAttribute('title', this.titleHide);
			}
		} else {
			this.el.nativeElement.setAttribute('type', 'password');
			if (this.cssShow) {
				span.setAttribute('class', this.cssShow);
			}
			if (this.textShow) {
				span.innerHTML = this.textShow;
			}
			if (this.titleShow) {
				this._span.setAttribute('title', this.titleShow);
			}
		}
	}
	setup() {
		const parent = this.el.nativeElement.parentNode;
		this._span = document.createElement('span');
		this._span.addEventListener('click', (event) => {
			this.toggle(this._span);
		});
		parent.appendChild(this._span);
	}
}
