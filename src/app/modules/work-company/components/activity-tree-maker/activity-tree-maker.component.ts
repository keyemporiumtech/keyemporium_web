import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, EnumFormMode } from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import {
	DiagramBuilder,
	OrgTreeComponent,
	OrgTreeModel,
	OrgTreeProperties,
	OrgTreeTemplate,
	OrgTreeUtility,
} from 'gojs-diagram';
import { Observable, of } from 'rxjs';
import { EnumDiagramType } from '../../../authentication/enums/diagram-type.enum';
import { ActivityService } from '../../../authentication/services/activity.service';
import { ActivitydiagramService } from '../../../authentication/services/activitydiagram.service';
import { BaseActivityDiagramComponent } from '../abstract/base-activity-diagram.component';
import { ActivityTreeMkFormComponent } from './activity-tree-mk-form/activity-tree-mk-form.component';

@Component({
	selector: 'ddc-init-activity-tree-maker',
	templateUrl: './activity-tree-maker.component.html',
	styleUrls: ['./activity-tree-maker.component.scss'],
})
export class ActivityTreeMakerComponent extends BaseActivityDiagramComponent<
	OrgTreeComponent,
	OrgTreeProperties,
	OrgTreeModel,
	ActivityTreeMkFormComponent,
	OrgTreeTemplate
> {
	// --- diagram
	@Input() divId: string = 'ActivityTreeOrg';

	@Input() textButtonClose: string = 'APP.BUTTON.CANCEL';
	@Input() textButtonDetail: string = 'APP.BUTTON.DETAIL';
	@Input() textButtonEdit: string = 'APP.BUTTON.EDIT';
	@Input() textButtonAddEmployee: string = 'Nuovo Dipendente';

	// --- form

	// --- sub

	// --- operations
	setLabelForm(key: string, value: string) {
		this.frmCmp.labels[key] = value;
	}

	constructor(
		applicationLogger: ApplicationLoggerService,
		translateService: TranslateService,
		activityService: ActivityService,
		activitydiagramService: ActivitydiagramService,
	) {
		super(applicationLogger, translateService, activityService, activitydiagramService);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.diagramModel = {
			diagramNodeData: [{ key: 1, name: 'XXX YYY', matricola: 'xxx', role: 'PRESIDENT' }],
			diagramLinkData: [],
		};
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'ActivityTreeMakerComponent';
	}

	// --- override
	buildDiagram(diagram: go.Diagram): void {
		diagram.nodeTemplate = OrgTreeUtility.makeNodeTemplate(
			() => '',
			(from: OrgTreeModel, to: OrgTreeModel, edit: boolean) => {},
			(node: any) => {},
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

	caller(): Observable<any> {
		return of(true);
	}
	manageCallerResult(data: boolean): void {}
	behaviourAfterComponents(): void {}

	afterSaveJson(id_activitydiagram: string): void {}

	// --- operation
	detail = (data: OrgTreeModel) => {
		this.model = data;
		this.setModelParent();

		this.diagramCmp.setModalProperties('title', data.name);
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = this.templateForm;
		this.templateFooter = undefined;
		this.diagramCmp.emptyMessages();
		setTimeout(() => {
			if (this.frmCmp) {
				this.frmCmp.changeMode(EnumFormMode.DETAIL);
				this.frmCmp.model = this.model;
				this.frmCmp.listParents =
					this.diagramCmp && this.diagramCmp.diagram && this.diagramCmp.diagram.model
						? ((this.diagramCmp.diagram.model as go.GraphLinksModel)
								.nodeDataArray as OrgTreeModel[])
						: [];
			} else {
				this.diagramCmp.setMessage('Component not initialized');
			}
			this.diagramCmp.openModal();
		}, 1000);
	};

	edit = (data: OrgTreeModel) => {
		this.model = data;
		this.setModelParent();

		this.diagramCmp.setModalProperties('title', data.name);
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = this.templateForm;
		this.templateFooter = this.templateButtons;
		this.diagramCmp.emptyMessages();
		this.flgEdit = true;
		setTimeout(() => {
			if (this.frmCmp) {
				this.frmCmp.changeMode(EnumFormMode.UPDATE);
				this.frmCmp.model = this.model;
				this.frmCmp.listParents =
					this.diagramCmp && this.diagramCmp.diagram && this.diagramCmp.diagram.model
						? ((this.diagramCmp.diagram.model as go.GraphLinksModel)
								.nodeDataArray as OrgTreeModel[])
						: [];
			} else {
				this.diagramCmp.setMessage('Component not initialized');
			}
			this.diagramCmp.openModal();
		}, 1000);
	};

	add = (data: OrgTreeModel) => {
		this.model = {
			key: undefined,
			name: '',
			role: '',
			pic: '',
			matricola: '',
			parent: data.key,
			skills: [],
		};
		this.model.parent = data.key;
		this.setModelParent();

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
			if (this.frmCmp) {
				this.frmCmp.changeMode(EnumFormMode.NEW);
				this.frmCmp.model = this.model;
				this.frmCmp.listParents =
					this.diagramCmp && this.diagramCmp.diagram && this.diagramCmp.diagram.model
						? ((this.diagramCmp.diagram.model as go.GraphLinksModel)
								.nodeDataArray as OrgTreeModel[])
						: [];
			} else {
				this.diagramCmp.setMessage('Component not initialized');
			}
			this.diagramCmp.openModal();
		}, 1000);
	};

	private setModelParent() {
		if (this.diagramCmp && this.diagramCmp.diagram && this.diagramCmp.diagram.model) {
			const parentnode: any = this.diagramCmp.diagram.model.findNodeDataForKey(this.model.parent);
			this.model.parentObj = parentnode;
		}
	}

	// emitter
	onSave(model: OrgTreeModel) {
		this.diagramCmp.closeModal();
	}

	onMessages(messages: string[] | undefined) {
		if (messages) {
			super.showMessages(messages);
		}
	}

	// --- loader
}
