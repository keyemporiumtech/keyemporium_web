import { GojsDiagramModel, GojsLinkDataModel, OrgTreeModel, OrgTreeUtility } from 'gojs-diagram';
import { AttachmentModel } from '../../../../resources/models/attachment.model';
import { ActivityuserModel } from '../../../models/activityuser.model';
import { ActivityOrgTreePayload } from '../models/activity-org-tree.payload';

export class ActivityOrgTreeConverter {
	convertToDiagram(
		list: ActivityuserModel[],
		pictures: { user_id: string; attachment: AttachmentModel }[],
	): GojsDiagramModel {
		const diagramNodeData: OrgTreeModel[] = [];
		let diagramLinkData: GojsLinkDataModel[] = [];

		let node: OrgTreeModel;
		list.forEach((el) => {
			const pic = pictures.find((pic) => pic.user_id === el.user.id);
			node = this.convertToOrgTree(el, pic ? pic.attachment : undefined);
			diagramNodeData.push(node);
		});

		diagramLinkData = OrgTreeUtility.makeLinks(diagramNodeData);

		return { diagramNodeData: diagramNodeData, diagramLinkData: diagramLinkData };
	}

	convertToOrgTree(el: ActivityuserModel, attachment: AttachmentModel): OrgTreeModel {
		return {
			key: el.user.id,
			name: el.user.name + ' ' + el.user.surname,
			role: el.role ? el.role.description : 'NONE',
			matricola: el.cod,
			parent: el.father && el.father.id ? el.father.id : null,
			pic: attachment ? attachment.path : 'img/user/user.png',
			payloads: this.makePayloads(el, { user_id: el.user.id, attachment: attachment }),
		};
	}

	private makePayloads(
		model: ActivityuserModel,
		pic: { user_id: string; attachment: AttachmentModel },
	): ActivityOrgTreePayload {
		return {
			activityuser: model,
			activity: model.activity,
			user: model.user,
			role: model.role,
			father: model.father,
			pic: pic ? pic.attachment : undefined,
		};
	}
}
