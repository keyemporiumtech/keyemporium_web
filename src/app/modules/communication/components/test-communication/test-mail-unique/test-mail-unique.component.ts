import { Component, Input } from '@angular/core';
import {
	BaseFormComponent,
	OptionListModel,
	ApplicationLoggerService,
	MagicValidatorUtil,
	BehaviourObserverModel,
} from '@ddc/kit';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { MailModel } from '../../../models/mail.model';
import { Subscription, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MailService } from '../../../services/mail.service';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';

@Component({
	selector: 'wiki-test-mail-unique',
	templateUrl: './test-mail-unique.component.html',
	styleUrls: ['./test-mail-unique.component.scss'],
})
export class TestMailUniqueComponent extends BaseFormComponent {
	@Input() idIn: string;
	// fields
	FLD_ipname: FormFieldModel;
	FLD_subject: FormFieldModel;
	FLD_sendername: FormFieldModel;
	FLD_senderemail: FormFieldModel;
	FLD_message: FormFieldModel;
	FLD_dtasend: FormFieldModel;
	// controlli
	modelToSave: MailModel;

	// tipologiche
	tpattachments: OptionListModel[];
	subTpattachments: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private mailService: MailService,
	) {
		super(applicationLogger, fb);
		this.initFields();
		// tipologiche
		this.tpattachments = [];
	}

	getForm(): FormGroup {
		return this.fb.group({
			ipname: new MagicValidatorUtil((this.validationMessages.ipname = []), undefined).build(),
			subject: new MagicValidatorUtil((this.validationMessages.subject = []), undefined).build(),
			sendername: new MagicValidatorUtil((this.validationMessages.sendername = []), undefined)
				.required()
				.build(),
			senderemail: new MagicValidatorUtil(
				(this.validationMessages.senderemail = []),
				undefined,
			).build(),
			message: new MagicValidatorUtil((this.validationMessages.message = []), undefined)
				.required()
				.build(),
			dtasend: new MagicValidatorUtil((this.validationMessages.dtasend = []), undefined).build(),
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
	}
	setLoaderAsync(): Observable<boolean> {
		return of(true);
	}
	extractData() {
		const values = this.form.getRawValue();
		const model: MailModel = new MailModel();
		model.ipname = values.ipname;
		model.subject = values.subject;
		model.sendername = values.sendername;
		model.senderemail = values.senderemail;
		model.message = values.message;
		model.dtasend = values.dtasend;
		return model;
	}
	setModel(): Observable<MailModel> {
		if (this.idIn) {
			const conditions: RequestConditionInterface = {
				belongs: undefined,
				virtualfields: undefined,
				flags: undefined,
				properties: undefined,
			};
			return this.mailService.unique(this.idIn, conditions);
		}
		return of(this.model);
	}
	fillForm(form: FormGroup, model: MailModel) {
		form.get('ipname').setValue(model.ipname);
		form.get('subject').setValue(model.subject);
		form.get('sendername').setValue(model.sendername);
		form.get('senderemail').setValue(model.senderemail);
		form.get('message').setValue(model.message);
		form.get('dtasend').setValue(model.dtasend);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: MailModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'id';
	}
	saveModel(model: any): Observable<MailModel> {
		return of(model);
	}
	updateModel(model: any): Observable<MailModel> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {
			this.modelToSave = undefined;
		};
		const funOk = (res: MailModel) => {
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
		this.FLD_ipname = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('ipname') as FormControl,
			'IP',
		)
			.validation(this.validationMessages.ipname)
			.onInit();
		this.FLD_subject = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('subject') as FormControl,
			'Oggetto',
		)
			.validation(this.validationMessages.subject)
			.onInit();
		this.FLD_sendername = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('sendername') as FormControl,
			'Nome Mittente',
		)
			.validation(this.validationMessages.sendername)
			.onInit();
		this.FLD_senderemail = new FormFieldModel(
			EnumFormType.EMAIL,
			this.form.get('senderemail') as FormControl,
			'Email Mittente',
		)
			.validation(this.validationMessages.senderemail)
			.onInit();
		this.FLD_message = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('message') as FormControl,
			'Messaggio',
		)
			.validation(this.validationMessages.message)
			.onInit();
		this.FLD_dtasend = new FormFieldModel(
			EnumFormType.DATE,
			this.form.get('dtasend') as FormControl,
			'Data invio',
		)
			.validation(this.validationMessages.dtasend)
			.onInit();
	}
}
