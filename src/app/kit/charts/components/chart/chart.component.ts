import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { ChartElementInterface } from '../../interfaces/chart-element.interface';
import { ChartElementGroupInterface } from '../../interfaces/chart-element-group.interface';
import { EnumChartsType } from '../../enums/charts-type.enum';
import { ChartOptionsInterface } from '../../interfaces/chart-options.interface';
import { colorSets } from '../../constants/colorset';
import { formatLabel } from '@swimlane/ngx-charts';
import { ApplicationStorageService } from '../../../storage/services/application-storage.service';
import { curves } from '../../constants/curves';
// @see https://github.com/swimlane/ngx-charts/blob/12.1.0/demo/app.component.ts
// @see https://www.npmjs.com/package/@swimlane/ngx-charts/v/12.1.0
@Component({
	selector: 'ddc-init-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent extends BaseComponent {
	@Output() selectData: EventEmitter<any> = new EventEmitter<any>();
	@Output() activateData: EventEmitter<any> = new EventEmitter<any>();
	@Output() deactivateData: EventEmitter<any> = new EventEmitter<any>();
	@Output() selectLegend: EventEmitter<any> = new EventEmitter<any>();
	@Output() doubleClickData: EventEmitter<any> = new EventEmitter<any>();

	@Input() data: ChartElementInterface[] | ChartElementGroupInterface[];
	@Input() typeChart: EnumChartsType;
	@Input() tooltipContent: any; // Template
	@Input() tooltipContentGroup: any; // Template
	chartType = EnumChartsType;

	// options
	@Input() showCurrencySymbol: boolean;
	@Input() currencySymbol: string;
	@Input() appendText: string;
	@Input() options: ChartOptionsInterface;
	@Input() height: any = '400px';
	@Input() legendTitle: string = '';
	@Input() legendPosition = 'right';
	@Input() xAxisLabel: string = '';
	@Input() yAxisLabel: string = '';

	// BAR
	@Input() animations: boolean = true;
	@Input() gradient: boolean = false;
	@Input() showXAxis: boolean = true;
	@Input() showYAxis: boolean = true;
	@Input() showLegend: boolean = true;
	@Input() showXAxisLabel: boolean = true;
	@Input() showYAxisLabel: boolean = true;
	@Input() tooltipDisabled: boolean = false;
	@Input() showGridLines: boolean = true;
	@Input() barPadding: number = 8;
	@Input() groupPadding: number = 16;
	@Input() roundDomains: boolean = false;
	@Input() roundEdges: boolean = true;
	@Input() xScaleMin: any = undefined;
	@Input() xScaleMax: any = undefined;
	@Input() yScaleMin: number = undefined;
	@Input() yScaleMax: number = undefined;
	@Input() showDataLabel: boolean = false;
	@Input() noBarWhenZero = true;
	@Input() trimXAxisTicks = true;
	@Input() trimYAxisTicks = true;
	@Input() rotateXAxisTicks = true;
	@Input() maxXAxisTickLength = 16;
	@Input() maxYAxisTickLength = 16;
	// PIE
	@Input() explodeSlices: boolean = false;
	@Input() showLabels: boolean = true;
	@Input() doughnut: boolean = false;
	@Input() arcWidth: number = 0.25;
	// LINE - AREA
	@Input() autoScale: boolean = true;
	@Input() timeline: boolean = false;
	@Input() curve: any = undefined;
	@Input() rangeFillOpacity: number = 0.15;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (this.options) {
			this.makeOptions();
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ChartComponent';
	}

	// COMMONS
	// options
	private makeOptions() {
		if (!this.options.theme) {
			this.options.theme = 'dark';
		}
		if (!this.options.colorSchemeName && !this.options.colorScheme) {
			this.setColorScheme('cool');
		} else if (this.options.colorSchemeName && !this.options.colorScheme) {
			this.setColorScheme(this.options.colorSchemeName);
		}
		if (!this.options.schemeType) {
			this.options.schemeType = 'ordinal';
		}
		if (!this.options.customColors || !this.options.customColors.length) {
			this.options.customColors = [];
			this.makeCustomColors(this.options.customColors, this.data);
		}
		// line
		if (!this.options.curveType) {
			this.options.curveType = 'Linear';
		}
		this.curve = curves[this.options.curveType];
	}

	private makeCustomColors(toFill: any[], from: any[]) {
		from.forEach((el) => {
			if (el.series) {
				this.makeCustomColors(toFill, el.series);
			} else if (el.color) {
				toFill.push({ name: el.name, value: el.color });
			}
		});
	}

	private setColorScheme(name) {
		this.options.colorScheme = colorSets.find((s) => s.name === name);
	}

	// text
	makeLabelTooltip(obj: ChartElementInterface) {
		return obj.label ? obj.label : obj.name;
	}
	makeValueTooltip(obj: ChartElementInterface) {
		let val = this.valueText(obj.text ? obj.text : obj.value);
		if (this.appendText) {
			val += this.appendText;
		}
		if (this.showCurrencySymbol) {
			val +=
				' ' +
				(this.currencySymbol ? this.currencySymbol : this.applicationStorage.currencySymbol.get());
		}
		return val;
	}
	private valueText(value: number | string): string {
		return typeof value === 'number' ? `${Math.round(value).toLocaleString()}` : formatLabel(value);
	}
	private valueTextCurrency(value: number | string): string {
		let val = this.valueText(value);
		if (this.appendText) {
			val += this.appendText;
		}
		if (this.showCurrencySymbol) {
			val +=
				' ' +
				(this.currencySymbol ? this.currencySymbol : this.applicationStorage.currencySymbol.get());
		}
		return val;
	}

	// BAR
	// operations
	onSelectData(data) {
		this.log.info('Chart select data', data);
		this.selectData.emit(data);
	}
	onActivateData(data) {
		this.log.info('Chart activate data', data);
		this.activateData.emit(data);
	}
	onDeactivateData(data) {
		this.log.info('Chart deactivate data', data);
		this.deactivateData.emit(data);
	}
	onLegendLabelClick(data) {
		this.log.info('Chart select legend', data);
		this.selectLegend.emit(data);
	}

	// PIE
	// operations
	OnDblclick(data) {
		this.log.info('Chart double click data', data);
		this.doubleClickData.emit(data);
	}
	valueFormatting = (value: number) => this.valueTextCurrency(value);

	// LINE
}
