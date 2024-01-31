import { Component, ViewChild } from '@angular/core';
import {
	DiagramBuilder,
	FlowchartComponent,
	FlowchartModel,
	FlowchartUtility,
	GojsDiagramModel,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-flowchart',
	templateUrl: './test-gojs-diagram-flowchart.component.html',
	styleUrls: ['./test-gojs-diagram-flowchart.component.scss'],
})
export class TestGojsDiagramFlowchartComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: any;
	divId: string = '';

	// --- dati modal
	@ViewChild('flowchartCmp') flowchartCmp: FlowchartComponent;
	dataShow: FlowchartModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}
	init() {
		this.diagramModel = { diagramNodeData: [], diagramLinkData: [] };

		this.divId = 'myFlowchartId';
	}

	buildDiagram(diagram: go.Diagram): void {
		FlowchartUtility.makeFigures(diagram);
		diagram.contextMenu = DiagramBuilder.makeContextMenu([
			DiagramBuilder.makeButton(
				this.plusClick,
				{ icon: 'PlusLine', props: { width: 10, height: 10 } },
				'Dettaglio 1',
			),
			DiagramBuilder.makeButton(
				this.asteriskClick,
				{ icon: 'AsteriskLine', props: { width: 10, height: 10 } },
				'Dettaglio 2',
			),
		]);
	}

	plusClick = (data: FlowchartModel) => {
		this.dataShow = data;
		this.flowchartCmp.setModalProperties('title', 'Plus');
		this.templateBody = this.plusTemplateBody;
		this.templateFooter = undefined;
		this.flowchartCmp.emptyMessages();
		this.flowchartCmp.setMessage('Ho cliccato su Plus');
		this.flowchartCmp.openModal();
	};
	asteriskClick = (data: FlowchartModel) => {
		this.dataShow = data;
		this.flowchartCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.flowchartCmp.emptyMessages();
		this.flowchartCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.flowchartCmp.openModal();
	};
}
