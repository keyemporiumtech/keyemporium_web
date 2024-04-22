import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, EnumFormMode } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';
import { TranslateService } from '@ngx-translate/core';
import {
	DiagramBuilder,
	OrgTreeComponent,
	OrgTreeModel,
	OrgTreeProperties,
	OrgTreeTemplate,
	OrgTreeUtility,
} from 'gojs-diagram';
import { concat, map, Observable, of, Subscription, switchMap, toArray } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { RequestConditionInterface } from '../../../api/cakeutils/interfaces/request-conditions.interface';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { ActivityConverter } from '../../../authentication/converters/activity.converter';
import { UserConverter } from '../../../authentication/converters/user.converter';
import { EnumDiagramType } from '../../../authentication/enums/diagram-type.enum';
import { ActivityService } from '../../../authentication/services/activity.service';
import { ActivitydiagramService } from '../../../authentication/services/activitydiagram.service';
import { UserService } from '../../../authentication/services/user.service';
import { UserattachmentService } from '../../../authentication/services/userattachment.service';
import { EnumAttachmentType } from '../../../resources/enums/attachment-type.enum';
import { AttachmentModel } from '../../../resources/models/attachment.model';
import { ActivityuserConverter } from '../../converters/activityuser.converter';
import { ActivityuserModel } from '../../models/activityuser.model';
import { ActivityuserService } from '../../services/activityuser.service';
import { BaseActivityDiagramComponent } from '../abstract/base-activity-diagram.component';
import { ActivityTreeFormComponent } from './activity-tree-form/activity-tree-form.component';
import { ActivityOrgTreeConverter } from './converters/activity-org-tree.converter';

@Component({
	selector: 'ddc-init-activity-tree-diagram',
	templateUrl: './activity-tree-diagram.component.html',
	styleUrls: ['./activity-tree-diagram.component.scss'],
})
export class ActivityTreeDiagramComponent extends BaseActivityDiagramComponent<
	OrgTreeComponent,
	OrgTreeProperties,
	OrgTreeModel,
	ActivityTreeFormComponent,
	OrgTreeTemplate
> {
	list: ActivityuserModel[] = [];
	pictures: { user_id: string; attachment: AttachmentModel }[] = [];
	converter: ActivityOrgTreeConverter = new ActivityOrgTreeConverter();

	// --- diagram
	@Input() divId: string = 'ActivityTreeOrg';

	@Input() textButtonClose: string = 'APP.BUTTON.CANCEL';
	@Input() textButtonDetail: string = 'APP.BUTTON.DETAIL';
	@Input() textButtonEdit: string = 'APP.BUTTON.EDIT';
	@Input() textButtonAddEmployee: string = 'Nuovo Dipendente';

	// --- form

	// --- sub
	subFlat: Subscription;
	subPostSave: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		translateService: TranslateService,
		activityService: ActivityService,
		activitydiagramService: ActivitydiagramService,
		private userService: UserService,
		private activityuserService: ActivityuserService,
		private userattachmentService: UserattachmentService,
	) {
		super(applicationLogger, translateService, activityService, activitydiagramService);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.diagramProperties = {
			PATH_PIC: environment.api.services,
		};
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
		if (this.subFlat) {
			this.subFlat.unsubscribe();
		}
		if (this.subPostSave) {
			this.subPostSave.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ActivityTreeDiagramComponent';
	}

	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = OrgTreeUtility.makeNodeTemplate(
			() => '',
			(from: OrgTreeModel, to: OrgTreeModel, edit: boolean) => {
				this.addLink(from, to, edit);
			},
			(node: any) => {
				this.addNode(node, diagram);
			},
			diagram,
		);

		diagram.nodeTemplate.contextMenu = DiagramBuilder.makeContextMenu([
			DiagramBuilder.makeButton(
				this.detail,
				undefined,
				this.translateService.instant(this.textButtonDetail),
			),
			DiagramBuilder.makeButton(
				this.edit,
				undefined, // { icon: 'AsteriskLine', props: { width: 10, height: 10 } },
				this.translateService.instant(this.textButtonEdit),
			),
			DiagramBuilder.makeButton(
				this.add,
				undefined,
				this.translateService.instant(this.textButtonAddEmployee),
			),
		]);
	}

	tpDiagram(): EnumDiagramType {
		return EnumDiagramType.ORG;
	}

	caller(): Observable<{
		list: ActivityuserModel[];
		pictures: { user_id: string; attachment: AttachmentModel }[];
	}> {
		return this.load().pipe(
			switchMap((res) => {
				return this.loadList().pipe(
					map((data) => {
						return {
							list: data.list,
							pictures: data.pictures,
						};
					}),
				);
			}),
		);
	}

	manageCallerResult(data: {
		list: ActivityuserModel[];
		pictures: { user_id: string; attachment: AttachmentModel }[];
	}): void {
		this.list = data.list;
		this.pictures = data.pictures;
		this.diagramModel = this.converter.convertToDiagram(this.list, this.pictures);
	}

	behaviourAfterComponents(): void {}

	afterSaveJson(id_activitydiagram: string): void {}

	// --- operation
	detail = (data: OrgTreeModel) => {
		this.model = data;
		this.diagramCmp.setModalProperties('title', data.name);
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = this.templateForm;
		this.templateFooter = undefined;
		this.diagramCmp.emptyMessages();
		setTimeout(() => {
			this.frmCmp.changeMode(EnumFormMode.DETAIL);
			this.diagramCmp.openModal();
		}, 1000);
	};

	edit = (data: OrgTreeModel) => {
		this.model = data;
		this.diagramCmp.setModalProperties('title', data.name);
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = this.templateForm;
		this.templateFooter = this.templateButtons;
		this.diagramCmp.emptyMessages();
		this.flgEdit = true;
		setTimeout(() => {
			this.frmCmp.changeMode(EnumFormMode.UPDATE);
			this.diagramCmp.openModal();
		}, 1000);
	};

	add = (data: OrgTreeModel) => {
		this.model = {
			name: undefined,
			role: undefined,
			pic: undefined,
			matricola: undefined,
			payloads: {
				activityuser: undefined,
				activity: undefined,
				user: undefined,
				role: undefined,
				father: new UserConverter().getEmptyModel(),
				pic: undefined,
			},
		};
		this.model.payloads.father.id = data.key;
		this.model.parent = data.key;

		this.diagramCmp.setModalProperties(
			'title',
			data.name + ' -> ' + this.translateService.instant(this.textButtonAddEmployee),
		);
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = this.templateForm;
		this.templateFooter = this.templateButtons;
		this.diagramCmp.emptyMessages();
		this.flgEdit = false;
		setTimeout(() => {
			this.frmCmp.changeMode(EnumFormMode.NEW);
			this.diagramCmp.openModal();
		}, 1000);
	};

	onSaveForm(id_activityuser) {
		this.subPostSave = this.activityuserService
			.unique(id_activityuser, undefined, {
				belongs: ['activity_fk', 'user_fk', 'role_fk', 'father_fk'],
			})
			.pipe(
				switchMap((activityuser) => {
					return this.loadPicture(activityuser).pipe(
						map((attachment) => {
							return { activityuser: activityuser, attachment: attachment };
						}),
					);
				}),
			)
			.subscribe((obj) => {
				const model = this.converter.convertToOrgTree(obj.activityuser, obj.attachment);
				this.diagramCmp.diagram.startTransaction('NODE_BY_FORM');
				const node = this.diagramCmp.diagram.findNodeForKey(model.key);
				if (node) {
					this.diagramCmp.diagram.model.assignAllDataProperties(node.data, model);
				} else {
					this.diagramCmp.diagram.model.addNodeData(model);
				}
				const links = this.diagramCmp.diagram.findLinksByExample({
					to: model.key,
				});
				if (links.count > 0) {
					links.each((el) => {
						if (el.fromNode.key !== model.parent) {
							el.fromNode = this.diagramCmp.diagram.findNodeForKey(model.parent);
						}
					});
				} else {
					(this.diagramCmp.diagram.model as go.GraphLinksModel).addLinkData({
						key: model.parent + '_' + model.key,
						from: model.parent,
						to: model.key,
					});
				}
				this.diagramCmp.diagram.commitTransaction('NODE_BY_FORM');
				this.diagramCmp.diagram.commandHandler.scrollToPart(
					this.diagramCmp.diagram.findNodeForKey(model.key),
				);

				this.diagramCmp.closeModal();
			});
	}

	// --- flat operations
	addLink(from: OrgTreeModel, to: OrgTreeModel, edit: boolean) {
		// console.error(from, to, edit);
		const activityuser = to.payloads.activityuser;
		activityuser.father = from.payloads.user;
		this.subFlat = this.activityuserService.edit(activityuser, activityuser.id).subscribe((res) => {
			console.error('Aggiornato');
		});
	}

	addNode(node: any, myDiagram: go.Diagram) {
		if (!node) return;
		const father: OrgTreeModel = node.data;

		const user = new UserConverter().getEmptyModel();
		user.name = 'XXX';
		user.surname = 'YYY';
		user.password = 'User01';

		this.subFlat = this.userService
			.save(user)
			.pipe(
				switchMap((id_user) => {
					const activityuser = new ActivityuserConverter().getEmptyModel();
					activityuser.user = user;
					activityuser.user.id = id_user;
					activityuser.activity = new ActivityConverter().getEmptyModel();
					activityuser.activity.id = this.id_activity;
					activityuser.father = new UserConverter().getEmptyModel();
					activityuser.father.id = father.key;
					return this.activityuserService.save(activityuser).pipe(
						switchMap((id_activityuser) => {
							return this.activityuserService
								.unique(id_activityuser, undefined, {
									belongs: ['activity_fk', 'user_fk', 'role_fk', 'father_fk'],
								})
								.pipe(
									switchMap((activityuser) => {
										return this.loadPicture(activityuser).pipe(
											map((attachment) => {
												return { activityuser: activityuser, attachment: attachment };
											}),
										);
									}),
								);
						}),
					);
				}),
			)
			.subscribe((obj) => {
				myDiagram.startTransaction('add employee');
				const newemp = this.converter.convertToOrgTree(obj.activityuser, obj.attachment);
				myDiagram.model.addNodeData(newemp);
				(myDiagram.model as go.GraphLinksModel).addLinkData({
					key: Math.random(),
					from: father.key,
					to: newemp.key,
				});
				const newnode: any = myDiagram.findNodeForData(newemp);
				if (newnode) newnode.location = node.location;
				myDiagram.commitTransaction('add employee');
				myDiagram.commandHandler.scrollToPart(newnode);
				console.error('Aggiornato');
			});
	}

	// --- loader

	private loadList(): Observable<{
		list: ActivityuserModel[];
		pictures: { user_id: string; attachment: AttachmentModel }[];
	}> {
		return this.loadOrgs().pipe(
			switchMap((res) => {
				return this.loadPictures(res).pipe(
					map((rel) => {
						return {
							list: res,
							pictures: rel,
						};
					}),
				);
			}),
		);
	}

	private loadOrgs(): Observable<ActivityuserModel[]> {
		const condition: DbFilterInterface = this.id_activity
			? ApiFast.queryField('activity', this.id_activity)
			: this.piva
			? ApiFast.queryField('activity_fk.piva', this.piva)
			: undefined;
		if (condition) {
			return this.activityuserService
				.paginate(ApiFast.paginatorList([condition]), {
					belongs: ['activity_fk', 'user_fk', 'role_fk', 'father_fk'],
				})
				.pipe(map((res) => res.list));
		} else {
			return of([]);
		}
	}

	private loadPictures(
		list: ActivityuserModel[],
	): Observable<{ user_id: string; attachment: AttachmentModel }[]> {
		const $obses: Observable<{ user_id: string; attachment: AttachmentModel }>[] = [];
		const conditions: RequestConditionInterface = {
			belongs: ['attachment_fk'],
		};
		list.forEach((el) => {
			$obses.push(
				this.userattachmentService
					.principal(
						el.user.id,
						undefined,
						EnumAttachmentType.IMAGE,
						conditions,
						undefined,
						QueryUtility.SKIP_ERROR_RES,
					)
					.pipe(
						map((res) => {
							return {
								user_id: el.user.id,
								attachment: res ? res.attachment : undefined,
							};
						}),
					),
			);
		});
		return concat(...$obses).pipe(
			toArray(),
			map((res) => res),
		);
	}

	private loadPicture(el: ActivityuserModel): Observable<AttachmentModel> {
		//const $obses: Observable<{ user_id; attachment }>[] = [];
		const conditions: RequestConditionInterface = {
			belongs: ['attachment_fk'],
		};

		return this.userattachmentService
			.principal(
				el.user.id,
				undefined,
				EnumAttachmentType.IMAGE,
				conditions,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			)
			.pipe(
				map((res) => {
					return res ? res.attachment : undefined;
				}),
			);
	}
}
