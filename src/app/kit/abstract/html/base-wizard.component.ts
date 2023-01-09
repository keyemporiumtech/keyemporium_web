import { BaseFormComponent } from './base-form.component';
import {
	OnInit,
	OnDestroy,
	AfterViewInit,
	Output,
	EventEmitter,
	Input,
	Directive,
} from '@angular/core';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { WizardStepModel } from '../../html/models/wizard-step.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
/**
 * Istruzioni per l'uso
 *
 * - definire una funzione getForm() per ogni step
 * - definire una funzione fillForm() per ogni step
 * - definire una funzione extractData() per ogni step
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseWizardComponent
	extends BaseFormComponent
	implements OnInit, OnDestroy, AfterViewInit
{
	@Output() nextEmit: EventEmitter<number> = new EventEmitter<number>();
	@Output() prevEmit: EventEmitter<number> = new EventEmitter<number>();
	@Input() extractDuringNavigation: boolean; // estrae i dati di un step al next o al goToStep
	@Input() skipDisabled: boolean; // salta gli step disabilitati per la validazione del form
	// filled
	steps: WizardStepModel[];
	// used
	wizard: FormArray;
	current: number;
	maxSteps: number;

	constructor(applicationLogger: ApplicationLoggerService, fb: FormBuilder) {
		super(applicationLogger, fb);
		this.current = 0;
		this.setMaxSteps();
	}

	// overrides
	getForm(): FormGroup {
		this.steps = this.getSteps();
		const form = this.fb.group({});
		form.addControl(this.id, new FormArray([]));
		this.wizard = form.get(this.id) as FormArray;
		let stepForm: FormGroup;
		for (let i = 0; i < this.steps.length; i++) {
			stepForm = this.steps[i].getForm(this.fb);
			if (this.steps[i].readonly) {
				stepForm.disable();
			}
			this.wizard.push(stepForm);
		}
		return form;
	}

	fillForm(form: FormGroup, model: any) {
		const wizard = form.get(this.id) as FormArray;
		for (let i = 0; i < this.steps.length; i++) {
			this.steps[i].fillForm(wizard.at(i) as FormGroup, model[this.steps[i].name]);
		}
	}

	extractData(): any {
		const model: any = {};
		for (let i = 0; i < this.steps.length; i++) {
			model[this.steps[i].name] = this.steps[i].extractData(this.wizard.at(i) as FormGroup);
		}
		return model;
	}

	// wizard
	private setMaxSteps() {
		this.maxSteps = 0;
		this.steps.forEach((el) => {
			if (!el.hidden) {
				this.maxSteps++;
			}
		});
	}
	enableStep(index: number) {
		this.steps[index].readonly = false;
		this.wizard.at(index).enable();
	}
	disableStep(index: number) {
		this.steps[index].readonly = true;
		this.wizard.at(index).disable();
	}
	showStep(index: number) {
		this.steps[index].hidden = false;
		this.setMaxSteps();
	}
	hideStep(index: number) {
		this.steps[index].hidden = true;
		this.setMaxSteps();
		if (this.current === index) {
			this.current === 0 ? this.current++ : this.current--;
		}
	}
	isValidStep(index: number): boolean {
		return !this.wizard.at(index).invalid;
	}
	isValidForm(): boolean {
		for (let i = 0; i < this.steps.length; i++) {
			if (this.steps[i].hidden || (this.steps[i].readonly && this.skipDisabled)) {
				continue;
			} else if (!this.isValidStep(i)) {
				return false;
			}
		}
		return true;
	}
	extractStep(index: number): any {
		return this.steps[index].extractData(this.wizard.at(index) as FormGroup);
	}
	cleanSubmitValidationStep(index: number) {
		this.steps[index].submitted = false;
	}
	goToStep(step: number) {
		this.current = step;
		if (this.extractDuringNavigation) {
			for (let i = this.current - 1; i >= 0; i--) {
				this.model[this.steps[i].name] = this.steps[i].extractData(this.wizard.at(i) as FormGroup);
			}
		}
	}
	next() {
		this.nextEmit.emit(this.current);
		this.applicationLogger.logWizardStepValidation(
			this.log,
			this.current,
			this.wizard.at(this.current) as FormGroup,
		);
		if (this.current < this.maxSteps) {
			this.steps[this.current].submitted = true;
			if (this.extractDuringNavigation) {
				this.model[this.steps[this.current].name] = this.steps[this.current].extractData(
					this.wizard.at(this.current) as FormGroup,
				);
			}
			this.current++;
			if (this.steps[this.current].hidden) {
				this.next();
			}
		}
	}
	prev() {
		this.prevEmit.emit(this.current);
		if (this.current > 0) {
			this.steps[this.current].submitted = true;
			if (this.extractDuringNavigation) {
				this.model[this.steps[this.current].name] = this.steps[this.current].extractData(
					this.wizard.at(this.current) as FormGroup,
				);
			}
			this.current--;
			if (this.steps[this.current].hidden) {
				this.prev();
			}
		}
	}

	// utility
	getStepForm(name: string): FormGroup {
		const index = this.steps.findIndex((el) => el.name === name);
		if (index !== -1) {
			return this.wizard.at(index) as FormGroup;
		}
		return undefined;
	}

	/**
	 * Ritorna gli step del wizard
	 */
	abstract getSteps(): WizardStepModel[];
}
