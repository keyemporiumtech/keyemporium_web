import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { TournmentPropertiesMaker } from './properties/tournment-properties.maker';
import { TournmentProperties } from './properties/tournment.properties';
import { TournmentUtility } from './utility/tournment.utility';

export class TournmentTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: TournmentProperties): go.Diagram {
		TournmentPropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);

		return myDiagram;
	}

	makeProperties(properties?: TournmentProperties) {
		TournmentPropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		TournmentPropertiesMaker.reset();
	}

	private makeDiagram(divId: string): go.Diagram {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(divId, {
			'textEditingTool.starting': go.TextEditingTool.SingleClick,
			'textEditingTool.textValidation': TournmentUtility.isValidScore,
			layout: $(go.TreeLayout, { angle: 180 }),
			'undoManager.isEnabled': true,
		});

		// define the Link template
		myDiagram.linkTemplate = $(
			go.Link,
			{
				routing: go.Link.Orthogonal,
				selectable: false,
			},
			$(go.Shape, { strokeWidth: 2, stroke: TournmentUtility.linkColor }),
		);

		return myDiagram;
	}
}
