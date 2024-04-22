import { EnumFigureType } from '../../../enum/figure-type.enum';

export interface FamilyTreeProperties {
	maleColor?: string;
	femaleColor?: string;
	typeShape?: EnumFigureType;
	textMales?: string;
	textFemales?: string;
	parentChildColor?: string;
	spouseColor?: string;
	brotherColor?: string;
}
