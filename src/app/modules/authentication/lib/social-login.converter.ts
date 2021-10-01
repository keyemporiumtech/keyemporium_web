import { SocialUser } from '@ddc/oauth-social';
import { EnumOauthLoginType } from '@ddc/rest';
import { SocialUserModel } from './social-user.model';
import { FacebookLoginUtility } from './facebook-login.utility';
import { GoogleLoginUtility } from './google-login.utility';
import { SocialUserDTO } from './social-user.dto';
import { UserUtilConverter } from '../converters/user.converter';
import { AddressUtilConverter } from '../../localesystem/converters/address.converter';
import { ContactreferenceUtilConverter } from '../converters/contactreference.converter';

export class SocialLoginConverter {
	static toModelByOauth(user: SocialUser, type: EnumOauthLoginType): SocialUserModel {
		if (type === EnumOauthLoginType.GOOGLE) {
			return GoogleLoginUtility.toModel(user);
		} else if (type === EnumOauthLoginType.FACEBOOK) {
			return FacebookLoginUtility.toModel(user);
		}
		return undefined;
	}

	static toModel(dto: SocialUserDTO): SocialUserModel {
		const model = new SocialUserModel();
		model.id = dto.id;
		model.provider = dto.provider;
		model.photoUrl = dto.photoUrl;
		model.authToken = dto.authToken;
		model.idToken = dto.idToken;
		model.authorizationCode = dto.authorizationCode;
		model.user = UserUtilConverter.toModel(dto.user);
		model.addresses = AddressUtilConverter.toModelList(dto.addresses);
		model.phones = ContactreferenceUtilConverter.toModelList(dto.phones);
		return model;
	}
	static toDto(model: SocialUserModel): SocialUserDTO {
		const dto = new SocialUserDTO();
		dto.id = model.id;
		dto.provider = model.provider;
		dto.photoUrl = model.photoUrl;
		dto.authToken = model.authToken;
		dto.idToken = model.idToken;
		dto.authorizationCode = model.authorizationCode;
		dto.user = UserUtilConverter.toDto(model.user);
		dto.addresses = AddressUtilConverter.toDtoList(model.addresses);
		dto.phones = ContactreferenceUtilConverter.toDtoList(model.phones);
		return dto;
	}
}
