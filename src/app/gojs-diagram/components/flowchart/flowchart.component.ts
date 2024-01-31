import { Component, Input } from '@angular/core';
import * as go from 'gojs';
import { FlowchartTemplate } from '../../builder/flowchart/flowchart.template';
import { FlowchartModel } from '../../builder/flowchart/model/flowchart.model';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-flowchart',
	templateUrl: './flowchart.component.html',
	styleUrls: ['./flowchart.component.scss'],
})
export class FlowchartComponent extends GojsDiagramComponent<FlowchartTemplate, FlowchartModel> {
	@Input() divPaletteId: string = '';

	palette: go.Palette;
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.GraphLinksModel {
		return this.defaultModel();
	}
	override instanceBuilder(): FlowchartTemplate {
		return new FlowchartTemplate();
	}
	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {}

	// --- override
	afterViewInitCall(): void {
		super.afterViewInitCall();
		this.palette = this.builder.makePalette(this.divPaletteId, this.diagram);
	}
}
