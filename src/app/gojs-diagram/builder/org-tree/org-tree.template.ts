import * as go from 'gojs';
import { GojsBuilder } from '../../core/abstract/gojs.builder';
import { OrgTreePropertiesMaker } from './properties/org-tree-properties.maker';
import { OrgTreeProperties } from './properties/org-tree.properties';
import { OrgTreeUtility } from './utility/org-tree.utility';

export class OrgTreeTemplate extends GojsBuilder {
	make(divDiagramId: string, properties?: OrgTreeProperties) {
		OrgTreePropertiesMaker.setValues(properties);

		const myDiagram = this.makeDiagram(divDiagramId);

		// myDiagram.nodeTemplate.contextMenu = OrgTreeUtility.standardContextMenus(myDiagram);

		return myDiagram;
	}

	makeProperties(properties?: OrgTreeProperties) {
		OrgTreePropertiesMaker.setValues(properties);
	}
	resetProperties(): void {
		OrgTreePropertiesMaker.reset();
	}

	makeDiagram(divId: string): go.Diagram {
		const $ = go.GraphObject.make;

		const myDiagram = new go.Diagram(divId, {
			allowCopy: false,
			allowDelete: false,
			//initialAutoScale: go.Diagram.Uniform,
			maxSelectionCount: 1, // users can select only one part at a time
			validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
			'clickCreatingTool.archetypeNodeData': {
				// allow double-click in background to create a new node
				name: '(new person)',
				title: '',
				comments: '',
			},
			'clickCreatingTool.insertPart': function (loc: any) {
				// method override must be function, not =>
				const node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
				if (node !== null) {
					(this as any).diagram.select(node);
					(this as any).diagram.commandHandler.scrollToPart(node);
					(this as any).diagram.commandHandler.editTextBlock(node.findObject('NAMETB'));
				}
				return node;
			},
			layout: $(go.TreeLayout, {
				treeStyle: go.TreeLayout.StyleLastParents,
				arrangement: go.TreeLayout.ArrangementHorizontal,
				// properties for most of the tree:
				angle: 90,
				layerSpacing: 35,
				// properties for the "last parents":
				alternateAngle: 90,
				alternateLayerSpacing: 35,
				alternateAlignment: go.TreeLayout.AlignmentBus,
				alternateNodeSpacing: 20,
			}),
			'undoManager.isEnabled': true, // enable undo & redo
		});

		// override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
		(myDiagram.layout as any).commitNodes = function () {
			// method override must be function, not =>
			(go.TreeLayout.prototype as any).commitNodes.call(this); // do the standard behavior
			// then go through all of the vertexes and set their corresponding node's Shape.fill
			// to a brush dependent on the TreeVertex.level value
			myDiagram.layout.network?.vertexes.each((v: any) => {
				if (v.node) {
					const level = v.level % OrgTreeUtility.levelColors.length;
					const color = OrgTreeUtility.levelColors[level];
					const shape = v.node.findObject('SHAPE');
					if (shape)
						shape.stroke = $(go.Brush, 'Linear', {
							0: color,
							1: go.Brush.lightenBy(color, 0.05),
							start: go.Spot.Left,
							end: go.Spot.Right,
						});
				}
			});
		};

		// define the Link template
		myDiagram.linkTemplate = $(
			go.Link,
			go.Link.Orthogonal,
			{ layerName: 'Background', corner: 5 },
			$(go.Shape, { strokeWidth: 1.5, stroke: '#424242' }).bind('stroke', 'color'),
		); // the link shape

		myDiagram.model = new go.TreeModel({
			nodeDataArray: [],
		});

		return myDiagram;
	}
}
