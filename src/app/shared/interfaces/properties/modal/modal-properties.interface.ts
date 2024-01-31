import { StringTranslate } from '@ddc/kit';

export interface ModalPropertiesInterface {
	classModal?: any;
	classAnimation?: string;
	classDialog?: any;
	classDimension?: string;
	classContent?: any;
	classHeader?: any;
	classTitle?: any;
	title?: string | StringTranslate; //= ''
	classBody?: any;
	classText?: any;
	text?: string | StringTranslate;
	classFooter?: any;
	flagButtonClose?: boolean;
	classButtonClose?: any;
	textButtonClose?: string | StringTranslate;
	flagButtonOk?: boolean;
	classButtonOk?: any;
	textButtonOk?: string | StringTranslate;
	scrollable?: boolean;
	centered?: boolean;
}
