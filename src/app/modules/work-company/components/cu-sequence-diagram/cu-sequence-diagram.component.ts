import { Component, Input } from '@angular/core';
import { ApplicationLoggerService } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';
import { TranslateService } from '@ngx-translate/core';
import {
	SequenceComponent,
	SequenceModel,
	SequenceProperties,
	SequenceTemplate,
	SequenceUtility,
} from 'gojs-diagram';
import { map, Observable, of, switchMap } from 'rxjs';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { EnumDiagramType } from '../../../authentication/enums/diagram-type.enum';
import { ActivityService } from '../../../authentication/services/activity.service';
import { ActivitydiagramService } from '../../../authentication/services/activitydiagram.service';
import { UsecaseoperationModel } from '../../models/usecaseoperation.model';
import { TaskusecaseService } from '../../services/taskusecase.service';
import { UsecaseoperationService } from '../../services/usecaseoperation.service';
import { BaseActivityDiagramComponent } from '../abstract/base-activity-diagram.component';
import { TaskCuSquenceConverter } from './converters/task-cu-sequence.converter';

@Component({
	selector: 'ddc-init-cu-sequence-diagram',
	templateUrl: './cu-sequence-diagram.component.html',
	styleUrls: ['./cu-sequence-diagram.component.scss'],
})
export class CuSequenceDiagramComponent extends BaseActivityDiagramComponent<
	SequenceComponent,
	SequenceProperties,
	SequenceModel,
	any,
	SequenceTemplate
> {
	@Input() id_cu: string;
	@Input() cod_cu: string;
	list: UsecaseoperationModel[] = [];
	converter: TaskCuSquenceConverter = new TaskCuSquenceConverter();

	// --- diagram
	@Input() divId: string = 'CuSequenceId';

	@Input() textButtonClose: string = 'APP.BUTTON.CANCEL';
	@Input() textButtonDetail: string = 'APP.BUTTON.DETAIL';
	@Input() textButtonEdit: string = 'APP.BUTTON.EDIT';
	@Input() textButtonAddEmployee: string = 'Nuova Operazione';

	// --- form

	// --- sub

	constructor(
		applicationLogger: ApplicationLoggerService,
		translateService: TranslateService,
		activityService: ActivityService,
		activitydiagramService: ActivitydiagramService,
		private usecaseoperationService: UsecaseoperationService,
		private taskusecaseService: TaskusecaseService,
	) {
		super(applicationLogger, translateService, activityService, activitydiagramService);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.diagramProperties = {};
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
		diagram.groupTemplate = SequenceUtility.makeGroupTemplate();
		diagram.nodeTemplate = SequenceUtility.makeNodeTemplate(diagram);
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
		return EnumDiagramType.SEQUENCE;
	}

	caller(): Observable<UsecaseoperationModel[]> {
		return this.taskusecaseService
			.unique(this.id_cu, this.cod_cu, undefined, undefined, QueryUtility.SKIP_ERROR_RES)
			.pipe(
				switchMap((cu) => {
					if (cu) {
						const condition: DbFilterInterface = ApiFast.queryField('usecase', cu.id);
						return this.usecaseoperationService
							.paginate(ApiFast.paginatorList([condition]), {
								belongs: ['taskusecase_fk'],
							})
							.pipe(map((res) => res.list));
					} else {
						return of([]);
					}
				}),
			);
	}

	manageCallerResult(list: UsecaseoperationModel[]): void {
		this.list = list;
		this.diagramModel = this.converter.convertToDiagram(this.list);
	}

	behaviourAfterComponents(): void {}

	afterSaveJson(id_activitydiagram: string): void {}

	// --- operation
}
