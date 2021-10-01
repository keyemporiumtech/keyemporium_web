import { EnumOauthLoginType } from '@ddc/rest';
import { EnumSocialreferenceType } from '../enums/socialreference-type.enum';
import { SocialUser } from '@ddc/oauth-social';
import { EnumSexType } from '../enums/sex-type.enum';
import { DateModel } from '@ddc/kit';

export class SocialLoginUtility {
	static convertTypeSocialToEnum(type: EnumOauthLoginType): EnumSocialreferenceType {
		switch (type) {
			case EnumOauthLoginType.GOOGLE:
				return EnumSocialreferenceType.GOOGLE_PLUS;
			case EnumOauthLoginType.FACEBOOK:
				return EnumSocialreferenceType.FACEBOOK;
			default:
				return undefined;
		}
	}

	static getBorn(user: SocialUser, type: EnumOauthLoginType): string {
		if (type === EnumOauthLoginType.GOOGLE) {
			if (user.infos && user.infos.birthdays && user.infos.birthdays.length) {
				let born;
				let element;
				for (let i = 0; i < user.infos.birthdays.length; i++) {
					element = user.infos.birthdays[i];
					born = element.date;
					if (element.metadata.source.type === 'ACCOUNT' || (born.year && born.month && born.day)) {
						return (
							born.year +
							'-' +
							(born.month < 10 ? '0' + born.month : born.month) +
							'-' +
							(born.day < 10 ? '0' + born.day : born.day)
						);
					}
				}
			}
		} else if (type === EnumOauthLoginType.FACEBOOK) {
			if (user.infos && user.infos.birthday) {
				const born = new DateModel(user.infos.birthday, 'DD/MM/YYYY');
				return born.toString('YYYY-MM-DD');
			}
		}
		return undefined;
	}

	static getGender(user: SocialUser, type: EnumOauthLoginType): EnumSexType {
		if (type === EnumOauthLoginType.GOOGLE) {
			if (user.infos && user.infos.genders && user.infos.genders.length) {
				const gender = user.infos.genders[0];
				return gender.value === 'male'
					? EnumSexType.MASCHIO
					: gender.value === 'female'
					? EnumSexType.FEMMINA
					: EnumSexType.ALTRO;
			}
		} else if (type === EnumOauthLoginType.FACEBOOK) {
			if (user.infos && user.infos.gender) {
				const gender = user.infos.gender;
				return gender === 'male'
					? EnumSexType.MASCHIO
					: gender === 'female'
					? EnumSexType.FEMMINA
					: EnumSexType.ALTRO;
			}
		}
		return undefined;
	}
}
