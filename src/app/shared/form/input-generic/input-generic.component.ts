import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	ApplicationLoggerService,
	DateModel,
	EnumSizeFormat,
	OptionListModel,
	StringTranslate,
} from '@ddc/kit';
import { Observable, Subscription } from 'rxjs';
import { EnumFormType } from '../../enums/form/form-type.enum';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-generic',
	templateUrl: './input-generic.component.html',
	styleUrls: ['./input-generic.component.scss'],
})
export class InputGenericComponent extends BaseInputComponent {
	// SELECT - SELECT_DIV - CHECKBOX - RADIO
	@Input() options: OptionListModel[];
	@Input() defaultOption: OptionListModel;
	@Input() defaultOptionText: string;
	@Input() multiple: boolean;
	@Input() maxSelectedView: number;
	@Input() isHorizontal: boolean;
	// NUMBER - DECIMAL - CURRENCY
	@Input() min: any | Date | string | number | DateModel; // DATE
	@Input() max: any | Date | string | number | DateModel; // DATE
	@Input() currencySymbol: string;
	@Input() step: string | number;
	@Input() digits: number;
	// DATE
	@Input() timezoneName: string;
	@Input() isTime: boolean;
	// FILE
	@Input() numMaxFiles: number;
	@Input() maxSize: number; // MB
	@Input() maxSizeUnit: EnumSizeFormat;
	@Input() extensions: string;
	// SEARCH
	@Input() textNoRecords: string | StringTranslate;
	@Input() list: OptionListModel[];
	@Input() search: (term: string) => Observable<OptionListModel[]>;
	subSearch: Subscription;
	@Output() searchEmit = new EventEmitter<string>(); // evento che scatta quando viene avviata la ricerca (emette il parametro di ricerca)
	@Output() selectEmit = new EventEmitter<OptionListModel>(); // evento che scatta al click di un item (emette l'item)
	@Output() overEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando si passa con il mouse sopra l'item (emette l'item)
	@Output() outEmit = new EventEmitter<OptionListModel>(); // evento che scatta quando il mouse lascia un item (emette l'item)
	// PHONE
	@Input() prefixes: OptionListModel[];
	@Input() defaultPrefixText: string | StringTranslate;
	@Input() dropdownPrefix: boolean;
	@Input() cssDropdownClass: any;
	@Input() cssDropdownStyle: any;
	@Input() cssDropdownButtonClass: any;
	// PASSWORD
	@Input() almostOneNumber: boolean;
	@Input() almostOneUpper: boolean;
	@Input() almostOneLower: boolean;

	EnumFormType = EnumFormType;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.step) {
			switch (this.field.type) {
				case EnumFormType.DECIMAL:
					this.step = 'any';
					break;
				case EnumFormType.DATE:
					this.step = 1;
					break;
				default:
					break;
			}
		}
		super.ngOnInitForChildren();
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
		if (this.subSearch) {
			this.subSearch.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputGenericComponent';
	}

	setAutomaticValidations() {}
	setPropertiesFromField() {}

	// SEARCH
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
}
