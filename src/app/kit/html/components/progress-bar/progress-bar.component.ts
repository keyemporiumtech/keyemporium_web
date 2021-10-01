import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { StyleUtility } from '../../utils/style.utility';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
	selector: 'ddc-init-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 })),
			]),
			transition(':leave', [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		]),
	],
})
export class ProgressBarComponent extends BaseComponent {
	@Input() backgroundColor: string;
	@Input() color: string;
	@Input() height: string;
	@Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
	@Input() cssClass: any;
	@Input() cssStyle: any;
	@Input() showText: boolean;
	@Input() hideOnComplete: boolean; // nascondi quando ha finito
	@Input() showOnStart: boolean; // mostra quando inizia
	hide: boolean;
	// timing
	@Input() intervalGrow: number = 0.05; // s
	@Input() timeoutHide: number = 0.5; // s

	@ViewChild('progress') progress;
	subProgress: Subscription;
	current: number = 0;
	status: 'PAUSE' | 'STOP' | 'PLAY' = 'STOP';

	constructor(applicationLogger: ApplicationLoggerService, private renderer: Renderer2) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.backgroundColor) {
			this.backgroundColor = StyleUtility.getProperty('--mute');
		}
		if (!this.color) {
			this.color = StyleUtility.getProperty('--primary');
		}

		switch (this.size) {
			case 'xs':
				this.height = '5px';
				break;
			case 'sm':
				this.height = '10px';
				break;
			case 'md':
				this.height = '15px';
				break;
			case 'lg':
				this.height = '20px';
				break;
			case 'xlg':
				this.height = '25px';
				break;
			default:
				this.height = '15px';
				break;
		}
		this.evalHideOnStart();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subProgress) {
			this.subProgress.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProgressBarComponent';
	}

	start(init?: number) {
		this.status = 'PLAY';
		this.evalHideOnStart();
		if (!init) {
			init = 0;
		}
		this.subProgress = interval(this.intervalGrowMillisecond)
			.pipe(filter((res1) => Math.round(res1 + init) <= 100))
			.subscribe((res2) => {
				const width = res2 + init;
				this.current = Math.round(width);
				this.renderer.setStyle(this.progress.nativeElement, 'width', width + '%');
				this.evalHideOnComplete();
			});
	}

	pause() {
		this.status = 'PAUSE';
		if (this.subProgress) {
			this.subProgress.unsubscribe();
		}
	}

	resume() {
		if (this.status === 'PAUSE') {
			this.start(this.current);
		}
	}

	stop() {
		this.status = 'STOP';
		if (this.subProgress) {
			this.subProgress.unsubscribe();
		}
		this.current = 100;
		this.renderer.setStyle(this.progress.nativeElement, 'width', '100%');
		this.evalHideOnComplete();
	}

	evalHideOnStart() {
		if (this.showOnStart && this.status === 'STOP') {
			this.hide = true;
		} else {
			this.hide = false;
		}
	}
	evalHideOnComplete() {
		if (this.hideOnComplete && this.current === 100) {
			setTimeout(() => {
				this.hide = true;
			}, this.timeoutHideMillisecond);
		} else {
			this.hide = false;
		}
	}

	get intervalGrowMillisecond(): number {
		return this.intervalGrow * 1000;
	}
	get timeoutHideMillisecond(): number {
		return this.timeoutHide * 1000;
	}
}
