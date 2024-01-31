import { PropertiesMaker } from '../properties.maker';
import { ModalPropertiesInterface } from './modal-properties.interface';

export class ModalPropertiesMaker {
	static instance(): ModalPropertiesInterface {
		const property: ModalPropertiesInterface = {
			title: '',
			flagButtonClose: true,
			classButtonClose: 'btn btn-secondary',
			textButtonClose: 'close',
			flagButtonOk: true,
			classButtonOk: 'btn btn-primary',
			textButtonOk: 'Ok',
			scrollable: false,
			centered: false,
		};
		return property;
	}

	static setValue(instance: ModalPropertiesInterface, key: string, value: any): void {
		PropertiesMaker.setValue(instance, key, value);
	}
}
