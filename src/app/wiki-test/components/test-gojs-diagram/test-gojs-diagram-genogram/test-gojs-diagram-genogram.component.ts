import { Component, ViewChild } from '@angular/core';
import {
	DiagramBuilder,
	FamilyTreeModel,
	FamilyTreeUtility,
	GenogramComponent,
	GenogramModel,
	GenogramProperties,
	GenogramUtility,
	GojsDiagramModel,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-genogram',
	templateUrl: './test-gojs-diagram-genogram.component.html',
	styleUrls: ['./test-gojs-diagram-genogram.component.scss'],
})
export class TestGojsDiagramGenogramComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: GenogramProperties;
	divId: string = '';
	ready: boolean = true;

	// --- dati modal
	@ViewChild('genogramCmp') genogramCmp: GenogramComponent;
	dataShow: GenogramModel;
	spouse: GenogramModel;
	childrens: GenogramModel[];
	brothers: GenogramModel[];
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	@ViewChild('familyTemplateBody') familyTemplateBody: any;
	templateBody: any;
	templateFooter: any;

	// ---buttons
	defaultTitle: string = 'Array di genogrammi';
	familyTitle: string = 'Array ricavato da un array di family model';

	constructor() {
		this.init();
	}

	init() {
		const data = this.getDefault();
		this.diagramModel = { diagramNodeData: data, diagramLinkData: [] };

		this.diagramProperties = {
			diagramType: 'ARLECCHINO',
			linkType: 'SIMPLE',
		};
		this.divId = 'myFamilyId';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = GenogramUtility.makeNodeTemplate(diagram);
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

	changeText = (person: GenogramModel) => {
		return person.n;
	};

	plusClick = (data: GenogramModel) => {
		this.dataShow = data;
		this.genogramCmp.setModalProperties('title', 'Plus');
		this.templateBody = this.plusTemplateBody;
		this.templateFooter = undefined;
		this.genogramCmp.emptyMessages();
		this.genogramCmp.setMessage('Ho cliccato su Plus');
		this.genogramCmp.openModal();
	};
	asteriskClick = (data: GenogramModel) => {
		this.dataShow = data;
		this.genogramCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.genogramCmp.emptyMessages();
		this.genogramCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.genogramCmp.openModal();
	};

	familyClick = (data: GenogramModel) => {
		this.dataShow = data;
		this.genogramCmp.setModalProperties('title', 'Family');
		this.templateBody = this.familyTemplateBody;
		this.templateFooter = undefined;
		this.genogramCmp.emptyMessages();
		// this.spouse = genogramCmp.searchSpouse(data, this.diagramModel.diagramNodeData);
		// this.childrens = FamilyTreeUtility.searchChildrens(data, this.diagramModel.diagramNodeData);
		// this.brothers = FamilyTreeUtility.searchBrothers(data, this.diagramModel.diagramNodeData);
		this.genogramCmp.openModal();
	};

	// buttons
	clickDefault() {
		const data: GenogramModel[] = this.getDefault();
		this.genogramCmp.resetProperties();
		this.diagramProperties = {
			diagramType: 'ARLECCHINO',
			linkType: 'SIMPLE',
		};
		this.diagramModel = undefined;
		this.diagramModel = { diagramNodeData: data, diagramLinkData: [] };
		this.genogramCmp.reload();
	}

	clickFamily() {
		const family = this.getFamily();
		FamilyTreeUtility.manageData(FamilyTreeUtility.getMapKeys(family));
		const genograms = this.getGenogramFamily();
		this.genogramCmp.resetProperties();
		this.diagramProperties = {
			diagramType: 'FILLED',
			linkType: 'COMPLEX',
		};
		this.diagramModel = undefined;
		this.diagramModel = {
			diagramNodeData: genograms,
			diagramLinkData: FamilyTreeUtility.getLinksBrothers(FamilyTreeUtility.getMapKeys(family), []),
		};

		this.genogramCmp.reload();
	}

	// utils
	getDefault(): GenogramModel[] {
		return [
			{ key: 0, n: 'Aaron', s: 'M', m: -10, f: -11, ux: 1, a: ['C', 'F', 'K'] },
			{ key: 1, n: 'Alice', s: 'F', m: -12, f: -13, a: ['B', 'H', 'K'] },
			{ key: 2, n: 'Bob', s: 'M', m: 1, f: 0, ux: 3, a: ['C', 'H', 'L'] },
			{ key: 3, n: 'Barbara', s: 'F', a: ['C'] },
			{ key: 4, n: 'Bill', s: 'M', m: 1, f: 0, ux: 5, a: ['E', 'H'] },
			{ key: 5, n: 'Brooke', s: 'F', a: ['B', 'H', 'L'] },
			{ key: 6, n: 'Claire', s: 'F', m: 1, f: 0, a: ['C'] },
			{ key: 7, n: 'Carol', s: 'F', m: 1, f: 0, a: ['C', 'I'] },
			{ key: 8, n: 'Chloe', s: 'F', m: 1, f: 0, vir: 9, a: ['E'] },
			{ key: 9, n: 'Chris', s: 'M', a: ['B', 'H'] },
			{ key: 10, n: 'Ellie', s: 'F', m: 3, f: 2, a: ['E', 'G'] },
			{ key: 11, n: 'Dan', s: 'M', m: 3, f: 2, a: ['B', 'J'] },
			{ key: 12, n: 'Elizabeth', s: 'F', vir: 13, a: ['J'] },
			{ key: 13, n: 'David', s: 'M', m: 5, f: 4, a: ['B', 'H'] },
			{ key: 14, n: 'Emma', s: 'F', m: 5, f: 4, a: ['E', 'G'] },
			{ key: 15, n: 'Evan', s: 'M', m: 8, f: 9, a: ['F', 'H'] },
			{ key: 16, n: 'Ethan', s: 'M', m: 8, f: 9, a: ['D', 'K'] },
			{ key: 17, n: 'Eve', s: 'F', vir: 16, a: ['B', 'F', 'L'] },
			{ key: 18, n: 'Emily', s: 'F', m: 8, f: 9 },
			{ key: 19, n: 'Fred', s: 'M', m: 17, f: 16, a: ['B'] },
			{ key: 20, n: 'Faith', s: 'F', m: 17, f: 16, a: ['L'] },
			{ key: 21, n: 'Felicia', s: 'F', m: 12, f: 13, a: ['H'] },
			{ key: 22, n: 'Frank', s: 'M', m: 12, f: 13, a: ['B', 'H'] },

			// "Aaron"'s ancestors
			{ key: -10, n: 'Paternal Grandfather', s: 'M', m: -33, f: -32, ux: -11, a: ['A', 'S'] },
			{ key: -11, n: 'Paternal Grandmother', s: 'F', a: ['E', 'S'] },
			{ key: -32, n: 'Paternal Great', s: 'M', ux: -33, a: ['F', 'H', 'S'] },
			{ key: -33, n: 'Paternal Great', s: 'F', a: ['S'] },
			{ key: -40, n: 'Great Uncle', s: 'M', m: -33, f: -32, a: ['F', 'H', 'S'] },
			{ key: -41, n: 'Great Aunt', s: 'F', m: -33, f: -32, a: ['B', 'I', 'S'] },
			{ key: -20, n: 'Uncle', s: 'M', m: -11, f: -10, a: ['A', 'S'] },

			// "Alice"'s ancestors
			{ key: -12, n: 'Maternal Grandfather', s: 'M', ux: -13, a: ['D', 'L', 'S'] },
			{ key: -13, n: 'Maternal Grandmother', s: 'F', m: -31, f: -30, a: ['H', 'S'] },
			{ key: -21, n: 'Aunt', s: 'F', m: -13, f: -12, a: ['C', 'I'] },
			{ key: -22, n: 'Uncle', s: 'M', ux: -21 },
			{ key: -23, n: 'Cousin', s: 'M', m: -21, f: -22 },
			{ key: -30, n: 'Maternal Great', s: 'M', ux: -31, a: ['D', 'J', 'S'] },
			{ key: -31, n: 'Maternal Great', s: 'F', m: -50, f: -51, a: ['B', 'H', 'L', 'S'] },
			{ key: -42, n: 'Great Uncle', s: 'M', m: -30, f: -31, a: ['C', 'J', 'S'] },
			{ key: -43, n: 'Great Aunt', s: 'F', m: -30, f: -31, a: ['E', 'G', 'S'] },
			{
				key: -50,
				n: 'Maternal Great Great',
				s: 'F',
				vir: -51,
				a: ['D', 'I', 'S'],
			},
			{ key: -51, n: 'Maternal Great Great', s: 'M', a: ['B', 'H', 'S'] },
		];
	}

	getFamily(): FamilyTreeModel[] {
		const as52: FamilyTreeModel = {
			key: 'as52',
			name: 'Antonio Sassone',
			gender: 'M',
			birthDate: new Date('1952-03-25'),
			deathDate: undefined,
			father: 'ds35',
			mother: 'ts39',
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
		const ts35: FamilyTreeModel = {
			key: 'ts39',
			name: 'Teresina Sassone',
			gender: 'F',
			birthDate: new Date('1939-10-13'),
			deathDate: new Date('2001-05-15'),
		};
		const gs46: FamilyTreeModel = {
			key: 'gs46',
			name: 'Giuseppe Sassone',
			gender: 'M',
			birthDate: new Date('1946-10-13'),
			deathDate: undefined,
			father: 'ds35',
			mother: 'mo35',
		};
		const vs36: FamilyTreeModel = {
			key: 'vs36',
			name: 'Vincenzo Sassone',
			gender: 'M',
			birthDate: new Date('1936-12-01'),
			deathDate: undefined,
			father: 'ds35',
			mother: 'mo35',
		};
		const mo35: FamilyTreeModel = {
			key: 'mo35',
			name: 'Maria Oliveto',
			gender: 'F',
			birthDate: new Date('1939-10-13'),
			deathDate: new Date('2001-05-15'),
		};

		return [as52, mgv55, gs81, ds76, ds35, gs46, vs36, ts35, mo35];
	}

	getGenogramFamily(family?: FamilyTreeModel[]) {
		const data = family ? family : this.getFamily();
		FamilyTreeUtility.manageData(FamilyTreeUtility.getMapKeys(data));
		return FamilyTreeUtility.convertDatasToGeograms(data);
	}
}
