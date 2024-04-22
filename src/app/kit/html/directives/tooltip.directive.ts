import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Renderer2,
	SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StringTranslate } from '../../translation/models/string-translate.model';
import { TranslateUtility } from '../../translation/utility/translate.utility';

@Directive({
	selector: '[ddcTooltip]',
})
export class TooltipDirective implements OnInit, OnChanges {
	@Input('tooltip') tooltipTitle: string | StringTranslate;
	@Input() placement: 'top' | 'left' | 'bottom' | 'right' = 'top';
	@Input() delay: number = 500;
	@Input() fontSize: string = '12px';
	@Input() background: string = '#282a36';
	@Input() color: string = '#f8f8f2';
	@Input() textAlign: string = 'center';
	@Input() borderSize: string = '2px';
	@Input() borderColor: string;
	@Input() arrowColor: string;
	tooltip: HTMLElement;
	offset = 10;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private translateService: TranslateService,
	) {}

	ngOnInit(): void {
		if (!this.borderColor && this.background) {
			this.borderColor = this.background;
		}
		if (!this.arrowColor && this.background) {
			this.arrowColor = this.background;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.arrowColor && this.arrowColor && this.tooltip) {
			this.tooltip.style.setProperty(`--tooltip-arrow-color`, this.arrowColor);
		}
	}

	@HostListener('mouseenter') onMouseEnter() {
		if (!this.tooltip) {
			this.show();
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (this.tooltip) {
			this.hide();
		}
	}

	show() {
		this.create();
		this.setPosition();
		this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
	}

	hide() {
		if (this.tooltip) {
			this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
			setTimeout(() => {
				if (document && document.body && this.tooltip) {
					this.renderer.removeChild(document.body, this.tooltip);
					this.tooltip = null;
				}
			}, this.delay);
		}
	}

	create() {
		this.tooltip = this.renderer.createElement('div');

		this.tooltip.innerHTML = TranslateUtility.get(this.tooltipTitle, this.translateService);

		/*
		this.renderer.appendChild(
			this.tooltip,
			this.renderer.createText(this.tooltipTitle), // textNode
		);
    */

		this.renderer.appendChild(document.body, this.tooltip);
		// this.renderer.appendChild(this.el.nativeElement, this.tooltip);

		this.renderer.addClass(this.tooltip, 'ng-tooltip');
		this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

		// styles
		this.renderer.setStyle(this.tooltip, 'font-size', `${this.fontSize}`);
		this.renderer.setStyle(this.tooltip, 'text-align', `${this.textAlign}`);
		this.renderer.setStyle(this.tooltip, 'color', `${this.color}`);
		this.renderer.setStyle(this.tooltip, 'background', `${this.background}`);
		this.renderer.setStyle(this.tooltip, 'border', `${this.borderSize} solid ${this.borderColor}`);
		this.tooltip.style.setProperty(`--tooltip-arrow-color`, this.arrowColor);

		// delay
		this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
		this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
		this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
		this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
	}

	setPosition() {
		const hostPos = this.el.nativeElement.getBoundingClientRect();

		const tooltipPos = this.tooltip.getBoundingClientRect();

		const scrollPos =
			window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

		let top, left;

		if (this.placement === 'top') {
			top = hostPos.top - tooltipPos.height - this.offset;
			left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
		}

		if (this.placement === 'bottom') {
			top = hostPos.bottom + this.offset;
			left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
		}

		if (this.placement === 'left') {
			top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
			left = hostPos.left - tooltipPos.width - this.offset;
		}

		if (this.placement === 'right') {
			top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
			left = hostPos.right + this.offset;
		}

		this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
		this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
	}
}
