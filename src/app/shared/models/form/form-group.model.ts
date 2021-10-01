import { BootstrapUtils } from '../../utils/bootstrap-utils';
import { BootstrapUtilModel } from '../utils/bootstrap-util.model';
import { FormFieldPageModel } from './form-field-page.model';
import { FormFieldModel } from './form-field.model';

export class FormGroupModel extends BootstrapUtilModel {
	name: string;
	isRow?: boolean;
	fields?: FormFieldModel[];
	fieldsPage?: FormFieldPageModel[];

	constructor() {
		super();
		this.fields = [];
		this.fieldsPage = [];
	}

	get sizeCol(): string {
		if (!this.size) {
			return ' col-12';
		}
		return BootstrapUtils.getSize(this.size, 'col-');
	}

	/**
	 * Costruire un singolo FormGroupModel a partire da un FormFieldPageModel
	 * @param fieldPage FormFieldPageModel
	 * @param col se passato il campo del gruppo assume quella size
	 */
	single(fieldPage: FormFieldPageModel, col?: string) {
		this.size = col;
		this.fieldsPage.push(fieldPage);
		this.fields.push(fieldPage.field);
		return this;
	}

	/**
	 * Construisce un FormGroupModel con più FormFieldPageModel contenuti
	 * @param fieldsPage FormFieldPageModel[]
	 * @param col se passato ogni campo del gruppo assume quella size
	 */
	multiple(fieldsPage: FormFieldPageModel[], col?: string) {
		if (this.fieldsPage.length) {
			this.fieldsPage.concat(fieldsPage);
		} else {
			this.fieldsPage = fieldsPage;
		}
		this.isRow = true;
		this.size = col;
		fieldsPage.forEach((el) => {
			this.fields.push(el.field);
		});
		return this;
	}

	singleField(field: FormFieldModel, col?: string) {
		this.size = col;
		this.fields.push(field);
		return this;
	}

	multipleField(fields: FormFieldModel[], col?: string) {
		this.isRow = true;
		this.size = col;
		if (this.fields.length) {
			this.fields.concat(fields);
		} else {
			this.fields = fields;
		}
		return this;
	}

	hasRow(): boolean {
		return this.fields.find((el) => (el.sizeGroup ? true : false)) ? true : false;
	}
}
