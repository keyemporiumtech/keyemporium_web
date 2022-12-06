import { BaseComponent } from '../base.component';
import {
	OnInit,
	OnDestroy,
	AfterViewInit,
	Input,
	Output,
	EventEmitter,
	Directive,
} from '@angular/core';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BehaviourObserverModel } from '../../config/models/behaviour-observer.model';
import { ObjectUtility } from '../../config/utility/object.utility';
import { EnumFormMode } from '../../html/enums/form-mode.enum';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseFormComponent
	extends BaseComponent
	implements OnInit, OnDestroy, AfterViewInit
{
	/**
	 * Emesso al caricamento del modello da api
	 */
	@Output() loadEmit: EventEmitter<any> = new EventEmitter<any>();
	/**
	 * Emesso al salvataggio in response 200 del modello
	 */
	@Output() saveEmit: EventEmitter<any> = new EventEmitter<any>();
	/**
	 * Emesso al posto del salvataggio
	 */
	@Output() entityEmit: EventEmitter<any> = new EventEmitter<any>();
	/**
	 * Emesso al cambio mode
	 */
	@Output() changeModeEmit: EventEmitter<EnumFormMode> = new EventEmitter<EnumFormMode>();
	private _fb: FormBuilder;
	private _model: any;
	@Input() set model(value: any) {
		if (value) {
			this.subLoader = this.setLoaderAsync().subscribe((data) => {
				if (data) {
					this.idModel = ObjectUtility.resolvePropertyModel(this.getModelFieldForId(), value);
					this.fillForm(this.form, value);
					this.setModelBehaviour().actionResponse(value);
					this.afterModel(value);
					this._model = value;
				}
			});
		}
	}
	get model(): any {
		return this._model;
	}
	// filled by abstracts
	form: FormGroup;
	validationMessages: any;
	// used
	submitted: boolean;
	formMode = EnumFormMode;
	/*
	private _idModel: any;
	@Input() set idModel(val: any) {
		this._idModel = val;
	}
	get idModel(): any {
		return this._idModel;
	}
	*/
	@Input() idModel: any;
	@Input() readonly: boolean;
	@Input() mode: EnumFormMode;
	@Input() notSave: boolean;
	@Input() notEdit: boolean;
	// subscription
	private subLoader: Subscription;
	private subModel: Subscription;
	private subSave: Subscription;

	constructor(applicationLogger: ApplicationLoggerService, fb: FormBuilder) {
		super(applicationLogger);
		this.fb = fb;
		this.validationMessages = this.getValidationMessages();
		this.form = this.getForm() || this.fb.group({});
	}

	ngOnInit() {
		this.setValueChanges();
		if (this.readonly) {
			this.disable();
		}
		this.setLoader();
		if (!this.model) {
			this.subLoader = this.setLoaderAsync().subscribe((data) => {
				if (data) {
					this.loadModel();
				}
				super.ngOnInit();
			});
		} else {
			super.ngOnInit();
		}
	}

	private loadModel() {
		if (!this.model) {
			this.startLoading();
			this.setModelBehaviour().actionPre();
			this.subModel = this.setModel().subscribe(
				(res) => {
					this.setModelBehaviour().actionResponse(res);
					if (res) {
						this._model = res;
						this.idModel = ObjectUtility.resolvePropertyModel(
							this.getModelFieldForId(),
							this.model,
						);
						this.fillForm(this.form, this.model);
					} else {
						this._model = {};
					}
					this.afterModel(res);
					this.loadEmit.emit(this.idModel);
					this.stopLoading();
				},
				(err) => {
					this.setModelBehaviour().actionError(err);
					this.stopLoading();
				},
			);
		}
	}

	reloadModel() {
		this.startLoading();
		this.setModelBehaviour().actionPre();
		this.subModel = this.setModel().subscribe(
			(res) => {
				this.setModelBehaviour().actionResponse(res);
				if (res) {
					this._model = res;
					this.idModel = ObjectUtility.resolvePropertyModel(this.getModelFieldForId(), this.model);
					this.fillForm(this.form, this.model);
				} else {
					this._model = {};
				}
				this.afterModel(res);
				this.loadEmit.emit(this.idModel);
				this.stopLoading();
			},
			(err) => {
				this.setModelBehaviour().actionError(err);
				this.stopLoading();
			},
		);
	}

	enable() {
		this.form.enable();
	}
	disable() {
		this.form.disable();
	}
	reset(initReset?: () => {}) {
		this.form.reset();
		if (initReset) {
			initReset();
		}
	}
	/**
	 * Cambia la modalità (DETAIL, UPDATE o NEW) di visualizzazione del form
	 * @param mode modalità di visualizzazione
	 * @param initReset se fornita definisce un pattern di inizializzazione del form al reset (modalità NEW)
	 * @param initUpdate se fornita definisce un pattern di inizializzazione del form all'edit  (modalità UPDATE)
	 */
	changeMode(mode: EnumFormMode, initReset?: () => any, initUpdate?: () => any) {
		this.mode = mode;
		switch (mode) {
			case EnumFormMode.DETAIL:
				this.disable();
				this.readonly = true;
				break;
			case EnumFormMode.UPDATE:
				this.enable();
				this.readonly = false;
				if (initUpdate) {
					initUpdate();
				}
				break;
			case EnumFormMode.NEW:
				this.enable();
				this.reset(initReset);
				this.readonly = false;
				break;
			default:
				break;
		}
		this.changeModeEmit.emit(mode);
	}
	save() {
		this._model = this.extractData();
		if (this.mode === EnumFormMode.NEW && this.notSave) {
			this.entityEmit.emit(this.model);
		} else if (this.mode === EnumFormMode.UPDATE && this.notEdit) {
			this.entityEmit.emit(this.model);
		} else {
			this.submitted = true;
			this.startLoading();
			this.applicationLogger.logFormModelToSave(this.log, this.model);
			let observer;
			if (this.idModel) {
				observer = this.updateModel(this.model);
			} else {
				observer = this.saveModel(this.model);
			}
			this.saveModelBehaviour().actionPre();
			this.subSave = observer.subscribe(
				(res) => {
					this.saveModelBehaviour().actionResponse(res);
					this.afterSave(res);
					this.saveEmit.emit(res);
					this.stopLoading();
				},
				(err) => {
					this.saveModelBehaviour().actionError(err);
					this.stopLoading();
				},
			);
		}
	}

	/**
	 * Dopo aver gestito la validazione dei campi al submit del form (save() -> submitted=true)
	 * resetta la variabile submitted a false
	 */
	cleanSubmitValidation() {
		this.submitted = false;
	}

	ngOnDestroy() {
		if (this.subLoader) {
			this.subLoader.unsubscribe();
		}
		if (this.subModel) {
			this.subModel.unsubscribe();
		}
		if (this.subSave) {
			this.subSave.unsubscribe();
		}
		super.ngOnDestroy();
	}

	/**
	 * Costruisce un form.
	 * Eseguito nel costruttore
	 */
	abstract getForm(): FormGroup;
	/**
   * Costruisce un oggetto per i messaggi di validazione.
   * Eseguito nel costruttore
   * Esempio:
     {
			username: [
				{ type: 'required', message: 'VALIDATION.REQUIRED' },
				{ type: 'notValidEmail', message: 'VALIDATION.EMAIL' },
      ],
      password: [
        {
					type: 'minMaxLength',
					message: 'VALIDATION.MIN_MAX_LENGTH',
					params: { min: environment.passwordMinLength, max: environment.passwordMaxLength },
				},
				{ type: 'almostOneNumber', message: 'VALIDATION.ALMOST_ONE_NUMBER' },
      ]
    }
   */
	abstract getValidationMessages(): any;
	/**
	 * imposta i valuechanges dei campi del form.
	 * Eseguito in ngOnInit
	 */
	abstract setValueChanges();
	/**
	 * popola gli elementi necessari al form, come la gestione degli input.
	 * Eseguito in ngOnInit
	 */
	abstract setLoader();
	/**
	 * popola gli elementi necessari al form, come le tipologiche e carica il form dopo la risoluzione dell'observable.
	 * Eseguito in ngOnInit
	 */
	abstract setLoaderAsync(): Observable<any>;
	/**
	 * Compone l'oggetto da salvare popolato dai dati del form.
	 * Prima del salvataggio viene assegnato alla variabile model.
	 * Deve ritornare lo stesso tipo dell'oggetto model.
	 */
	abstract extractData(): any;

	// OBSERVABLE
	/**
	 * Chiamata rest che carica un modello per il form.
	 * Serve per assegnare un valore alla variabile model.
	 * Eseguito in ngOnInit
	 */
	abstract setModel(): Observable<any>;
	/**
	 * Riempie un form con un modello.
	 * Serve per popolare il form quando il modello esiste.
	 * Eseguito in [loadModel]{@link BaseFormComponent#loadModel}
	 */
	abstract fillForm(form: FormGroup, model: any);
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata setModel()
	 */
	abstract setModelBehaviour(): BehaviourObserverModel;
	/**
	 * esegue del codice dopo che è stato settato il modello con [setModel]{@link BaseFormComponent#setModel}
	 * @param res ritorno di [setModel]{@link BaseFormComponent#setModel}
	 */
	abstract afterModel(res: any);
	/**
	 * Ritorna il nome del campo che identifica l'id sull'oggetto model.
	 * Utilizzato per assegnare un valore alla variabile idModel
	 */
	abstract getModelFieldForId(): string;
	/**
	 * Chiamate rest per il salvataggio del model.
	 */
	abstract saveModel(model: any): Observable<any>;
	/**
	 * Chiamate rest per l'update del model
	 */
	abstract updateModel(model: any): Observable<any>;
	/**
	 * Ritona un BehaviourObserverModel per la definizione delle funzioni da eseguire prima e dopo la chiamata saveModel() o updateModel()
	 */
	abstract saveModelBehaviour(): BehaviourObserverModel;
	/**
	 * esegue del codice dopo che è stato salvato il modello con [saveModel]{@link BaseFormComponent#saveModel}
	 * @param res ritorno di [saveModel]{@link BaseFormComponent#saveModel}
	 */
	abstract afterSave(res: any);

	/**
	 * Getter fb
	 * @return FormBuilder
	 */
	public get fb(): FormBuilder {
		return this._fb;
	}

	/**
	 * Setter fb
	 * @param FormBuilder value
	 */
	public set fb(value: FormBuilder) {
		this._fb = value;
	}
}
