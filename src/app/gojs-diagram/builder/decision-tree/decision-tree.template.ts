import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { DecisionTreePropertiesMaker } from './properties/decision-tree-properties.maker';
import { DecisionTreeProperties } from './properties/decision-tree.properties';
import { DecisionTreeUtility } from './utility/decision-tree.utility';

export class DecisionTreeTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: DecisionTreeProperties): go.Diagram {
		DecisionTreePropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);

		return myDiagram;
	}

	makeProperties(properties?: DecisionTreeProperties) {
		DecisionTreePropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		DecisionTreePropertiesMaker.reset();
	}

	private makeDiagram(divId: string): go.Diagram {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(
			divId, // must name or refer to the DIV HTML element
			{
				initialContentAlignment: go.Spot.Left,
				allowSelect: false, // the user cannot select any part
				// create a TreeLayout for the decision tree
				layout: $(go.TreeLayout, { arrangement: go.TreeLayout.ArrangementFixedRoots }),
			},
		);

		myDiagram.nodeTemplateMap.add('decision', DecisionTreeUtility.makeNodeDecision(myDiagram));
		myDiagram.nodeTemplateMap.add(
			'personality',
			DecisionTreeUtility.makeNodePersonality(myDiagram),
		);

		// define the only Link template
		myDiagram.linkTemplate = $(
			go.Link,
			go.Link.Orthogonal, // the whole link panel
			{ fromPortId: '' },
			new go.Binding('fromPortId', 'fromPort'),
			$(
				go.Shape, // the link shape
				{ stroke: DecisionTreeUtility.linkColor, strokeWidth: 2 },
				new go.Binding('stroke', 'color'),
			),
		);

		return myDiagram;
	}
}
