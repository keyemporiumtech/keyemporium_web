import { AddressModel } from '../../localesystem/models/address.model';
import { SocialUser } from '@ddc/oauth-social';
import { UserModel } from '../models/user.model';
import { ContactreferenceModel } from '../models/contactreference.model';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumAddressType } from '../../localesystem/enums/address-type.enum';
import { SocialUserModel } from './social-user.model';
import { NationModel } from '../../localesystem/models/nation.model';
import { SocialLoginUtility } from './social-login.utility';
import { EnumOauthLoginType } from '@ddc/rest';

export class GoogleLoginUtility {
	static getUserModel(user: SocialUser): UserModel {
		const model: UserModel = new UserModel();
		if (user) {
			model.name = user.firstName;
			model.surname = user.lastName;
			model.born = SocialLoginUtility.getBorn(user, EnumOauthLoginType.GOOGLE);
			model.sexEnum = SocialLoginUtility.getGender(user, EnumOauthLoginType.GOOGLE);
			model.sex = model.sexEnum ? model.sexEnum.toString() : undefined;
			model.username = user.email;
		}
		return model;
	}

	static getAddressesModel(user: SocialUser): AddressModel[] {
		const arr: AddressModel[] = [];
		if (user && user.infos && user.infos.addresses && user.infos.addresses.length) {
			user.infos.addresses.forEach((element) => {
				arr.push(this.getAddressModel(element));
			});
		}
		return arr;
	}

	static getAddressModel(addressGoogle: any): AddressModel {
		const address = new AddressModel();
		if (addressGoogle) {
			address.street = addressGoogle.streetAddress;
			address.number = addressGoogle.extendedAddress;
			address.place = addressGoogle.city;
			address.region = addressGoogle.region;
			address.zip = addressGoogle.postalCode;
			address.tpaddressEnum =
				addressGoogle.type === 'home'
					? EnumAddressType.HOME
					: addressGoogle.type === 'work'
					? EnumAddressType.OFFICE
					: EnumAddressType.SECONDARY_HOME;
			address.tpaddress = new TypologicalModel();
			address.tpaddress.id = address.tpaddress.toString();
			address.nation = new NationModel();
			address.nation.cod_iso3166 = addressGoogle.countryCode;
		}
		return address;
	}

	static getPhonesModel(user: SocialUser): ContactreferenceModel[] {
		const phones: ContactreferenceModel[] = [];
		if (user && user.infos && user.infos.phoneNumbers && user.infos.phoneNumbers.length) {
			user.infos.phoneNumbers.forEach((element) => {
				phones.push(this.getPhoneModel(element));
			});
		}
		return phones;
	}
	static getPhoneModel(phoneGoogle: any): ContactreferenceModel {
		const phone = new ContactreferenceModel();
		if (phoneGoogle) {
			phone.val = phoneGoogle.value;

			switch (phoneGoogle.type) {
				case 'home':
				case 'work':
					phone.tpcontactreferenceEnum = EnumContactreferenceType.TEL;
					break;
				case 'mobile':
				case 'workMobile':
				case 'main':
					phone.tpcontactreferenceEnum = EnumContactreferenceType.CEL;
					break;
				case 'homeFax':
				case 'workFax':
				case 'otherFax':
					phone.tpcontactreferenceEnum = EnumContactreferenceType.FAX;
					break;
				default:
					phone.tpcontactreferenceEnum = EnumContactreferenceType.CEL;
					break;
			}

			phone.tpcontactreference = new TypologicalModel();
			phone.tpcontactreference.id = phone.tpcontactreference.toString();
		}
		return phone;
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
