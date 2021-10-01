export class BootstrapUtils {
	static getSize(size: string, prefix?: string): string {
		if (!size) {
			return '';
		}
		let result: string = '';
		if (!prefix) {
			prefix = '';
		}

		if (size.indexOf('|') !== -1) {
			const pipeExplode = size.split('|');
			if (pipeExplode[0]) {
				result += ' ' + prefix + 'lg-' + pipeExplode[0];
			}
			if (pipeExplode[1]) {
				result += ' ' + prefix + 'md-' + pipeExplode[1];
			}
			if (pipeExplode[2]) {
				result += ' ' + prefix + 'sm-' + pipeExplode[2];
			}
		} else if (size.indexOf('-') !== -1) {
			const minusExplode = size.split('-');
			if (minusExplode[0]) {
				result += ' ' + prefix + 'xl-' + minusExplode[0];
			}
			if (minusExplode[1]) {
				result += ' ' + prefix + 'lg-' + minusExplode[1];
			}
			if (minusExplode[2]) {
				result += ' ' + prefix + 'md-' + minusExplode[2];
			}
			if (minusExplode[3]) {
				result += ' ' + prefix + 'sm-' + minusExplode[3];
			}
			if (minusExplode[4]) {
				result += ' ' + prefix + 'xs-' + minusExplode[4];
			}
		} else {
			result = ' ' + prefix + size;
		}

		return result;
	}
}
