import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { MessageDraggingTool } from './classes/message-dragging-tool';
import { MessageLink } from './classes/message-link';
import { MessagingTool } from './classes/messaging-tool';
import { SequencePropertiesMaker } from './properties/sequence-properties.maker';
import { SequenceProperties } from './properties/sequence.properties';
import { SequenceUtility } from './utility/sequence.utility';

export class SequenceTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: SequenceProperties): go.Diagram {
		SequencePropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);

		return myDiagram;
	}

	makeProperties(properties?: SequenceProperties) {
		SequencePropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		SequencePropertiesMaker.reset();
	}

	private makeDiagram(divId: string): go.Diagram {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(
			divId, // must be the ID or reference to an HTML DIV
			{
				allowCopy: false,
				linkingTool: $(MessagingTool), // defined below
				'resizingTool.isGridSnapEnabled': true,
				draggingTool: $(MessageDraggingTool), // defined below
				'draggingTool.gridSnapCellSize': new go.Size(1, SequenceUtility.MessageSpacing / 4),
				'draggingTool.isGridSnapEnabled': true,
				// automatically extend Lifelines as Activities are moved or resized
				SelectionMoved: (e) => SequenceUtility.ensureLifelineHeights(myDiagram, e),
				PartResized: (e) => SequenceUtility.ensureLifelineHeights(myDiagram, e),
				'undoManager.isEnabled': true,
			},
		);

		// define the Message Link template.
		myDiagram.linkTemplate = $(
			MessageLink, // defined below
			{ selectionAdorned: true, curviness: 0 },
			$(go.Shape, 'Rectangle', { stroke: SequenceUtility.linkStyle.linkColor }),
			$(go.Shape, {
				toArrow: SequenceUtility.linkStyle.arrowType,
				stroke: SequenceUtility.linkStyle.linkColor,
			}),
			$(
				go.TextBlock,
				{
					font: SequenceUtility.linkStyle.font,
					segmentIndex: 0,
					segmentOffset: new go.Point(NaN, NaN),
					isMultiline: false,
					editable: true,
				},
				new go.Binding('text', 'text').makeTwoWay(),
			),
		);

		return myDiagram;
	}
}
