import { DateModel, EnumSizeFormat, OptionListModel, StringTranslate } from '@ddc/kit';
import { Observable } from 'rxjs';

export interface FormFieldPropertyInterface {
	// TEXT - TEXTAREA - PASSWORD
	minLength?: number;
	maxLength?: number;
	// SELECT
	options?: OptionListModel[];
	defaultOption?: OptionListModel;
	defaultOptionText?: string;
	changeIfEnable?: boolean;
	// SELECT - FILE
	multiple?: boolean;
	// SELECT MULTIPLE
	maxSelectedView?: number;
	// RADIO - CHECKBOX
	isHorizontal?: boolean;
	// NUMBER - DECIMAL - CURRENCY - DATE
	min?: any | Date | string | number | DateModel;
	max?: any | Date | string | number | DateModel;
	// DECIMAL - CURRENCY - SEARCH
	digits?: number;
	// DECIMAL - DATE - CURRENCY
	step?: string | number;
	// PHONE
	prefixes?: OptionListModel[];
	defaultPrefixText?: string | StringTranslate;
	dropdownPrefix?: boolean;
	cssDropdownClass?: any;
	cssDropdownStyle?: any;
	cssDropdownButtonClass?: any;
	// FILE
	name?: string;
	numMaxFiles?: number;
	maxSize?: number; // MB
	maxSizeUnit?: EnumSizeFormat;
	extensions?: string;
	closeItem?: string;
	deleteItems?: string;
	// DATE
	timezoneName?: string;
	isTime?: boolean;
	// SEARCH
	textNoRecords?: string | StringTranslate;
	list?: OptionListModel[];
	search?: (term: string) => Observable<OptionListModel[]>;
	// PASSWORD
	almostOneNumber?: boolean;
	almostOneUpper?: boolean;
	almostOneLower?: boolean;
}
