import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationLoggerService, BehaviourObserverModel } from '@ddc/kit';
import { Observable } from 'rxjs';
import { PaginatorModel } from '@ddc/rest';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { BaseApiSearchComponent } from '../../../../api/base/components/base-api-search.component';
import { EnumDBLike } from '../../../../api/cakeutils/enums/db-like.enum';
import { DbFilterInterface } from '../../../../api/cakeutils/interfaces/db-filter.interface';
import { MimetypeModel } from '../../../models/mimetype.model';
import { MimetypeService } from '../../../services/mimetype.service';
import { RequestPaginatorInterface } from '../../../../api/cakeutils/interfaces/request-paginator.interface';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { ApiQueryUtility } from '../../../../api/cakeutils/utility/api-query.utility';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { ColTableModel } from '../../../../../shared/models/pagination/col-table.model';
import { component } from '../../../../../../environments/template/component';

@Component({
	selector: 'wiki-test-mimetype-paginate',
	templateUrl: './test-mimetype-paginate.component.html',
	styleUrls: ['./test-mimetype-paginate.component.scss'],
})
export class TestMimetypePaginateComponent extends BaseApiSearchComponent<MimetypeModel> {
	@Output() emitSelected: EventEmitter<MimetypeModel> = new EventEmitter<MimetypeModel>();

	groups: FormGroupModel[];
	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private mimetypeService: MimetypeService,
	) {
		super(applicationLogger);
		this.rowsForPage = component.pagination.numRows;
	}

	getFiltersByForm(form: FormGroup): DbFilterInterface[] {
		const formRaw = form.getRawValue();
		const filters: DbFilterInterface[] = [];
		if (formRaw.ext) {
			filters.push({
				type: 0,
				operator: null,
				key: 'ext',
				value: formRaw.ext,
				sign: null,
				like: null,
				between: [],
				children: [],
			});
		}
		if (formRaw.value) {
			filters.push({
				type: 0,
				operator: null,
				key: 'value',
				value: formRaw.value,
				sign: null,
				like: EnumDBLike.R,
				between: [],
				children: [],
			});
		}
		if (formRaw.type) {
			filters.push({
				type: 0,
				operator: null,
				key: 'type',
				value: formRaw.type,
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
			ext: [undefined, []],
			value: [undefined, []],
			type: [undefined, []],
		});
	}
	getDefaultFilter(): any[] {
		return undefined;
	}
	getDefaultOrder(): any[] {
		return [{ key: 'ext', value: 'asc' }];
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
			belongs: undefined,
			virtualfields: undefined,
			flags: undefined,
			properties: undefined,
		};

		return this.mimetypeService.paginate(
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
		return 'TestMimetypePaginateComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('ext') as FormControl,
					'estensione',
				).colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('value') as FormControl,
					'valore',
				).colGroup('8|8|6'),
			]),
			new FormGroupModel().singleField(
				new FormFieldModel(EnumFormType.TEXT, this.formFilters.get('type') as FormControl, 'tipo'),
			),
		);
		return groups;
	}

	getColsTable(): ColTableModel[] {
		const cols: ColTableModel[] = [];
		cols.push({ label: 'Estensione', key: 'ext', fieldModel: 'ext' });
		cols.push({ label: 'Valore', key: 'value', fieldModel: 'value' });
		cols.push({ label: 'Tipo', key: 'type', fieldModel: 'type' });
		return cols;
	}

	edit(item: MimetypeModel) {
		this.emitSelected.emit(item);
	}
}
