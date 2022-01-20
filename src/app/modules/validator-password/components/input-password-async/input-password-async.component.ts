import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { BaseComponent, ApplicationLoggerService, MagicValidatorUtil } from '@ddc/kit';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { Subscription } from 'rxjs';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { distinctUntilChanged } from 'rxjs/operators';
import { PasswordService } from '../../services/password.service';
import { PasswordValidator } from '../../validators/password.validator';
import { RequestUtility } from '../../../../rest';

@Component({
	selector: 'ddc-init-input-password-async',
	templateUrl: './input-password-async.component.html',
	styleUrls: ['./input-password-async.component.scss'],
})
export class InputPasswordAsyncComponent extends BaseComponent {
	@Input() min: number = 5;
	@Input() max: number = 10;
	@Input() level: number = 3;
	@Input() separator: string;
	@Input() debounce: number = 1000;
	@Input() extControl: FormControl | AbstractControl;

	nationByIban: string;
	@Input() set password(value: string) {
		if (this.formPassword) {
			this.formPassword.get('password').setValue(value);
		}
	}

	loadingPassword: boolean;

	formPassword: FormGroup;
	messagePassword: string;
	validations: any = {};
	inputPassword: FormFieldModel;

	// sub
	subStatusPassword: Subscription;
	subValuePassword: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private passwordService: PasswordService,
	) {
		super(applicationLogger);
		// build form
		this.formPassword = this.fb.group({});
	}

	ngOnInitForChildren() {
		this.formPassword.addControl(
			'password',
			new MagicValidatorUtil((this.validations.password = []), undefined)
				.required()
				.pushAsync(
					RequestUtility.debounceAsyncValidator(
						PasswordValidator.validate(
							this.passwordService,
							this.min,
							this.max,
							this.level,
							this.separator,
						),
						this.debounce,
					),
					PasswordValidator.PASSWORD(),
				)
				.buildControl(),
		);
		// creation form
		this.inputPassword = new FormFieldModel(
			EnumFormType.PASSWORD,
			this.formPassword.get('password') as FormControl,
			'APP.LABEL.PASSWORD',
		)
			.validation(this.validations.password)
			.onInit();

		// manageChanges
		this.subStatusPassword = this.formPassword
			.get('password')
			.statusChanges.pipe(distinctUntilChanged())
			.subscribe((status) => {
				this.manageStatusPassword(status);
			});

		this.subValuePassword = this.formPassword
			.get('password')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((value) => {
				if (this.extControl) {
					this.extControl.setValue(value);
				}
			});
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subStatusPassword) {
			this.subStatusPassword.unsubscribe();
		}
		if (this.subValuePassword) {
			this.subValuePassword.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputPasswordAsyncComponent';
	}

	manageStatusPassword(status) {
		if (
			this.formPassword &&
			this.formPassword.get('password') &&
			this.formPassword.get('password').value
		) {
			switch (status) {
				case 'VALID':
					this.loadingPassword = false;
					this.messagePassword = undefined;
					break;
				case 'PENDING':
					this.loadingPassword = true;
					// this.messagePassword = undefined;
					break;
				case 'INVALID':
					this.loadingPassword = false;
					if (this.formPassword.get('password').hasError('password')) {
						this.messagePassword = this.formPassword.get('password').getError('password');
					}
					break;
				default:
					this.loadingPassword = false;
					this.messagePassword = undefined;
					break;
			}
		}
	}
}
