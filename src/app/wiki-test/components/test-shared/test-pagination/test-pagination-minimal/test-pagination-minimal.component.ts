import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateModel } from '@ddc/kit';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { ColTableModel } from '../../../../../shared/models/pagination/col-table.model';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { ProvaPaginationModel } from '../models/prova-pagination.model';

@Component({
	selector: 'wiki-test-pagination-minimal',
	templateUrl: './test-pagination-minimal.component.html',
	styleUrls: ['./test-pagination-minimal.component.scss'],
})
export class TestPaginationMinimalComponent implements OnInit {
	formFilters: FormGroup;
	list: ProvaPaginationModel[];
	groups: FormGroupModel[];
	constructor(private fb: FormBuilder) {
		this.formFilters = this.fb.group({
			codice: [undefined, []],
			numero: [undefined, []],
			data: [undefined, []],
		});
		this.list = this.getList();
		this.groups = this.getGroups();
	}

	ngOnInit() {}

	reset() {
		this.list = this.getList();
	}

	search() {
		this.reset();
		if (this.formFilters) {
			const values = this.formFilters.getRawValue();
			if (values.codice) {
				this.list = this.list.filter((record) => record['codice'].startsWith(values.codice));
			}
			if (values.numero) {
				this.list = this.list.filter((record) => record['numero'] === values.numero);
			}
			if (values.data) {
				this.list = this.list.filter(
					(record) =>
						new DateModel(record['data']).toString() === new DateModel(values.data).toString(),
				);
			}
		}
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
				),
			),

			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.NUMBER,
					this.formFilters.get('numero') as FormControl,
					'Cerca per numero',
				).colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.formFilters.get('data') as FormControl,
					'Cerca per data (YYYY-MM-DD)',
				).colGroup('8|8|6'),
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

	getList(): ProvaPaginationModel[] {
		return [
			new ProvaPaginationModel('A001', 1, '2020-10-02'),
			new ProvaPaginationModel('A002', 2, '2020-11-02'),
			new ProvaPaginationModel('A003', 3, '2020-12-02'),
			new ProvaPaginationModel('B001', 4, '2020-10-12'),
			new ProvaPaginationModel('B002', 5, '2020-11-12'),
			new ProvaPaginationModel('B003', 6, '2020-12-12'),
			new ProvaPaginationModel('C001', 7, '2020-10-22'),
		];
	}

	edit(item: ProvaPaginationModel) {
		alert("hai selezionato l'item con codice " + item.codice);
	}
}
