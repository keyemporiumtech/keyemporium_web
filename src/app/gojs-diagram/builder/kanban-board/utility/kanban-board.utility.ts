import * as go from 'gojs';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { KanbanBoardModel } from '../model/kanban-board.model';

export class KanbanBoardUtility {
	// --------- props
	static StartDate = new Date();
	static noteColors = ['lightgray', '#CC293D', '#FFD700', '#009CCC'];
	static shapeGroup: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: '#F1F1F1',
		borderSize: 4,
		payload: { backgroundHighlight: '#D6D6D6' },
	};
	static textGroup: TextBlockModel = {
		font: '15px Lato, sans-serif',
		textColor: 'black',
		payload: { fontHighlight: '15px Lato, sans-serif', textColorHighlight: 'balck' },
	};
	static shapeStatus: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: 'darkred', // lightgray
		borderColor: '#CCCCCC',
		borderSize: 1,
	};
	static shapeNode: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: 'white',
		borderColor: '#CCCCCC',
		borderSize: 1,
	};
	static textNode: TextBlockModel = {
		font: 'bold 12px Lato, bold sans-serif',
		textColor: 'black',
		payload: { fontContent: '11px Lato, sans-serif', textColorContent: 'black' },
	};

	static textStatusSTOP: { color: string; text: string } = {
		color: '#CC293D',
		text: 'Stopped',
	};
	static textStatusPROGRESS: { color: string; text: string } = {
		color: '#FFD700',
		text: 'In Progress',
	};
	static textStatusCOMPLETE: { color: string; text: string } = {
		color: '#009CCC',
		text: 'Completed',
	};

	static makeGroupTemplate(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;
		return $(
			go.Group,
			'Vertical',
			{
				selectable: false,
				selectionObjectName: 'SHAPE', // even though its not selectable, this is used in the layout
				layerName: 'Background', // all lanes are always behind all nodes and links
				layout: $(
					go.GridLayout, // automatically lay out the lane's subgraph
					{
						wrappingColumn: 1,
						cellSize: new go.Size(1, 1),
						spacing: new go.Size(5, 5),
						alignment: go.GridLayout.Position,
						comparer: (a: any, b: any) => {
							// can re-order tasks within a lane
							const ay = a.location.y;
							const by = b.location.y;
							if (isNaN(ay) || isNaN(by)) return 0;
							if (ay < by) return -1;
							if (ay > by) return 1;
							return 0;
						},
					},
				),
				click: (e, grp) => {
					// allow simple click on group to clear selection
					if (!e.shift && !e.control && !e.meta) e.diagram.clearSelection();
				},
				computesBoundsIncludingLocation: true,
				computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon
				handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
				mouseDragEnter: (e, grp, prev) => KanbanBoardUtility.highlightGroup(grp, true, myDiagram),
				mouseDragLeave: (e, grp, next) => KanbanBoardUtility.highlightGroup(grp, false, myDiagram),
				mouseDrop: (e, grp: any) => {
					// dropping a copy of some Nodes and Links onto this Group adds them to this Group
					// don't allow drag-and-dropping a mix of regular Nodes and Groups
					if (e.diagram.selection.all((n) => !(n instanceof go.Group))) {
						const ok = grp.addMembers(grp.diagram.selection, true);
						if (!ok) grp.diagram.currentTool.doCancel();
					}
				},
				subGraphExpandedChanged: (grp: any) => {
					const shp = grp.selectionObject;
					if (grp.diagram.undoManager.isUndoingRedoing) return;
					if (grp.isSubGraphExpanded) {
						shp.width = grp.data.savedBreadth;
					} else {
						// remember the original width
						if (!isNaN(shp.width)) grp.diagram.model.set(grp.data, 'savedBreadth', shp.width);
						shp.width = NaN;
					}
				},
			},
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
			new go.Binding('isSubGraphExpanded', 'expanded').makeTwoWay(),
			// the lane header consisting of a TextBlock and an expander button
			$(
				go.Panel,
				'Horizontal',
				{ name: 'HEADER', alignment: go.Spot.Left },
				$('SubGraphExpanderButton', { margin: 5 }), // this remains always visible
				$(
					go.TextBlock, // the lane label
					{
						font: this.textGroup.font,
						editable: true,
						margin: new go.Margin(2, 0, 0, 0),
						stroke: this.textGroup.textColor,
					},
					// this is hidden when the swimlane is collapsed
					new go.Binding('visible', 'isSubGraphExpanded').ofObject(),
					new go.Binding('text', '', KanbanBoardUtility.textGroupConvert).makeTwoWay(),
				),
			), // end Horizontal Panel
			$(
				go.Panel,
				'Auto', // the lane consisting of a background Shape and a Placeholder representing the subgraph
				$(
					go.Shape,
					'Rectangle', // this is the resized object
					{
						name: 'SHAPE',
						fill: this.shapeGroup.background,
						stroke: null,
						strokeWidth: this.shapeGroup.borderSize,
					}, // strokeWidth controls space between lanes
					new go.Binding('fill', 'isHighlighted', (h) =>
						h ? this.shapeGroup.payload.backgroundHighliht : this.shapeGroup.background,
					).ofObject(),
					new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
				),
				$(go.Placeholder, { padding: 12, alignment: go.Spot.TopLeft }),
				$(
					go.TextBlock, // this TextBlock is only seen when the swimlane is collapsed
					{
						name: 'LABEL',
						font: this.textGroup.payload.fontHighlight,
						editable: true,
						angle: 90,
						alignment: go.Spot.TopLeft,
						margin: new go.Margin(4, 0, 0, 2),
						stroke: this.textGroup.payload.textColorHighlight,
					},
					new go.Binding('visible', 'isSubGraphExpanded', (e) => !e).ofObject(),
					new go.Binding('text').makeTwoWay(),
				),
			), // end Auto Panel
		); // end Group
	}
	/**
	 * Costruisce il nodo
	 * @param myDiagram diagramma per associare la transizione del cambio colore status al click
	 * @param callbackText dato un modello ritorna un stringa da visualizzare nello shape
	 * @returns go.Node
	 */
	static makeNodeTemplate(
		myDiagram: go.Diagram,
		callbackText?: (person: KanbanBoardModel) => string,
	): any {
		const $ = go.GraphObject.make;
		return $(
			go.Node,
			'Horizontal',
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
			// KanbanBoardUtility.standardContextMenus(),
			$(
				go.Shape,
				(KanbanBoardUtility.shapeStatus as any).type,
				{
					fill: (KanbanBoardUtility.shapeStatus as any).background,
					strokeWidth: (KanbanBoardUtility.shapeStatus as any).borderSize,
					stroke: (KanbanBoardUtility.shapeStatus as any).borderColor,
					width: 6,
					stretch: go.GraphObject.Vertical,
					alignment: go.Spot.Left,
					// if a user clicks the colored portion of a node, cycle through colors
					click: (e: any, obj: any) => {
						myDiagram.startTransaction('Update node color');
						let newColor = parseInt(obj.part.data.color) + 1;
						if (newColor > KanbanBoardUtility.noteColors.length - 1) newColor = 0;
						myDiagram.model.setDataProperty(obj.part.data, 'color', newColor);
						myDiagram.commitTransaction('Update node color');
					},
				},
				new go.Binding('fill', 'color', KanbanBoardUtility.getNoteColor),
				new go.Binding('stroke', 'color', KanbanBoardUtility.getNoteColor),
			),
			$(
				go.Panel,
				'Auto',
				$(go.Shape, (KanbanBoardUtility.shapeNode as any).type, {
					fill: (KanbanBoardUtility.shapeNode as any).background,
					stroke: (KanbanBoardUtility.shapeNode as any).borderColor,
				}),
				$(
					go.Panel,
					'Table',
					{ width: 130, minSize: new go.Size(NaN, 50) },
					$(
						go.TextBlock,
						{
							name: 'TEXT',
							margin: 6,
							font: this.textNode.font,
							editable: true,
							stroke: this.textNode.textColor,
							maxSize: new go.Size(130, NaN),
							alignment: go.Spot.TopLeft,
							row: 0,
						},
						new go.Binding('text', 'text').makeTwoWay(),
					),
					$(
						go.TextBlock,
						{
							name: 'TEXT',
							margin: 6,
							font: this.textNode.payload.fontContent,
							editable: true,
							stroke: this.textNode.payload.textColorContent,
							maxSize: new go.Size(130, NaN),
							alignment: go.Spot.TopLeft,
							row: 1,
						},
						new go.Binding('text', '', KanbanBoardUtility.textConvert),
					),
					$(
						go.TextBlock,
						{
							name: 'TEXT',
							margin: 6,
							font: this.textNode.payload.fontContent,
							editable: true,
							stroke: this.textNode.payload.textColorContent,
							maxSize: new go.Size(130, NaN),
							alignment: go.Spot.TopLeft,
							row: 1,
						},
						new go.Binding('text', '', callbackText ? callbackText : (v) => ''),
					),
				),
			),
		);
	}

	/**
	 * Costruisce un tooltip per un elemento del grafo
	 * @param callbackTooltip dato un modello ritorna un stringa da visualizzare in tooltip
	 * @returns tooltip
	 */
	static makeTooltip(callbackTooltip?: (person: KanbanBoardModel) => string): any {
		const $ = go.GraphObject.make;
		return $(
			'ToolTip',
			{ 'Border.fill': 'whitesmoke', 'Border.stroke': 'black' },
			$(
				go.Panel,
				'Table',
				$(
					go.TextBlock,
					{
						font: 'bold 10pt Helvetica, bold Arial, sans-serif',
						wrap: go.TextBlock.WrapFit,
						margin: 5,
						row: 0,
					},
					new go.Binding('text', '', (data) => {
						let str = KanbanBoardUtility.textTooltipConvert(data);
						str += '\n' + KanbanBoardUtility.textPersonsTooltip(data);
						return str;
					}),
				),
				$(
					go.TextBlock,
					{
						font: 'bold 10pt Helvetica, bold Arial, sans-serif',
						wrap: go.TextBlock.WrapFit,
						margin: 5,
						row: 1,
					},
					new go.Binding('text', '', callbackTooltip ? callbackTooltip : (v) => ''),
				),
			),
		);
	}

	static makeTooltipGroup(callbackTooltip?: (person: KanbanBoardModel) => string): any {
		const $ = go.GraphObject.make;
		return $(
			'ToolTip',
			{ 'Border.fill': 'whitesmoke', 'Border.stroke': 'black' },
			$(
				go.Panel,
				'Table',
				$(
					go.TextBlock,
					{
						font: 'bold 10pt Helvetica, bold Arial, sans-serif',
						wrap: go.TextBlock.WrapFit,
						margin: 5,
						row: 0,
					},
					new go.Binding('text', '', (data) => {
						let str = KanbanBoardUtility.textGroupConvert(data);
						str += '\n' + KanbanBoardUtility.textGroupTooltip(data);
						return str;
					}),
				),
				$(
					go.TextBlock,
					{
						font: 'bold 10pt Helvetica, bold Arial, sans-serif',
						wrap: go.TextBlock.WrapFit,
						margin: 5,
						row: 1,
					},
					new go.Binding('text', '', callbackTooltip ? callbackTooltip : (v) => ''),
				),
			),
		);
	}

	/**
	 * Costruisce la legenda con degli stati
	 * @returns go.Part legenda
	 */
	static makeLegendaStatus(title?: string): any {
		const $ = go.GraphObject.make;
		return $(
			go.Part,
			'Table',
			{ position: new go.Point(10, 10), selectable: false },
			$(go.TextBlock, title ? title : 'Status', {
				row: 0,
				font: '700 14px Droid Serif, sans-serif',
			}), // end row 0
			$(
				go.Panel,
				'Horizontal',
				{ row: 1, alignment: go.Spot.Left },
				$(go.Shape, 'Rectangle', {
					desiredSize: new go.Size(10, 10),
					fill: KanbanBoardUtility.textStatusSTOP.color,
					margin: 5,
				}),
				$(go.TextBlock, KanbanBoardUtility.textStatusSTOP.text, {
					font: '700 13px Droid Serif, sans-serif',
				}),
			), // end row 1
			$(
				go.Panel,
				'Horizontal',
				{ row: 2, alignment: go.Spot.Left },
				$(go.Shape, 'Rectangle', {
					desiredSize: new go.Size(10, 10),
					fill: KanbanBoardUtility.textStatusPROGRESS.color,
					margin: 5,
				}),
				$(go.TextBlock, KanbanBoardUtility.textStatusPROGRESS.text, {
					font: '700 13px Droid Serif, sans-serif',
				}),
			), // end row 2
			$(
				go.Panel,
				'Horizontal',
				{ row: 3, alignment: go.Spot.Left },
				$(go.Shape, 'Rectangle', {
					desiredSize: new go.Size(10, 10),
					fill: KanbanBoardUtility.textStatusCOMPLETE.color,
					margin: 5,
				}),
				$(go.TextBlock, KanbanBoardUtility.textStatusCOMPLETE.text, {
					font: '700 13px Droid Serif, sans-serif',
				}),
			), // end row 3
		);
	}

	/**
	 * Costruisce la legenda con i pulsanti per aggiungere un gruppo e un nodo
	 * @param myDiagram diagramma per associare la transizione dei pulsanti
	 * @returns go.Part legenda
	 */
	static makeLegendaAdd(myDiagram: go.Diagram): any {
		const $ = go.GraphObject.make;
		return $(
			go.Part,
			'Table',
			{ position: new go.Point(10, 10), selectable: false },
			$(
				go.Panel,
				'Horizontal',
				{
					row: 0,
					click: (e, node) => {
						e.diagram.startTransaction('add node');
						let sel = e.diagram.selection.first();
						if (!sel) sel = e.diagram.findTopLevelGroups().first();
						if (!(sel instanceof go.Group)) sel = (sel as any).containingGroup;
						if (!sel) return;
						const newdata = {
							group: sel.key,
							loc: '0 9999',
							text: 'New item ' + (sel as any).memberParts.count,
							color: 0,
							percent: 0,
						};
						e.diagram.model.addNodeData(newdata);
						e.diagram.commitTransaction('add node');
						const newnode: any = myDiagram.findNodeForData(newdata);
						e.diagram.select(newnode);
						e.diagram.commandHandler.editTextBlock();
						e.diagram.commandHandler.scrollToPart(newnode);
					},
					background: 'white',
					margin: new go.Margin(10, 4, 4, 4),
				},
				$(
					go.Panel,
					'Auto',
					$(go.Shape, 'Rectangle', {
						strokeWidth: 0,
						stroke: null,
						fill: '#6FB583',
					}),
					$(go.Shape, 'PlusLine', {
						margin: 6,
						strokeWidth: 2,
						width: 12,
						height: 12,
						stroke: 'white',
						background: '#6FB583',
					}),
				),
				$(go.TextBlock, 'New Item', {
					font: '10px Lato, sans-serif',
					margin: 6,
				}),
			), // end new item
			$(
				go.Panel,
				'Horizontal',
				{
					row: 1,
					click: (e, node) => {
						e.diagram.startTransaction('add node');
						let sel = e.diagram.selection.first();
						if (!sel) sel = e.diagram.findTopLevelGroups().first();
						if (!(sel instanceof go.Group)) sel = (sel as any).containingGroup;
						if (!sel) return;
						const newdata = {
							isGroup: true,
							loc: '0 9999',
							text: 'New Group ',
							color: 0,
							percent: 0,
						};
						e.diagram.model.addNodeData(newdata);
						e.diagram.commitTransaction('add node');
						const newnode: any = myDiagram.findNodeForData(newdata);
						e.diagram.select(newnode);
						e.diagram.commandHandler.editTextBlock();
						e.diagram.commandHandler.scrollToPart(newnode);
					},
					background: 'white',
					margin: new go.Margin(10, 4, 4, 11),
				},
				$(
					go.Panel,
					'Auto',
					$(go.Shape, 'Rectangle', {
						strokeWidth: 0,
						stroke: null,
						fill: '#6FB583',
					}),
					$(go.Shape, 'PlusLine', {
						margin: 6,
						strokeWidth: 2,
						width: 12,
						height: 12,
						stroke: 'white',
						background: '#6FB583',
					}),
				),
				$(go.TextBlock, 'New Group', {
					font: '10px Lato, sans-serif',
					margin: 6,
				}),
			),
		);
	}

	// ------------- functions
	static textGroupConvert(data: KanbanBoardModel) {
		let str = data.text;
		if (data.percent !== undefined) {
			str += ' (' + data.percent + '%)';
		}
		return str;
	}

	static textGroupTooltip(data: KanbanBoardModel) {
		let str = '';
		if (data.dtaInit) {
			str += '\nInizio:' + data.dtaInit.toLocaleDateString();
		}
		if (data.dtaEnd) {
			str += '\nFine:' + data.dtaEnd.toLocaleDateString();
		}
		return str;
	}

	static textConvert(data: KanbanBoardModel) {
		let str = '';
		if (data.percent !== undefined) {
			str += '\nAvanzamento:' + data.percent + '%';
		}
		if (data.dtaInit) {
			str += '\nInizio:' + data.dtaInit.toLocaleDateString();
		}
		if (data.dtaEnd) {
			str += '\nFine:' + data.dtaEnd.toLocaleDateString();
		}
		return str;
	}

	static textTooltipConvert(data: KanbanBoardModel) {
		let str = 'Task: ' + data.text;
		if (data.percent !== undefined) {
			str += ' (' + data.percent + '%)\n';
		}
		if (data.dtaInit) {
			str += '\nInizio:' + data.dtaInit.toLocaleDateString();
		}
		if (data.dtaEnd) {
			str += '\nFine:' + data.dtaEnd.toLocaleDateString();
		}
		return str;
	}

	static textPersonsTooltip(data: KanbanBoardModel) {
		let str = '';
		if (data && data.persons && data.persons.length) {
			data.persons.forEach((person) => {
				str += '\n' + person;
			});
		}
		return str;
	}

	static dateDiffInDays(a: Date, b: Date): number {
		const _MS_PER_DAY = 1000 * 60 * 60 * 24;
		// Discard the time and time-zone information.
		const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

		return Math.floor((utc2 - utc1) / _MS_PER_DAY);
	}

	static addDays(dta: Date, days: number): Date {
		if (!dta || days === undefined || days === null) return undefined;
		if (days === 0) return dta;
		var res = new Date(dta);
		res.setDate(res.getDate() + days);
		return res;
	}
	// ------------- utils

	static setInfo(list: KanbanBoardModel[]): void {
		list.forEach((el) => {
			el.dtaInit = KanbanBoardUtility.addDays(KanbanBoardUtility.StartDate, el.start);
			el.dtaEnd = KanbanBoardUtility.addDays(el.dtaInit, el.duration);
		});

		KanbanBoardUtility.setGroupInfo(list);
	}

	static setGroupInfo(list: KanbanBoardModel[]): void {
		const activities = list.filter((el) => !el.isGroup && el.group);
		const mapGroup: Map<string, KanbanBoardModel[]> = new Map<string, KanbanBoardModel[]>();
		activities.forEach((el) => {
			if (!mapGroup.has(el.group)) {
				mapGroup.set(el.group, [el]);
			} else {
				mapGroup.get(el.group).push(el);
			}
		});

		let groupIndex: number;
		let objDuration: any;
		mapGroup.forEach((activities, gr) => {
			groupIndex = list.findIndex((el) => el.key === gr);
			if (groupIndex !== -1) {
				list.at(groupIndex).percent = KanbanBoardUtility.calcGroupPercent(activities);
				/*
				list.at(groupIndex).duration = activities
					.map((ac) => ac.duration)
					.reduce((a, b) => a + b, 0);
          */
				objDuration = KanbanBoardUtility.calcGroupDuration(activities);
				list.at(groupIndex).start = objDuration.start;
				list.at(groupIndex).duration = objDuration.duratio;
				list.at(groupIndex).dtaInit = objDuration.dtaInit;
				list.at(groupIndex).dtaEnd = objDuration.dtaEnd;
			}
		});
	}

	static calcGroupPercent(activities: KanbanBoardModel[]): number {
		let cnt = 0;
		let sum = 0;
		activities.forEach((el) => {
			cnt++;
			sum += el.percent ? el.percent : 0;
		});
		return !sum ? 0 : +(sum / cnt).toFixed(2);
	}

	static calcGroupDuration(activities: KanbanBoardModel[]): any {
		let dtaInit;
		let dtaEnd;
		activities.forEach((el) => {
			if (
				(el.dtaInit && !dtaInit) ||
				(el.dtaInit && dtaInit && el.dtaInit.getTime() < dtaInit.getTime())
			) {
				dtaInit = el.dtaInit;
			}
			if (
				(el.dtaEnd && !dtaEnd) ||
				(el.dtaEnd && dtaEnd && el.dtaEnd.getTime() > dtaEnd.getTime())
			) {
				dtaEnd = el.dtaEnd;
			}
		});
		// start
		let start = 0;
		let duration = 0;
		if (KanbanBoardUtility.StartDate && dtaInit) {
			start = KanbanBoardUtility.dateDiffInDays(KanbanBoardUtility.StartDate, dtaInit);
		}
		if (dtaInit && dtaEnd) {
			duration = KanbanBoardUtility.dateDiffInDays(dtaInit, dtaEnd);
		}
		return { dtaInit: dtaInit, dtaEnd: dtaEnd, start: start, duration: duration };
	}

	// this is called after nodes have been moved
	static relayoutDiagram(myDiagram: go.Diagram) {
		myDiagram.selection.each((n) => n.invalidateLayout());
		myDiagram.layoutDiagram();
	}

	// There are only three note colors by default, blue, red, and yellow but you could add more here:
	static getNoteColor(num: any) {
		return KanbanBoardUtility.noteColors[Math.min(num, KanbanBoardUtility.noteColors.length - 1)];
	}

	// While dragging, highlight the dragged-over group
	static highlightGroup(grp: any, show: any, myDiagram: go.Diagram) {
		if (show) {
			const part = myDiagram.toolManager.draggingTool.currentPart;
			if (part?.containingGroup !== grp) {
				grp.isHighlighted = true;
				return;
			}
		}
		grp.isHighlighted = false;
	}
}
