import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseFormComponent,
	BehaviourObserverModel,
	MagicValidatorUtil,
	OptionListModel,
} from '@ddc/kit';
import { Observable, of, Subscription } from 'rxjs';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { AttachmentModel } from '../../../models/attachment.model';
import { AttachmentService } from '../../../services/attachment.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { map } from 'rxjs/operators';

@Component({
	selector: 'wiki-test-attachment-unique',
	templateUrl: './test-attachment-unique.component.html',
	styleUrls: ['./test-attachment-unique.component.scss'],
})
export class TestAttachmentUniqueComponent extends BaseFormComponent {
	@Input() idIn: string;
	// fields
	FLD_url: FormFieldModel;
	FLD_path: FormFieldModel;
	FLD_name: FormFieldModel;
	FLD_cid: FormFieldModel;
	FLD_cod: FormFieldModel;
	FLD_desc: FormFieldModel;
	FLD_size: FormFieldModel;
	FLD_ext: FormFieldModel;
	FLD_mimetype: FormFieldModel;
	FLD_type: FormFieldModel;
	FLD_tpattachment: FormFieldModel;
	// controlli
	modelToSave: AttachmentModel;

	// tipologiche
	tpattachments: OptionListModel[];
	subTpattachments: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private attachmentService: AttachmentService,
	) {
		super(applicationLogger, fb);
		this.initFields();
		// tipologiche
		this.tpattachments = [];
	}

	getForm(): FormGroup {
		return this.fb.group({
			url: new MagicValidatorUtil((this.validationMessages.url = []), undefined).build(),
			path: new MagicValidatorUtil((this.validationMessages.path = []), undefined).build(),
			name: new MagicValidatorUtil((this.validationMessages.name = []), undefined)
				.required()
				.build(),
			cid: new MagicValidatorUtil((this.validationMessages.cid = []), undefined).build(),
			cod: new MagicValidatorUtil((this.validationMessages.cod = []), undefined).required().build(),
			description: new MagicValidatorUtil(
				(this.validationMessages.description = []),
				undefined,
			).build(),
			size: new MagicValidatorUtil((this.validationMessages.size = []), undefined).build(),
			ext: new MagicValidatorUtil((this.validationMessages.ext = []), undefined).build(),
			mimetype: new MagicValidatorUtil((this.validationMessages.mimetype = []), undefined).build(),
			type: new MagicValidatorUtil((this.validationMessages.type = []), undefined).build(),
			tpattachment: new MagicValidatorUtil((this.validationMessages.tpattachment = []), undefined)
				.required()
				.build(),
		});
	}
	getValidationMessages() {
		return {};
	}
	setValueChanges() {}
	setLoader() {
		this.disable();
		if (!this.idIn) {
			this.idIn = '1';
		}
		// tipologiche

		this.subTpattachments = this.attachmentService
			.tpattachment(undefined, undefined)
			.subscribe((list) => {
				list.forEach((element) => {
					this.tpattachments.push(new OptionListModel(element.id, element.title, element));
				});
			});
	}
	setLoaderAsync(): Observable<boolean> {
		return this.attachmentService.tpattachment(undefined, undefined).pipe(
			map((list) => {
				list.forEach((element) => {
					this.tpattachments.push(new OptionListModel(element.id, element.title, element));
				});
				return true;
			}),
		);
	}
	extractData() {
		const values = this.form.getRawValue();
		const model: AttachmentModel = new AttachmentModel();
		model.url = values.url;
		model.path = values.path;
		model.name = values.name;
		model.cid = values.cid;
		model.cod = values.cod;
		model.description = values.description;
		model.size = values.size;
		model.ext = values.ext;
		model.mimetype = values.mimetype;
		model.type = values.type;
		model.tpattachment = FormUtils.getOptionPayloadByKey(this.tpattachments, values.tpattachment);
		return model;
	}
	setModel(): Observable<AttachmentModel> {
		if (this.idIn) {
			const conditions: RequestConditionInterface = {
				belongs: undefined,
				virtualfields: undefined,
				flags: undefined,
				properties: undefined,
			};
			return this.attachmentService.unique(this.idIn, undefined, undefined, conditions);
		}
		return of(this.model);
	}
	fillForm(form: FormGroup, model: AttachmentModel) {
		form.get('url').setValue(model.url);
		form.get('path').setValue(model.path);
		form.get('name').setValue(model.name);
		form.get('cid').setValue(model.cid);
		form.get('cod').setValue(model.cod);
		form.get('description').setValue(model.description);
		form.get('size').setValue(model.size);
		form.get('ext').setValue(model.ext);
		form.get('mimetype').setValue(model.mimetype);
		form.get('type').setValue(model.type);
		form.get('tpattachment').setValue(model.tpattachment ? model.tpattachment.id : undefined);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: AttachmentModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'id';
	}
	saveModel(model: any): Observable<AttachmentModel> {
		return of(model);
	}
	updateModel(model: any): Observable<AttachmentModel> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {
			this.modelToSave = undefined;
		};
		const funOk = (res: AttachmentModel) => {
			this.modelToSave = res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: any) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subTpattachments) {
			this.subTpattachments.unsubscribe();
		}
	}
	getClassName(): string {
		return 'TestAttachmentUniqueComponent';
	}

	// COMPONENTE
	initFields() {
		this.FLD_url = new FormFieldModel(EnumFormType.TEXT, this.form.get('url') as FormControl, 'URL')
			.validation(this.validationMessages.url)
			.onInit();
		this.FLD_path = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('path') as FormControl,
			'Path',
		)
			.validation(this.validationMessages.url)
			.onInit();
		this.FLD_name = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('name') as FormControl,
			'Nome File',
		)
			.validation(this.validationMessages.name)
			.onInit();
		this.FLD_cid = new FormFieldModel(EnumFormType.TEXT, this.form.get('cid') as FormControl, 'CID')
			.validation(this.validationMessages.cid)
			.onInit();
		this.FLD_cod = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('cod') as FormControl,
			'Codice',
		)
			.validation(this.validationMessages.cod)
			.onInit();
		this.FLD_desc = new FormFieldModel(
			EnumFormType.TEXTAREA,
			this.form.get('description') as FormControl,
			'Descrizione',
		)
			.validation(this.validationMessages.description)
			.onInit();
		this.FLD_ext = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('ext') as FormControl,
			'Estensione File',
		)
			.validation(this.validationMessages.ext)
			.onInit();
		this.FLD_size = new FormFieldModel(
			EnumFormType.NUMBER,
			this.form.get('size') as FormControl,
			'Dimensione Bytes',
		)
			.validation(this.validationMessages.size)
			.onInit();
		this.FLD_mimetype = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('mimetype') as FormControl,
			'Mimetype',
		)
			.validation(this.validationMessages.mimetype)
			.onInit();
		this.FLD_type = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('type') as FormControl,
			'Type',
		)
			.validation(this.validationMessages.type)
			.onInit();
		this.FLD_tpattachment = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('tpattachment') as FormControl,
			'Tipo di allegato',
		)
			.validation(this.validationMessages.type)
			.onInit();
	}
}
