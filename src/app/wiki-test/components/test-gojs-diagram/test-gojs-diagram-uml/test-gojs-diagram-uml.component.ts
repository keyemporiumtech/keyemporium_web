import { Component, ViewChild } from '@angular/core';
import { GojsDiagramModel, UmlComponent, UmlModel, UmlProperties, UmlUtility } from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-uml',
	templateUrl: './test-gojs-diagram-uml.component.html',
	styleUrls: ['./test-gojs-diagram-uml.component.scss'],
})
export class TestGojsDiagramUmlComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: UmlProperties;
	divId: string = '';

	// --- dati modal
	@ViewChild('umlCmp') umlCmp: UmlComponent;
	dataShow: UmlModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}
	init() {
		const classes: UmlModel[] = [
			{
				key: 1,
				name: 'BankAccount',
				properties: [
					{ name: 'owner', type: 'String', visibility: 'public' },
					{ name: 'balance', type: 'Currency', visibility: 'public', default: '0' },
				],
				methods: [
					{
						name: 'deposit',
						parameters: [{ name: 'amount', type: 'Currency' }],
						visibility: 'public',
					},
					{
						name: 'withdraw',
						parameters: [{ name: 'amount', type: 'Currency' }],
						visibility: 'public',
					},
				],
			},
			{
				key: 11,
				name: 'Person',
				properties: [
					{ name: 'name', type: 'String', visibility: 'public' },
					{ name: 'birth', type: 'Date', visibility: 'protected' },
				],
				methods: [{ name: 'getCurrentAge', type: 'int', visibility: 'public' }],
			},
			{
				key: 12,
				name: 'Student',
				extends: 'Person',
				properties: [{ name: 'classes', type: 'List', visibility: 'public' }],
				methods: [
					{
						name: 'attend',
						parameters: [{ name: 'class', type: 'Course' }],
						visibility: 'private',
					},
					{ name: 'sleep', visibility: 'private' },
				],
			},
			{
				key: 13,
				name: 'Professor',
				extends: 'Person',
				properties: [{ name: 'classes', type: 'List', visibility: 'public' }],
				methods: [
					{
						name: 'teach',
						parameters: [{ name: 'class', type: 'Course' }],
						visibility: 'private',
					},
				],
			},
			{
				key: 14,
				name: 'Course',
				properties: [
					{ name: 'name', type: 'String', visibility: 'public' },
					{ name: 'description', type: 'String', visibility: 'public' },
					{ name: 'professor', type: 'Professor', visibility: 'public', isForeign: true },
					{ name: 'location', type: 'String', visibility: 'public' },
					{ name: 'times', type: 'List', visibility: 'public' },
					{ name: 'prerequisites', type: 'List', visibility: 'public' },
					{ name: 'students', type: 'List', visibility: 'public' },
				],
			},
		];

		const components = UmlUtility.makeComponents(classes);
		/*
		const links = [
			{ from: 12, to: 11 },
			{ from: 13, to: 11 },
			{ from: 14, to: 13, relationship: 'Association' },
		];
    */

		this.diagramModel = { diagramNodeData: components.nodes, diagramLinkData: components.links };

		this.diagramProperties = {
			shapeEntity: { background: 'lightblue' },
			colorProperties: 'lightgray',
			colorMethods: 'lightyellow',
			textStyleClassName: { textColor: 'white' },
		};

		this.divId = 'myUmlId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = UmlUtility.makeNodeTemplate();
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

	plusClick = (data: UmlModel) => {
		this.dataShow = data;
		this.umlCmp.setModalProperties('title', 'Plus');
		this.templateFooter = undefined;
		this.umlCmp.emptyMessages();
		this.umlCmp.setMessage('Ho cliccato su Plus');
		this.umlCmp.openModal();
	};
	asteriskClick = (data: UmlModel) => {
		this.dataShow = data;
		this.umlCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.umlCmp.emptyMessages();
		this.umlCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.umlCmp.openModal();
	};
}
