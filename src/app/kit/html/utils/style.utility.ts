import { KeyvalueObject } from '../../config/interface/keyvalue.object';

export class StyleUtility {
	static addCSSClassToElement(el: any, classCss: string) {
		if (classCss && classCss.indexOf(' ') !== -1) {
			const arr = classCss.split(' ');
			arr.forEach((name) => {
				el.classList.add(name);
			});
		} else if (classCss) {
			el.classList.add(classCss);
		}
	}

	static removeCSSClassToElement(el: any, classCss: string) {
		if (classCss && classCss.indexOf(' ') !== -1) {
			const arr = classCss.split(' ');
			arr.forEach((name) => {
				el.classList.remove(name);
			});
		} else if (classCss) {
			el.classList.remove(classCss);
		}
	}

	static getProperty(propertyName: string) {
		const root = document.documentElement;
		return getComputedStyle(root, null).getPropertyValue(propertyName).trim();
	}

	static extractKeyValueFromStringStyle(style: string): KeyvalueObject | KeyvalueObject[] {
		let styles: string[] = [];
		if (style.indexOf(';') !== -1) {
			styles = style.split(';');
		}

		const resultArr: KeyvalueObject[] = [];
		let arrKV: string[];
		styles.forEach((el) => {
			arrKV = el.split(':');
			if (arrKV && arrKV.length === 2) {
				resultArr.push({ key: arrKV[0], value: arrKV[1] });
			}
		});

		if (resultArr && resultArr.length) {
			return resultArr.length === 1 ? resultArr[0] : resultArr;
		}
		return undefined;
	}

	static extractKeyValueFromSingleStringStyle(style: string): KeyvalueObject {
		if (style.indexOf(';') !== -1) {
			style = style.replace(';', '');
		}

		const arrKV = style.split(':');
		if (arrKV && arrKV.length === 2) {
			return { key: arrKV[0], value: arrKV[1] };
		}

		return undefined;
	}
}
