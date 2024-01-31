import { Component, ViewChild } from '@angular/core';
import {
	DiagramBuilder,
	EnumFigureType,
	EnumKanbanBoardStatus,
	GojsDiagramModel,
	KanbanBoardComponent,
	KanbanBoardModel,
	KanbanBoardProperties,
	KanbanBoardUtility,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-kanban-board',
	templateUrl: './test-gojs-diagram-kanban-board.component.html',
	styleUrls: ['./test-gojs-diagram-kanban-board.component.scss'],
})
export class TestGojsDiagramKanbanBoardComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: KanbanBoardProperties;
	divId: string = '';

	// --- dati modal
	@ViewChild('kanbanBoardCmp') kanbanBoardCmp: KanbanBoardComponent;
	dataShow: KanbanBoardModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	// ------ buttons
	defaultTitle = 'Kanban semplice';
	advancedTitle = 'Kanban con data inizio e durata delle attività';
	styleTitle = 'Cambio stile';

	constructor() {
		this.init();
	}

	init(): void {
		const data: KanbanBoardModel[] = this.getDefault();

		this.diagramModel = { diagramNodeData: data, diagramLinkData: [] };

		this.diagramProperties = {
			shapeGroup: { type: EnumFigureType.ARROTONDATO },
			textStatusCOMPLETE: { color: 'green' },
		};

		this.divId = 'myKanban';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.groupTemplate = KanbanBoardUtility.makeGroupTemplate(diagram);
		diagram.nodeTemplate = KanbanBoardUtility.makeNodeTemplate(diagram);
		diagram.groupTemplate.toolTip = KanbanBoardUtility.makeTooltipGroup();
		diagram.nodeTemplate.toolTip = KanbanBoardUtility.makeTooltip();
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
	}

	plusClick = (data: KanbanBoardModel) => {
		this.dataShow = data;
		this.kanbanBoardCmp.setModalProperties('title', 'Plus');
		this.templateBody = this.plusTemplateBody;
		this.templateFooter = undefined;
		this.kanbanBoardCmp.emptyMessages();
		this.kanbanBoardCmp.setMessage('Ho cliccato su Plus');
		this.kanbanBoardCmp.openModal();
	};
	asteriskClick = (data: KanbanBoardModel) => {
		this.dataShow = data;
		this.kanbanBoardCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.kanbanBoardCmp.emptyMessages();
		this.kanbanBoardCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.kanbanBoardCmp.openModal();
	};

	// ---------- buttons
	clickDefault() {
		const data: KanbanBoardModel[] = this.getDefault();
		this.kanbanBoardCmp.resetProperties();
		this.diagramProperties = {
			shapeGroup: { type: EnumFigureType.ARROTONDATO },
			textStatusCOMPLETE: { color: 'green' },
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: data, diagramLinkData: [] };
		this.kanbanBoardCmp.reload();
	}

	clickAdvanced() {
		const data: KanbanBoardModel[] = this.getAdvanced();
		this.kanbanBoardCmp.resetProperties();
		this.diagramProperties = {
			startDate: new Date('1995-12-17T03:24:00'),
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: data, diagramLinkData: [] };
		this.kanbanBoardCmp.reload();
	}

	clickStyle() {
		const data: KanbanBoardModel[] = this.getDefault();
		this.kanbanBoardCmp.resetProperties();
		this.diagramProperties = {
			shapeGroup: {
				type: EnumFigureType.ARROTONDATO,
				background: 'green',
				payload: { backgroundHighlight: 'yellow' },
			},
			textGroup: {
				font: '25px Lato, sans-serif',
				payload: { textColorHighlight: 'white' },
			},
			shapeNode: {
				type: EnumFigureType.ARROTONDATO,
				background: 'lightgray',
			},
			shapeStatus: {
				background: 'red',
			},
			textStatusCOMPLETE: { color: 'blue' },
			textStatusPROGRESS: { color: 'cyan' },
			textStatusSTOP: { color: 'darkblue' },
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: data, diagramLinkData: [] };
		this.kanbanBoardCmp.reload();
	}

	// ---------- utils

	getDefault() {
		const n0: KanbanBoardModel = {
			key: 'n0',
			text: 'First step',
			isGroup: true,
			color: EnumKanbanBoardStatus.NONE,
		};
		const n1: KanbanBoardModel = {
			key: 'n1',
			text: 'Second step',
			isGroup: true,
			color: EnumKanbanBoardStatus.NONE,
		};

		const n01: KanbanBoardModel = {
			key: 'n01',
			text: 'Activity 1',
			color: EnumKanbanBoardStatus.COMPLETED,
			group: 'n0',
		};
		const n02: KanbanBoardModel = {
			key: 'n02',
			text: 'Activity 2',
			color: EnumKanbanBoardStatus.IN_PROGRESS,
			group: 'n0',
		};

		return [n0, n1, n01, n02];
	}

	getAdvanced() {
		const n0: KanbanBoardModel = {
			key: 'n0',
			text: 'First step',
			isGroup: true,
			color: EnumKanbanBoardStatus.NONE,
		};
		const n1: KanbanBoardModel = {
			key: 'n1',
			text: 'Second step',
			isGroup: true,
			color: EnumKanbanBoardStatus.NONE,
		};

		const n01: KanbanBoardModel = {
			key: 'n01',
			text: 'Activity 1',
			color: EnumKanbanBoardStatus.COMPLETED,
			group: 'n0',
			start: 0,
			duration: 10,
			percent: 70,
			persons: ['Valerio', 'Nicola', 'Francesca'],
		};
		const n02: KanbanBoardModel = {
			key: 'n02',
			text: 'Activity 2',
			color: EnumKanbanBoardStatus.IN_PROGRESS,
			group: 'n0',
			start: 7,
			duration: 5,
			percent: 85,
			persons: ['Giuseppe', 'Francesca'],
		};

		return [n0, n1, n01, n02];
	}
}
