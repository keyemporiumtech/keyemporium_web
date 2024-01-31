import * as go from 'gojs';
import { EnumFamilyLinkCategory, FamilyTreeModel } from '../../family-tree/model/family-tree.model';

export class GenogramUtility {
	// ---------- props
	static diagramType: 'ARLECCHINO' | 'FILLED' = 'ARLECCHINO';
	static linkType: 'SIMPLE' | 'COMPLEX' = 'SIMPLE';
	static maleColor: string = '#90CAF9';
	static femaleColor: string = '#F48FB1';
	static parentChildColor: string = '#2672EC';
	static spouseColor: string = '#AC193D';
	static brotherColor: string = '#00af54';

	static attrFill(a) {
		switch (a) {
			case 'A':
				return '#00af54'; // green
			case 'B':
				return '#f27935'; // orange
			case 'C':
				return '#d4071c'; // red
			case 'D':
				return '#70bdc2'; // cyan
			case 'E':
				return '#fcf384'; // gold
			case 'F':
				return '#e69aaf'; // pink
			case 'G':
				return '#08488f'; // blue
			case 'H':
				return '#866310'; // brown
			case 'I':
				return '#9270c2'; // purple
			case 'J':
				return '#a3cf62'; // chartreuse
			case 'K':
				return '#91a4c2'; // lightgray bluish
			case 'L':
				return '#af70c2'; // magenta
			case 'S':
				return '#d4071c'; // red
			default:
				return 'transparent';
		}
	}

	static maleGeometry(a) {
		const tlsq = go.Geometry.parse('F M1 1 l19 0 0 19 -19 0z');
		const trsq = go.Geometry.parse('F M20 1 l19 0 0 19 -19 0z');
		const brsq = go.Geometry.parse('F M20 20 l19 0 0 19 -19 0z');
		const blsq = go.Geometry.parse('F M1 20 l19 0 0 19 -19 0z');
		const slash = go.Geometry.parse('F M38 0 L40 0 40 2 2 40 0 40 0 38z');
		switch (a) {
			case 'A':
				return tlsq;
			case 'B':
				return tlsq;
			case 'C':
				return tlsq;
			case 'D':
				return trsq;
			case 'E':
				return trsq;
			case 'F':
				return trsq;
			case 'G':
				return brsq;
			case 'H':
				return brsq;
			case 'I':
				return brsq;
			case 'J':
				return blsq;
			case 'K':
				return blsq;
			case 'L':
				return blsq;
			case 'S':
				return slash;
			default:
				return tlsq;
		}
	}

	static femaleGeometry(a) {
		const tlarc = go.Geometry.parse('F M20 20 B 180 90 20 20 19 19 z');
		const trarc = go.Geometry.parse('F M20 20 B 270 90 20 20 19 19 z');
		const brarc = go.Geometry.parse('F M20 20 B 0 90 20 20 19 19 z');
		const blarc = go.Geometry.parse('F M20 20 B 90 90 20 20 19 19 z');
		const slash = go.Geometry.parse('F M38 0 L40 0 40 2 2 40 0 40 0 38z');
		switch (a) {
			case 'A':
				return tlarc;
			case 'B':
				return tlarc;
			case 'C':
				return tlarc;
			case 'D':
				return trarc;
			case 'E':
				return trarc;
			case 'F':
				return trarc;
			case 'G':
				return brarc;
			case 'H':
				return brarc;
			case 'I':
				return brarc;
			case 'J':
				return blarc;
			case 'K':
				return blarc;
			case 'L':
				return blarc;
			case 'S':
				return slash;
			default:
				return tlarc;
		}
	}

	static makeNodeTemplate(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;
		return $(go.Node, 'Auto', { selectable: true, itemTemplateMap: myDiagram.nodeTemplateMap });
	}

	static makeNodeTemplateArlecchino(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;
		// two different node templates, one for each sex,
		// named by the category value in the node data object
		myDiagram.nodeTemplateMap.add(
			'M', // male
			$(
				go.Node,
				'Vertical',
				{ locationSpot: go.Spot.Center, locationObjectName: 'ICON', selectionObjectName: 'ICON' },
				new go.Binding('opacity', 'hide', (h) => (h ? 0 : 1)),
				new go.Binding('pickable', 'hide', (h) => !h),
				$(
					go.Panel,
					{ name: 'ICON' },
					$(go.Shape, 'Square', {
						width: 40,
						height: 40,
						strokeWidth: 2,
						fill: 'white',
						stroke: '#919191',
						portId: '',
					}),
					$(
						go.Panel,
						{
							// for each attribute show a Shape at a particular place in the overall square
							itemTemplate: $(
								go.Panel,
								$(
									go.Shape,
									{ stroke: null, strokeWidth: 0 },
									new go.Binding('fill', '', GenogramUtility.attrFill),
									new go.Binding('geometry', '', GenogramUtility.maleGeometry),
								),
							),
							margin: 1,
						},
						new go.Binding('itemArray', 'a'),
					),
				),
				$(
					go.TextBlock,
					{
						textAlign: 'center',
						maxSize: new go.Size(80, NaN),
						background: 'rgba(255,255,255,0.5)',
					},
					new go.Binding('text', 'n'),
				),
			),
		);

		myDiagram.nodeTemplateMap.add(
			'F', // female
			$(
				go.Node,
				'Vertical',
				{ locationSpot: go.Spot.Center, locationObjectName: 'ICON', selectionObjectName: 'ICON' },
				new go.Binding('opacity', 'hide', (h) => (h ? 0 : 1)),
				new go.Binding('pickable', 'hide', (h) => !h),
				$(
					go.Panel,
					{ name: 'ICON' },
					$(go.Shape, 'Circle', {
						width: 40,
						height: 40,
						strokeWidth: 2,
						fill: 'white',
						stroke: '#a1a1a1',
						portId: '',
					}),
					$(
						go.Panel,
						{
							// for each attribute show a Shape at a particular place in the overall circle
							itemTemplate: $(
								go.Panel,
								$(
									go.Shape,
									{ stroke: null, strokeWidth: 0 },
									new go.Binding('fill', '', GenogramUtility.attrFill),
									new go.Binding('geometry', '', GenogramUtility.femaleGeometry),
								),
							),
							margin: 1,
						},
						new go.Binding('itemArray', 'a'),
					),
				),
				$(
					go.TextBlock,
					{
						textAlign: 'center',
						maxSize: new go.Size(80, NaN),
						background: 'rgba(255,255,255,0.5)',
					},
					new go.Binding('text', 'n'),
				),
			),
		);
	}

	static makeNodeTemplateFilled(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;
		// two different node templates, one for each sex,
		// named by the category value in the node data object
		myDiagram.nodeTemplateMap.add(
			'M', // male
			$(
				go.Node,
				'Vertical',
				{ locationSpot: go.Spot.Center, locationObjectName: 'ICON', selectionObjectName: 'ICON' },
				new go.Binding('opacity', 'hide', (h) => (h ? 0 : 1)),
				new go.Binding('pickable', 'hide', (h) => !h),
				$(
					go.Panel,
					{ name: 'ICON' },
					$(go.Shape, 'Square', {
						width: 40,
						height: 40,
						strokeWidth: 2,
						fill: GenogramUtility.maleColor,
						stroke: '#919191',
						portId: '',
					}),
				),
				$(
					go.TextBlock,
					{
						textAlign: 'center',
						maxSize: new go.Size(80, NaN),
						background: 'rgba(255,255,255,0.5)',
					},
					new go.Binding('text', 'n'),
				),
			),
		);

		myDiagram.nodeTemplateMap.add(
			'F', // female
			$(
				go.Node,
				'Vertical',
				{ locationSpot: go.Spot.Center, locationObjectName: 'ICON', selectionObjectName: 'ICON' },
				new go.Binding('opacity', 'hide', (h) => (h ? 0 : 1)),
				new go.Binding('pickable', 'hide', (h) => !h),
				$(
					go.Panel,
					{ name: 'ICON' },
					$(go.Shape, 'Circle', {
						width: 40,
						height: 40,
						strokeWidth: 2,
						fill: GenogramUtility.femaleColor,
						stroke: '#a1a1a1',
						portId: '',
					}),
				),
				$(
					go.TextBlock,
					{
						textAlign: 'center',
						maxSize: new go.Size(80, NaN),
						background: 'rgba(255,255,255,0.5)',
					},
					new go.Binding('text', 'n'),
				),
			),
		);
	}

	// --------------- functions
	static getColorByFamilyTreeModel(model: FamilyTreeModel): string {
		return model.gender === 'F' ? 'F' : 'G';
	}

	// --------------- utils

	static makeLinkSimple(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;

		// the representation of each label node -- nothing shows on a Marriage Link
		myDiagram.nodeTemplateMap.add(
			'LinkLabel',
			$(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 20 }),
		);

		myDiagram.linkTemplate = // for parent-child relationships
			$(
				go.Link,
				{
					routing: go.Link.Orthogonal,
					corner: 10,
					curviness: 15,
					layerName: 'Background',
					selectable: false,
				},
				$(go.Shape, { stroke: 'gray', strokeWidth: 2 }),
			);

		myDiagram.linkTemplateMap.add(
			EnumFamilyLinkCategory.SPOUSE.toString(), // for marriage relationships
			$(
				go.Link,
				// AvoidsNodes routing might be better when people have multiple marriages
				{
					routing: go.Link.AvoidsNodes,
					corner: 10,
					fromSpot: go.Spot.LeftRightSides,
					toSpot: go.Spot.LeftRightSides,
					selectable: false,
					isTreeLink: false,
					layerName: 'Background',
				},
				$(go.Shape, { strokeWidth: 2.5, stroke: '#5d8cc1' /* blue */ }),
			),
		);
	}

	static makeLinkComplex(myDiagram: go.Diagram) {
		const $ = go.GraphObject.make;

		myDiagram.linkTemplate = $(
			go.Link, // the whole link panel
			{
				routing: go.Link.Orthogonal,
				corner: 5,
				fromSpot: go.Spot.BottomCenter,
				toSpot: go.Spot.TopCenter,
				selectable: false,
			},
			new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
			new go.Binding('toSpot', 'toSpot', go.Spot.parse),
			$(go.Shape, { strokeWidth: 3, stroke: GenogramUtility.parentChildColor }).bind(
				'stroke',
				'color',
			),
			$(go.Shape, { fromArrow: 'Line' })
				.bind('fromArrow')
				.bind('fill', 'arrowFromColor')
				.bind('scale', 'arrowFromSize'),
			$(go.Shape, { toArrow: 'Standard', scale: 1.5 })
				.bind('toArrow')
				.bind('fill', 'arrowColor')
				.bind('scale', 'arrowSize'),
			$(go.TextBlock, { margin: new go.Margin(5, 0, 0, 0) }).bind('text'),
		);

		myDiagram.linkTemplateMap.add(
			EnumFamilyLinkCategory.SPOUSE.toString(),
			$(
				go.Link, // the whole link panel
				// AvoidsNodes routing might be better when people have multiple marriages
				{
					routing: go.Link.AvoidsNodes,
					corner: 10,
					fromSpot: go.Spot.LeftRightSides,
					toSpot: go.Spot.LeftRightSides,
					selectable: false,
					isTreeLink: false,
					layerName: 'Background',
				},
				new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
				new go.Binding('toSpot', 'toSpot', go.Spot.parse),
				$(go.Shape, { strokeWidth: 3, stroke: GenogramUtility.spouseColor }).bind(
					'stroke',
					'color',
				),
				$(go.Shape, { fromArrow: 'BackwardCircleFork', scale: 1.5 })
					.bind('fromArrow')
					.bind('fill', 'arrowFromColor')
					.bind('scale', 'arrowFromSize'),
				$(go.Shape, { toArrow: 'CircleFork', scale: 1.5 })
					.bind('toArrow')
					.bind('fill', 'arrowColor')
					.bind('scale', 'arrowSize'),
				$(go.TextBlock, { margin: new go.Margin(5, 0, 0, 0) }).bind('text'),
			),
		);

		myDiagram.linkTemplateMap.add(
			EnumFamilyLinkCategory.BROTHER.toString(),
			$(
				go.Link, // the whole link panel
				{
					routing: go.Link.AvoidsNodes,
					corner: 10,
					fromSpot: go.Spot.LeftRightSides,
					toSpot: go.Spot.LeftRightSides,
					selectable: false,
					isTreeLink: false,
				},
				new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
				new go.Binding('toSpot', 'toSpot', go.Spot.parse),
				$(go.Shape, { strokeWidth: 3, stroke: GenogramUtility.brotherColor }).bind(
					'stroke',
					'color',
				),
				$(go.Shape, { fromArrow: 'TripleLine', scale: 1.5 })
					.bind('fromArrow')
					.bind('fill', 'arrowFromColor')
					.bind('scale', 'arrowFromSize'),
				$(go.Shape, { toArrow: 'TripleLine', scale: 1.5 })
					.bind('toArrow')
					.bind('fill', 'arrowColor')
					.bind('scale', 'arrowSize'),
				$(go.TextBlock, { margin: new go.Margin(5, 0, 0, 0) }).bind('text'),
			),
		);
	}

	static findMarriage(diagram, a, b) {
		// A and B are node keys
		const nodeA = diagram.findNodeForKey(a);
		const nodeB = diagram.findNodeForKey(b);
		if (nodeA !== null && nodeB !== null) {
			const it = nodeA.findLinksBetween(nodeB); // in either direction
			while (it.next()) {
				const link = it.value;
				// Link.data.category === "Marriage" means it's a marriage relationship
				if (link.data !== null && link.data.category === EnumFamilyLinkCategory.SPOUSE.toString())
					return link;
			}
		}
		return null;
	}

	static setupMarriages(diagram) {
		const model = diagram.model;
		const nodeDataArray = model.nodeDataArray;
		for (let i = 0; i < nodeDataArray.length; i++) {
			const data = nodeDataArray[i];
			const key = data.key;
			let uxs = data.ux;
			if (uxs !== undefined) {
				if (typeof uxs === 'number') uxs = [uxs];
				for (let j = 0; j < uxs.length; j++) {
					const wife = uxs[j];
					const wdata = model.findNodeDataForKey(wife);
					if (key === wife || !wdata || wdata.s !== 'F') {
						console.log('cannot create Marriage relationship with self or unknown person ' + wife);
						continue;
					}
					const link = GenogramUtility.findMarriage(diagram, key, wife);
					if (link === null) {
						// add a label node for the marriage link
						const mlab = { s: 'LinkLabel' };
						model.addNodeData(mlab);
						// add the marriage link itself, also referring to the label node
						const mdata = {
							from: key,
							to: wife,
							labelKeys: [(mlab as any).key],
							category: EnumFamilyLinkCategory.SPOUSE.toString(),
						};
						model.addLinkData(mdata);
					}
				}
			}
			let virs = data.vir;
			if (virs !== undefined) {
				if (typeof virs === 'number') virs = [virs];
				for (let j = 0; j < virs.length; j++) {
					const husband = virs[j];
					const hdata = model.findNodeDataForKey(husband);
					if (key === husband || !hdata || hdata.s !== 'M') {
						console.log(
							'cannot create Marriage relationship with self or unknown person ' + husband,
						);
						continue;
					}
					const link = GenogramUtility.findMarriage(diagram, key, husband);
					if (link === null) {
						// add a label node for the marriage link
						const mlab = { s: 'LinkLabel' };
						model.addNodeData(mlab);
						// add the marriage link itself, also referring to the label node
						const mdata = {
							from: key,
							to: husband,
							labelKeys: [(mlab as any).key],
							category: EnumFamilyLinkCategory.SPOUSE.toString(),
						};
						model.addLinkData(mdata);
					}
				}
			}
		}
	}

	static setupParents(diagram) {
		const model = diagram.model;
		const nodeDataArray = model.nodeDataArray;
		for (let i = 0; i < nodeDataArray.length; i++) {
			const data = nodeDataArray[i];
			const key = data.key;
			const mother = data.m;
			const father = data.f;
			if (mother !== undefined && father !== undefined) {
				const link = GenogramUtility.findMarriage(diagram, mother, father);
				if (link === null) {
					// or warn no known mother or no known father or no known marriage between them
					console.log('unknown marriage: ' + mother + ' & ' + father);
					continue;
				}
				const mdata = link.data;
				if (mdata.labelKeys === undefined || mdata.labelKeys[0] === undefined) continue;
				const mlabkey = mdata.labelKeys[0];
				const cdata = { from: mlabkey, to: key };
				diagram.model.addLinkData(cdata);
			}
		}
	}
}
