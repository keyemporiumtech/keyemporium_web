import { AddressModel } from '../models/address.model';
import { OpenstreetAddressModel } from '@ddc/rest';
import { NationModel } from '../models/nation.model';

export class AddressUtility {
	static convertOpenstreetMapAddress(address: OpenstreetAddressModel): AddressModel {
		const model = new AddressModel();
		model.street = address.buildStreet;
		model.place = address.buildPlace;
		model.region = address.buildRegion;
		model.zip = address.postcode;
		model.nation = new NationModel();
		model.nation.cod_iso3166 = address.country_code;
		model.nation.name = address.country;
		return model;
	}
}
