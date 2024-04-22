import { Component, ViewChild } from '@angular/core';
import {
	DecisionTreeComponent,
	DecisionTreeModel,
	DecisionTreeProperties,
	DecisionTreeUtility,
	GojsDiagramModel,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-decision-tree',
	templateUrl: './test-gojs-diagram-decision-tree.component.html',
	styleUrls: ['./test-gojs-diagram-decision-tree.component.scss'],
})
export class TestGojsDiagramDecisionTreeComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: DecisionTreeProperties;
	divId: string = '';

	// --- dati modal
	@ViewChild('decisionTreeCmp') decisionTreeCmp: DecisionTreeComponent;
	dataShow: DecisionTreeModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}
	init() {
		const data: DecisionTreeModel[] = [
			{
				key: 'Start',
				title: 'Inizio',
				category: 'decision',
				buttonA: {
					key: 'BE',
					title: 'Backend',
					description: 'Sviluppo Java e Rest',
					background: 'darkred',
					color: 'white',
					backgroundOver: 'yellow',
					colorOver: 'black',
				},
				buttonB: {
					key: 'FE',
					title: 'Frontend',
					description: 'Sviluppo Angular e JS',
					background: 'green',
					color: 'yellow',
				},
			},
			{
				key: 'BE',
				title: 'BackEnd',
				category: 'decision',
				buttonA: {
					key: 'JAVA',
					title: 'Java-Spring',
					description: 'Servizi Rest Java',
				},
				buttonB: {
					key: 'PHP',
					title: 'PHP-Zend',
					description: 'Servizi Rest PHP',
				},
			},
			{
				key: 'FE',
				title: 'FrontEnd',
				category: 'decision',

				buttonA: {
					key: 'ANGULAR',
					title: 'Angular 12-14-16',
					description: 'Angular 2',
				},
				buttonB: {
					key: 'ANGULARJS',
					title: 'AngularJS',
					description: 'Angular 1',
				},
			},
			{
				key: 'JAVA',
				title: 'Java',
				category: 'personality',
				text: 'Grazie per aver scelto Java',
			},
			{
				key: 'PHP',
				title: 'Php',
				category: 'personality',
				text: 'Grazie per aver scelto PHP',
			},
			{
				key: 'ANGULAR',
				title: 'Angular',
				category: 'personality',
				text: 'Grazie per aver scelto Angular',
			},
			{
				key: 'ANGULARJS',
				title: 'AngularJS',
				category: 'personality',
				text: 'Grazie per aver scelto AngularJS',
			},
		];

		const modelData = DecisionTreeUtility.makeComponents(data);

		this.diagramModel = { diagramNodeData: modelData.nodes, diagramLinkData: modelData.links };

		this.diagramProperties = {
			// linkColor: 'darkred',
		};

		this.divId = 'myDecisionTreeId';
	}

	buildDiagram(diagram: go.Diagram): void {
		// diagram.nodeTemplate = TournmentUtility.makeNodeTemplate();
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

	plusClick = (data: DecisionTreeModel) => {
		this.dataShow = data;
		this.decisionTreeCmp.setModalProperties('title', 'Plus');
		this.templateFooter = undefined;
		this.decisionTreeCmp.emptyMessages();
		this.decisionTreeCmp.setMessage('Ho cliccato su Plus');
		this.decisionTreeCmp.openModal();
	};
	asteriskClick = (data: DecisionTreeModel) => {
		this.dataShow = data;
		this.decisionTreeCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.decisionTreeCmp.emptyMessages();
		this.decisionTreeCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.decisionTreeCmp.openModal();
	};
}
