import {
	BaseComponent,
	ApplicationLoggerService,
	StringTranslate,
	OptionListModel,
	BehaviourObserverModel,
} from '@ddc/kit';
import { OnInit, OnDestroy, Input, Output, EventEmitter, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseReferenceComponent extends BaseComponent implements OnInit, OnDestroy {
	@Input() form: FormGroup;
	@Input() labelTitle: string | StringTranslate;
	@Input() fieldTel: string;
	@Input() fieldSocial: string;
	@Input() fieldVal: string;
	@Input() readonly: boolean;
	// modello di reference fornito in input
	_reference: any;
	get reference(): any {
		return this._reference;
	}
	@Input('reference')
	set reference(reference: any) {
		this._reference = reference;
		// if (this.loaded) {
		this.fillReference(reference);
		// }
	}
	// options
	telOptions: OptionListModel[];
	socialOptions: OptionListModel[];
	telSelected: any;
	socialSelected: any;
	// emitters
	@Output() telEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() socialEmitter: EventEmitter<any> = new EventEmitter<any>();
	@Output() valEmitter: EventEmitter<any> = new EventEmitter<any>();
	// subscriptions
	subTels: Subscription;
	subSocials: Subscription;
	subFieldTel: Subscription;
	subFieldSocial: Subscription;
	subFieldVal: Subscription;
	// used
	loaded: boolean;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.telOptions = [];
		this.socialOptions = [];
	}

	ngOnInit() {
		if (this.readonly) {
			if (this.fieldTel) {
				this.form.get(this.fieldTel).disable();
			}
			if (this.fieldSocial) {
				this.form.get(this.fieldSocial).disable();
			}
			this.form.get(this.fieldVal).disable();
		}
		if (this.fieldTel) {
			this.subFieldTel = this.form.get(this.fieldTel).valueChanges.subscribe((telSelected) => {
				this.telSelected = telSelected;
				this.fnChangeTel(telSelected);
				this.telEmitter.emit(telSelected);
			});
			this.loadTels();
		}
		if (this.fieldSocial) {
			this.subFieldSocial = this.form
				.get(this.fieldSocial)
				.valueChanges.subscribe((socialSelected) => {
					this.socialSelected = socialSelected;
					this.fnChangeSocial(socialSelected);
					this.socialEmitter.emit(socialSelected);
				});
			this.loadSocials();
		}
		this.subFieldVal = this.form.get(this.fieldVal).valueChanges.subscribe((valSelected) => {
			this.valEmitter.emit(valSelected);
		});

		if (this.reference) {
			this.manageReferenceSocial(this.reference);
			this.manageReferenceTel(this.reference);
			this.manageReferenceVal(this.reference);
		}

		super.ngOnInit();
	}

	ngOnDestroy() {
		if (this.subTels) {
			this.subTels.unsubscribe();
		}
		if (this.subSocials) {
			this.subSocials.unsubscribe();
		}
		if (this.subFieldTel) {
			this.subFieldTel.unsubscribe();
		}
		if (this.subFieldSocial) {
			this.subFieldSocial.unsubscribe();
		}
	}

	// LOADS
	loadTels() {
		this.startLoading();
		this.behaviourTels().actionPre();
		this.telOptions.length = 0;
		this.subTels = this.fnTels().subscribe(
			(tels) => {
				this.behaviourTels().actionResponse(tels);
				if (tels && tels.length) {
					for (const tel of tels) {
						this.telOptions.push(this.decodeTelToOptionList(tel));
					}
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourTels().actionError(err);
				this.stopLoading();
			},
		);
	}

	loadSocials() {
		this.startLoading();
		this.behaviourSocials().actionPre();
		this.socialOptions.length = 0;
		this.subSocials = this.fnSocials().subscribe(
			(socials) => {
				this.behaviourSocials().actionResponse(socials);
				if (socials && socials.length) {
					for (const social of socials) {
						this.socialOptions.push(this.decodeSocialToOptionList(social));
					}
				}
				this.stopLoading();
			},
			(err) => {
				this.behaviourSocials().actionError(err);
				this.stopLoading();
			},
		);
	}

	// manage edit of reference
	private manageReferenceTel(reference: any) {
		if (reference && this.fieldTel) {
			const valueForTel = this.getReferenceValueForTel(reference);
			this.form.get(this.fieldTel).setValue(valueForTel);
		}
	}

	private manageReferenceSocial(reference: any) {
		if (reference && this.fieldSocial) {
			const valueForSocial = this.getReferenceValueForSocial(reference);
			this.form.get(this.fieldSocial).setValue(valueForSocial);
		}
	}
	private manageReferenceVal(reference: any) {
		if (reference) {
			const valueForVal = this.getReferenceValueForVal(reference);
			this.form.get(this.fieldVal).setValue(valueForVal);
		}
	}

	abstract fnChangeTel(tel: any);
	abstract fnChangeSocial(social: any);

	// abstracts
	abstract fnTels(): Observable<any[]>;
	abstract behaviourTels(): BehaviourObserverModel;
	abstract decodeTelToOptionList(nation: any): OptionListModel;

	abstract fnSocials(): Observable<any[]>;
	abstract behaviourSocials(): BehaviourObserverModel;
	abstract decodeSocialToOptionList(social: any): OptionListModel;

	// gestione reference input

	abstract getReferenceValueForTel(reference: any);
	abstract getReferenceValueForSocial(reference: any);
	abstract getReferenceValueForVal(reference: any);

	// gestione export
	abstract exportReference(form: FormGroup): any;
	abstract fillReference(reference: any);
}
