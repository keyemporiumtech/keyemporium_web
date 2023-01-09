import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
	StringTranslate,
	OptionListModel,
	ApplicationLoggerService,
	BaseComponent,
	MagicValidatorUtil,
} from '@ddc/kit';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { Subscription } from 'rxjs';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NationSystemService } from '../../base/nation-system.service';

@Component({
	selector: 'ddc-init-app-nations',
	templateUrl: './app-nations.component.html',
	styleUrls: ['./app-nations.component.scss'],
})
export class AppNationsComponent extends BaseComponent {
	@Input() showImage: boolean;
	@Input() filters: string[];
	@Output() changeEmit: EventEmitter<string> = new EventEmitter<string>();

	@Input() label: string | StringTranslate;
	@Input() showLabel: boolean = true;
	@ViewChild('nations', { static: false }) nations: InputSelectComponent;

	formNation: FormGroup;
	validations: any = {};
	selectNations: FormFieldModel;
	optionNations: OptionListModel[];

	// sub
	subNations: Subscription;
	subChangeNations: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private nationSystemService: NationSystemService,
	) {
		super(applicationLogger);
		this.showImage = true;
		this.filters = undefined;
		this.optionNations = [];
		// build form
		this.formNation = this.fb.group({
			nation: new MagicValidatorUtil((this.validations.nation = []), undefined).required().build(),
		});
	}

	ngOnInitForChildren() {
		const $obsNations = this.showImage
			? this.nationSystemService.nationsHTML(this.filters)
			: this.nationSystemService.nations(this.filters);
		this.subNations = $obsNations.subscribe((res) => {
			this.optionNations = res;
		});
		// creation form
		this.selectNations = new FormFieldModel(
			this.showImage ? EnumFormType.SELECT_DIV : EnumFormType.SELECT,
			this.formNation.get('nation') as FormControl,
			this.label ? this.label : 'APP.LABEL.NATION',
		)
			.validation(this.validations.nation)
			.onInit();

		// manage change
		this.subChangeNations = this.formNation
			.get('nation')
			.valueChanges.pipe(distinctUntilChanged())
			.pipe(
				switchMap((nation) => {
					return this.nationSystemService.setupNation(nation).pipe(
						map((res) => {
							this.changeEmit.emit(nation);
							return res;
						}),
					);
				}),
			)
			.subscribe();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subNations) {
			this.subNations.unsubscribe();
		}
		if (this.subChangeNations) {
			this.subChangeNations.unsubscribe();
		}
	}
	getClassName(): string {
		return 'AppNationsComponent';
	}
}
