import { AddressModel } from '../../localesystem/models/address.model';
import { SocialUser } from '@ddc/oauth-social';
import { UserModel } from '../models/user.model';
import { EnumSexType } from '../enums/sex-type.enum';
import { ContactreferenceModel } from '../models/contactreference.model';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumAddressType } from '../../localesystem/enums/address-type.enum';
import { SocialUserModel } from './social-user.model';
import { NationModel } from '../../localesystem/models/nation.model';
import { SocialLoginUtility } from './social-login.utility';
import { EnumOauthLoginType } from '@ddc/rest';

export class FacebookLoginUtility {
	static getUserModel(user: SocialUser): UserModel {
		const model: UserModel = new UserModel();
		if (user) {
			model.name = user.firstName;
			model.surname = user.lastName;
			model.born = SocialLoginUtility.getBorn(user, EnumOauthLoginType.FACEBOOK);
			model.sexEnum = SocialLoginUtility.getGender(user, EnumOauthLoginType.FACEBOOK);
			model.sex = model.sexEnum ? model.sexEnum.toString() : undefined;
			model.username = user.email;
		}
		return model;
	}

	static getAddressesModel(user: SocialUser): AddressModel[] {
		const arr: AddressModel[] = [];
		if (user && user.infos && user.infos.location) {
			arr.push(this.getAddressModel(user.infos.location, EnumAddressType.SECONDARY_HOME));
		}
		return arr;
	}

	static getAddressModel(addressFacebook: any, tp?: EnumAddressType): AddressModel {
		const address = new AddressModel();
		if (addressFacebook) {
			address.street = addressFacebook.street;
			address.number = undefined;
			address.place = addressFacebook.city;
			address.region = addressFacebook.region;
			address.zip = addressFacebook.zip;
			address.tpaddressEnum = tp;
			if (address.tpaddressEnum) {
				address.tpaddress = new TypologicalModel();
				address.tpaddress.id = address.tpaddress.toString();
			}
			address.nation = new NationModel();
			address.nation.cod_iso3166 = addressFacebook.country_code;
		}
		return address;
	}

	static getPhonesModel(user: SocialUser): ContactreferenceModel[] {
		return [];
	}
	static getPhoneModel(phoneFacebook: any): ContactreferenceModel {
		return undefined;
	}

	static toModel(user: SocialUser): SocialUserModel {
		const model = new SocialUserModel();
		if (!user) {
			return model;
		}
		model.id = user.id;
		model.provider = user.provider;
		model.photoUrl = user.photoUrl;
		model.authToken = user.authToken;
		model.idToken = user.idToken;
		model.authorizationCode = user.authorizationCode;
		model.user = this.getUserModel(user);
		model.addresses = this.getAddressesModel(user);
		model.phones = this.getPhonesModel(user);
		return model;
	}
}
