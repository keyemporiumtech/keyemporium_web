import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { filter, interval, Subscription } from 'rxjs';
import { BaseComponent } from '../../../abstract/base.component';
import { MathUtility } from '../../../config/utility/math.utility';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { StyleUtility } from '../../utils/style.utility';

@Component({
	selector: 'ddc-init-progress-circle',
	templateUrl: './progress-circle.component.html',
	styleUrls: ['./progress-circle.component.scss'],
})
export class ProgressCircleComponent extends BaseComponent {
	@Output() emitStatus: EventEmitter<'PAUSE' | 'STOP' | 'PLAY'> = new EventEmitter<
		'PAUSE' | 'STOP' | 'PLAY'
	>();
	@Input() backgroundColor: string;
	@Input() borderColor: string;
	@Input() backgroundColorInner: string;
	@Input() fillfull: boolean;
	@Input() color: string;
	@Input() colorText: string;
	@Input() height: string;
	@Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
	@Input() cssClass: any;
	@Input() cssStyle: any;
	@Input() showText: boolean;
	@Input() hideOnComplete: boolean; // nascondi quando ha finito
	@Input() showOnStart: boolean; // mostra quando inizia
	@Input() showDot: boolean; // mostra un pallino che si muove durante l'animazione
	@Input() displayInline: boolean; // mostra il loader allineato all'elemento che lo precede
	hide: boolean;
	// CIRCULAR
	circularPadding: string;
	// INNER
	innerHeight: string;
	innerMargin: string;
	// DOT
	dotHeight: string;
	dotMarginTop: string;
	// BAR
	barRect: string;
	barProgressRect: string;
	lastProgressRect: string;
	delayRight: string;
	delayLeft: string;
	// timing
	@Input() intervalGrow: number = 0.05; // s
	animationStatus: string;

	@Input() timeoutHide: number = 0.5; // s

	subProgress: Subscription;
	current: number = 0;
	status: 'PAUSE' | 'STOP' | 'PLAY' = 'STOP';

	constructor(applicationLogger: ApplicationLoggerService, private renderer: Renderer2) {
		super(applicationLogger);
		this.animationStatus = 'paused';
		this.displayInline = true;
	}

	ngOnInitForChildren() {
		if (!this.size) {
			this.size = 'md';
		}
		if (this.height) {
			this.size = undefined;
			this.buildDimensions(this.height);
		}
		if (!this.backgroundColor) {
			this.backgroundColor = StyleUtility.getProperty('--background');
			this.borderColor = StyleUtility.getProperty('--text');
		}
		if (!this.backgroundColorInner && !this.fillfull) {
			this.backgroundColorInner = StyleUtility.getProperty('--mute');
		}
		if (this.fillfull) {
			this.backgroundColor = 'none';
			this.backgroundColorInner = 'none';
			this.borderColor = StyleUtility.getProperty('--text');
		}
		if (!this.color) {
			this.color = StyleUtility.getProperty('--primary');
		}
		if (!this.colorText) {
			this.colorText = StyleUtility.getProperty('--text-primary');
		}

		switch (this.size) {
			case 'xs':
				this.height = '50px';
				this.circularPadding = '10px';
				this.innerHeight = '40px';
				this.innerMargin = '-10px 0 0 -20px';
				this.dotHeight = '5px';
				this.dotMarginTop = '-2.5px';
				this.barRect = 'rect(0px, 50px, 50px, 25px)';
				this.barProgressRect = 'rect(0px, 25px, 50px, 0px)';
				break;
			case 'sm':
				this.height = '75px';
				this.circularPadding = '15px';
				this.innerHeight = '60px';
				this.innerMargin = '-15px 0 0 -30px';
				this.dotHeight = '7.5px';
				this.dotMarginTop = '-3.75px';
				this.barRect = 'rect(0px, 75px, 75px, 37.5px)';
				this.barProgressRect = 'rect(0px, 37.5px, 75px, 0px)';
				break;
			case 'md':
				this.height = '100px';
				this.circularPadding = '20px';
				this.innerHeight = '80px';
				this.innerMargin = '-20px 0 0 -40px';
				this.dotHeight = '10px';
				this.dotMarginTop = '-5px';
				this.barRect = 'rect(0px, 100px, 100px, 50px)';
				this.barProgressRect = 'rect(0px, 50px, 100px, 0px)';
				break;
			case 'lg':
				this.height = '150px';
				this.circularPadding = '30px';
				this.innerHeight = '120px';
				this.innerMargin = '-30px 0 0 -60px';
				this.dotHeight = '15px';
				this.dotMarginTop = '-7.5px';
				this.barRect = 'rect(0px, 150px, 150px, 75px)';
				this.barProgressRect = 'rect(0px, 75px, 150px, 0px)';
				break;
			case 'xlg':
				this.height = '200px';
				this.circularPadding = '40px';
				this.innerHeight = '160px';
				this.innerMargin = '-40px 0 0 -80px';
				this.dotHeight = '20px';
				this.dotMarginTop = '-10px';
				this.barRect = 'rect(0px, 200px, 200px, 100px)';
				this.barProgressRect = 'rect(0px, 100px, 200px, 0px)';
				break;
			default:
				break;
		}
		this.evalHideOnStart();
		this.lastProgressRect = '' + this.barProgressRect;
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subProgress) {
			this.subProgress.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ProgressCircleComponent';
	}

	start(init?: number) {
		if (this.status !== 'PLAY') {
			if (init && init > 0 && init < 100 && init !== this.current) {
				const perc: number = (this.intervalGrowForAnimation * init) / 100;
				if (init <= 50) {
					this.delayLeft = '-' + perc;
					this.delayRight = '' + (this.intervalGrowForAnimation - perc);
				} else {
					this.delayLeft = '-' + this.intervalGrowForAnimation;
					this.delayRight = '-' + (this.intervalGrowForAnimation - perc);
				}
			} else {
				this.delayLeft = '0';
				this.delayRight = '' + this.intervalGrowForAnimation;
			}
			this.unfill();
			this.animationStatus = 'running';
			this.status = 'PLAY';
			this.emitStatus.emit(this.status);
			this.evalHideOnStart();
			if (!init) {
				init = this.current && this.current !== 100 ? this.current : 0;
			}

			this.subProgress = interval(this.intervalGrowMillisecond)
				.pipe(filter((res1) => Math.round(res1 + init) <= 100))
				.subscribe((res2) => {
					const width = res2 + init;
					this.current = Math.round(width);
					if (this.current === 100) {
						this.stop();
					}
				});
		}
	}

	pause() {
		this.animationStatus = 'paused';
		this.status = 'PAUSE';
		this.emitStatus.emit(this.status);
		if (this.subProgress) {
			this.subProgress.unsubscribe();
		}
	}

	resume() {
		this.animationStatus = 'running';
		if (this.status === 'PAUSE') {
			this.start(this.current);
		}
	}

	stop() {
		this.fill();
		this.status = 'STOP';
		this.emitStatus.emit(this.status);
		if (this.subProgress) {
			this.subProgress.unsubscribe();
		}
		this.current = 100;
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

	buildDimensions(height: string) {
		let num: number;
		if (height.indexOf('px')) {
			num = +height.replace('px', '');
		} else if (height.indexOf('rem')) {
			num = +height.replace('rem', '');
		} else if (height.indexOf('em')) {
			num = +height.replace('em', '');
		} else {
			num = +height;
		}

		this.circularPadding = MathUtility.percentInverse(20, num) + 'px';
		this.innerHeight = MathUtility.percentInverse(80, num) + 'px';
		this.innerMargin =
			'-' +
			MathUtility.percentInverse(20, num) +
			'px 0 0 -' +
			MathUtility.percentInverse(40, num) +
			'px';
		this.dotHeight = MathUtility.percentInverse(10, num) + 'px';
		this.dotMarginTop = '-' + MathUtility.percentInverse(5, num) + 'px';
		this.barRect = 'rect(0px, ' + num + 'px, ' + num + 'px, ' + num / 2 + 'px)';
		this.barProgressRect = 'rect(0px, ' + num / 2 + 'px, ' + num + 'px, 0px)';
	}

	fill() {
		this.barProgressRect = undefined;
	}
	unfill() {
		this.barProgressRect = this.lastProgressRect;
	}

	get intervalGrowMillisecond(): number {
		return this.intervalGrow * 1000;
	}
	get timeoutHideMillisecond(): number {
		return this.timeoutHide * 1000;
	}

	get intervalGrowForAnimation(): number {
		return this.intervalGrow * 50;
	}
}
