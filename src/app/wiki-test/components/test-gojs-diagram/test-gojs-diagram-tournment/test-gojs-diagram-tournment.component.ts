import { Component, ViewChild } from '@angular/core';
import {
	DiagramBuilder,
	EnumFigureType,
	GojsDiagramModel,
	PlayerStyleModel,
	TournmentComponent,
	TournmentModel,
	TournmentProperties,
	TournmentUtility,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-tournment',
	templateUrl: './test-gojs-diagram-tournment.component.html',
	styleUrls: ['./test-gojs-diagram-tournment.component.scss'],
})
export class TestGojsDiagramTournmentComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: TournmentProperties;
	divId: string = '';

	// --- dati modal
	@ViewChild('tournmentCmp') tournmentCmp: TournmentComponent;
	dataShow: TournmentModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	// ---buttons
	defaultTitle: string = 'Tabellone completo con finale';
	randomTitle: string = 'Tabellone generato da elenco squadre';
	dynamicTitle: string = 'Calcolo automatico secondo turno da primo con punteggi';
	styleTitle: string = 'Stile personalizzato';
	styleLevelTitle: string = 'Stile personalizzato per fase del torneo';

	constructor() {
		this.init();
	}
	init() {
		const partite: TournmentModel[] = this.getDefault();

		this.diagramModel = { diagramNodeData: partite };

		this.diagramProperties = {
			linkColor: 'darkred',
		};

		this.divId = 'myTournmentId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = TournmentUtility.makeNodeTemplate();
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

	plusClick = (data: TournmentModel) => {
		this.dataShow = data;
		this.tournmentCmp.setModalProperties('title', 'Plus');
		this.templateFooter = undefined;
		this.tournmentCmp.emptyMessages();
		this.tournmentCmp.setMessage('Ho cliccato su Plus');
		this.tournmentCmp.openModal();
	};
	asteriskClick = (data: TournmentModel) => {
		this.dataShow = data;
		this.tournmentCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.tournmentCmp.emptyMessages();
		this.tournmentCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.tournmentCmp.openModal();
	};

	// ---------- buttons
	clickDefault() {
		const partite: TournmentModel[] = this.getDefault();
		this.tournmentCmp.resetProperties();
		this.diagramProperties = {
			linkColor: 'darkred',
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: partite };
		this.tournmentCmp.reload();
	}

	clickRandom() {
		const partite: TournmentModel[] = this.getRandomTournment();
		this.tournmentCmp.resetProperties();
		this.diagramProperties = {
			linkColor: 'blue',
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: partite };
		this.tournmentCmp.reload();
	}
	clickDynamic() {
		const partite: TournmentModel[] = this.getDynamicTournment();
		this.tournmentCmp.resetProperties();
		this.diagramProperties = {
			linkColor: 'darkgray',
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: partite };
		this.tournmentCmp.reload(this.diagramModel);
	}

	clickStyle() {
		const partite: TournmentModel[] = this.getDynamicTournment();
		this.diagramProperties = {
			linkColor: 'green',
			stylePlayer: {
				shape: {
					type: EnumFigureType.ARROTONDATO,
					background: 'lightgray',
					borderColor: 'black',
				},
				text: {
					font: '10pt  Segoe UI,sans-serif',
					textColor: 'black',
					textAlign: 'center',
				},
				shapeScore: {
					type: EnumFigureType.ARROTONDATO,
					background: 'lightgray',
					borderColor: 'black',
				},
				textScore: {
					font: '10pt  Segoe UI,sans-serif',
					textColor: 'black',
					textAlign: 'center',
				},
				shapeWin: {
					type: EnumFigureType.ARROTONDATO,
					background: 'darkblue',
					borderColor: 'yellow',
				},
				textWin: {
					font: '10pt  Segoe UI,sans-serif',
					textColor: 'white',
					textAlign: 'right',
				},
				shapeScoreWin: {
					type: EnumFigureType.ARROTONDATO,
					background: 'darkblue',
					borderColor: 'yellow',
				},
				textScoreWin: {
					font: '10pt  Segoe UI,sans-serif',
					textColor: 'white',
					textAlign: 'center',
				},
			},
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: partite };
		this.tournmentCmp.reload(this.diagramModel);
	}

	clickStyleLevel() {
		const partite: TournmentModel[] = this.getDefault();
		const styleQuarti: PlayerStyleModel = {
			shape: {
				type: EnumFigureType.ARROTONDATO,
				background: 'lightgray',
				borderColor: 'black',
			},
			text: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeScore: {
				type: EnumFigureType.ARROTONDATO,
				background: 'lightgray',
			},
			textScore: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeWin: {
				type: EnumFigureType.ARROTONDATO,
				background: 'darkblue',
			},
			textWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'right',
			},
			shapeScoreWin: {
				type: EnumFigureType.ARROTONDATO,
				background: 'darkblue',
			},
			textScoreWin: {
				textAlign: 'center',
			},
		};
		const styleSemi: PlayerStyleModel = {
			shape: {
				type: EnumFigureType.ARROTONDATO,
				background: 'lime',
				borderColor: 'black',
			},
			text: {
				font: '12pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeScore: {
				type: EnumFigureType.ARROTONDATO,
				background: 'lime',
			},
			textScore: {
				font: '12pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeWin: {
				type: EnumFigureType.ARROTONDATO,
				background: 'teal',
			},
			textWin: {
				font: '12pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'right',
			},
			shapeScoreWin: {
				type: EnumFigureType.ARROTONDATO,
				background: 'teal',
			},
			textScoreWin: {
				textAlign: 'center',
			},
		};
		const styleFinal: PlayerStyleModel = {
			shape: {
				type: EnumFigureType.ARROTONDATO,
				background: 'aqua',
				borderColor: 'black',
			},
			text: {
				font: '12pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeScore: {
				type: EnumFigureType.ARROTONDATO,
				background: 'aqua',
			},
			textScore: {
				font: '12pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeWin: {
				type: EnumFigureType.ARROTONDATO,
				background: 'maroon',
			},
			textWin: {
				font: '12pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'right',
			},
			shapeScoreWin: {
				type: EnumFigureType.ARROTONDATO,
				background: 'maroon',
			},
			textScoreWin: {
				textAlign: 'center',
			},
		};
		const mapLevel: Map<string | number, PlayerStyleModel> = new Map<
			string | number,
			PlayerStyleModel
		>();
		mapLevel.set('quarti', styleQuarti);
		mapLevel.set('semi', styleSemi);
		mapLevel.set('final', styleFinal);

		this.diagramProperties = {
			linkColor: 'green',
			styleLevel: mapLevel,
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: partite };
		this.tournmentCmp.reload(this.diagramModel);
	}

	// --------- utils
	getDefault(): TournmentModel[] {
		return [
			{
				key: 'quarti-1',
				player1: 'Inter',
				player2: 'Milan',
				score1: 2,
				score2: 0,
				parentNumber: 0,
				parent: 'semi-1',
			},
			{
				key: 'quarti-2',
				player1: 'Napoli',
				player2: 'Atalanta',
				score1: 3,
				score2: 2,
				parentNumber: 1,
				parent: 'semi-1',
			},
			{
				key: 'quarti-3',
				player1: 'Juventus',
				player2: 'Roma',
				score1: 4,
				score2: 1,
				parentNumber: 0,
				parent: 'semi-2',
			},
			{
				key: 'quarti-4',
				player1: 'Lazio',
				player2: 'Fiorentina',
				score1: 1,
				score2: 2,
				parentNumber: 1,
				parent: 'semi-2',
			},
			{
				key: 'semi-1',
				player1: 'Inter',
				player2: 'Napoli',
				score1: 1,
				score2: 3,
				parentNumber: 0,
				parent: 'final-1',
			},
			{
				key: 'semi-2',
				player1: 'Juventus',
				player2: 'Fiorentina',
				score1: 2,
				score2: 1,
				parentNumber: 1,
				parent: 'final-1',
			},
			{
				key: 'final-1',
				player1: 'Napoli',
				player2: 'Juventus',
				parentNumber: 0,
			},
		];
	}
	getRandomTournment(): TournmentModel[] {
		const squadre: string[] = [
			'Juventus',
			'Inter',
			'Milan',
			'Napoli',
			'Roma',
			'Lazio',
			'Fiorentina',
			'Atalanta',
			'Sassuolo',
			'Empoli',
			'Monza',
			'Sampdoria',
			'Torino',
			'Lecce',
			'Bologna',
			'Genoa',
		];

		return TournmentUtility.makeTournment(squadre);
	}

	getDynamicTournment() {
		const quarti: TournmentModel[] = [
			{
				key: 'quarti1',
				player1: 'Inter',
				player2: 'Milan',
				score1: 2,
				score2: 0,
			},
			{
				key: 'quarti2',
				player1: 'Napoli',
				player2: 'Atalanta',
				score1: 3,
				score2: 2,
			},
			{
				key: 'quarti3',
				player1: 'Juventus',
				player2: 'Roma',
				score1: 4,
				score2: 1,
			},
			{
				key: 'quarti4',
				player1: 'Lazio',
				player2: 'Fiorentina',
				score1: 1,
				score2: 2,
			},
		];

		return TournmentUtility.makeTournmentByModels(quarti);
	}
}
