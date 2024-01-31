import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseLoadingModel } from '../models/base-loading.model';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';

@Component({
	selector: 'ddc-init-loading-heart',
	templateUrl: './loading-heart.component.html',
	styleUrls: ['./loading-heart.component.scss'],
})
export class LoadingHeartComponent extends BaseLoadingModel {
	@ViewChild('el') el: ElementRef;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	setSelectors(): void {
		// const array: any[] = [];
		// array.push(document.querySelector('.lds-heart div'));
		this.selectorsLoading.length = 0;
		const element = this.el.nativeElement;
		this.selectorsLoading.push(element.querySelector('div'));
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LoadingHeartComponent';
	}
}
