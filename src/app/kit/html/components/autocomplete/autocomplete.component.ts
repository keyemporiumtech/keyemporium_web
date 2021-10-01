import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { component } from '../../../../../environments/template/component';
import { BaseAutocompleteComponent } from '../../../abstract/html/base-autocomplete.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { StringTranslate } from '../../../translation/models/string-translate.model';

@Component({
	selector: 'ddc-init-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends BaseAutocompleteComponent {
	@Input() placeholder: string | StringTranslate;
	@Input() textNotFound: string | StringTranslate;
	@Input() inputClass: any;
	@Input() inputStyle: any;
	@Input() infoClass: any;
	@Input() infoStyle: any;
	@Input() icon: any;
	@Input() iconColor: string;
	subValue: Subscription;
	// control
	form: FormGroup;

	constructor(applicationLogger: ApplicationLoggerService, private fb: FormBuilder) {
		super(applicationLogger);
		this.form = this.fb.group({
			text: [''],
		});
	}

	getTextNotFoundResults(): string | StringTranslate {
		return this.textNotFound ? this.textNotFound : 'MESSAGE.NO_RECORDS';
	}
	ngOnInitForChildren() {
		if (!this.maxDigit) {
			this.maxDigit = component.autocomplete.maxDigit;
		}
		if (!this.list) {
			this.list = [];
		}
		this.subValue = this.form
			.get('text')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((value) => {
				super.onKeyUp(value);
			});
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subValue) {
			this.subValue.unsubscribe();
		}
	}
	getClassName(): string {
		return 'AutocompleteComponent';
	}
}
