import { Component, Input } from '@angular/core';
import { ApplicationLoggerService } from '@ddc/kit';
import { OpenstreetmapService, BaseMapComponent, OpenstreetLocationModel } from '@ddc/rest';
import { AddressModel } from '../../../modules/localesystem/models/address.model';
import { AddressUtility } from '../../../modules/localesystem/utility/address.utility';
declare let L: any;

@Component({
	selector: 'ddc-init-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent extends BaseMapComponent {
	@Input() formatAddressModel: boolean = true;
	constructor(
		applicationLogger: ApplicationLoggerService,
		openstreetService: OpenstreetmapService,
	) {
		super(applicationLogger, openstreetService);
	}

	getTextByLocation(locationAddress: OpenstreetLocationModel): string {
		let text: string = '';
		let address: AddressModel;
		if (this.formatAddressModel && locationAddress.address) {
			address = AddressUtility.convertOpenstreetMapAddress(locationAddress.address);
			text = address.html_address;
		} else if (locationAddress.display_name) {
			text = locationAddress.display_name;
		}
		return text;
	}
}
