import { Directive, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ApplicationLoggerService, BaseComponent, TranslateUtility } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';
import { TranslateService } from '@ngx-translate/core';
import {
	GojsBuilder,
	GojsDiagramComponent,
	GojsDiagramModel,
	GojsNodeDataModel,
} from 'gojs-diagram';
import { combineLatest, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { TypologicalModel } from '../../../api/cakeutils-be/models/typological.model';
import { EnumDiagramType } from '../../../authentication/enums/diagram-type.enum';
import { ActivityModel } from '../../../authentication/models/activity.model';
import { ActivitydiagramModel } from '../../../authentication/models/activitydiagram.model';
import { ActivityService } from '../../../authentication/services/activity.service';
import { ActivitydiagramService } from '../../../authentication/services/activitydiagram.service';
import { JsonSaveFormComponent } from '../commons/json-save-form/json-save-form.component';

@Directive()
export abstract class BaseActivityDiagramComponent<
	C extends GojsDiagramComponent<T, M>,
	P,
	M extends GojsNodeDataModel,
	F,
	T extends GojsBuilder,
> extends BaseComponent {
	// activity diagram json
	@Input() id_activity: string;
	@Input() piva: string;
	@Input() id_diagram: string;
	@Input() cod_diagram: string;
	activity: ActivityModel;
	activitydiagram: ActivitydiagramModel;

	@Input() labels: any = {
		showJson: 'Show JSON',
		saveJson: 'Save JSON',
		flagShowJson: true,
		flagSaveJson: true,
		showJsonBtnClass: 'btn-primary',
		showJsonBtnStyle: undefined,
		saveJsonBtnClass: 'btn-primary',
		saveJsonBtnStyle: undefined,
	};

	// --- diagram
	diagramModel: GojsDiagramModel;
	diagramProperties: P;
	@Input() divId: string = '';
	templateBody: any;
	templateFooter: any;
	@ViewChild('diagramCmp') diagramCmp: C;
	model: M;
	flgEdit: boolean;

	// --- form
	@ViewChild('frmCmp') frmCmp: F;
	@ViewChild('frmJsonCmp') frmJsonCmp: JsonSaveFormComponent;
	@ViewChild('templateForm') templateForm: any;
	@ViewChild('templateButtons') templateButtons: any;
	@ViewChild('templateJson') templateJson: any;
	@ViewChild('templateMessage') templateMessage: any;
	@ViewChild('templateSaveJson') templateSaveJson: any;

	@Output() saveJsonEmit: EventEmitter<string> = new EventEmitter<string>();

	// --- messages internal
	internalMessages: string[] = [];

	// --- sub
	subSaveJson: Subscription;
	subCaller: Subscription;

	// services
	translateService: TranslateService;
	activityService: ActivityService;
	activitydiagramService: ActivitydiagramService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		translateService: TranslateService,
		activityService: ActivityService,
		activitydiagramService: ActivitydiagramService,
	) {
		super(applicationLogger);
		this.translateService = translateService;
		this.activityService = activityService;
		this.activitydiagramService = activitydiagramService;
	}

	ngOnInitForChildren() {
		this.subCaller = combineLatest([this.load(), this.caller()]).subscribe(([data, res]) => {
			this.activity = data.activity;
			this.id_activity = this.activity ? this.activity.id : undefined;
			this.activitydiagram = data.activitydiagram;
			this.id_diagram = this.activitydiagram ? this.activitydiagram.id : undefined;
			this.manageCallerResult(res);
			setTimeout(() => {
				this.checkInfoCmp();
			}, 500);
		});
	}

	ngAfterViewInitForChildren() {
		setTimeout(() => {
			this.checkInfoCmp();
		}, 500);
	}
	ngOnDestroyForChildren() {
		if (this.subCaller) {
			this.subCaller.unsubscribe();
		}
		if (this.subSaveJson) {
			this.subSaveJson.unsubscribe();
		}
	}
	getClassName(): string {
		return 'BaseActivityDiagramComponent';
	}

	abstract buildDiagram(diagram: go.Diagram): void;
	abstract tpDiagram(): EnumDiagramType;
	abstract caller(): Observable<any>;
	abstract manageCallerResult(data: any): void;
	abstract behaviourAfterComponents(): void;
	abstract afterSaveJson(id_activitydiagram: string): void;

	// --- operations
	setLabelForm(key: string, value: string) {
		(this.frmCmp as any).labels[key] = value;
	}
	setLabel(key: string, value: string) {
		this.labels[key] = value;
	}

	// --- utils
	checkInfoCmp() {
		if (this.activitydiagram && this.activitydiagram.jsonmodel && this.diagramCmp) {
			this.diagramCmp.loadJsonString(this.activitydiagram.jsonmodel);
		}
		if (this.diagramCmp) {
			this.diagramCmp.setModalProperties('flagButtonClose', false);
			this.diagramCmp.setModalProperties('flagButtonOk', false);
		}
		this.behaviourAfterComponents();
	}

	// --- messages
	showMessages(messages: string[], flginternal?: boolean) {
		this.diagramCmp.setModalProperties('title', 'INFO');
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = flginternal ? this.templateMessage : undefined;
		this.templateFooter = undefined;
		this.diagramCmp.emptyMessages();
		if (!flginternal) {
			this.diagramCmp.setMessages(messages);
		} else {
			this.internalMessages.length = 0;
			this.internalMessages.push(...messages);
		}
		this.diagramCmp.openModal();
	}

	// --- json
	showJson() {
		this.diagramCmp.setModalProperties('title', 'JSON');
		this.diagramCmp.setModalProperties('classDimension', 'modal-lg');
		this.templateBody = this.templateJson;
		this.templateFooter = undefined;
		this.diagramCmp.emptyMessages();
		this.diagramCmp.openModal();
	}

	saveJson() {
		this.diagramCmp.setModalProperties(
			'title',
			TranslateUtility.get(this.labels.saveJson, this.translateService),
		);
		this.diagramCmp.setModalProperties('classDimension', undefined);
		this.templateBody = this.templateSaveJson;
		this.templateFooter = undefined;
		this.diagramCmp.emptyMessages();
		this.diagramCmp.openModal();
	}

	confirmJson(data: any) {
		const json: string = this.diagramCmp.getJsonString();
		if (!this.activitydiagram) {
			this.activitydiagram = new ActivitydiagramModel();
			this.activitydiagram.activity = new ActivityModel();
			this.activitydiagram.activity.id = this.id_activity;
			this.activitydiagram.tpdiagram = new TypologicalModel();
			this.activitydiagram.tpdiagram.id = this.tpDiagram().toString();
			this.activitydiagram.jsonmodel = json;
		}
		if (data && data.title) {
			this.activitydiagram.title = data.title;
		}
		const $obs = this.activitydiagram.id
			? this.activitydiagramService.edit(this.activitydiagram, this.activitydiagram.id)
			: this.activitydiagramService.save(this.activitydiagram);

		this.subSaveJson = $obs.subscribe((id_activitydiagram) => {
			this.afterSaveJson(id_activitydiagram);
			this.saveJsonEmit.emit(id_activitydiagram);
		});
	}

	// --- activity diagrams BE
	// --- loader
	/**
	 * Carica l'activity di riferimento e, se passato un id o codice, anche il diagramma json
	 * @returns un modello {activity; activitydiagram}
	 */
	load(): Observable<{ activity: ActivityModel; activitydiagram: ActivitydiagramModel }> {
		return this.loadActivityDiagram().pipe(
			switchMap((diagram) => {
				return this.loadActivity().pipe(
					map((activity) => {
						return {
							activity: activity,
							activitydiagram: diagram,
						};
					}),
				);
			}),
		);
	}

	private loadActivity(): Observable<ActivityModel> {
		if (!this.id_activity && !this.piva) {
			return of(undefined);
		}
		return this.activityService.unique(
			this.id_activity,
			this.piva,
			undefined,
			undefined,
			QueryUtility.SKIP_ERROR_RES,
		);
	}

	private loadActivityDiagram(): Observable<ActivitydiagramModel> {
		if (!this.id_diagram && !this.cod_diagram) {
			return of(undefined);
		}
		return this.activitydiagramService.unique(
			this.id_diagram,
			this.cod_diagram,
			undefined,
			undefined,
			QueryUtility.SKIP_ERROR_RES,
		);
	}
}
