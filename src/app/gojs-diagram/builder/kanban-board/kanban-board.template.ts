import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { PoolLayout } from './classes/pool.layout';
import { KanbanBoardPropertiesMaker } from './properties/kanban-board-properties.maker';
import { KanbanBoardProperties } from './properties/kanban-board.properties';
import { KanbanBoardUtility } from './utility/kanban-board.utility';

export class KanbanBoardTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: KanbanBoardProperties) {
		KanbanBoardPropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);

		myDiagram.layout = new PoolLayout(myDiagram);

		// myDiagram.nodeTemplate.contextMenu = KanbanBoardUtility.standardContextMenus();
		// myDiagram.nodeTemplate.toolTip = KanbanBoardUtility.makeTooltip();

		// Customize the dragging tool:
		// When dragging a node set its opacity to 0.6 and move it to be in front of other nodes
		myDiagram.toolManager.draggingTool.doActivate = function () {
			// method override must be function, not =>
			go.DraggingTool.prototype.doActivate.call(this);
			(this.currentPart as any).opacity = 0.6;
			(this.currentPart as any).layerName = 'Foreground';
		};
		myDiagram.toolManager.draggingTool.doDeactivate = function () {
			// method override must be function, not =>
			(this.currentPart as any).opacity = 1;
			(this.currentPart as any).layerName = '';
			go.DraggingTool.prototype.doDeactivate.call(this);
		};

		// automatically re-layout the swim lanes after dragging the selection
		myDiagram.addDiagramListener('SelectionMoved', (e: any) =>
			KanbanBoardUtility.relayoutDiagram(myDiagram),
		);
		myDiagram.addDiagramListener('SelectionCopied', (e: any) =>
			KanbanBoardUtility.relayoutDiagram(myDiagram),
		);

		return myDiagram;
	}

	makeProperties(properties?: KanbanBoardProperties) {
		KanbanBoardPropertiesMaker.setValues(properties);
	}

	resetProperties(): void {
		KanbanBoardPropertiesMaker.reset();
	}

	makeDiagram(divId: string) {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(divId, {
			// make sure the top-left corner of the viewport is occupied
			contentAlignment: go.Spot.Center,
			// disallow nodes to be dragged to the diagram's background
			mouseDrop: (e) => {
				e.diagram.currentTool.doCancel();
			},
			// a clipboard copied node is pasted into the original node's group (i.e. lane).
			'commandHandler.copiesGroupKey': true,
			'undoManager.isEnabled': true,
			// allow TextEditingTool to start without selecting first
			'textEditingTool.starting': go.TextEditingTool.SingleClick,
		});

		myDiagram.model = new go.GraphLinksModel({
			linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksMode
			// linkDataArray: linkDataArray,
		});

		return myDiagram;
	}
}
