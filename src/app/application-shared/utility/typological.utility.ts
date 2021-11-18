import { OptionListModel } from '@ddc/kit';
import { EnumSexType } from '../../modules/authentication/enums/sex-type.enum';

export class TypologicalUtility {
	static getSexOptions(): OptionListModel[] {
		return [
			new OptionListModel(EnumSexType.MASCHIO, EnumSexType.MASCHIO),
			new OptionListModel(EnumSexType.FEMMINA, EnumSexType.FEMMINA),
			new OptionListModel(EnumSexType.ALTRO, EnumSexType.ALTRO),
		];
	}
}
