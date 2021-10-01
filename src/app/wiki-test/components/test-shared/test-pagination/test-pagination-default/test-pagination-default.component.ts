import { Component } from '@angular/core';
import { BaseSearchComponent, PaginatorModel } from '@ddc/rest';
import {
	ApplicationLoggerService,
	ArrayUtility,
	BehaviourObserverModel,
	MagicValidatorUtil,
	MathUtility,
	ObjectUtility,
} from '@ddc/kit';
import { ProvaPaginationModel } from '../models/prova-pagination.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { ColTableModel } from '../../../../../shared/models/pagination/col-table.model';

@Component({
	selector: 'wiki-test-pagination-default',
	templateUrl: './test-pagination-default.component.html',
	styleUrls: ['./test-pagination-default.component.scss'],
})
export class TestPaginationDefaultComponent extends BaseSearchComponent<ProvaPaginationModel> {
	validations: any;
	constructor(applicationLogger: ApplicationLoggerService, private fb: FormBuilder) {
		super(applicationLogger);
		this.searchOnLoad = true;
		this.rowsForPage = 2;
		this.validations = {};
	}

	getFilterForm(): FormGroup {
		return this.fb.group({
			codice: new MagicValidatorUtil((this.validations.codice = []), undefined).required().build(),
			numero: new MagicValidatorUtil((this.validations.numero = []), undefined).isInteger().build(),
			data: new MagicValidatorUtil((this.validations.data = []), undefined).isDate().build(),
		});
	}
	getDefaultFilter(): any[] {
		return [{ key: 'codice', value: 'A', like: true }];
	}
	getDefaultOrder(): any[] {
		return [
			{ key: 'codice', value: 'asc' },
			{ key: 'numero', value: 'asc' },
		];
	}
	getDefaultPaginate(rowsForPage: number): any {
		return { limit: rowsForPage, page: 1 };
	}
	getCurrentByPaginate(paginate: any): number {
		return paginate && +paginate.page ? paginate.page : 1;
	}
	getPaginate(rowsForPage: number, page: number): any {
		return { limit: rowsForPage, page: page };
	}
	getFiltersByForm(form: FormGroup): any[] {
		const formRaw = form.getRawValue();
		const filters = [];
		if (formRaw.codice) {
			filters.push({
				key: 'codice',
				value: formRaw.codice,
				like: true,
			});
		}
		if (formRaw.numero) {
			filters.push({
				key: 'numero',
				value: formRaw.numero,
				like: false,
			});
		}
		if (formRaw.data) {
			filters.push({
				key: 'data',
				value: formRaw.data,
				like: false,
			});
		}
		return filters;
	}
	fnSearch(filters: any[], orders: any[], paginate: any): Observable<PaginatorModel> {
		const paginator: PaginatorModel = new PaginatorModel();
		paginator.limit = this.rowsForPage;
		paginator.currentPage = 1;
		const list: ProvaPaginationModel[] = [
			new ProvaPaginationModel('A001', 1, '2020-10-02'),
			new ProvaPaginationModel('A002', 2, '2020-11-02'),
			new ProvaPaginationModel('A003', 3, '2020-12-02'),
			new ProvaPaginationModel('B001', 4, '2020-10-12'),
			new ProvaPaginationModel('B002', 5, '2020-11-12'),
			new ProvaPaginationModel('B003', 6, '2020-12-12'),
			new ProvaPaginationModel('C001', 7, '2020-10-22'),
		];
		let result: ProvaPaginationModel[] = list;
		if (filters && filters.length) {
			filters.forEach((el) => {
				if (el.like) {
					result = result.filter((record) => record[el.key].startsWith(el.value));
				} else {
					result = result.filter((record) => record[el.key] === el.value);
				}
			});
		}
		paginator.count = result.length;

		if (orders && this.orders.length) {
			orders.forEach((el) => {
				if (el.value === 'asc') {
					result = ArrayUtility.sortAscByField(result, el.key);
				} else if (el.value === 'desc') {
					result = ArrayUtility.sortDescByField(result, el.key);
				}
			});
		}
		if (!ObjectUtility.isEmptyObject(paginate)) {
			result = ArrayUtility.paginate(result, paginate.limit, paginate.page);
			paginator.currentPage = paginate.page;
		}

		paginator.pages = MathUtility.pages(paginator.count, paginator.limit);
		paginator.list = result;
		return of(paginator);
	}
	searchBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: PaginatorModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSearch(res: any) {}
	fnOrderRemove(index: number) {
		this.orders.splice(index, 1);
	}

	fnEvalOrderToPush(order: any, index: number): any {
		const orderArray = this.orders[index];
		return order.value !== orderArray.value ? order : orderArray;
	}

	fnIndexOrder(order: any): number {
		return this.orders.findIndex((el) => el.key === order.key);
	}
	// ovverides
	order(name: string, type?: 'asc' | 'desc') {
		const orderObj: any = { key: name, value: type ? type : 'asc' };
		super.order(orderObj);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TestPaginationComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('codice') as FormControl,
					'Cerca per codice',
				).validation(this.validations.codice),
			),

			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.NUMBER,
					this.formFilters.get('numero') as FormControl,
					'Cerca per numero',
				)
					.validation(this.validations.numero)
					.colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('data') as FormControl,
					'Cerca per data',
				)
					.validation(this.validations.data)
					.colGroup('8|8|6'),
			]),
		);
		return groups;
	}

	getColsTable(): ColTableModel[] {
		const cols: ColTableModel[] = [];
		cols.push({ label: 'Codice', key: 'codice', fieldModel: 'codice' });
		cols.push({ label: 'Numero', key: 'numero', fieldModel: 'numero' });
		cols.push({ label: 'Data', key: 'data', fieldModel: 'dataFormat' });
		return cols;
	}
}
