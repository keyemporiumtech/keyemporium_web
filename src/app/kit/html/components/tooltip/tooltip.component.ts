import { Component, Input } from '@angular/core';

@Component({
	selector: 'ddc-init-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
	@Input() title: string;
	@Input() placement: string;
	@Input() delay: string;
}
