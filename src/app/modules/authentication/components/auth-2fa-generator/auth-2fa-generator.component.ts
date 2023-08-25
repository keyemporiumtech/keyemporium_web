import { Component, Input, ViewChild } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseComponent,
	MathUtility,
	ProgressBarComponent,
} from '@ddc/kit';
import * as _moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { ProgressCircleComponent } from '../../../../kit/html/components/progress-circle/progress-circle.component';
import { ApiServiceUtility } from '../../../api/cakeutils/utility/api-service.utility';
import { Authentication2faModel } from '../../models/authentication2fa.model';
import { Authentication2faService } from '../../services/authentication2fa.service';
const moment = _moment;

@Component({
	selector: 'ddc-init-auth-2fa-generator',
	templateUrl: './auth-2fa-generator.component.html',
	styleUrls: ['./auth-2fa-generator.component.scss'],
})
export class Auth2faGeneratorComponent extends BaseComponent {
	@Input() key: string;
	@Input() circle: boolean;
	// style
	@Input() cssClass: any;
	@Input() cssStyle: any;
	@Input() cssCodeClass: any;
	@Input() cssCodeStyle: any;
	// style - progress
	@Input() showText: boolean;
	@Input() backgroundColor: string;
	@Input() color: string;
	@Input() height: string;
	@Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
	// style - progress - circle
	@Input() colorText: string;
	@Input() backgroundColorInner: string;

	@ViewChild('loadingFillCmp') loadingFillCmp: ProgressBarComponent | ProgressCircleComponent;

	// variables
	a2fa: Authentication2faModel;
	currentLoadingFill: number;
	startIntervalGrow: number;
	// sub
	subGenerate: Subscription;
	subLoaderFill: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
		private authentication2faService: Authentication2faService,
	) {
		super(applicationLogger);
		this.currentLoadingFill = 0;
		this.circle = true;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		setTimeout(() => {
			this.call();
		}, 0);
	}
	ngOnDestroyForChildren() {
		if (this.subGenerate) {
			this.subGenerate.unsubscribe();
		}
		if (this.subLoaderFill) {
			this.subLoaderFill.unsubscribe();
		}
	}
	getClassName(): string {
		return 'Auth2faGeneratorComponent';
	}

	// check
	call() {
		const responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, {});

		this.subGenerate = this.authentication2faService
			.generate(this.key, undefined, responseManager)
			.subscribe((a2fa) => {
				this.a2fa = a2fa;
				if (this.a2fa) {
					this.startIntervalGrow = a2fa.timeWait / 100;
					setTimeout(() => {
						this.checkLoader(a2fa);
					}, 0);
				} else {
					// utente non loggato
				}
			});
	}
	checkLoader(a2fa: Authentication2faModel) {
		if (a2fa && a2fa.lastTime) {
			const today = moment();
			const lastDate = a2fa.lastTimeModel.date;
			const diff = today.diff(lastDate, 'seconds');
			if (diff > a2fa.timeWait) {
				this.stopLoadingFill();
				this.call();
			} else {
				this.currentLoadingFill = diff;
				this.startLoadingFill(a2fa);
			}
		}
	}

	startLoadingFill(a2fa: Authentication2faModel) {
		const initial = MathUtility.percent(this.currentLoadingFill, a2fa.timeWait);
		this.loadingFillCmp.start(initial);
	}
	stopLoadingFill() {
		this.currentLoadingFill = 0;
		if (this.subLoaderFill) {
			this.subLoaderFill.unsubscribe();
		}
		// this.loadingFillCmp.stop();
	}

	onStatus($status: 'PAUSE' | 'STOP' | 'PLAY') {
		if ($status === 'STOP') {
			this.call();
		}
	}
}
