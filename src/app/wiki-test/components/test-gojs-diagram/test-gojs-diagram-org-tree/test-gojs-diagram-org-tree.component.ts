import { Component, ViewChild } from '@angular/core';
import {
	DiagramBuilder,
	EnumFigureType,
	GojsDiagramModel,
	OrgTreeComponent,
	OrgTreeModel,
	OrgTreeUtility,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-org-tree',
	templateUrl: './test-gojs-diagram-org-tree.component.html',
	styleUrls: ['./test-gojs-diagram-org-tree.component.scss'],
})
export class TestGojsDiagramOrgTreeComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: any;
	divId: string = '';

	// --- dati modal
	@ViewChild('orgTreeCmp') orgTreeCmp: OrgTreeComponent;
	dataShow: OrgTreeModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}
	init() {
		const n0: OrgTreeModel = {
			key: 'n0',
			name: 'Giuseppe Sassone',
			role: 'CEO',
			pic: undefined,
			matricola: 'XX0001',
		};
		const n01: OrgTreeModel = {
			key: 'n01',
			name: 'Manolo Lelli',
			role: 'Developer',
			pic: 'user.png',
			parent: 'n0',
			matricola: 'ZY0001',
		};
		const n02: OrgTreeModel = {
			key: 'n02',
			name: 'Riccardo Cunto',
			role: 'Developer',
			pic: 'user.png',
			parent: 'n0',
			matricola: 'XY0001',
		};

		const data = [n0, n01, n02];
		const link = OrgTreeUtility.makeLinks(data);

		this.diagramModel = { diagramNodeData: data, diagramLinkData: link };

		this.diagramProperties = {
			shape: { type: EnumFigureType.ARROTONDATO },
		};
		this.divId = 'myFamilyId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = OrgTreeUtility.makeNodeTemplate(
			this.changeText,
			(from: OrgTreeModel, to: OrgTreeModel, edit: boolean) => {
				console.error(from, to, edit);
			},
			(node: any) => {
				OrgTreeUtility.addEmployee(node, diagram);
			},
			diagram,
		);

		diagram.nodeTemplate.contextMenu = DiagramBuilder.makeContextMenu([
			DiagramBuilder.makeButton(
				this.plusClick,
				{ icon: 'PlusLine', props: { width: 10, height: 10 } },
				'Dettaglio 1',
			),
			DiagramBuilder.makeButton(
				this.asteriskClick,
				{ icon: 'AsteriskLine', props: { width: 10, height: 10 } },
				'Dettaglio 2',
			),
		]);
	}

	changeText = (person: OrgTreeModel) => {
		var str = 'from change ' + person.name;
		return str;
	};

	plusClick = (data: OrgTreeModel) => {
		this.dataShow = data;
		this.orgTreeCmp.setModalProperties('title', 'Plus');
		this.templateBody = this.plusTemplateBody;
		this.templateFooter = undefined;
		this.orgTreeCmp.emptyMessages();
		this.orgTreeCmp.setMessage('Ho cliccato su Plus');
		this.orgTreeCmp.openModal();
	};
	asteriskClick = (data: OrgTreeModel) => {
		this.dataShow = data;
		this.orgTreeCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.orgTreeCmp.emptyMessages();
		this.orgTreeCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.orgTreeCmp.openModal();
	};
}
