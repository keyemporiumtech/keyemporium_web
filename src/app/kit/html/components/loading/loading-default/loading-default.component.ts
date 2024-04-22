import { Component } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-default',
	templateUrl: './loading-default.component.html',
	styleUrls: ['./loading-default.component.scss'],
})
export class LoadingDefaultComponent extends BaseLoadingModel {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	getStyleDiv(): any {
		const style: any = {};
		style['background'] = this.color;
		return style;
	}

	setSelectors(): void {}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingDefaultComponent';
	}
}
