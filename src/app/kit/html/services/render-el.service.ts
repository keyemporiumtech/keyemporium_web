import { Renderer2, Injectable } from '@angular/core';
import { StyleUtility } from '../utils/style.utility';
import { KeyvalueObject } from '../../config/interface/keyvalue.object';

@Injectable()
/*eslint-disable no-case-declarations*/
export class RenderElService {
	private _renderer: Renderer2;

	constructor() {}

	setRenderer(renderer: Renderer2) {
		this._renderer = renderer;
	}

	public setCSSClass(options: string | string[], renderElement: any): void {
		switch (typeof options) {
			case 'string':
				this._renderer.addClass(renderElement, <string>options);
				break;
			default:
				const listOfKlass: Array<string> = <Array<string>>options;
				listOfKlass.forEach((klass: string) => this._renderer.addClass(renderElement, klass));
		}
	}

	public removeCSSClass(options: string | string[], renderElement: any): void {
		switch (typeof options) {
			case 'string':
				this._renderer.removeClass(renderElement, <string>options);
				break;
			default:
				const listOfKlass: Array<string> = <Array<string>>options;
				listOfKlass.forEach((klass: string) => this._renderer.removeClass(renderElement, klass));
		}
	}

	public setStyle(options: string | string[] | any, renderElement: any): void {
		if (Array.isArray(options)) {
			this.renderStyleArray(options, renderElement);
		}
		switch (typeof options) {
			case 'string':
				const style = StyleUtility.extractKeyValueFromStringStyle(<string>options);
				if (style) {
					if (Array.isArray(style)) {
						this.renderStyleArray(style, renderElement);
					} else {
						this._renderer.setStyle(renderElement, style.key, style.value);
					}
				}
				break;
			default:
				this.renderStyleObject(options, renderElement);
				break;
		}
	}

	public setHTMLAttribute(attribute: string, value: any, renderElement: any): void {
		this._renderer.setAttribute(renderElement, attribute, value);
	}
	public removeHTMLAttribute(attribute: string, renderElement: any): void {
		this._renderer.removeAttribute(renderElement, attribute);
	}

	// utils
	private renderStyleArray(options: KeyvalueObject[] | string[], renderElement: any) {
		let el;
		for (let i = 0; i < options.length; i++) {
			el = options[i];
			let elKV: KeyvalueObject;
			if (typeof el === 'string') {
				elKV = StyleUtility.extractKeyValueFromSingleStringStyle(el);
			} else {
				elKV = el;
			}
			this._renderer.setStyle(renderElement, elKV.key, elKV.value);
		}
	}

	private renderStyleObject(options: any, renderElement: any) {
		const keys: Array<string> = Object.keys(options);
		keys.forEach((key) => {
			this._renderer.setStyle(renderElement, key, options[key]);
		});
	}
}
