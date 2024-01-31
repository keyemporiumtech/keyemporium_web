import { ArrayUtility } from '@ddc/kit';
import * as go from 'gojs';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { PlayerStyleModel } from '../model/player-style.model';
import { TournmentModel } from '../model/torunment.model';

export class TournmentUtility {
	// some parameters

	// ---------- props
	static styleLevel: Map<string | number, PlayerStyleModel> = new Map<
		string | number,
		PlayerStyleModel
	>();

	static separatorPlayerColor = 'black';
	static linkColor = 'white';

	static stylePlayer: PlayerStyleModel = {
		shape: {
			type: EnumFigureType.RETTANGOLO,
			background: '#8C8C8C',
			borderColor: '#8C8C8C',
		},
		text: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'left',
		},
		shapeScore: {
			type: EnumFigureType.RETTANGOLO,
			background: '#BABABA',
			borderColor: '#BABABA',
		},
		textScore: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'black',
			textAlign: 'center',
		},
		shapeWin: {
			type: EnumFigureType.RETTANGOLO,
			background: 'darkred',
			borderColor: '#8C8C8C',
		},
		textWin: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'left',
		},
		shapeScoreWin: {
			type: EnumFigureType.RETTANGOLO,
			background: 'green',
			borderColor: '#BABABA',
		},
		textScoreWin: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'center',
		},
	};

	static stylePlayer1: PlayerStyleModel = {
		shape: {
			type: EnumFigureType.RETTANGOLO,
			background: '#8C8C8C',
			borderColor: '#8C8C8C',
		},
		text: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'left',
		},
		shapeScore: {
			type: EnumFigureType.RETTANGOLO,
			background: '#BABABA',
			borderColor: '#BABABA',
		},
		textScore: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'black',
			textAlign: 'center',
		},
		shapeWin: {
			type: EnumFigureType.RETTANGOLO,
			background: 'darkred',
			borderColor: '#8C8C8C',
		},
		textWin: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'left',
		},
		shapeScoreWin: {
			type: EnumFigureType.RETTANGOLO,
			background: 'green',
			borderColor: '#BABABA',
		},
		textScoreWin: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'center',
		},
	};

	static stylePlayer2: PlayerStyleModel = {
		shape: {
			type: EnumFigureType.RETTANGOLO,
			background: '#8C8C8C',
			borderColor: '#8C8C8C',
		},
		text: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'left',
		},
		shapeScore: {
			type: EnumFigureType.RETTANGOLO,
			background: '#BABABA',
			borderColor: '#BABABA',
		},
		textScore: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'black',
			textAlign: 'center',
		},
		shapeWin: {
			type: EnumFigureType.RETTANGOLO,
			background: 'darkred',
			borderColor: '#8C8C8C',
		},
		textWin: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'left',
		},
		shapeScoreWin: {
			type: EnumFigureType.RETTANGOLO,
			background: 'green',
			borderColor: '#BABABA',
		},
		textScoreWin: {
			font: '10pt  Segoe UI,sans-serif',
			textColor: 'white',
			textAlign: 'center',
		},
	};

	static makeNodeTemplate() {
		const $ = go.GraphObject.make;

		return $(
			go.Node,
			'Auto',
			{ selectable: false },
			$(
				go.Panel,
				'Table',
				$(go.RowColumnDefinition, {
					column: 0,
					separatorStroke: TournmentUtility.separatorPlayerColor,
				}),
				$(go.RowColumnDefinition, {
					column: 1,
					separatorStroke: TournmentUtility.separatorPlayerColor,
				}),
				$(go.RowColumnDefinition, {
					row: 0,
					separatorStroke: TournmentUtility.separatorPlayerColor,
				}),
				$(go.RowColumnDefinition, {
					row: 1,
					separatorStroke: TournmentUtility.separatorPlayerColor,
				}),
				// riga 0 colonna 0
				$(
					go.Panel,
					'Auto',
					{ row: 0, column: 0, alignment: go.Spot.Left },
					$(
						go.Shape,
						TournmentUtility.stylePlayer1.shape.type,
						{
							fill: TournmentUtility.stylePlayer1.shape.background,
							width: 90,
						},
						new go.Binding('fill', 'backgroundPlayer1'),
					),
					$(
						go.TextBlock,
						'',
						{
							wrap: go.TextBlock.None,
							width: 90,
							margin: 5,
							isMultiline: false,
							editable: true,
							textAlign: TournmentUtility.stylePlayer1.text.textAlign,
							font: TournmentUtility.stylePlayer1.text.font,
							stroke: TournmentUtility.stylePlayer1.text.textColor,
						},
						new go.Binding('text', 'player1').makeTwoWay(),
						new go.Binding('stroke', 'colorPlayer1'),
					),
				),
				// riga 0 colonna 1
				$(
					go.Panel,
					'Auto',
					{ row: 0, column: 1, alignment: go.Spot.Left },
					$(
						go.Shape,
						TournmentUtility.stylePlayer1.shapeScore.type,
						{
							fill: TournmentUtility.stylePlayer1.shapeScore.background,
							width: 25,
						},
						new go.Binding('fill', 'backgroundScore1'),
					),
					$(
						go.TextBlock,
						'',
						{
							wrap: go.TextBlock.None,
							width: 25,
							margin: 5,
							isMultiline: false,
							editable: true,
							textAlign: TournmentUtility.stylePlayer1.textScore.textAlign,
							font: TournmentUtility.stylePlayer1.textScore.font,
							stroke: TournmentUtility.stylePlayer1.textScore.textColor,
						},
						new go.Binding('text', 'score1').makeTwoWay(),
						new go.Binding('stroke', 'colorScore1'),
					),
				),
				// riga 1 colonna 0
				$(
					go.Panel,
					'Auto',
					{ row: 1, column: 0, alignment: go.Spot.Left },
					$(
						go.Shape,
						TournmentUtility.stylePlayer2.shape.type,
						{
							fill: TournmentUtility.stylePlayer2.shape.background,
							width: 90,
						},
						new go.Binding('fill', 'backgroundPlayer2'),
					),
					$(
						go.TextBlock,
						'',
						{
							wrap: go.TextBlock.None,
							width: 90,
							margin: 5,
							isMultiline: false,
							editable: true,
							textAlign: TournmentUtility.stylePlayer2.text.textAlign,
							font: TournmentUtility.stylePlayer2.text.font,
							stroke: TournmentUtility.stylePlayer2.text.textColor,
						},
						new go.Binding('text', 'player2').makeTwoWay(),
						new go.Binding('stroke', 'colorPlayer2'),
					),
				),
				// riga 1 colonna 1
				$(
					go.Panel,
					'Auto',
					{ row: 1, column: 1, alignment: go.Spot.Left },
					$(
						go.Shape,
						TournmentUtility.stylePlayer2.shapeScore.type,
						{
							fill: TournmentUtility.stylePlayer2.shapeScore.background,
							width: 25,
						},
						new go.Binding('fill', 'backgroundScore2'),
					),
					$(
						go.TextBlock,
						'',
						{
							wrap: go.TextBlock.None,
							width: 25,
							margin: 5,
							isMultiline: false,
							editable: true,
							textAlign: TournmentUtility.stylePlayer2.textScore.textAlign,
							font: TournmentUtility.stylePlayer2.textScore.font,
							stroke: TournmentUtility.stylePlayer2.textScore.textColor,
						},
						new go.Binding('text', 'score2').makeTwoWay(),
						new go.Binding('stroke', 'colorScore2'),
					),
				),
			),
		);
	}

	// ----------- functions

	static isValidScore(textblock, oldstr, newstr) {
		if (newstr === '') return true;
		var num = parseInt(newstr, 10);
		return !isNaN(num) && num >= 0 && num < 1000;
	}

	// ----------- utils

	static checkLevelByKey(key?: string) {
		if (key.indexOf('-') !== -1) {
			const arr: string[] = key.split('-');
			return arr.length && arr[0] ? arr[0] : undefined;
		}
		return undefined;
	}
	/**
	 * Su una lista di squadre (o partecipanti) crea un'associazione di partite
	 * @param players squadre (o partecipanti)
	 * @returns un torneo
	 */
	static makeTournment(players: string[]): TournmentModel[] {
		if (players.length % 2 !== 0) players.push('(empty)');
		players = ArrayUtility.shuffle(players);
		const startingGroups = players.length / 2;
		let currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
		const levelGroups = [];
		currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
		for (var i = 0; i < startingGroups; i++) {
			levelGroups.push(currentLevel + '-' + i);
		}
		const totalGroups = [];
		TournmentUtility.makeLevel(levelGroups, currentLevel, totalGroups, players);
		return totalGroups;
	}

	static makeLevel(
		levelGroups: string[],
		currentLevel: number,
		totalGroups: TournmentModel[],
		players: string[],
	): void {
		currentLevel--;
		const len = levelGroups.length;
		const parentKeys = [];
		let parentNumber = 0;
		let p = '';
		for (var i = 0; i < len; i++) {
			if (parentNumber === 0) {
				p = currentLevel + '-' + parentKeys.length;
				parentKeys.push(p);
			}

			if (players !== null) {
				var p1 = players[i * 2];
				var p2 = players[i * 2 + 1];
				totalGroups.push({
					key: levelGroups[i],
					level: TournmentUtility.checkLevelByKey(levelGroups[i]),
					parent: p,
					player1: p1,
					player2: p2,
					parentNumber: parentNumber,
				});
			} else {
				totalGroups.push({
					key: levelGroups[i],
					level: TournmentUtility.checkLevelByKey(levelGroups[i]),
					parent: p,
					parentNumber: parentNumber,
				});
			}

			parentNumber++;
			if (parentNumber > 1) parentNumber = 0;
		}

		// after the first created level there are no player names
		if (currentLevel >= 0) TournmentUtility.makeLevel(parentKeys, currentLevel, totalGroups, null);
	}

	/**
	 * Su una lista di partite arricchisce l'array e crea le fasi successive
	 * @param matches partite
	 * @returns un torneo
	 */
	static makeTournmentByModels(matches: TournmentModel[]): TournmentModel[] {
		if (matches.length % 2 !== 0) return;
		const startingGroups = matches.length;
		let currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
		const levelGroups = [];
		currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));
		for (var i = 0; i < startingGroups; i++) {
			levelGroups.push(currentLevel + '-' + i);
		}
		const totalGroups = [];
		TournmentUtility.makeLevelByModels(levelGroups, currentLevel, totalGroups, matches);
		return totalGroups;
	}

	static makeLevelByModels(
		levelGroups: string[],
		currentLevel: number,
		totalGroups: TournmentModel[],
		matches: TournmentModel[],
	): void {
		currentLevel--;
		const len = levelGroups.length;
		const parentKeys = [];
		let parentNumber = 0;
		let p = '';
		for (var i = 0; i < len; i++) {
			if (parentNumber === 0) {
				p = currentLevel + '-' + parentKeys.length;
				parentKeys.push(p);
			}

			if (matches !== null) {
				var m = matches[i];
				m.key = levelGroups[i];
				m.level = TournmentUtility.checkLevelByKey(levelGroups[i]);
				m.parent = p;
				m.parentNumber = parentNumber;
				totalGroups.push(m);
			} else {
				totalGroups.push({
					key: levelGroups[i],
					level: TournmentUtility.checkLevelByKey(levelGroups[i]),
					parent: p,
					parentNumber: parentNumber,
				});
			}

			parentNumber++;
			if (parentNumber > 1) parentNumber = 0;
		}

		// after the first created level there are no player names
		if (currentLevel >= 0) TournmentUtility.makeLevel(parentKeys, currentLevel, totalGroups, null);
	}

	/**
	 * Arricchisce l'array del torneo con lo stile configurato nelle properties
	 * e assegna le squadre vincenti alle fasi successive sulla base del punteggio
	 * @param list array di partite
	 * @param diagram diagramma
	 */
	static makeMatchControls(list: TournmentModel[], diagram: go.Diagram) {
		list.forEach((el) => {
			TournmentUtility.setLevelByKey(el);
			TournmentUtility.setStyleModel(el, diagram);
			TournmentUtility.setWinnerMatch(el, diagram);
		});
	}

	static setLevelByKey(data: TournmentModel): void {
		if (!data.level) {
			data.level = TournmentUtility.checkLevelByKey(data.key);
		}
	}
	/**
	 * Aggiunge alla partita lo stile configurato nelle properties
	 * @param data partita
	 * @param diagram diagramma
	 */
	static setStyleModel(data: TournmentModel, diagram: go.Diagram) {
		if (isNaN(data.score1) || isNaN(data.score2)) return;

		let styleLevel: PlayerStyleModel;
		if (data.level && TournmentUtility.styleLevel.has(data.level)) {
			styleLevel = TournmentUtility.styleLevel.get(data.level);
		}

		if (data.score1 > data.score2) {
			// player 1
			diagram.model.setDataProperty(
				data,
				'backgroundPlayer1',
				styleLevel && styleLevel.shapeWin && styleLevel.shapeWin.background
					? styleLevel.shapeWin.background
					: TournmentUtility.stylePlayer1.shapeWin.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorPlayer1',
				styleLevel && styleLevel.textWin && styleLevel.textWin.textColor
					? styleLevel.textWin.textColor
					: TournmentUtility.stylePlayer1.textWin.textColor,
			);
			diagram.model.setDataProperty(
				data,
				'backgroundScore1',
				styleLevel && styleLevel.shapeScoreWin && styleLevel.shapeScoreWin.background
					? styleLevel.shapeScoreWin.background
					: TournmentUtility.stylePlayer1.shapeScoreWin.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorScore1',
				styleLevel && styleLevel.textScoreWin && styleLevel.textScoreWin.textColor
					? styleLevel.textScoreWin.textColor
					: TournmentUtility.stylePlayer1.textScoreWin.textColor,
			);

			// player 2
			diagram.model.setDataProperty(
				data,
				'backgroundPlayer2',
				styleLevel && styleLevel.shape && styleLevel.shape.background
					? styleLevel.shape.background
					: TournmentUtility.stylePlayer2.shape.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorPlayer2',
				styleLevel && styleLevel.text && styleLevel.text.textColor
					? styleLevel.text.textColor
					: TournmentUtility.stylePlayer2.text.textColor,
			);
			diagram.model.setDataProperty(
				data,
				'backgroundScore2',
				styleLevel && styleLevel.shapeScore && styleLevel.shapeScore.background
					? styleLevel.shapeScore.background
					: TournmentUtility.stylePlayer2.shapeScore.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorScore2',
				styleLevel && styleLevel.textScore && styleLevel.textScore.textColor
					? styleLevel.textScore.textColor
					: TournmentUtility.stylePlayer2.textScore.textColor,
			);
		}
		if (data.score1 < data.score2) {
			// player 1
			diagram.model.setDataProperty(
				data,
				'backgroundPlayer1',
				styleLevel && styleLevel.shape && styleLevel.shape.background
					? styleLevel.shape.background
					: TournmentUtility.stylePlayer1.shape.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorPlayer1',
				styleLevel && styleLevel.text && styleLevel.text.textColor
					? styleLevel.text.textColor
					: TournmentUtility.stylePlayer1.text.textColor,
			);
			diagram.model.setDataProperty(
				data,
				'backgroundScore1',
				styleLevel && styleLevel.shapeScore && styleLevel.shapeScore.background
					? styleLevel.shapeScore.background
					: TournmentUtility.stylePlayer1.shapeScore.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorScore1',
				styleLevel && styleLevel.textScore && styleLevel.textScore.textColor
					? styleLevel.textScore.textColor
					: TournmentUtility.stylePlayer1.textScore.textColor,
			);

			// player 2
			diagram.model.setDataProperty(
				data,
				'backgroundPlayer2',
				styleLevel && styleLevel.shapeWin && styleLevel.shapeWin.background
					? styleLevel.shapeWin.background
					: TournmentUtility.stylePlayer2.shapeWin.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorPlayer2',
				styleLevel && styleLevel.textWin && styleLevel.textWin.textColor
					? styleLevel.textWin.textColor
					: TournmentUtility.stylePlayer2.textWin.textColor,
			);
			diagram.model.setDataProperty(
				data,
				'backgroundScore2',
				styleLevel && styleLevel.shapeScoreWin && styleLevel.shapeScoreWin.background
					? styleLevel.shapeScoreWin.background
					: TournmentUtility.stylePlayer1.shapeScoreWin.background,
			);
			diagram.model.setDataProperty(
				data,
				'colorScore2',
				styleLevel && styleLevel.textScoreWin && styleLevel.textScoreWin.textColor
					? styleLevel.textScoreWin.textColor
					: TournmentUtility.stylePlayer1.textScoreWin.textColor,
			);
		}
	}

	/**
	 * Assegna alla fase successiva la squadra vincente
	 * @param data partita
	 * @param diagram diagramma
	 */
	static setWinnerMatch(data: TournmentModel, diagram: go.Diagram) {
		// TODO: What happens if score1 and score2 are the same number?

		// both score1 and score2 are numbers,
		// set the name of the higher-score'd player in the advancing (parent) node
		// if the data.parentNumber is 0, then we set player1 on the parent
		// if the data.parentNumber is 1, then we set player2
		const parent = diagram.findNodeForKey(data.parent);
		if (parent === null) return;

		var playerName = data.score1 > data.score2 ? data.player1 : data.player2;
		if (data.score1 === data.score2) playerName = '';
		diagram.model.setDataProperty(
			parent.data,
			data.parentNumber === 0 ? 'player1' : 'player2',
			playerName,
		);
	}
}
