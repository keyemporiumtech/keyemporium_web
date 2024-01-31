import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, DateModel } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';
import { TranslateService } from '@ngx-translate/core';
import { GanttComponent, GanttModel, GanttProperties, GanttTemplate } from 'gojs-diagram';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { EnumDiagramType } from '../../../authentication/enums/diagram-type.enum';
import { ActivityService } from '../../../authentication/services/activity.service';
import { ActivitydiagramService } from '../../../authentication/services/activitydiagram.service';
import { ProjecttaskModel } from '../../models/projecttask.model';
import { ActivityprojectService } from '../../services/activityproject.service';
import { ProjecttaskService } from '../../services/projecttask.service';
import { BaseActivityDiagramComponent } from '../abstract/base-activity-diagram.component';
import { TaskGanttConverter } from './converters/task-gantt.converter';

@Component({
	selector: 'ddc-init-task-gantt-diagram',
	templateUrl: './task-gantt-diagram.component.html',
	styleUrls: ['./task-gantt-diagram.component.scss'],
})
export class TaskGanttDiagramComponent extends BaseActivityDiagramComponent<
	GanttComponent,
	GanttProperties,
	GanttModel,
	any,
	GanttTemplate
> {
	@Input() id_project: string;
	@Input() cod_project: string;
	list: ProjecttaskModel[] = [];
	dtaStart: DateModel;
	converter: TaskGanttConverter = new TaskGanttConverter();

	// --- diagram
	@Input() divId: string = 'TaskGanttId';

	@Input() textButtonClose: string = 'APP.BUTTON.CANCEL';
	@Input() textButtonDetail: string = 'APP.BUTTON.DETAIL';
	@Input() textButtonEdit: string = 'APP.BUTTON.EDIT';
	@Input() textButtonAddEmployee: string = 'Nuova Operazione';

	// --- form

	// --- sub
	subProject: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		translateService: TranslateService,
		activityService: ActivityService,
		activitydiagramService: ActivitydiagramService,
		private activityprojectService: ActivityprojectService,
		private projecttaskService: ProjecttaskService,
	) {
		super(applicationLogger, translateService, activityService, activitydiagramService);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.dtaStart = new DateModel('2023-09-05', 'YYYY-MM-DD');
		this.diagramProperties = {
			startDate: this.dtaStart.toDate(),
		};
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'CuSequenceDiagramComponent';
	}

	buildDiagram(diagram: go.Diagram): void {
		// diagram.groupTemplate = SequenceUtility.makeGroupTemplate();
		// diagram.nodeTemplate = SequenceUtility.makeNodeTemplate(diagram);
		/*
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
    */
		/*
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
    */
	}

	tpDiagram(): EnumDiagramType {
		return EnumDiagramType.GANTT;
	}

	caller(): Observable<ProjecttaskModel[]> {
		return this.activityprojectService
			.unique(this.id_project, this.cod_project, undefined, undefined, QueryUtility.SKIP_ERROR_RES)
			.pipe(
				switchMap((prj) => {
					if (prj) {
						const condition: DbFilterInterface = ApiFast.queryField('project', prj.id);
						return this.projecttaskService
							.paginate(ApiFast.paginatorList([condition]), {
								belongs: ['activityproject_fk'],
							})
							.pipe(map((res) => res.list));
					} else {
						return of([]);
					}
				}),
			);
	}

	manageCallerResult(list: ProjecttaskModel[]): void {
		this.list = list;
		this.diagramModel = this.converter.convertToDiagram(this.list, this.dtaStart);
	}

	behaviourAfterComponents(): void {}

	afterSaveJson(id_activitydiagram: string): void {}

	// --- operation
}
