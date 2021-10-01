import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApplicationLoggerService, BehaviourObserverModel } from '@ddc/kit';
import { PaginatorModel } from '@ddc/rest';
import { BaseApiSearchComponent } from '../../../base/components/base-api-search.component';
import { TestfkModel } from '../../../cakeutils-be/models/testfk.model';
import { DbFilterInterface } from '../../../cakeutils/interfaces/db-filter.interface';
import { TestfkService } from '../../../cakeutils-be/services/testfk.service';
import { EnumDBLike } from '../../../cakeutils/enums/db-like.enum';
import { RequestPaginatorInterface } from '../../../cakeutils/interfaces/request-paginator.interface';
import { RequestConditionInterface } from '../../../cakeutils/interfaces/request-conditions.interface';
import { ApiQueryUtility } from '../../../cakeutils/utility/api-query.utility';
import { ColTableModel } from '../../../../../shared/models/pagination/col-table.model';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { component } from '../../../../../../environments/template/component';

@Component({
	selector: 'wiki-test-api-paginate',
	templateUrl: './test-api-paginate.component.html',
	styleUrls: ['./test-api-paginate.component.scss'],
})
export class TestApiPaginateComponent extends BaseApiSearchComponent<TestfkModel> {
	groups: FormGroupModel[];
	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private testfkService: TestfkService,
	) {
		super(applicationLogger);
		this.rowsForPage = component.pagination.numRows;
	}

	getFiltersByForm(form: FormGroup): DbFilterInterface[] {
		const formRaw = form.getRawValue();
		const filters: DbFilterInterface[] = [];
		if (formRaw.cod) {
			filters.push({
				type: 0,
				operator: null,
				key: 'cod',
				value: formRaw.cod,
				sign: null,
				like: null,
				between: [],
				children: [],
			});
		}
		if (formRaw.title) {
			filters.push({
				type: 0,
				operator: null,
				key: 'title',
				value: formRaw.title,
				sign: null,
				like: EnumDBLike.R,
				between: [],
				children: [],
			});
		}
		if (formRaw.description) {
			filters.push({
				type: 0,
				operator: null,
				key: 'description',
				value: formRaw.description,
				sign: null,
				like: EnumDBLike.R,
				between: [],
				children: [],
			});
		}
		if (formRaw.fkcod) {
			filters.push({
				type: 0,
				operator: null,
				key: 'test_fk.cod',
				value: formRaw.fkcod,
				sign: null,
				like: EnumDBLike.LR,
				between: [],
				children: [],
			});
		}
		if (formRaw.fktest_title) {
			filters.push({
				type: 0,
				operator: null,
				key: 'test_fk.test_title__',
				value: formRaw.fktest_title,
				sign: null,
				like: EnumDBLike.R,
				between: [],
				children: [],
			});
		}
		return filters;
	}
	getFilterForm(): FormGroup {
		return this.fb.group({
			cod: [undefined, []],
			title: [undefined, []],
			description: [undefined, []],
			result: [undefined, []],
			fkcod: [undefined, []],
			fktest_title: [undefined, []],
		});
	}
	getDefaultFilter(): any[] {
		return undefined;
	}
	getDefaultOrder(): any[] {
		return [
			{ key: 'title', value: 'asc' },
			{ key: 'test_fk.cod', value: 'asc' },
		];
	}
	getDefaultPaginate(rowsForPage: number) {
		return { limit: rowsForPage, page: 1 };
	}

	fnSearch(filters: any[], orders: any[], paginate: any): Observable<PaginatorModel> {
		const paginator: RequestPaginatorInterface = {
			filters: filters,
			orders: orders,
			paginate: paginate,
		};
		const conditions: RequestConditionInterface = {
			belongs: ['test_fk'],
			virtualfields: ['test_title'],
			flags: undefined,
			properties: undefined,
		};
		return this.testfkService.paginate(
			paginator,
			ApiQueryUtility.fnConditions(this.querySearch, conditions),
			ApiQueryUtility.fnRequestManager(this.querySearch),
			this.appendResponseStopLoading(
				this.querySearch ? this.querySearch.responseManager : undefined,
			),
		);
	}
	searchBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: PaginatorModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSearch(res: any) {}
	ngOnInitForChildren() {
		this.groups = this.getGroups();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TestApiPaginateComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('cod') as FormControl,
					'codice con like destro sinistro',
				).colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('title') as FormControl,
					'titolo con like destro',
				).colGroup('8|8|6'),
			]),
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('description') as FormControl,
					'descrizione',
				),
			),
			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('fkcod') as FormControl,
					'codice fk con like destro sinistro',
				).colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('fktest_title') as FormControl,
					'titolo fk con like destro',
				).colGroup('8|8|6'),
			]),
		);
		return groups;
	}

	getColsTable(): ColTableModel[] {
		const cols: ColTableModel[] = [];
		cols.push({ label: 'Codice', key: 'cod', fieldModel: 'cod' });
		cols.push({ label: 'Titolo', key: 'title', fieldModel: 'title' });
		cols.push({ label: 'Titolo Fk', key: 'test_title__', fieldModel: 'test_title' });
		return cols;
	}

	edit(item: TestfkModel) {
		alert("hai selezionato l'item " + item.title);
	}
}
