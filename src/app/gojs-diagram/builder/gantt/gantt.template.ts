import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { GanttLayout } from './classes/gantt.layout';
import { GanttPropertiesMaker } from './properties/gantt-properties.maker';
import { GanttProperties } from './properties/gantt.properties';
import { GanttUtility } from './utility/gantt.utility';

export class GanttTemplate extends GojsBuilder {
	myChangingSelection = false;
	myTask: go.Diagram;
	myTaskId: string = '';
	myGantt: go.Diagram;
	myGanttId: string = '';

	make(divId: string, properties?: GanttProperties): go.Diagram {
		this.myGanttId = divId;
		this.myTaskId = divId + '_task';
		const template = this.makeGanttAndTask(this.myGanttId, this.myTaskId, properties);
		this.myGantt = template.gantt;
		this.myTask = template.task;
		return this.myGantt;
	}

	makeProperties(properties?: GanttProperties) {
		GanttPropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		GanttPropertiesMaker.reset();
	}

	makeGanttAndTask(divGanttId: string, divTaskId: string, properties?: GanttProperties) {
		GanttPropertiesMaker.setValues(properties);

		this.init();

		const myTimeline = this.makeTimeline();

		const myHighlightTask = this.makeHighlightTask();

		const myGrid = this.makeGrid();

		const myHighlightDay = this.makeHighlightDay();

		const myGantt = this.makeGantt(myTimeline, myHighlightTask, myGrid, myHighlightDay, divGanttId);

		const myTasksHeader = this.makeTaskHeader();

		const myTask = this.makeTask(myTasksHeader, myHighlightTask, divTaskId);

		myTask.addDiagramListener('TreeCollapsed', (e: any) => myGantt.layoutDiagram(true));
		myTask.addDiagramListener('TreeExpanded', (e: any) => myGantt.layoutDiagram(true));
		myTask.addDiagramListener('ChangedSelection', (e: any) => {
			if (this.myChangingSelection) return;
			this.myChangingSelection = true;
			const tasks: any = [];
			e.diagram.selection.each((part: any) => {
				if (part instanceof go.Node) tasks.push(myGantt.findNodeForData(part.data));
			});
			myGantt.selectCollection(tasks);
			this.myChangingSelection = false;
		});

		myTask.addDiagramListener('ViewportBoundsChanged', (e) => {
			if (GanttUtility.changingView) return;
			GanttUtility.changingView = true;
			myTasksHeader.position = new go.Point(
				myTasksHeader.position.x,
				myTask.viewportBounds.position.y,
			);
			myGantt.scale = myTask.scale;
			myGantt.position = new go.Point(myGantt.position.x, myTask.position.y);
			myTimeline.position = new go.Point(myTimeline.position.x, myGantt.viewportBounds.position.y);
			GanttUtility.changingView = false;
		});

		this.makeTaskNodeTemplate(myTask, myGantt, myHighlightTask, myGrid);
		// myTask.nodeTemplate.contextMenu = GanttUtility.standardContextMenus();

		myGantt.addDiagramListener('ChangedSelection', (e: any) => {
			if (this.myChangingSelection) return;
			this.myChangingSelection = true;
			const bars: any = [];
			e.diagram.selection.each((part: any) => {
				if (part instanceof go.Node) bars.push(myTask.findNodeForData(part.data));
			});
			myTask.selectCollection(bars);
			this.myChangingSelection = false;
		});

		myGantt.addDiagramListener('ViewportBoundsChanged', (e) => {
			if (GanttUtility.changingView) return;
			GanttUtility.changingView = true;
			myTask.scale = myGantt.scale;
			myTask.position = new go.Point(myTask.position.x, myGantt.position.y);
			myTasksHeader.position = new go.Point(
				myTasksHeader.position.x,
				myTask.viewportBounds.position.y,
			);
			myGantt.position = new go.Point(myGantt.position.x, myTask.position.y); // don't scroll more if myTasks can't scroll more
			myTimeline.position = new go.Point(myTimeline.position.x, myGantt.viewportBounds.position.y);
			GanttUtility.changingView = false;
		});

		myGantt.layout = new GanttLayout(myTask);

		// myGantt.nodeTemplate.contextMenu = GanttUtility.standardContextMenus();

		const model = new go.GraphLinksModel({
			linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksMode
			// linkDataArray: linkDataArray,
		});
		myTask.model = model;
		myGantt.model = model;
		model.undoManager.isEnabled = true;

		return { task: myTask, gantt: myGantt };
	}

	init() {
		go.Shape.defineFigureGenerator('RangeBar', (shape, w, h) => {
			const b = Math.min(5, w);
			const d = Math.min(5, h);
			return new go.Geometry().add(
				new go.PathFigure(0, 0, true)
					.add(new go.PathSegment(go.PathSegment.Line, w, 0))
					.add(new go.PathSegment(go.PathSegment.Line, w, h))
					.add(new go.PathSegment(go.PathSegment.Line, w - b, h - d))
					.add(new go.PathSegment(go.PathSegment.Line, b, h - d))
					.add(new go.PathSegment(go.PathSegment.Line, 0, h).close()),
			);
		});
	}

	makeTask(myTasksHeader: go.Part, myHighlightTask: go.Part, divId: string) {
		const $ = go.GraphObject.make;

		const myTasks = new go.Diagram(divId, {
			initialContentAlignment: go.Spot.Right,
			// make room on top for myTimeline and a bit of spacing; on bottom for whole task row and a bit more
			padding: new go.Margin(GanttUtility.TimelineHeight + 4, 0, GanttUtility.GridCellHeight, 0), // needs to be the same vertically as for myGantt
			hasVerticalScrollbar: false,
			allowMove: false,
			allowCopy: false,
			'commandHandler.deletesTree': true,
			layout: $(go.TreeLayout, {
				alignment: go.TreeLayout.AlignmentStart,
				compaction: go.TreeLayout.CompactionNone,
				layerSpacing: 16,
				layerSpacingParentOverlap: 1,
				nodeIndentPastParent: 1,
				nodeSpacing: 0,
				portSpot: go.Spot.Bottom,
				childPortSpot: go.Spot.Left,
				arrangementSpacing: new go.Size(0, 0),
				// after the tree layout, change the width of each node so that all
				// of the nodes have widths such that the collection has a given width
				commitNodes: function () {
					// method override must be function, not =>
					(go.TreeLayout.prototype as any).commitNodes.call(this);
					GanttUtility.updateNodeWidths(myTasks, myTasksHeader, 400);
				},
			}),
			mouseLeave: (e: any, node: any) => (myHighlightTask.visible = false),
			'animationManager.isInitial': false,
		} as any);

		myTasks.add(myTasksHeader);

		myTasks.linkTemplate = $(
			go.Link,
			{
				selectable: false,
				routing: go.Link.Orthogonal,
				fromEndSegmentLength: 1,
				toEndSegmentLength: 1,
			},
			$(go.Shape),
		);

		myTasks.linkTemplateMap.add(
			'Dep',
			$(
				go.Link, // ignore these links in the Tasks diagram
				{ selectable: false, visible: false, isTreeLink: false },
			),
		);

		return myTasks;
	}

	makeGantt(
		myTimeline: go.Part,
		myHighlightTask: go.Part,
		myGrid: go.Part,
		myHighlightDay: go.Part,
		divId: string,
	) {
		const $ = go.GraphObject.make;

		const myGantt = new go.Diagram(divId, {
			initialPosition: new go.Point(-10, -100), // show labels
			// make room on top for myTimeline and a bit of spacing; on bottom for whole task row and a bit more
			padding: new go.Margin(
				GanttUtility.TimelineHeight + 4,
				GanttUtility.GridCellWidth * 7,
				GanttUtility.GridCellHeight,
				0,
			), // needs to be the same vertically as for myTasks
			scrollMargin: new go.Margin(0, GanttUtility.GridCellWidth * 7, 0, 0), // and allow scrolling to a week beyond that
			allowCopy: false,
			'commandHandler.deletesTree': true,
			'draggingTool.isGridSnapEnabled': true,
			'draggingTool.gridSnapCellSize': new go.Size(
				GanttUtility.GridCellWidth,
				GanttUtility.GridCellHeight,
			),
			'draggingTool.dragsTree': true,
			'resizingTool.isGridSnapEnabled': true,
			'resizingTool.cellSize': new go.Size(GanttUtility.GridCellWidth, GanttUtility.GridCellHeight),
			'resizingTool.minSize': new go.Size(GanttUtility.GridCellWidth, GanttUtility.GridCellHeight),
			// layout: $(GanttLayout),
			mouseOver: (e: any) => {
				if (!myGrid || !myHighlightDay) return;
				const lp = myGrid.getLocalPoint(e.documentPoint);
				const day = Math.floor(GanttUtility.convertXToStart(lp.x)); // floor gets start of day
				myHighlightDay.position = new go.Point(
					GanttUtility.convertStartToX(day),
					myGrid.position.y,
				);
				myHighlightDay.width = GanttUtility.GridCellWidth; // 1 day
				myHighlightDay.height = myGrid.actualBounds.height;
				myHighlightDay.visible = true;
			},
			mouseLeave: (e: any) => (myHighlightDay.visible = false),
			'animationManager.isInitial': false,
			SelectionMoved: (e) => e.diagram.layoutDiagram(true),
			DocumentBoundsChanged: (e) => {
				// the grid extends to only the area needed
				const b = e.diagram.documentBounds;
				myGrid.desiredSize = new go.Size(b.width + GanttUtility.GridCellWidth * 7, b.bottom);
				// the timeline, which is not in the documentBounds, only covers the needed area
				// widen to cover whole weeks
				myTimeline.graduatedMax =
					Math.ceil(b.width / (GanttUtility.GridCellWidth * 7)) * (GanttUtility.GridCellWidth * 7);
				(myTimeline.findObject('MAIN') as any).width = myTimeline.graduatedMax;
				(myTimeline.findObject('TICKS') as any).height = Math.max(
					e.diagram.documentBounds.height,
					e.diagram.viewportBounds.height,
				);
			},
		});

		myGantt.nodeTemplate = $(
			go.Node,
			'Spot',
			{
				selectionAdorned: false,
				selectionChanged: (node: any) => {
					node.diagram.commit((diag: any) => {
						node.findObject('SHAPE').fill = node.isSelected
							? 'dodgerblue'
							: (node.data && node.data.color) || 'gray';
					}, null);
				},
				minLocation: new go.Point(0, NaN),
				maxLocation: new go.Point(Infinity, NaN),
				toolTip: $(
					'ToolTip',
					$(
						go.Panel,
						'Table',
						{ defaultAlignment: go.Spot.Left },
						$(go.RowColumnDefinition, { column: 1, separatorPadding: 3 }),
						$(
							go.TextBlock,
							{
								row: 0,
								column: 0,
								columnSpan: 9,
								font: 'bold 12pt sans-serif',
							},
							new go.Binding('text'),
						),
						$(go.TextBlock, { row: 1, column: 0 }, 'start:'),
						$(
							go.TextBlock,
							{ row: 1, column: 1 },
							new go.Binding(
								'text',
								'start',
								(d) => 'day ' + GanttUtility.convertUnitsToDays(d).toFixed(0),
							),
						),
						$(go.TextBlock, { row: 2, column: 0 }, 'length:'),
						$(
							go.TextBlock,
							{ row: 2, column: 1 },
							new go.Binding(
								'text',
								'duration',
								(d) => GanttUtility.convertUnitsToDays(d).toFixed(0) + ' days',
							),
						),
					),
				),
				resizable: true,
				resizeObjectName: 'SHAPE',
				resizeAdornmentTemplate: $(
					go.Adornment,
					'Spot',
					$(go.Placeholder),
					$(go.Shape, 'Diamond', {
						alignment: go.Spot.Right,
						width: 8,
						height: 8,
						strokeWidth: 0,
						fill: 'fuchsia',
						cursor: 'e-resize',
					}),
				),
				mouseOver: (e, node) => (myGantt as any).mouseOver(e),
			},
			// GanttUtility.standardContextMenus(),
			new go.Binding('position', 'start', GanttUtility.convertStartToPosition).makeTwoWay(
				GanttUtility.convertPositionToStart,
			),
			new go.Binding('resizable', 'isTreeLeaf').ofObject(),
			new go.Binding('isTreeExpanded').makeTwoWay(),
			$(
				go.Shape,
				{
					name: 'SHAPE',
					height: 18,
					margin: new go.Margin(1, 0),
					strokeWidth: 0,
					fill: 'gray',
				},
				new go.Binding('fill', 'color'),
				new go.Binding('width', 'duration', GanttUtility.convertDurationToW).makeTwoWay(
					GanttUtility.convertWToDuration,
				),
				new go.Binding('figure', 'isTreeLeaf', (leaf) =>
					leaf ? 'Rectangle' : 'RangeBar',
				).ofObject(),
			),
			// "RangeBar" is defined above as a custom figure
			$(
				go.TextBlock,
				{
					font: '8pt sans-serif',
					alignment: go.Spot.TopLeft,
					alignmentFocus: new go.Spot(0, 0, 0, -2),
				},
				new go.Binding('text'),
				new go.Binding('stroke', 'color', (c) => (go.Brush.isDark(c) ? '#DDDDDD' : '#333333')),
			),
		);

		myGantt.linkTemplate = $(go.Link, { visible: false });

		myGantt.linkTemplateMap.add(
			'Dep',
			$(
				go.Link,
				{
					routing: go.Link.Orthogonal,
					isTreeLink: false,
					isLayoutPositioned: false,
					fromSpot: new go.Spot(0.999999, 1),
					toSpot: new go.Spot(0.000001, 0),
				},
				$(go.Shape, { stroke: 'brown', strokeWidth: 3 }),
				$(go.Shape, {
					toArrow: 'Standard',
					fill: 'brown',
					strokeWidth: 0,
					scale: 0.75,
				}),
			),
		);

		myGantt.add(myTimeline);
		myGantt.add(myGrid);
		myGantt.add(myHighlightDay);
		myGantt.add(myHighlightTask);

		return myGantt;
	}

	makeTaskNodeTemplate(
		myTask: go.Diagram,
		myGantt: go.Diagram,
		myHighlightTask: go.Part,
		myGrid: go.Part,
	) {
		const $ = go.GraphObject.make;
		myTask.nodeTemplate = $(
			go.Node,
			'Table',
			{
				columnSizing: go.RowColumnDefinition.None,
				selectionAdorned: false,
				height: GanttUtility.GridCellHeight,
				mouseEnter: (e, node) => {
					node.background = 'rgba(0,0,255,0.2)';
					myHighlightTask.position = new go.Point(myGrid.actualBounds.x, node.actualBounds.y);
					myHighlightTask.width = myGrid.actualBounds.width;
					myHighlightTask.visible = true;
				},
				mouseLeave: (e, node: any) => {
					node.background = node.isSelected ? 'dodgerblue' : 'transparent';
					myHighlightTask.visible = false;
				},
				doubleClick: (e, node: any) => {
					// scroll myGantt so the corresponding bar is visible
					const bar = myGantt.findNodeForData(node.data);
					if (bar) myGantt.commandHandler.scrollToPart(bar);
				},
			},
			new go.Binding('background', 'isSelected', (s) =>
				s ? 'dodgerblue' : 'transparent',
			).ofObject(),
			new go.Binding('isTreeExpanded').makeTwoWay(),
			$(go.RowColumnDefinition, { column: 0, width: 14 }),
			$('TreeExpanderButton', { column: 0, portId: '', scale: 0.85 }),
			$(go.RowColumnDefinition, { column: 1, alignment: go.Spot.Left }),
			$(go.TextBlock, { column: 1, editable: true }, new go.Binding('text').makeTwoWay()),
			// additional columns
			$(go.RowColumnDefinition, {
				column: 2,
				width: 40,
				alignment: go.Spot.Right,
				separatorPadding: new go.Margin(0, 4),
				separatorStroke: 'gray',
			}),
			$(go.TextBlock, { column: 2 }, new go.Binding('text', 'start', (s) => s.toFixed(2))),
			$(go.RowColumnDefinition, {
				column: 3,
				width: 40,
				alignment: go.Spot.Right,
				separatorPadding: new go.Margin(0, 4),
				separatorStroke: 'gray',
			}),
			$(go.TextBlock, { column: 3 }, new go.Binding('text', 'duration', (d) => d.toFixed(2))),

			// GanttUtility.standardContextMenus()
		);
	}

	makeTaskHeader() {
		const $ = go.GraphObject.make;
		const myTasksHeader = // the timeline at the top of the myTasks viewport
			$(
				go.Part,
				'Table',
				{
					layerName: 'Adornment',
					pickable: false,
					position: new go.Point(-26, 0), // position will be set in "ViewportBoundsChanged" listener
					columnSizing: go.RowColumnDefinition.None,
					selectionAdorned: false,
					height: GanttUtility.GridCellHeight,
					background: 'lightgray',
				},
				$(go.RowColumnDefinition, { column: 0, width: 14 }),
				$(go.RowColumnDefinition, { column: 1 }),
				$(go.TextBlock, 'Name', { column: 1 }),
				// additional columns
				$(go.RowColumnDefinition, {
					column: 2,
					width: 40,
					alignment: go.Spot.Right,
					separatorPadding: new go.Margin(0, 4),
					separatorStroke: 'gray',
				}),
				$(go.TextBlock, 'Start', { column: 2 }),
				$(go.RowColumnDefinition, {
					column: 3,
					width: 40,
					alignment: go.Spot.Right,
					separatorPadding: new go.Margin(0, 4),
					separatorStroke: 'gray',
				}),
				$(go.TextBlock, 'Dur.', { column: 3 }),
			);
		return myTasksHeader;
	}

	makeTimeline() {
		const $ = go.GraphObject.make;
		const myTimeline = // the timeline at the top of the myGantt viewport
			$(
				go.Part,
				'Graduated',
				{
					layerName: 'Adornment',
					pickable: false,
					position: new go.Point(-26, 0), // position will be set in "ViewportBoundsChanged" listener
					graduatedTickUnit: GanttUtility.GridCellWidth, // each tick is one day
					// assume graduatedMax == length of line
				},
				$(go.Shape, 'LineH', {
					name: 'MAIN',
					strokeWidth: 0, // don't draw the actual line
					height: GanttUtility.TimelineHeight, // width will be set in "DocumentBoundsChanged" listener
					background: 'lightgray',
				}),
				$(go.Shape, 'LineV', {
					name: 'TICKS',
					interval: 7, // once per week
					alignmentFocus: new go.Spot(0.5, 0, 0, -GanttUtility.TimelineHeight / 2), // tick marks cross over the timeline itself
					stroke: 'lightgray',
					strokeWidth: 0.5,
				}),
				$(go.TextBlock, {
					alignmentFocus: go.Spot.Left,
					interval: 7, // once per week
					graduatedFunction: GanttUtility.valueToText,
					graduatedSkip: (val: any, tb: any) =>
						val > tb.panel.graduatedMax - GanttUtility.GridCellWidth * 7, // don't show last label
				}),
			);

		return myTimeline;
	}

	makeGrid() {
		const $ = go.GraphObject.make;
		const myGrid = // the grid of horizontal lines
			$(
				go.Part,
				'Grid',
				{
					layerName: 'Grid',
					pickable: false,
					position: new go.Point(0, 0),
					gridCellSize: new go.Size(3000, GanttUtility.GridCellHeight),
				},
				$(go.Shape, 'LineH', { strokeWidth: 0.5 }),
			);
		return myGrid;
	}

	makeHighlightDay() {
		const $ = go.GraphObject.make;
		const myHighlightDay = // the vertical highlighter covering the day where the mouse is
			$(go.Part, {
				layerName: 'Grid',
				visible: false,
				pickable: false,
				background: 'rgba(255,0,0,0.2)',
				position: new go.Point(0, 0),
				width: GanttUtility.GridCellWidth,
				height: GanttUtility.GridCellHeight,
			});

		return myHighlightDay;
	}

	makeHighlightTask() {
		const $ = go.GraphObject.make;
		const myHighlightTask = // the horizontal highlighter covering the current task
			$(go.Part, {
				layerName: 'Grid',
				visible: false,
				pickable: false,
				background: 'rgba(0,0,255,0.2)',
				position: new go.Point(0, 0),
				width: GanttUtility.GridCellWidth,
				height: GanttUtility.GridCellHeight,
			});
		return myHighlightTask;
	}
}
