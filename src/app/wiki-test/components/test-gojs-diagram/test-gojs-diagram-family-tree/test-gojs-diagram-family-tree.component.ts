import { Component, ViewChild } from '@angular/core';
import * as go from 'gojs';
import {
	DiagramBuilder,
	EnumFigureType,
	FamilyTreeComponent,
	FamilyTreeModel,
	FamilyTreeUtility,
	GojsDiagramModel,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-family-tree',
	templateUrl: './test-gojs-diagram-family-tree.component.html',
	styleUrls: ['./test-gojs-diagram-family-tree.component.scss'],
})
export class TestGojsDiagramFamilyTreeComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: any;
	divId: string = '';

	// --- dati modal
	@ViewChild('familyTreeCmp') familyTreeCmp: FamilyTreeComponent;
	dataShow: FamilyTreeModel;
	spouse: FamilyTreeModel;
	childrens: FamilyTreeModel[];
	brothers: FamilyTreeModel[];
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	@ViewChild('familyTemplateBody') familyTemplateBody: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}

	init() {
		const as52: FamilyTreeModel = {
			key: 'as52',
			name: 'Antonio Sassone',
			gender: 'M',
			birthDate: new Date('1952-03-25'),
			deathDate: undefined,
			father: 'ds35',
		};
		const mgv55: FamilyTreeModel = {
			key: 'mgv55',
			name: 'Maria Giuseppa Vanni',
			gender: 'F',
			birthDate: new Date('1955-10-13'),
			deathDate: undefined,
		};
		const gs81: FamilyTreeModel = {
			key: 'gs81',
			name: 'Giuseppe Sassone',
			gender: 'M',
			birthDate: new Date('1981-05-25'),
			deathDate: undefined,
			father: 'as52',
			mother: 'mgv55',
		};

		const ds76: FamilyTreeModel = {
			key: 'ds76',
			name: 'Domenico Sassone',
			gender: 'M',
			birthDate: new Date('1976-10-02'),
			deathDate: undefined,
			father: 'as52',
			mother: 'mgv55',
		};

		const ds35: FamilyTreeModel = {
			key: 'ds35',
			name: 'Domenico Sassone',
			gender: 'M',
			birthDate: new Date('1935-10-13'),
			deathDate: new Date('1995-05-15'),
		};
		const gs46: FamilyTreeModel = {
			key: 'gs46',
			name: 'Giuseppe Sassone',
			gender: 'M',
			birthDate: new Date('1946-10-13'),
			deathDate: undefined,
			father: 'ds35',
		};

		const data = [as52, mgv55, gs81, ds76, ds35, gs46];
		FamilyTreeUtility.manageData(data);
		const link = FamilyTreeUtility.makeLinks(data);

		this.diagramModel = { diagramNodeData: data, diagramLinkData: link };

		this.diagramProperties = {
			shape: { type: EnumFigureType.ARROTONDATO },
		};
		this.divId = 'myFamilyId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = FamilyTreeUtility.makeNodeTemplate(this.changeText);
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
			DiagramBuilder.makeButton(
				this.familyClick,
				{ icon: 'YinYang', props: { width: 10, height: 10 } },
				'Famiglia',
			),
		]);
	}

	changeText = (person: FamilyTreeModel) => {
		var str = person.name;
		str += '\nBorname: ' + person.birthDate?.getFullYear();
		return str;
	};

	plusClick = (data: FamilyTreeModel) => {
		this.dataShow = data;
		this.familyTreeCmp.setModalProperties('title', 'Plus');
		this.templateBody = this.plusTemplateBody;
		this.templateFooter = undefined;
		this.familyTreeCmp.emptyMessages();
		this.familyTreeCmp.setMessage('Ho cliccato su Plus');
		this.familyTreeCmp.openModal();
	};
	asteriskClick = (data: FamilyTreeModel) => {
		this.dataShow = data;
		this.familyTreeCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.familyTreeCmp.emptyMessages();
		this.familyTreeCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.familyTreeCmp.openModal();
	};

	familyClick = (data: FamilyTreeModel) => {
		this.dataShow = data;
		this.familyTreeCmp.setModalProperties('title', 'Family');
		this.templateBody = this.familyTemplateBody;
		this.templateFooter = undefined;
		this.familyTreeCmp.emptyMessages();
		this.spouse = FamilyTreeUtility.searchSpouse(data, this.diagramModel.diagramNodeData);
		this.childrens = FamilyTreeUtility.searchChildrens(data, this.diagramModel.diagramNodeData);
		this.brothers = FamilyTreeUtility.searchBrothers(data, this.diagramModel.diagramNodeData);
		this.familyTreeCmp.openModal();
	};
}
