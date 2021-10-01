import { Component, Output, EventEmitter } from '@angular/core';
import { BaseApiSearchComponent } from '../../../../api/base/components/base-api-search.component';
import { MailModel } from '../../../models/mail.model';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { ApplicationLoggerService, BehaviourObserverModel } from '@ddc/kit';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MailService } from '../../../services/mail.service';
import { component } from '../../../../../../environments/template/component';
import { DbFilterInterface } from '../../../../api/cakeutils/interfaces/db-filter.interface';
import { EnumDBLike } from '../../../../api/cakeutils/enums/db-like.enum';
import { Observable } from 'rxjs';
import { RequestPaginatorInterface } from '../../../../api/cakeutils/interfaces/request-paginator.interface';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { ApiQueryUtility } from '../../../../api/cakeutils/utility/api-query.utility';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { ColTableModel } from '../../../../../shared/models/pagination/col-table.model';
import { PaginatorModel } from '@ddc/rest';

@Component({
	selector: 'wiki-test-mail-paginate',
	templateUrl: './test-mail-paginate.component.html',
	styleUrls: ['./test-mail-paginate.component.scss'],
})
export class TestMailPaginateComponent extends BaseApiSearchComponent<MailModel> {
	@Output() emitSelected: EventEmitter<MailModel> = new EventEmitter<MailModel>();

	groups: FormGroupModel[];
	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private mailService: MailService,
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
				key: 'ipname',
				value: formRaw.ipname,
				sign: null,
				like: null,
				between: [],
				children: [],
			});
		}
		if (formRaw.name) {
			filters.push({
				type: 0,
				operator: null,
				key: 'subject',
				value: formRaw.subject,
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
				key: 'sendername',
				value: formRaw.sendername,
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
			ipname: [undefined, []],
			subject: [undefined, []],
			sendername: [undefined, []],
		});
	}
	getDefaultFilter(): any[] {
		return undefined;
	}
	getDefaultOrder(): any[] {
		return [{ key: 'dtasend', value: 'asc' }];
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
		return this.mailService.paginate(
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
		return 'TestMailPaginateComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('ipname') as FormControl,
					'ipname',
				).colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('subject') as FormControl,
					'oggetto con like destro',
				).colGroup('8|8|6'),
			]),
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('sendername') as FormControl,
					'mittente',
				),
			),
		);
		return groups;
	}

	getColsTable(): ColTableModel[] {
		const cols: ColTableModel[] = [];
		cols.push({ label: 'IP', key: 'ipname', fieldModel: 'ipname' });
		cols.push({ label: 'Mittente', key: 'sendername', fieldModel: 'sendername' });
		cols.push({ label: 'Oggetto', key: 'subject', fieldModel: 'subject' });
		return cols;
	}

	edit(item: MailModel) {
		this.emitSelected.emit(item);
	}
}
