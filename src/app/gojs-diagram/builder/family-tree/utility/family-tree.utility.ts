import * as go from 'gojs';
import { GojsLinkDataModel } from '../../../core/model/gojs-link-data.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { GenogramModel } from '../../genogram/model/genogram.model';
import { GenogramUtility } from '../../genogram/utility/genogram.utility';
import { EnumFamilyLinkCategory, FamilyTreeModel } from '../model/family-tree.model';

export class FamilyTreeUtility {
	// ---------- props
	static maleColor: string = '#90CAF9';
	static femaleColor: string = '#F48FB1';
	static parentChildColor: string = '#2672EC';
	static spouseColor: string = '#AC193D';
	static brotherColor: string = '#00af54';
	static typeShape: EnumFigureType = EnumFigureType.RETTANGOLO;
	static textMales: string = 'Males';
	static textFemales: string = 'Females';

	/**
	 * Costruisce il nodo
	 * @param callbackText dato un modello ritorna un stringa da visualizzare nello shape
	 * @returns go.Node
	 */
	static makeNodeTemplate(callbackText: (person: FamilyTreeModel) => string): any {
		const $ = go.GraphObject.make;
		return $(
			go.Node,
			'Auto',
			{ deletable: false },
			new go.Binding('text', 'name'),
			new go.Binding('location', 'loc', go.Point.parse),
			$(
				go.Shape,
				FamilyTreeUtility.typeShape,
				{
					fill: 'lightgray',
					stroke: null,
					strokeWidth: 0,
					stretch: go.GraphObject.Fill,
					alignment: go.Spot.Center,
				},
				new go.Binding('fill', 'gender', FamilyTreeUtility.genderBrushConverter),
			),
			$(
				go.TextBlock,
				{
					font: '700 12px Droid Serif, sans-serif',
					textAlign: 'center',
					margin: 10,
					maxSize: new go.Size(80, NaN),
				},
				new go.Binding('text', '', callbackText),
			),
		);
	}

	/**
	 * Costruisce un tooltip per un elemento del grafo
	 * @param callbackTooltip dato un modello ritorna un stringa da visualizzare in tooltip
	 * @returns tooltip
	 */
	static makeTooltip(callbackTooltip: (person: FamilyTreeModel) => string): any {
		const $ = go.GraphObject.make;
		return $(
			'ToolTip',
			{ 'Border.fill': 'whitesmoke', 'Border.stroke': 'black' },
			$(
				go.Panel,
				'Table',
				$(
					go.TextBlock,
					{
						font: 'bold 10pt Helvetica, bold Arial, sans-serif',
						wrap: go.TextBlock.WrapFit,
						margin: 5,
						row: 0,
					},
					new go.Binding('text', '', callbackTooltip),
				),
			),
		);
	}

	/**
	 * Costruisce la legenda per indicare i colori per sesso Maschile o Femminile
	 * @returns go.Part legenda
	 */
	static makeLegendaSex(): any {
		const $ = go.GraphObject.make;
		return $(
			go.Part,
			'Table',
			{ position: new go.Point(500, 10), selectable: false },
			$(go.TextBlock, 'Key', {
				row: 0,
				font: '700 14px Droid Serif, sans-serif',
			}), // end row 0
			$(
				go.Panel,
				'Horizontal',
				{ row: 1, alignment: go.Spot.Left },
				$(go.Shape, FamilyTreeUtility.typeShape, {
					desiredSize: new go.Size(30, 30),
					fill: FamilyTreeUtility.maleColor,
					margin: 5,
				}),
				$(go.TextBlock, FamilyTreeUtility.textMales, {
					font: '700 13px Droid Serif, sans-serif',
				}),
			), // end row 1
			$(
				go.Panel,
				'Horizontal',
				{ row: 2, alignment: go.Spot.Left },
				$(go.Shape, FamilyTreeUtility.typeShape, {
					desiredSize: new go.Size(30, 30),
					fill: FamilyTreeUtility.femaleColor,
					margin: 5,
				}),
				$(go.TextBlock, FamilyTreeUtility.textFemales, {
					font: '700 13px Droid Serif, sans-serif',
				}),
			), // end row 2
		);
	}

	// --------------- functions
	static genderBrushConverter = (gender: 'M' | 'F') => {
		if (gender === 'M') return this.maleColor;
		if (gender === 'F') return this.femaleColor;
		return 'orange';
	};

	static getNameBorn(person: FamilyTreeModel): string {
		return person.name + ' (' + person.birthDate?.getFullYear() + ')';
	}

	// --------------- utils

	static manageData(data: FamilyTreeModel[]): void {
		let spouse;
		data.forEach((el) => {
			spouse = FamilyTreeUtility.searchSpouse(el, data);
			if (spouse && spouse.gender === 'F') {
				el.wife = spouse.key;
			} else if (spouse && spouse.gender === 'M') {
				el.husband = spouse.key;
			}
			const brothers = FamilyTreeUtility.searchBrothers(el, data);
			el.brothers = brothers.map((el) => el.key);
		});
	}

	static makeLinks(data: FamilyTreeModel[]): GojsLinkDataModel[] {
		const links: GojsLinkDataModel[] = FamilyTreeUtility.getLinksParentChild(data);
		const linksSpouse: GojsLinkDataModel[] = FamilyTreeUtility.getLinksSpouse(data, links);
		const linksBrothers: GojsLinkDataModel[] = FamilyTreeUtility.getLinksBrothers(data, links);

		return [...links, ...linksSpouse, ...linksBrothers];
	}

	static getLinksParentChild(data: FamilyTreeModel[]): GojsLinkDataModel[] {
		const links: GojsLinkDataModel[] = [];
		data.forEach((el) => {
			if (el.mother) {
				links.push({
					key: el.key + '_' + el.mother,
					from: el.mother,
					to: el.key,
					color: this.parentChildColor,
					category: EnumFamilyLinkCategory.PARENT_CHILD.toString(),
				});
			}
			if (el.father) {
				links.push({
					key: el.key + '_' + el.father,
					from: el.father,
					to: el.key,
					color: this.parentChildColor,
					category: EnumFamilyLinkCategory.PARENT_CHILD.toString(),
				});
			}
		});

		return links;
	}

	static getLinksSpouse(
		data: FamilyTreeModel[],
		existingLink: GojsLinkDataModel[],
	): GojsLinkDataModel[] {
		const links: GojsLinkDataModel[] = [];
		data.forEach((el) => {
			const spouse = FamilyTreeUtility.searchSpouse(el, data);

			if (spouse) {
				const existingSpouseLink = existingLink.findIndex(
					(p) =>
						(p.from === spouse.key && p.to === el.key) ||
						(p.from === el.key && p.to === spouse.key),
				);
				if (existingSpouseLink === -1) {
					const mEl = {
						key: el.key + '_' + spouse.key,
						from: el.key,
						to: spouse.key,
						color: this.spouseColor,
						category: EnumFamilyLinkCategory.SPOUSE.toString(),
					};
					links.push(mEl);
					existingLink.push(mEl);
				}
			}
		});

		return links;
	}

	static getLinksBrothers(
		data: FamilyTreeModel[],
		existingLink: GojsLinkDataModel[],
	): GojsLinkDataModel[] {
		const links: GojsLinkDataModel[] = [];
		data.forEach((el) => {
			const brothersKey = el.brothers;

			if (brothersKey && brothersKey.length) {
				brothersKey.forEach((brotherK) => {
					const existingBrotherLink = existingLink.findIndex(
						(p) =>
							(p.from === brotherK && p.to === el.key) || (p.from === el.key && p.to === brotherK),
					);
					if (existingBrotherLink === -1) {
						const mEl = {
							key: el.key + '_' + brotherK,
							from: el.key,
							to: brotherK,
							color: this.brotherColor,
							category: EnumFamilyLinkCategory.BROTHER.toString(),
						};
						links.push(mEl);
						existingLink.push(mEl);
					}
				});
			}
		});

		return links;
	}

	// ----- searchers

	static searchBrothers(person: FamilyTreeModel, data: FamilyTreeModel[]): FamilyTreeModel[] {
		const brothers: FamilyTreeModel[] = [];

		data.forEach((el) => {
			if (
				el.key !== person.key &&
				((el.mother && el.mother === person.mother) || (el.father && el.father === person.father))
			) {
				brothers.push(el);
			}
		});

		return brothers;
	}

	static searchChildrens(person: FamilyTreeModel, data: FamilyTreeModel[]): FamilyTreeModel[] {
		const childrens: FamilyTreeModel[] = [];

		data.forEach((el) => {
			if (
				el.key !== person.key &&
				((el.mother && el.mother === person.key) || (el.father && el.father === person.key))
			) {
				childrens.push(el);
			}
		});

		return childrens;
	}

	static searchSpouse(
		person: FamilyTreeModel,
		data: FamilyTreeModel[],
	): FamilyTreeModel | undefined {
		const childrens: FamilyTreeModel[] = this.searchChildrens(person, data);

		if (childrens && childrens.length && childrens[0]) {
			return person.gender === 'M'
				? data.find((el) => el.key === childrens[0].mother)
				: data.find((el) => el.key === childrens[0].father);
		}

		return undefined;
	}

	// --- utility converters

	static getMapKeys(models: FamilyTreeModel[]): FamilyTreeModel[] {
		const mapKeys: Map<string, number> = new Map<string, number>();
		for (let i = 1; i <= models.length; i++) {
			mapKeys.set(models.at(i - 1).key as string, i);
		}
		let tmpKey;
		return models.map((el) => {
			tmpKey = el.key as string;
			el.key = mapKeys.get(tmpKey);
			if (el.mother) {
				tmpKey = el.mother as string;
				el.mother = mapKeys.get(tmpKey);
			}
			if (el.father) {
				tmpKey = el.father as string;
				el.father = mapKeys.get(tmpKey);
			}
			if (el.wife) {
				tmpKey = el.wife as string;
				el.wife = mapKeys.get(tmpKey);
			}
			if (el.husband) {
				tmpKey = el.husband as string;
				el.husband = mapKeys.get(tmpKey);
			}
			return el;
		});
	}

	static convertDatasToGeograms(models: FamilyTreeModel[]): GenogramModel[] {
		const genograms: GenogramModel[] = [];
		FamilyTreeUtility.manageData(models);

		const modelsNewKeys: FamilyTreeModel[] = FamilyTreeUtility.getMapKeys(models);

		let genogram: GenogramModel;
		modelsNewKeys.forEach((el) => {
			genogram = FamilyTreeUtility.convertToGenogram(el, el.key as number);
			genograms.push(genogram);
		});

		return genograms;
	}

	static convertToGenogram(model: FamilyTreeModel, key?: number): GenogramModel {
		if (!key) {
			key = Math.random();
		}
		const colorGender = GenogramUtility.getColorByFamilyTreeModel(model);
		const geogram: GenogramModel = {
			key: key,
			n: FamilyTreeUtility.getNameBorn(model),
			s: model.gender,
			m: model.mother as number,
			f: model.father as number,
			ux: model.wife as number,
			vir: model.husband as number,
			a: [colorGender],
			color: FamilyTreeUtility.genderBrushConverter(model.gender),
		};

		return geogram;
	}
}
