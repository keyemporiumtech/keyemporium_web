import { Component, Input } from '@angular/core';
import { BaseComponent, StringTranslate, ApplicationLoggerService } from '@ddc/kit';
import { AddressModel } from '../../../../modules/localesystem/models/address.model';
import { Subscription } from 'rxjs';
import { VicService } from '../../../../modules/app-keyemporium/services/vic.service';
import { QueryUtility } from '../../../../rest';

@Component({
	selector: 'reserve-profile-list-addresses',
	templateUrl: './profile-list-addresses.component.html',
	styleUrls: ['./profile-list-addresses.component.scss'],
})
export class ProfileListAddressesComponent extends BaseComponent {
	@Input() id_user: string;
	@Input() blocked: boolean;
	@Input() list: AddressModel[];
	// var
	id_address: string;
	editMode: boolean;
	titleForm: string | StringTranslate;
	// sub
	subList: Subscription;
	subDelete: Subscription;

	constructor(applicationLogger: ApplicationLoggerService, private vicService: VicService) {
		super(applicationLogger);
		this.list = [];
	}

	ngOnInitForChildren() {
		this.load();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subList) {
			this.subList.unsubscribe();
		}
		if (this.subDelete) {
			this.subDelete.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProfileListAddressesComponent';
	}

	private load() {
		this.startLoading();
		this.subList = this.vicService
			.addresses(
				this.id_user,
				undefined,
				false,
				undefined,
				undefined,
				QueryUtility.fnResponseManager(
					undefined,
					QueryUtility.FN_ERROR(() => {
						this.stopLoading();
					}),
					QueryUtility.SKIP_ERROR_RES,
				),
			)
			.subscribe(
				(list) => {
					this.list = list;
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);
	}

	// utility
	getConfirmDelText(address: AddressModel) {
		return new StringTranslate('PERSONAL.VIC.ADDRESS.DELETE_ADDRESS_CONFIRM', {
			address: address.html_address,
		});
	}

	// operation
	nuova() {
		this.editMode = true;
		this.titleForm = new StringTranslate('PERSONAL.VIC.ADDRESS.ADD_ADDRESS');
	}
	modifica(address: AddressModel) {
		this.id_address = address.id;
		this.editMode = true;
		this.titleForm = new StringTranslate('PERSONAL.VIC.ADDRESS.EDIT_ADDRESS', {
			address: address.html_address,
		});
	}
	close() {
		this.id_address = undefined;
		this.titleForm = undefined;
		this.editMode = false;
	}
	elimina(id: string) {
		this.startLoading();
		this.subDelete = this.vicService
			.deleteAddress(
				id,
				undefined,
				QueryUtility.fnResponseManager(
					undefined,
					QueryUtility.FN_ERROR(() => {
						this.stopLoading();
					}),
					QueryUtility.HANDLE_POSITIVE_RES,
				),
			)
			.subscribe(
				(res) => {
					if (res) {
						this.load();
					}
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);
	}

	onSave(res: boolean) {
		if (res) {
			this.list.length = 0;
			this.load();
		}
	}
}
