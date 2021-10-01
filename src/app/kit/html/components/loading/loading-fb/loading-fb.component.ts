import { Component, Input } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-fb',
	templateUrl: './loading-fb.component.html',
	styleUrls: ['./loading-fb.component.scss'],
})
export class LoadingFbComponent extends BaseLoadingModel {
	@Input() numDivs: number = 3;
	divs: any[] = [];
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	getStyleDiv(): any {
		const style: any = {};
		style['background'] = this.color;
		return style;
	}

	selectors(): any[] {
		return [];
	}

	ngOnInitForChildren() {
		if (this.numDivs) {
			let i = 0;
			while (i < this.numDivs) {
				this.divs.push(i);
				i++;
			}
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingFbComponent';
	}
}
