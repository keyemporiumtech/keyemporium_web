import { Component, ViewChild } from '@angular/core';
import {
	DiagramBuilder,
	DoubleTreeComponent,
	DoubleTreeModel,
	DoubleTreeProperties,
	DoubleTreeUtility,
	GojsDiagramModel,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-double-tree',
	templateUrl: './test-gojs-diagram-double-tree.component.html',
	styleUrls: ['./test-gojs-diagram-double-tree.component.scss'],
})
export class TestGojsDiagramDoubleTreeComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: DoubleTreeProperties;
	divId: string = '';

	// --- dati modal
	@ViewChild('doubleTreeCmp') doubleTreeCmp: DoubleTreeComponent;
	dataShow: DoubleTreeModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}
	init() {
		const graygrad = { name: 'graygrad', colorStart: '#F5F5F5', colorEnd: '#F1F1F1' };
		const bluegrad = { name: 'bluegrad', colorStart: '#CDDAF0', colorEnd: '#91ADDD' };
		const yellowgrad = { name: 'yellowgrad', colorStart: '#FEC901', colorEnd: '#FEA200' };
		const lavgrad = { name: 'lavgrad', colorStart: '#EF9EFA', colorEnd: '#A570AD' };

		const nodes: DoubleTreeModel[] = [
			{
				key: 'Root',
				color: DiagramBuilder.makeColorBrush(bluegrad),
			},
			{ key: 'Left1', parent: 'Root', dir: 'left', color: DiagramBuilder.makeColorBrush(bluegrad) },
			{ key: 'leaf1', parent: 'Left1' },
			{ key: 'leaf2', parent: 'Left1' },
			{ key: 'Left2', parent: 'Left1', color: DiagramBuilder.makeColorBrush(bluegrad) },
			{ key: 'leaf3', parent: 'Left2' },
			{ key: 'leaf4', parent: 'Left2' },
			{ key: 'leaf5', parent: 'Left1' },
			{
				key: 'Right1',
				parent: 'Root',
				dir: 'right',
				color: DiagramBuilder.makeColorBrush(lavgrad),
			},
			{ key: 'Right2', parent: 'Right1', color: DiagramBuilder.makeColorBrush(yellowgrad) },
			{ key: 'leaf11', parent: 'Right2' },
			{ key: 'leaf12', parent: 'Right2' },
			{ key: 'leaf13', parent: 'Right2' },
			{ key: 'leaf14', parent: 'Right1' },
			{ key: 'leaf15', parent: 'Right1' },
			{
				key: 'Right3',
				parent: 'Root',
				dir: 'right',
				color: DiagramBuilder.makeColorBrush(yellowgrad),
			},
			{ key: 'leaf16', parent: 'Right3' },
			{ key: 'leaf17', parent: 'Right3' },
		];

		this.diagramModel = { diagramNodeData: nodes };

		this.diagramProperties = {};

		this.divId = 'myDoubleTreeId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = DoubleTreeUtility.makeNodeTemplate();
		/* NOT WORK
		diagram.nodeTemplate.contextMenu = DiagramBuilder.makeContextMenu([
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
		*/
	}

	plusClick = (data: DoubleTreeModel) => {
		this.dataShow = data;
		this.doubleTreeCmp.setModalProperties('title', 'Plus');
		this.templateFooter = undefined;
		this.doubleTreeCmp.emptyMessages();
		this.doubleTreeCmp.setMessage('Ho cliccato su Plus');
		this.doubleTreeCmp.openModal();
	};
	asteriskClick = (data: DoubleTreeModel) => {
		this.dataShow = data;
		this.doubleTreeCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.doubleTreeCmp.emptyMessages();
		this.doubleTreeCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.doubleTreeCmp.openModal();
	};
}
