import { Component, ViewChild } from '@angular/core';
import {
	GojsDiagramModel,
	SequenceComponent,
	SequenceGroupModel,
	SequenceModel,
	SequenceUtility,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-sequence',
	templateUrl: './test-gojs-diagram-sequence.component.html',
	styleUrls: ['./test-gojs-diagram-sequence.component.scss'],
})
export class TestGojsDiagramSequenceComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: any;
	divId: string = '';

	// --- dati modal
	@ViewChild('sequenceCmp') sequenceCmp: SequenceComponent;
	dataShow: SequenceModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}
	init() {
		const groups: SequenceGroupModel[] = [
			{
				key: 'Cliente',
				text: 'Cliente',
			},
			{
				key: 'Cameriere',
				text: 'Sala',
			},
			{
				key: 'Cuoco',
				text: 'Cucina',
			},
			{
				key: 'Proprietario',
				text: 'Cassa',
			},
		];

		const sequences: SequenceModel[] = [
			{
				init: 1,
				fromGroup: 'Cliente',
				text: 'Ordina al cameriere',
				toGroup: 'Cameriere',
			},
			{
				init: 2,
				fromGroup: 'Cameriere',
				text: 'Il cameriere manda la comanda',
				toGroup: 'Cuoco',
			},
			{
				init: 3,
				fromGroup: 'Cameriere',
				text: 'Porta le bevande',
				toGroup: 'Cliente',
			},
			{
				init: 5,
				fromGroup: 'Cuoco',
				text: 'Piatti pronti',
				toGroup: 'Cameriere',
			},
			{
				init: 7,
				fromGroup: 'Cameriere',
				text: 'Porta i piatti al cliente',
				toGroup: 'Cliente',
			},
			{
				init: 9,
				fromGroup: 'Cliente',
				text: 'Paga',
				toGroup: 'Proprietario',
			},
		];

		const objTemplate: any = SequenceUtility.makeComponents(groups, sequences);

		const data = objTemplate.nodes;
		const link = objTemplate.links;

		this.diagramModel = { diagramNodeData: data, diagramLinkData: link };

		/*
		this.diagramProperties = {
			shape: { type: EnumFigureType.ARROTONDATO },
		};
    */
		this.divId = 'mySequenceId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.groupTemplate = SequenceUtility.makeGroupTemplate();
		diagram.nodeTemplate = SequenceUtility.makeNodeTemplate(diagram);
		/*
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

	plusClick = (data: SequenceModel) => {
		this.dataShow = data;
		this.sequenceCmp.setModalProperties('title', 'Plus');
		this.templateFooter = undefined;
		this.sequenceCmp.emptyMessages();
		this.sequenceCmp.setMessage('Ho cliccato su Plus');
		this.sequenceCmp.openModal();
	};
	asteriskClick = (data: SequenceModel) => {
		this.dataShow = data;
		this.sequenceCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.sequenceCmp.emptyMessages();
		this.sequenceCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.sequenceCmp.openModal();
	};
}
