import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApplicationLoggerService, BaseComponent } from '@ddc/kit';
import { Subscription, Observable, of } from 'rxjs';
import { AddressModel } from '../../../../modules/localesystem/models/address.model';
import { AddressService } from '../../../../modules/localesystem/services/address.service';
import { UseraddressService } from '../../../../modules/authentication/services/useraddress.service';
import { RequestConditionInterface } from '../../../../modules/api/cakeutils/interfaces/request-conditions.interface';
import { EnumAddressType } from '../../../../modules/localesystem/enums/address-type.enum';
import { QueryUtility } from '@ddc/rest';
import { map } from 'rxjs/operators';
import { UseraddressModel } from '../../../../modules/authentication/models/useraddress.model';
import { InputAddressComponent } from '../../../../modules/localesystem/components/input-address/input-address.component';
import { TypologicalModel } from '../../../../modules/api/cakeutils-be/models/typological.model';

@Component({
	selector: 'reserve-profile-address',
	templateUrl: './profile-address.component.html',
	styleUrls: ['./profile-address.component.scss'],
})
export class ProfileAddressComponent extends BaseComponent {
	@Input() id_address: string;
	@Input() id_user: string;
	@Input() flgPrincipal: boolean;
	@Input() blocked: boolean;
	@Input() viewmode: boolean = true;
	@Output() emitViewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
	@ViewChild('addressCmp') addressCmp: InputAddressComponent;
	// var
	address: AddressModel;
	// principal
	principal: UseraddressModel;
	// sub
	subAddress: Subscription;
	subSave: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private addressService: AddressService,
		private useraddressService: UseraddressService,
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
		if (this.blocked && this.addressCmp) {
			this.addressCmp.readonly = true;
		}
	}
	ngOnDestroyForChildren() {
		if (this.subAddress) {
			this.subAddress.unsubscribe();
		}
		if (this.subSave) {
			this.subSave.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProfileAddressComponent';
	}

	private load() {
		let $obs: Observable<AddressModel>;
		if (this.id_address) {
			$obs = this.getAddress(this.id_address);
		} else if (this.id_user && this.flgPrincipal) {
			$obs = this.getUserAddress(this.id_user);
		} else {
			$obs = of(undefined);
		}

		this.subAddress = $obs.subscribe((res) => {
			this.address = res;
			if (this.address && this.address.id) {
				this.id_address = this.address.id;
			}
		});
	}

	private getAddress(id_address: string): Observable<AddressModel> {
		const conditionsAddress: RequestConditionInterface = {
			belongs: ['city_fk'],
		};
		return this.addressService.unique(id_address, undefined, conditionsAddress);
	}

	private getUserAddress(id_user: string): Observable<AddressModel> {
		const conditionsAddress: RequestConditionInterface = {
			belongs: ['address_fk', 'address_fk.city_fk'],
		};
		return this.flgPrincipal
			? this.useraddressService
					.principal(
						id_user,
						undefined,
						EnumAddressType.HOME,
						conditionsAddress,
						undefined,
						QueryUtility.SKIP_ERROR_RES,
					)
					.pipe(
						map((res) => {
							if (res && res.address) {
								this.principal = res;
								return res.address;
							}
							return undefined;
						}),
					)
			: of(undefined);
	}

	save() {
		let $obs: Observable<string>;
		let model: AddressModel;
		if (this.addressCmp && this.addressCmp.form && this.addressCmp.form.valid) {
			model = this.addressCmp.exportAddress();
			model.cod = this.address ? this.address.cod : undefined;
			model.tpaddress = new TypologicalModel();
			model.tpaddress.id = EnumAddressType.HOME;
			if (this.id_address) {
				$obs = this.addressService.edit(model, this.id_address);
			} else if (this.id_user && this.principal) {
				$obs = this.useraddressService
					.setPrincipal(this.id_user, undefined, this.principal.id, undefined, EnumAddressType.HOME)
					.pipe(
						map((flg) => {
							return flg ? this.principal.id : undefined;
						}),
					);
			} else if (this.id_user) {
				$obs = this.useraddressService.saveRelation(
					this.id_user,
					model,
					EnumAddressType.HOME,
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
