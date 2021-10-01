import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
	ApplicationLoggerService,
	AutocompleteComponent,
	OptionListModel,
	StringTranslate,
	TranslateUtility,
} from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { template } from '../../../../environments/template/template';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-autocomplete',
	templateUrl: './input-autocomplete.component.html',
	styleUrls: ['./input-autocomplete.component.scss'],
})
export class InputAutocompleteComponent extends BaseInputComponent {
	@ViewChild('autocomplete') autocomplete: AutocompleteComponent;
	@Input() textNoRecords: string | StringTranslate;
	@Input() digits: number;
	@Input() list: OptionListModel[];
	@Output() searchEmit = new EventEmitter<string>(); // evento che scatta quando viene avviata la ricerca (emette il parametro di ricerca)
	@Output() selectEmit = new EventEmitter<OptionListModel>(); // evento che scatta al click di un item (emette l'item)
	@Output() overEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando si passa con il mouse sopra l'item (emette l'item)
	@Output() outEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando il mouse lascia un item (emette l'item)
	subStatus: Subscription;
	subValue: Subscription;
	// functions
	@Input() search: (term: string) => Observable<OptionListModel[]>;
	subSearch: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private translateService: TranslateService,
	) {
		super(applicationLogger);
		this.list = [];
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.manageInfo();
		this.manageMessages();
		this.subStatus = this.field.formControl.statusChanges
			.pipe(distinctUntilChanged())
			.subscribe((status) => {
				if (status === 'DISABLED') {
					this.autocomplete.form.get('text').disable();
				} else {
					this.autocomplete.form.get('text').enable();
				}
			});
		this.subValue = this.field.formControl.valueChanges
			.pipe(distinctUntilChanged((a, b) => a && b && (a.key === b.key || a === b)))
			.subscribe((value) => {
				let removeList: boolean;
				let optionSelected: OptionListModel;
				let valueText: string = '';
				if (typeof value === 'string') {
					optionSelected = this.list.find(
						(el) => TranslateUtility.get(el.text, this.translateService) === value,
					);
					valueText = value;
					if (!optionSelected) {
						this.quitReplace(undefined);
					}
				} else if (value instanceof OptionListModel) {
					optionSelected = value;
					removeList = true;
				}
				const valAutocomplete = optionSelected
					? TranslateUtility.get(optionSelected.text, this.translateService)
					: valueText;
				this.autocomplete.form.get('text').setValue(valAutocomplete);
				if (removeList) {
					setTimeout(() => {
						this.autocomplete.list.length = 0;
						this.autocomplete.showNoResult = false;
					}, 0);
				}
				this.manageMessages();
			});
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
		if (this.subValue) {
			this.subValue.unsubscribe();
		}
		if (this.subStatus) {
			this.subStatus.unsubscribe();
		}
		if (this.subSearch) {
			this.subSearch.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputAutocompleteComponent';
	}

	evalInputStyles() {
		super.evalInputStyles();
		if (!this.iconClass) {
			this.iconClass = template.icons.iconSearch;
		}
	}
	onSearch(term: string) {
		this.searchEmit.emit(term);

		if (this.search) {
			this.subSearch = this.search(term).subscribe((list) => {
				this.list = list;
			});
		}
	}
	onSelect(item: OptionListModel) {
		this.selectEmit.emit(item);
		this.field.formControl.setValue(item);
	}
	onOver(item: OptionListModel) {
		this.overEmit.emit(item);
	}
	onOut(item: OptionListModel) {
		this.outEmit.emit(item);
	}

	setAutomaticValidations() {}
	setPropertiesFromField() {
		this.textNoRecords = this.field.property.textNoRecords;
		this.list = this.field.property.list;
		this.search = this.field.property.search;
	}
}
