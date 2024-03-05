import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationStorageService, MagicValidatorUtil } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { ApiServiceUtility } from '../../../../api/cakeutils/utility/api-service.utility';
import { ApplicationService } from '../../../services/application.service';
import { Authentication2faService } from '../../../services/authentication2fa.service';

@Component({
	selector: 'wiki-test-a2fa-check',
	templateUrl: './test-a2fa-check.component.html',
	styleUrls: ['./test-a2fa-check.component.scss'],
})
export class TestA2faCheckComponent implements OnDestroy {
	key: string;
	form: FormGroup;
	validations: any;
	code: FormFieldModel;
	token: FormFieldModel;
	verified: boolean;

	subCheck: Subscription;
	subGenerate: Subscription;
	constructor(
		private fb: FormBuilder,
		private applicationStorage: ApplicationStorageService,
		private authentication2faService: Authentication2faService,
		private applicationService: ApplicationService,
	) {
		this.key = environment.clientId;

		this.validations = {};
		this.form = this.fb.group({
			code: new MagicValidatorUtil((this.validations.code = []), undefined).required().build(),
			token: new MagicValidatorUtil((this.validations.token = []), undefined).required().build(),
		});

		this.code = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('code') as FormControl,
			'Codice',
		)
			.validation(this.validations.code)
			.onInit();
		this.token = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('token') as FormControl,
			'Token',
		)
			.validation(this.validations.token)
			.onInit();
	}

	generaAuth2fa(cod: string) {
		let applicationName: string;
		let userName: string;
		switch (cod) {
			case 'DDC':
				applicationName = 'DandyCorporation';
				userName = 'giuseppesassone00@gmail.com';
				break;
		}
		this.subGenerate = this.applicationService
			.generate(applicationName, userName)
			.subscribe((res) => {
				this.form.get('token').setValue(res);
			});
	}

	check() {
		const responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, {});

		this.subCheck = this.authentication2faService
			.check(
				this.form.get('token').value,
				this.key,
				this.form.get('code').value,
				undefined,
				responseManager,
			)
			.subscribe((res) => {
				this.verified = res;
			});
	}

	ngOnDestroy(): void {
		if (this.subCheck) {
			this.subCheck.unsubscribe();
		}
	}
}
