import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { DoubleTreeLayout } from './classes/DoubleTreeLayout';
import { DoubleTreePropertiesMaker } from './properties/double-tree-properties.maker';
import { DoubleTreeProperties } from './properties/double-tree.properties';
import { DoubleTreeUtility } from './utility/double-tree.utility';

export class DoubleTreeTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: DoubleTreeProperties): go.Diagram {
		DoubleTreePropertiesMaker.setValues(properties);
		DoubleTreePropertiesMaker.setColorsBrush();

		const myDiagram = this.makeDiagram(divDiagramId);

		return myDiagram;
	}

	makeProperties(properties?: DoubleTreeProperties) {
		DoubleTreePropertiesMaker.setValues(properties);
	}

	resetProperties(): void {
		DoubleTreePropertiesMaker.reset();
	}

	private makeDiagram(divId: string): go.Diagram {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(divId, {
			layout: $(DoubleTreeLayout, {
				// default directions are horizontal
				vertical: DoubleTreeUtility.vertical,
				// choose whether this subtree is growing towards the right or towards the left:
				directionFunction: (n) => n.data && n.data.dir !== 'left',
				// controlling the parameters of each TreeLayout:
				//bottomRightOptions: { nodeSpacing: 0, layerSpacing: 20 },
				//topLeftOptions: { alignment: go.TreeLayout.AlignmentStart },
			}),
		});

		myDiagram.linkTemplate = $(
			go.Link, // the whole link panel
			{ selectable: false },
			$(go.Shape),
		); // the link shape

		return myDiagram;
	}
}
