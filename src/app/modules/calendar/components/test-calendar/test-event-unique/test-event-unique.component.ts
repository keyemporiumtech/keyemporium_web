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
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { map } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { EventModel } from '../../../models/event.model';
import { ActivityService } from '../../../../authentication/services/activity.service';

@Component({
	selector: 'wiki-test-event-unique',
	templateUrl: './test-event-unique.component.html',
	styleUrls: ['./test-event-unique.component.scss'],
})
export class TestEventUniqueComponent extends BaseFormComponent {
	@Input() idIn: string;
	// fields
	FLD_cod: FormFieldModel;
	FLD_title: FormFieldModel;
	FLD_description: FormFieldModel;
	FLD_dtainit: FormFieldModel;
	FLD_dtaend: FormFieldModel;
	FLD_tpevent: FormFieldModel;
	FLD_tpcat: FormFieldModel;
	// controlli
	modelToSave: EventModel;

	// tipologiche
	tpevents: OptionListModel[];
	tpcats: OptionListModel[];
	subTpevent: Subscription;
	subTpcat: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private eventService: EventService,
		private activityService: ActivityService,
	) {
		super(applicationLogger, fb);
		this.initFields();
		// tipologiche
		this.tpevents = [];
		this.tpcats = [];
	}

	getForm(): FormGroup {
		return this.fb.group({
			cod: new MagicValidatorUtil((this.validationMessages.cod = []), undefined).required().build(),
			title: new MagicValidatorUtil((this.validationMessages.title = []), undefined).build(),
			description: new MagicValidatorUtil(
				(this.validationMessages.description = []),
				undefined,
			).build(),
			dtainit: new MagicValidatorUtil((this.validationMessages.dtainit = []), undefined).build(),
			dtaend: new MagicValidatorUtil((this.validationMessages.dtaend = []), undefined).build(),
			tpevent: new MagicValidatorUtil((this.validationMessages.tpevent = []), undefined)
				.required()
				.build(),
			tpcat: new MagicValidatorUtil((this.validationMessages.tpcat = []), undefined)
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

		this.subTpevent = this.eventService.tpevent(undefined, undefined).subscribe((list) => {
			list.forEach((element) => {
				this.tpevents.push(new OptionListModel(element.id, element.title, element));
			});
		});

		this.subTpcat = this.activityService.tpcat(undefined, undefined).subscribe((list) => {
			list.forEach((element) => {
				this.tpcats.push(new OptionListModel(element.id, element.title, element));
			});
		});
	}
	setLoaderAsync(): Observable<boolean> {
		return this.activityService.tpcat(undefined, undefined).pipe(
			map((list) => {
				list.forEach((element) => {
					this.tpcats.push(new OptionListModel(element.id, element.title, element));
				});
				return true;
			}),
		);
	}
	extractData() {
		const values = this.form.getRawValue();
		const model: EventModel = new EventModel();
		model.cod = values.cod;
		model.title = values.title;
		model.description = values.description;
		model.dtainit = values.dtainit;
		model.dtaend = values.dtaend;
		model.tpevent = FormUtils.getOptionPayloadByKey(this.tpevents, values.tpevent);
		model.tpcat = FormUtils.getOptionPayloadByKey(this.tpcats, values.tpcat);
		return model;
	}
	setModel(): Observable<EventModel> {
		if (this.idIn) {
			const conditions: RequestConditionInterface = {
				belongs: undefined,
				virtualfields: undefined,
				flags: undefined,
				properties: undefined,
			};
			return this.eventService.unique(this.idIn, undefined, undefined, conditions);
		}
		return of(this.model);
	}
	fillForm(form: FormGroup, model: EventModel) {
		form.get('cod').setValue(model.cod);
		form.get('title').setValue(model.title);
		form.get('description').setValue(model.description);
		form.get('dtainit').setValue(model.dtainit);
		form.get('dtaend').setValue(model.dtaend);
		form.get('tpevent').setValue(model.tpevent ? model.tpevent.id : undefined);
		form.get('tpcat').setValue(model.tpcat ? model.tpcat.id : undefined);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: EventModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'id';
	}
	saveModel(model: any): Observable<EventModel> {
		return of(model);
	}
	updateModel(model: any): Observable<EventModel> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {
			this.modelToSave = undefined;
		};
		const funOk = (res: EventModel) => {
			this.modelToSave = res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: any) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subTpevent) {
			this.subTpevent.unsubscribe();
		}
		if (this.subTpcat) {
			this.subTpcat.unsubscribe();
		}
	}
	getClassName(): string {
		return 'TestEventUniqueComponent';
	}

	// COMPONENTE
	initFields() {
		this.FLD_cod = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('cod') as FormControl,
			'Codice',
		)
			.validation(this.validationMessages.cod)
			.onInit();

		this.FLD_title = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('title') as FormControl,
			'Title',
		)
			.validation(this.validationMessages.title)
			.onInit();

		this.FLD_description = new FormFieldModel(
			EnumFormType.TEXTAREA,
			this.form.get('description') as FormControl,
			'Descrizione',
		)
			.validation(this.validationMessages.description)
			.onInit();

		this.FLD_dtainit = new FormFieldModel(
			EnumFormType.DATE,
			this.form.get('dtainit') as FormControl,
			'Data inizio',
		)
			.validation(this.validationMessages.dtainit)
			.onInit();

		this.FLD_dtaend = new FormFieldModel(
			EnumFormType.DATE,
			this.form.get('dtaend') as FormControl,
			'Data fine',
		)
			.validation(this.validationMessages.dtaend)
			.onInit();

		this.FLD_tpevent = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('tpevent') as FormControl,
			'Tipo di evento',
		)
			.validation(this.validationMessages.tpevent)
			.onInit();

		this.FLD_tpcat = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('tpcat') as FormControl,
			'Tipo di categoria',
		)
			.validation(this.validationMessages.tpcat)
			.onInit();
	}
}
