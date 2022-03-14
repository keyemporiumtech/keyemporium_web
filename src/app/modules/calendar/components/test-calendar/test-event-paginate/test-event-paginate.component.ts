import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationLoggerService, BehaviourObserverModel } from '@ddc/kit';
import { Observable } from 'rxjs';
import { PaginatorModel } from '@ddc/rest';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { ColTableModel } from '../../../../../shared/models/pagination/col-table.model';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { BaseApiSearchComponent } from '../../../../api/base/components/base-api-search.component';
import { EnumDBLike } from '../../../../api/cakeutils/enums/db-like.enum';
import { DbFilterInterface } from '../../../../api/cakeutils/interfaces/db-filter.interface';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestPaginatorInterface } from '../../../../api/cakeutils/interfaces/request-paginator.interface';
import { ApiQueryUtility } from '../../../../api/cakeutils/utility/api-query.utility';
import { EventModel } from '../../../models/event.model';
import { EventService } from '../../../services/event.service';
import { component } from '../../../../../../environments/template/component';

@Component({
	selector: 'wiki-test-event-paginate',
	templateUrl: './test-event-paginate.component.html',
	styleUrls: ['./test-event-paginate.component.scss'],
})
export class TestEventPaginateComponent extends BaseApiSearchComponent<EventModel> {
	@Output() emitSelected: EventEmitter<EventModel> = new EventEmitter<EventModel>();

	groups: FormGroupModel[];
	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private eventService: EventService,
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
		return filters;
	}
	getFilterForm(): FormGroup {
		return this.fb.group({
			cod: [undefined, []],
			title: [undefined, []],
			description: [undefined, []],
		});
	}
	getDefaultFilter(): any[] {
		return undefined;
	}
	getDefaultOrder(): any[] {
		return [{ key: 'title', value: 'asc' }];
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
			flags: ['avoidContent'],
			properties: undefined,
		};
		return this.eventService.paginate(
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
		return 'TestEventPaginateComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('cod') as FormControl,
					'codice',
				).colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('title') as FormControl,
					'nome con like destro',
				).colGroup('8|8|6'),
			]),
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('description') as FormControl,
					'descrizione',
				),
			),
		);
		return groups;
	}

	getColsTable(): ColTableModel[] {
		const cols: ColTableModel[] = [];
		cols.push({ label: 'Codice', key: 'cod', fieldModel: 'cod' });
		cols.push({ label: 'Titolo', key: 'title', fieldModel: 'name' });
		cols.push({ label: 'Estensione', key: 'ext', fieldModel: 'ext' });
		return cols;
	}

	edit(item: EventModel) {
		this.emitSelected.emit(item);
	}
}
