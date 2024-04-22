import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryUtility } from '@ddc/rest';
import { Subscription } from 'rxjs';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { EnumDiagramType } from '../../../authentication/enums/diagram-type.enum';
import { ActivitydiagramModel } from '../../../authentication/models/activitydiagram.model';
import { ActivitydiagramService } from '../../../authentication/services/activitydiagram.service';

@Component({
	selector: 'wiki-test-work-company',
	templateUrl: './test-work-company.component.html',
	styleUrls: ['./test-work-company.component.scss'],
})
export class TestWorkCompanyComponent extends BaseModuleWikiPage {
	list: ActivitydiagramModel[] = [];
	tpDiagram: EnumDiagramType;
	piva = 'CH-550.1.142.990-3';

	tmpView: string;
	idDiagram: string;
	codCu: string;
	codProject: string;
	ready: boolean;

	subList: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private activitydiagramService: ActivitydiagramService,
	) {
		super(applicationLogger, router, activatedRoute);
	}

	clickView(view: string) {
		this.ready = false;
		this.tmpView = undefined;
		this.view = undefined;
		switch (view) {
			case 'ACTIVITY-ORG-TREE':
			case 'ACTIVITY-ORG-TREE-MAKER':
				this.tpDiagram = EnumDiagramType.ORG;
				break;
			case 'CU-SEQUENCE':
			case 'CU-SEQUENCE-MAKER':
				this.tpDiagram = EnumDiagramType.SEQUENCE;
				break;
			case 'TASK-GANTT':
			case 'TASK-GANTT-MAKER':
				this.tpDiagram = EnumDiagramType.GANTT;
				break;
			default:
				this.tpDiagram = undefined;
				break;
		}
		if (this.tpDiagram) {
			const condition: DbFilterInterface = ApiFast.queryField(
				'tpdiagram',
				this.tpDiagram.toString(),
			);
			this.subList = this.activitydiagramService
				.paginate(
					ApiFast.paginatorList([condition]),
					{
						belongs: ['activity_fk'],
					},
					undefined,
					QueryUtility.SKIP_ERROR_RES,
				)
				.subscribe((paginator) => {
					this.list = paginator ? paginator.list : [];
					this.tmpView = view;
					this.ready = true;
				});
		}
	}

	set(view: string, activityDiagram?: ActivitydiagramModel) {
		this.view = undefined;
		this.idDiagram = activityDiagram ? activityDiagram.id : undefined;
		switch (view) {
			case 'ACTIVITY-ORG-TREE':
			case 'ACTIVITY-ORG-TREE-MAKER':
				break;
			case 'CU-SEQUENCE':
			case 'CU-SEQUENCE-MAKER':
				this.codCu = undefined;
				break;
			case 'TASK-GANTT':
			case 'TASK-GANTT-MAKER':
				this.codProject = undefined;
				break;
			default:
				break;
		}
		setTimeout(() => {
			super.set(view);
		}, 500);
	}

	setExample(view: string) {
		this.view = undefined;
		this.idDiagram = undefined;
		switch (view) {
			case 'ACTIVITY-ORG-TREE':
			case 'ACTIVITY-ORG-TREE-MAKER':
				break;
			case 'CU-SEQUENCE':
			case 'CU-SEQUENCE-MAKER':
				this.codCu = 'DANDYCORP_PRJ_SITE_TSK3_UC1';
				break;
			case 'TASK-GANTT':
			case 'TASK-GANTT-MAKER':
				this.codProject = 'DANDYCORP_PRJ_SITE';
				break;
			default:
				break;
		}
		setTimeout(() => {
			super.set(view);
		}, 500);
	}

	ngOnDestroyForChildren(): void {
		if (this.subList) {
			this.subList.unsubscribe();
		}
	}

	onJsonSave(id_activitydiagram: string) {
		this.view = undefined;
		this.clickView(this.tmpView);
	}
}
