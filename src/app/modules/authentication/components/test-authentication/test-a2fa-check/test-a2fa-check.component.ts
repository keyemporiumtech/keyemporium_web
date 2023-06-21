import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationStorageService, MagicValidatorUtil } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { ApiServiceUtility } from '../../../../api/cakeutils/utility/api-service.utility';
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
	verified: boolean;

	subCheck: Subscription;
	constructor(
		private fb: FormBuilder,
		private applicationStorage: ApplicationStorageService,
		private authentication2faService: Authentication2faService,
	) {
		this.key = environment.clientId;

		this.validations = {};
		this.form = this.fb.group({
			code: new MagicValidatorUtil((this.validations.code = []), undefined).required().build(),
		});

		this.code = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('code') as FormControl,
			'Codice',
		)
			.validation(this.validations.code)
			.onInit();
	}

	check() {
		const responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, {});

		this.subCheck = this.authentication2faService
			.check(this.key, this.form.get('code').value, undefined, responseManager)
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
