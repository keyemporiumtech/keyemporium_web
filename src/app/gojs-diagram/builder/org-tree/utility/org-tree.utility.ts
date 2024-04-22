import * as go from 'gojs';
import { DiagramBuilder } from '../../../core/diagram.builder';
import { ShapeModel } from '../../../core/model/shape.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { OrgTreeModel } from '../model/org-tree.model';

export class OrgTreeUtility {
	static levelColors: string[] = [
		'#AC193D',
		'#2672EC',
		'#8C0095',
		'#5133AB',
		'#008299',
		'#D24726',
		'#008A00',
		'#094AB2',
	];
	static shape: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: '#333333',
		borderColor: 'white',
		borderSize: 3.5,
	};

	static PATH_PIC = 'assets/images/orgTree';
	static textStylePrimary: any = { font: '12pt Segoe UI,sans-serif', stroke: 'white' };
	static textStyleSecondary: any = { font: '9pt  Segoe UI,sans-serif', stroke: 'white' };

	static iconShape: ShapeModel = {
		type: EnumFigureType.CERCHIO,
		background: '#6FB583',
		borderColor: 'white',
		borderSize: 0.5,
	};

	static editableText: boolean = false;

	/**
	 * Costruisce il nodo
	 * @param callbackText dato un modello ritorna un stringa da visualizzare nello shape
	 * @param callbackIsPicture ritorna true se il modello è gestito da immagini e non da icone Shape
	 * @param callbackAddLink chiamato nel drag-drop di un nodo verso un altro per aggiornare il link di parentela
	 * @param callbackAddNode chiamato al click sul pulsante plus
	 * @param myDiagram diagramma per associare la transizione del cambio colore status al click
	 * @returns go.Node
	 */
	static makeNodeTemplate(
		callbackText: (person: OrgTreeModel) => string,
		callbackAddLink: (from: OrgTreeModel, to: OrgTreeModel, edit: boolean) => void,
		callbackAddNode: (node: any) => void,
		myDiagram: go.Diagram,
		textRole?: string,
		textCod?: string,
	): any {
		if (!textRole) {
			textRole = 'Ruolo: ';
		}
		if (!textCod) {
			textCod = 'Matricola: ';
		}
		const $ = go.GraphObject.make;
		return $(
			go.Node,
			'Spot',
			{
				selectionObjectName: 'BODY',
				mouseEnter: (e, node) =>
					((node as any).findObject('BUTTON').opacity = (node as any).findObject(
						'BUTTONX',
					).opacity =
						1),
				mouseLeave: (e, node) =>
					((node as any).findObject('BUTTON').opacity = (node as any).findObject(
						'BUTTONX',
					).opacity =
						0),
				// handle dragging a Node onto a Node to (maybe) change the reporting relationship
				mouseDragEnter: (e, node, prev) => {
					const diagram = node.diagram;
					const selnode = diagram?.selection.first();
					if (!OrgTreeUtility.mayWorkFor(selnode, node)) return;
					const shape = (node as any).findObject('SHAPE');
					if (shape) {
						shape._prevFill = shape.fill; // remember the original brush
						shape.fill = 'darkred';
					}
				},
				mouseDragLeave: (e, node, next) => {
					const shape = (node as any).findObject('SHAPE');
					if (shape && shape._prevFill) {
						shape.fill = shape._prevFill; // restore the original brush
					}
				},
				mouseDrop: (e, node) => {
					const diagram = node.diagram;
					const selnode = diagram?.selection.first(); // assume just one Node in selection
					if (OrgTreeUtility.mayWorkFor(selnode, node)) {
						// find any existing link into the selected node
						const link = (selnode as any).findTreeParentLink();
						let edit: boolean;
						if (link !== null) {
							// reconnect any existing link
							link.fromNode = node;
							edit = true;
						} else {
							// else create a new link
							diagram?.toolManager.linkingTool.insertLink(
								node as go.Node,
								(node as go.Node).port,
								selnode as go.Node,
								(selnode as go.Node).port,
							);
							edit = false;
						}
						callbackAddLink((node as any).data as any, selnode.data as any, edit);
					}
				},
			},
			// for sorting, have the Node.text be the data.name
			new go.Binding('text', 'name'),
			// bind the Part.layerName to control the Node's layer depending on whether it isSelected
			new go.Binding('layerName', 'isSelected', (sel) => (sel ? 'Foreground' : '')).ofObject(),
			$(
				go.Panel,
				'Auto',
				{ name: 'BODY' },
				// define the node's outer shape
				$(go.Shape, (OrgTreeUtility.shape as any).type, {
					name: 'SHAPE',
					fill: (OrgTreeUtility.shape as any).background,
					stroke: (OrgTreeUtility.shape as any).borderColor,
					strokeWidth: (OrgTreeUtility.shape as any).borderSize,
					portId: '',
				}),
				$(
					go.Panel,
					'Horizontal',
					OrgTreeUtility.makePicture(true),
					// define the panel where the text will appear
					$(
						go.Panel,
						'Table',
						{
							// minSize: new go.Size(130, NaN),
							// maxSize: new go.Size(150, NaN),
							margin: new go.Margin(6, 10, 0, 6),
							defaultAlignment: go.Spot.Left,
						},
						$(go.RowColumnDefinition, { column: 2, width: 4 }),
						$(
							go.TextBlock,
							{
								name: 'NAMETB',
								row: 0,
								column: 0,
								columnSpan: 5,
								editable: OrgTreeUtility.editableText,
								isMultiline: false,
								minSize: new go.Size(50, 16),
								...OrgTreeUtility.textStylePrimary,
							},
							new go.Binding('text', 'name').makeTwoWay(),
						),
						$(go.TextBlock, textRole, {
							row: 1,
							column: 0,
							...OrgTreeUtility.textStyleSecondary,
						}),
						$(
							go.TextBlock,
							{
								row: 1,
								column: 1,
								columnSpan: 3,
								editable: OrgTreeUtility.editableText,
								isMultiline: false,
								minSize: new go.Size(50, 14),
								margin: new go.Margin(0, 0, 0, 3),
								...OrgTreeUtility.textStyleSecondary,
							},
							new go.Binding('text', 'role', (v) => v).makeTwoWay(),
						),
						$(go.TextBlock, textCod, {
							row: 2,
							column: 0,
							...OrgTreeUtility.textStyleSecondary,
						}),
						$(
							go.TextBlock,
							{
								row: 2,
								column: 1,
								columnSpan: 3,
								editable: OrgTreeUtility.editableText,
								isMultiline: false,
								minSize: new go.Size(50, 14),
								margin: new go.Margin(0, 0, 0, 3),
								...OrgTreeUtility.textStyleSecondary,
							},
							new go.Binding('text', 'matricola', (v) => v),
						),
						$(
							go.TextBlock,
							{
								row: 3,
								column: 0,
								columnSpan: 5,
								wrap: go.TextBlock.WrapFit,
								editable: OrgTreeUtility.editableText, // by default newlines are allowed
								minSize: new go.Size(100, 14),
								...OrgTreeUtility.textStyleSecondary,
							},
							new go.Binding('text', '', callbackText).makeTwoWay(),
						),
					), // end Table Panel
				), // end Horizontal Panel
			), // end Auto Panel
			$(
				'Button',
				$(go.Shape, 'PlusLine', { width: 10, height: 10 }),
				{
					name: 'BUTTON',
					alignment: go.Spot.Right,
					opacity: 0, // initially not visible
					click: (e, button) => callbackAddNode(button.part),
				},
				// button is visible either when node is selected or on mouse-over
				new go.Binding('opacity', 'isSelected', (s) => (s ? 1 : 0)).ofObject(),
			),
			new go.Binding('isTreeExpanded').makeTwoWay(),
			$(
				'TreeExpanderButton',
				{
					name: 'BUTTONX',
					alignment: go.Spot.Bottom,
					opacity: 0, // initially not visible
					_treeExpandedFigure: 'TriangleUp',
					_treeCollapsedFigure: 'TriangleDown',
				},
				// button is visible either when node is selected or on mouse-over
				new go.Binding('opacity', 'isSelected', (s) => (s ? 1 : 0)).ofObject(),
			),
		); // end Node, a Spot Panel
	}

	// ------------- UTILITY DATA

	static makeLinks(data: OrgTreeModel[]): any[] {
		const links: any[] = [];
		data.forEach((el) => {
			if (el.parent) {
				links.push({
					key: el.key + '_' + el.parent,
					from: el.parent,
					to: el.key,
				});
			}
		});

		return links;
	}

	static makePicture(isPic?: boolean) {
		const $ = go.GraphObject.make;
		let val: any;
		if (isPic) {
			val = $(
				go.Picture,
				{
					name: 'Picture',
					desiredSize: new go.Size(70, 70),
					margin: 1.5,
					source: OrgTreeUtility.getUserImage(), // the default image
				},
				new go.Binding('source', '', OrgTreeUtility.findHeadShot),
			);
		} else {
			val = $(
				go.Panel,
				'Auto',
				$(go.Shape, OrgTreeUtility.iconShape.type, {
					strokeWidth: 0,
					stroke: null,
					fill: OrgTreeUtility.iconShape.background,
				}),
				$(go.Shape, 'Actor', {
					margin: 6,
					strokeWidth: OrgTreeUtility.iconShape.borderSize,
					width: 22,
					height: 22,
					stroke: OrgTreeUtility.iconShape.borderColor,
					background: OrgTreeUtility.iconShape.background,
				}),
			);
		}
		return val;
	}

	static addEmployee(node: any, myDiagram: go.Diagram) {
		if (!node) return;
		const thisemp = node.data;
		myDiagram.startTransaction('add employee');
		const newemp = {
			key: Math.random(),
			matricola: '',
			name: '(new person)',
			parent: thisemp.key,
			role: '',
		};
		myDiagram.model.addNodeData(newemp);
		(myDiagram.model as go.GraphLinksModel).addLinkData({
			key: Math.random(),
			from: thisemp.key,
			to: newemp.key,
		});
		const newnode: any = myDiagram.findNodeForData(newemp);
		if (newnode) newnode.location = node.location;
		myDiagram.commitTransaction('add employee');
		myDiagram.commandHandler.scrollToPart(newnode);
	}

	// this is used to determine feedback during drags
	static mayWorkFor(node1: go.Node | any, node2: go.Node | any) {
		if (!(node1 instanceof go.Node)) return false; // must be a Node
		if (node1 === node2) return false; // cannot work for yourself
		if (node2.isInTreeOf(node1)) return false; // cannot work for someone who works for you
		return true;
	}

	// This converter is used by the Picture.
	static findHeadShot(model: OrgTreeModel) {
		if (model.pic) {
			return OrgTreeUtility.PATH_PIC + '/' + model.pic;
		} else if (model.picContent) {
			return model.picContent;
		} else {
			return OrgTreeUtility.getUserImage();
		}
	}

	static getUserImage() {
		const content =
			'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';
		return DiagramBuilder.makeSourcePicture('image/png', content);
	}
}
