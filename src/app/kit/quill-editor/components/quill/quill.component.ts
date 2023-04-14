/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	ContentChange,
	CustomModule,
	CustomOption,
	QuillEditorComponent,
	QuillModules,
} from 'ngx-quill';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-quill',
	templateUrl: './quill.component.html',
	styleUrls: ['./quill.component.scss'],
})
export class QuillComponent extends BaseComponent {
	@Output() htmlEmit: EventEmitter<string> = new EventEmitter<string>();
	@ViewChild('editor') editor: QuillEditorComponent;
	@Input() format?: 'object' | 'html' | 'text' | 'json' = 'html';
	@Input() theme?: string = 'snow';
	@Input() modules?: QuillModules;
	@Input() debug?: 'warn' | 'log' | 'error' | false;
	@Input() readOnly?: boolean;
	@Input() placeholder?: string;
	@Input() maxLength?: number;
	@Input() minLength?: number;
	@Input() required = false;
	@Input() formats?: string[] | null;
	@Input() customToolbarPosition: 'top' | 'bottom' = 'top';
	@Input() sanitize?: boolean;
	@Input() beforeRender?: () => Promise<void>;
	@Input() styles: any = null;
	@Input() strict = true;
	@Input() scrollingContainer?: HTMLElement | string | null;
	@Input() bounds?: HTMLElement | string;
	@Input() customOptions: CustomOption[] = [];
	@Input() customModules: CustomModule[] = [];
	@Input() trackChanges?: 'user' | 'all';
	@Input() preserveWhitespace = false;
	@Input() classes?: string;
	@Input() trimOnValidation = false;
	@Input() linkPlaceholder?: string;
	@Input() compareValues = false;
	@Input() filterNull = false;
	@Input() debounceTime?: number;
	@Input() defaultEmptyValue?: any = null;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.beforeRender) {
			this.beforeRender = () => {
				return this.promiseValue(this.initValue).then(() => {
					if (this.control) {
						this.control.setValue(this.contentHTML);
					}
				});
			};
		} else {
			const promiseBR = this.beforeRender;
			const promises = [promiseBR, this.promiseValue[this.initValue]];
			this.beforeRender = () => {
				return Promise.all(promises).then(() => {
					if (this.control) {
						this.control.setValue(this.contentHTML);
					}
				});
			};
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'QuillComponent';
	}

	// personalization
	@Input() initValue: string;
	@Input() control: FormControl;
	contentHTML: string = '';
	onEditorContent(content: ContentChange) {
		this.contentHTML = content.html;
		if (this.control) {
			this.control.setValue(this.contentHTML);
		}
		this.htmlEmit.emit(this.contentHTML);
		// this.log.debug('content changed', content);
	}

	promiseValue(value: string): Promise<void> {
		this.editor.writeValue(value ? value : '');
		this.contentHTML = value ? value : '';
		return new Promise((resolve, reject) => resolve());
	}
}
