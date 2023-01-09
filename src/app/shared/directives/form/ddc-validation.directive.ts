import {
	AfterViewInit,
	Directive,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageValidatorInterface, StringTranslate } from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { template } from '../../../../environments/template/template';
import { FormInputValidationStyleInterface } from '../../interfaces/form/form-input-validation-style.interface';

@Directive({
	selector: '[ddcValidation]',
})
export class DdcValidationDirective implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	private _id: string;
	private _inputClassCss: string;
	// SUBSCRIPTION
	private _subValidationText: Subscription[];
	private _subStatus: Subscription;
	private _subValue: Subscription;
	// COMPONENTS
	private _span: any;
	private _div: any;
	private _divSupport: any;
	private INITIALIZED: boolean;

	/* eslint-disable @angular-eslint/no-input-rename */

	// CONTROLS INPUT
	@Input('formControl') formControl: FormControl = undefined;
	// per i tag html che non accettano l'input formControl
	private _validationControl: FormControl;
	@Input('validationControl') set validationControl(val: FormControl) {
		this._validationControl = val;
		this.formControl = val;
	}

	@Input('submitted') submitted: boolean;
	private _currentSubmitted: boolean;
	@Input('flgOnInitValidation') flgOnInitValidation: boolean; // scatta la validazione all'inizio
	@Input('flgOnSubmitValidation') flgOnSubmitValidation: boolean; // validazione al submit del form (controllo della variabile submitted)

	// MESSAGES INPUT
	supportMessages: (string | StringTranslate)[];
	errorMessages: (string | StringTranslate)[];
	styleMessages: FormInputValidationStyleInterface[];
	validMessages: (string | StringTranslate)[];
	// support
	@Input('supports') supports: (string | StringTranslate)[];
	// errors
	@Input('validations') validations: MessageValidatorInterface[];
	// style
	@Input('styles') styles: FormInputValidationStyleInterface[];
	// valid
	@Input('showValid') showValid: boolean = false;
	@Input('valids') valids: (string | StringTranslate)[];

	// STYLE INPUTS
	private _styleIcon: string;
	@Input('classValid') classValid: any = 'input-valid';
	@Input('iconValid') iconValid: any;
	@Input('classInvalid') classInvalid: any = 'input-invalid';
	@Input('iconInvalid') iconInvalid: any;
	@Input('classSupport') classSupport: any = 'input-support';
	@Input('iconSupport') iconSupport: any;
	@Input('classStyles') classStyles: any = 'input-generic';
	@Input('iconStyles') iconStyles: any;
	// constructor
	el: ElementRef;
	translator: TranslateService;
	constructor(el: ElementRef, translator: TranslateService) {
		this.el = el;
		this.translator = translator;
		this._styleIcon = template.styles.inputIcon;
		this.init();
	}

	ngOnInit() {
		// defaults
		if (!this.iconValid) {
			this.iconValid = template.icons.iconValid;
		}
		if (!this.iconInvalid) {
			this.iconInvalid = template.icons.iconInvalid;
		}
		// settaggio
		this._currentSubmitted = this.submitted;
		// istanziamento observer su control
		this._subStatus = this.formControl.statusChanges.subscribe((status) => {
			this.manage();
		});
		this._subValue = this.formControl.valueChanges.subscribe((value) => {
			this.manage();
		});
	}

	ngAfterViewInit() {
		// CREAZIONE
		const parent = this.el.nativeElement.parentNode;
		// creazione span icona
		this._span = document.createElement('span');
		this._span.classList.add('fa');
		this._span.setAttribute('style', this._styleIcon);
		parent.appendChild(this._span);
		// creazione div support
		this._divSupport = document.createElement('div');
		parent.appendChild(this._divSupport);
		// creazione div messaggi
		this._div = document.createElement('div');
		parent.appendChild(this._div);

		// SETTAGGIO INIZIALE
		this.initSupports();
		this.manage();
		this.INITIALIZED = true;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.submitted && changes.submitted.currentValue !== this._currentSubmitted) {
			this._currentSubmitted = changes.submitted.currentValue;
			// se ho resettato il submit bisogna ripristinare la condizione iniziale
			if (!this._currentSubmitted) {
				this.reset();
			}
			if (this.INITIALIZED) {
				this.manage();
			}
		}
	}

	ngOnDestroy() {
		if (this._subStatus) {
			this._subStatus.unsubscribe();
		}
		if (this._subValue) {
			this._subValue.unsubscribe();
		}
		if (this._subValidationText && this._subValidationText.length) {
			this._subValidationText.forEach((sub) => {
				if (sub) {
					sub.unsubscribe();
				}
			});
		}
	}

	// CHECKS
	private isCome(): boolean {
		return this.flgOnSubmitValidation
			? this.submitted
			: this.formControl.dirty ||
					this.formControl.touched ||
					(this.flgOnInitValidation && this.formControl.untouched);
	}

	// OPERATIONS
	init() {
		// inizializzazione proprietà
		this._id = this.el.nativeElement.id;
		this._inputClassCss = this.el.nativeElement.className;
		// inizializzo i messaggi
		this.supportMessages = [];
		this.errorMessages = [];
		this.styleMessages = [];
		this.validMessages = [];
		// inizializzo le validazioni
		this._subValidationText = [];
	}
	reset() {
		// ripristino la classe css di input, span e rimuovo il contenuto div
		this.el.nativeElement.classList.remove(this.classInvalid);
		this.el.nativeElement.classList.remove(this.classValid);
		this.el.nativeElement.classList.remove(this.classStyles);
		if (this.styles && this.styles.length) {
			this.styles.forEach((msg) => {
				if (msg.class) {
					this.el.nativeElement.classList.remove(msg.class);
				}
			});
		}
		this.el.nativeElement.style.removeProperty('border-color');
		if (this._span) {
			this._span.className = '';
			this._span.style.removeProperty('color');
		}
		if (this._div) {
			this._div.innerHTML = '';
		}
		// svuoto i messaggi
		this.errorMessages.length = 0;
		this.styleMessages.length = 0;
		this.validMessages.length = 0;
		// svuoto gli observable di traduzione
		this._subValidationText.length = 0;
	}

	manage() {
		if (this.isCome()) {
			this.reset();
			this.initErrors();
			this.initStyles();
			this.initValids();
			this.evalMessages();
			this.evalInputStyles();
		}
	}

	// INIT MESSAGES
	private initSupports() {
		this.supportMessages.length = 0;
		this._divSupport.innerHTML = '';
		if (this.supports && this.supports.length) {
			this.supportMessages = this.supports;
		}
		if (this.supportMessages && this.supportMessages.length) {
			this.supportMessages.forEach((msg) => {
				this.setMessage(msg, this.classSupport, undefined, true);
			});
		}
	}

	private initErrors() {
		if (this.validations && this.validations.length) {
			this.validations.forEach((validation) => {
				if (this.formControl.hasError(validation.type)) {
					this.errorMessages.push(new StringTranslate(validation.message, validation.params));
				}
			});
		}
	}

	private initStyles() {
		if (this.styles && this.styles.length) {
			this.styles.forEach((style) => {
				if (style.condition(this.formControl)) {
					this.styleMessages.push(style);
				}
			});
		}
	}

	private initValids() {
		if (this.formControl.valid && this.valids && this.valids.length) {
			this.validMessages = this.valids;
		}
	}

	// EVALUATIONS
	evalMessages() {
		if (this.errorMessages && this.errorMessages.length) {
			this.errorMessages.forEach((msg) => {
				this.setMessage(msg, this.classInvalid);
			});
		} else if (this.validMessages && this.validMessages.length) {
			this.validMessages.forEach((msg) => {
				this.setMessage(msg, this.classValid);
			});
		}
		if (this.styleMessages && this.styleMessages.length) {
			this.styleMessages.forEach((msg) => {
				this.setMessage(
					msg.message(this.formControl),
					msg.class ? msg.class : this.classStyles,
					msg.color,
				);
			});
		}
	}

	evalInputStyles() {
		if (this.errorMessages && this.errorMessages.length) {
			this.setInputStyle(this.classInvalid, this.iconInvalid);
		} else if (this.styleMessages && this.styleMessages.length) {
			const el = this.styleMessages[this.styleMessages.length - 1];
			this.setInputStyle(
				el.class ? el.class : this.classStyles,
				el.icon ? el.icon : this.iconStyles,
				el.color,
			);
		} else if (
			this.formControl.valid &&
			(this.showValid || (this.validMessages && this.validMessages.length))
		) {
			this.setInputStyle(this.classValid, this.iconValid);
		} else if (this.supportMessages && this.supportMessages.length) {
			this.setInputStyle(this.classSupport, this.iconSupport);
		}
	}

	// PRINT
	setMessage(
		message: string | StringTranslate,
		classCss: string,
		colorCss?: string,
		support?: boolean,
	) {
		let $obs;
		if (message instanceof StringTranslate) {
			$obs = this.translator.get(message.key, message.params);
		} else if (typeof message === 'string') {
			$obs = this.translator.get(message);
		}
		if ($obs) {
			this._subValidationText.push(
				$obs.subscribe((res: string) => {
					const parent = !support ? this._div : this._divSupport;
					const div = document.createElement('div');
					div.className = classCss + '-message';
					if (colorCss) {
						div.style.color = colorCss;
					}
					div.innerHTML = res;
					parent.appendChild(div);
				}),
			);
		}
	}

	setInputStyle(classCss: string, icon?: string, colorCss?: string) {
		this.el.nativeElement.classList.add(classCss);
		if (colorCss) {
			this.el.nativeElement.style['border-color'] = colorCss;
		}
		this._span.className = classCss + '-icon';
		if (icon) {
			this._span.className += ' ' + icon;
			if (colorCss) {
				this._span.style.color = colorCss;
			}
		}
	}
}
