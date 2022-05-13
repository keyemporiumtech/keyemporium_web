import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationLoggerService, BaseComponent, ObjectUtility } from '@ddc/kit';
import { environment } from '../../../../environments/environment';
import { ColTableModel } from '../../models/pagination/col-table.model';
import { FormGroupModel } from '../../models/form/form-group.model';
import { template } from '../../../../environments/template/template';

@Component({
	selector: 'ddc-init-table-list',
	templateUrl: './table-list.component.html',
	styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent extends BaseComponent {
	// TABLE
	@Input() list: any[];
	private _pagesNumbers: number[];
	@Input() set pagesNumbers(val: number[]) {
		this._pagesNumbers = val;
	}
	get pagesNumbers(): number[] {
		return this._pagesNumbers;
	}

	private _current: number;
	@Input() set current(val: number) {
		this._current = val;
	}
	get current(): number {
		return this._current;
	}
	@Input() orders: any[];
	@Input() templateActionsIntest: any;
	@Input() templateActionsRow: any;

	@Output() resetEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() searchEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() orderEmit: EventEmitter<{ key; value }> = new EventEmitter<{ key; value }>();
	@Output() pageEmit: EventEmitter<number> = new EventEmitter<number>();
	// FILTERS
	@Input() flgOnInitValidation?: boolean;
	@Input() flgOnSubmitValidation?: boolean;
	@Input() submitted?: boolean;
	@Input() formFilters: FormGroup;
	@Input() groups: FormGroupModel[];
	// COLS
	@Input() colsTable: ColTableModel[];
	// ICONS
	iconReset: string;
	iconSearch: string;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.iconReset = template.icons.iconReset;
		this.iconSearch = template.icons.iconSearch;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TableListComponent';
	}

	// operations
	order(key: string, value: string) {
		this.orderEmit.emit({ key: key, value: value });
	}
	reset() {
		this.resetEmit.emit(true);
	}
	search() {
		this.searchEmit.emit(true);
	}
	page(val: number) {
		this.pageEmit.emit(val);
	}

	// utils
	resolveProperty(property: string, obj: any) {
		return ObjectUtility.resolvePropertyModel(property, obj);
	}
}
