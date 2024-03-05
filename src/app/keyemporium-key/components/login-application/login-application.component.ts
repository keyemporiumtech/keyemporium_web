import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationLoggerService, BaseComponent, MagicValidatorUtil } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../../modules/authentication/services/application.service';
import { EnumFormType } from '../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../shared/models/form/form-field.model';

@Component({
	selector: 'key-login-application',
	templateUrl: './login-application.component.html',
	styleUrls: ['./login-application.component.scss'],
})
export class LoginApplicationComponent extends BaseComponent {
	private _applicationname: string;
	@Input() set applicationname(val: string) {
		if (this.formLogin) {
			this._applicationname = val;
			this.formLogin.get('application').setValue(val);

			this.hideApplicationField = val ? true : false;
		}
	}
	get applicationname(): string {
		return this._applicationname;
	}
	private _username: string;
	@Input() set username(val: string) {
		if (this.formLogin) {
			this._username = val;
			this.formLogin.get('email').setValue(val);
		}
	}
	get username(): string {
		return this._username;
	}
	@Output() emitToken: EventEmitter<string> = new EventEmitter<string>();

	formLogin: FormGroup;
	validationMessages: any = {};
	FLD_email: FormFieldModel;
	FLD_application: FormFieldModel;
	token: string;
	hideApplicationField: boolean;

	subGenerate: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private applicationService: ApplicationService,
	) {
		super(applicationLogger);
		this.formLogin = this.fb.group({
			email: new MagicValidatorUtil((this.validationMessages.email = []), undefined)
				.required()
				.email()
				.build(),
			application: new MagicValidatorUtil((this.validationMessages.application = []), undefined)
				.required()
				.build(),
		});

		this.FLD_email = new FormFieldModel(
			EnumFormType.TEXT,
			this.formLogin.get('email') as FormControl,
			'PERSONAL.LABEL.EMAIL',
		)
			.validation(this.validationMessages.email)
			.onInit();

		this.FLD_application = new FormFieldModel(
			EnumFormType.TEXT,
			this.formLogin.get('application') as FormControl,
			'Application code',
		)
			.validation(this.validationMessages.application)
			.onInit();
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subGenerate) {
			this.subGenerate.unsubscribe();
		}
	}
	getClassName(): string {
		return 'LoginApplicationComponent';
	}

	generateToken() {
		this.subGenerate = this.applicationService
			.generate(this.formLogin.get('application').value, this.formLogin.get('email').value)
			.subscribe((res) => {
				this.token = res;
				if (this.token) {
					this.emitToken.emit(this.token);
				}
			});
	}
}
