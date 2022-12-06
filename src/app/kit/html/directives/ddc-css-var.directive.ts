import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { template } from '../../../../environments/template/template';
import { KeyvalueObject } from '../../config/interface/keyvalue.object';
@Directive({
	selector: '[ddcCssVar]',
})
export class DdcCssVarDirective implements OnInit {
	/* eslint-disable @angular-eslint/no-input-rename */
	@Input('cssVars') cssVars: KeyvalueObject[] = [];

	constructor(private el: ElementRef) {}

	ngOnInit() {
		this.setup();
	}

	setup() {
		if (this.cssVars && this.cssVars.length > 0) {
			this.cssVars.forEach((element) => {
				this.el.nativeElement.style.setProperty(element.key, `var(--${element.value})`);
			});
		}
	}
}
