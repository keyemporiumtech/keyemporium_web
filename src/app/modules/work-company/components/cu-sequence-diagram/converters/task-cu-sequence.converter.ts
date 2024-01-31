import { GojsDiagramModel, SequenceGroupModel, SequenceModel, SequenceUtility } from 'gojs-diagram';
import { UsecaseoperationModel } from '../../../models/usecaseoperation.model';

export class TaskCuSquenceConverter {
	convertToDiagram(list: UsecaseoperationModel[]): GojsDiagramModel {
		const groups: SequenceGroupModel[] = [];
		const sequences: SequenceModel[] = [];
		let group: SequenceGroupModel;
		let sequence: SequenceModel;
		let searchIndex: number;
		list.forEach((el) => {
			searchIndex = groups.findIndex((g) => g.text === el.actorfrom);
			if (searchIndex === -1) {
				group = {
					key: el.actorfrom,
					text: el.actorfrom,
				};
				groups.push(group);
			}
			searchIndex = groups.findIndex((g) => g.text === el.actorto);
			if (searchIndex === -1) {
				group = {
					key: el.actorto,
					text: el.actorto,
				};
				groups.push(group);
			}

			sequence = {
				init: el.start,
				fromGroup: el.actorfrom,
				text: el.operation,
				toGroup: el.actorto,
			};
			sequences.push(sequence);
		});

		const objTemplate: any = SequenceUtility.makeComponents(groups, sequences);

		const data = objTemplate.nodes;
		const link = objTemplate.links;

		return { diagramNodeData: data, diagramLinkData: link };
	}
}
