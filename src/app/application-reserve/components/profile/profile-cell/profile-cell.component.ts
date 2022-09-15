import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent, ApplicationLoggerService } from '@ddc/kit';
import { ContactreferenceModel } from '../../../../modules/authentication/models/contactreference.model';
import { UserreferenceModel } from '../../../../modules/authentication/models/userreference.model';
import { Subscription, Observable, of } from 'rxjs';
import { ContactreferenceService } from '../../../../modules/authentication/services/contactreference.service';
import { UserreferenceService } from '../../../../modules/authentication/services/userreference.service';
import { RequestConditionInterface } from '../../../../modules/api/cakeutils/interfaces/request-conditions.interface';
import { EnumContactreferenceType } from '../../../../modules/authentication/enums/contactreference-type.enum';
import { QueryUtility } from '@ddc/rest';
import { map } from 'rxjs/operators';
import { TypologicalModel } from '../../../../modules/api/cakeutils-be/models/typological.model';

@Component({
	selector: 'reserve-profile-cell',
	templateUrl: './profile-cell.component.html',
	styleUrls: ['./profile-cell.component.scss'],
})
export class ProfileCellComponent extends BaseComponent {
	@Input() id_cell: string;
	@Input() id_user: string;
	@Input() flgPrincipal: boolean;
	@Input() blocked: boolean;
	@Input() viewmode: boolean = true;
	@Output() emitViewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
	@ViewChild('cellCmp') cellCmp: InputAddressComponent;
	// var
	cell: ContactreferenceModel;
	// principal
	principal: UserreferenceModel;
	// sub
	subReference: Subscription;
	subSave: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private contactreferenceService: ContactreferenceService,
		private userreferenceService: UserreferenceService,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (this.blocked) {
			this.changeViewMode(true, true);
		} else if (this.viewmode) {
			this.changeViewMode(true, true);
		}
		// address
		this.load();
	}
	ngAfterViewInitForChildren() {
		if (this.blocked && this.cellCmp) {
			this.cellCmp.readonly = true;
		}
	}
	ngOnDestroyForChildren() {
		if (this.subReference) {
			this.subReference.unsubscribe();
		}
		if (this.subSave) {
			this.subSave.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProfileCellComponent';
	}

	private load() {
		let $obs: Observable<ContactreferenceModel>;
		if (this.id_cell) {
			$obs = this.getCell(this.id_cell);
		} else if (this.id_user && this.flgPrincipal) {
			$obs = this.getUserCell(this.id_user);
		} else {
			$obs = of(undefined);
		}

		this.subReference = $obs.subscribe((res) => {
			this.cell = res;
			if (this.cell && this.cell.id) {
				this.id_cell = this.cell.id;
			}
		});
	}

	private getCell(id_cell: string): Observable<ContactreferenceModel> {
		const conditionsCell: RequestConditionInterface = {
			belongs: ['city_fk'],
		};
		return this.contactreferenceService.unique(id_cell, undefined, conditionsCell);
	}

	private getUserCell(id_user: string): Observable<ContactreferenceModel> {
		const conditionsCell: RequestConditionInterface = {
			belongs: ['contactreference_fk', 'contactreference_fk.city_fk'],
		};
		return this.flgPrincipal
			? this.userreferenceService
					.principal(
						id_user,
						undefined,
						EnumContactreferenceType.CEL,
						conditionsCell,
						undefined,
						QueryUtility.SKIP_ERROR_RES,
					)
					.pipe(
						map((res) => {
							if (res && res.contactreference) {
								this.principal = res;
								return res.contactreference;
							}
							return undefined;
						}),
					)
			: of(undefined);
	}

	save() {
		let $obs: Observable<string>;
		let model: ContactreferenceModel;
		if (this.cellCmp && this.cellCmp.form && this.cellCmp.form.valid) {
			model = this.cellCmp.exportContactreference();
			model.cod = this.cell ? this.cell.cod : undefined;
			model.tpcontactreference = new TypologicalModel();
			model.tpcontactreference.id = EnumContactreferenceType.CEL;
			if (this.id_cell) {
				$obs = this.contactreferenceService.edit(model, this.id_cell);
			} else if (this.id_user && this.principal) {
				$obs = this.userreferenceService
					.setPrincipal(
						this.id_user,
						undefined,
						this.principal.id,
						undefined,
						EnumContactreferenceType.CEL,
					)
					.pipe(
						map((flg) => {
							return flg ? this.principal.id : undefined;
						}),
					);
			} else if (this.id_user) {
				$obs = this.userreferenceService.saveRelation(
					this.id_user,
					model,
					EnumContactreferenceType.CEL,
					this.flgPrincipal ? true : false,
				);
			}
		}

		if ($obs) {
			this.subSave = $obs.subscribe((res) => {
				if (res) {
					// lancia messaggio
				}
			});
		}
	}

	changeViewMode(val: boolean, notload?: boolean) {
		if (val && !notload) {
			this.load();
		}
		this.viewmode = val;
		this.emitViewMode.emit(this.viewmode);
	}
}
