import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ApplicationLoggerService, BaseComponent, EnumFormMode, TranslateUtility } from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import { OrgTreeModel } from 'gojs-diagram';

@Component({
	selector: 'ddc-init-activity-tree-mk-form',
	templateUrl: './activity-tree-mk-form.component.html',
	styleUrls: ['./activity-tree-mk-form.component.scss'],
})
export class ActivityTreeMkFormComponent extends BaseComponent {
	@Input() listParents: OrgTreeModel[] = [];
	private _model: OrgTreeModel;
	@Input() set model(val: OrgTreeModel) {
		this._model = val;
		this.manageModel(val);
	}
	get model(): OrgTreeModel {
		return this._model;
	}

	@Input() labels: any = {
		name: 'Nominativo',
		cod: 'Matricola',
		role: 'Ruolo Aziendale',
		parent: 'Depend by',
		skills: 'Competenze',
		addSkill: 'Aggiungi competenza',
		delSkill: 'Rimuovi competenza',
		nameRequired: 'Inserire un nominativo',
		roleRequired: 'Inserire un ruolo',
	};
	@Output() saveEmit: EventEmitter<OrgTreeModel> = new EventEmitter<OrgTreeModel>();
	@Output() messagesEmit: EventEmitter<string[] | undefined> = new EventEmitter<
		string[] | undefined
	>();

	mode: EnumFormMode;
	EnumFormMode = EnumFormMode;
	@ViewChild('inputName') inputName: ElementRef<any>;
	@ViewChild('inputMatricola') inputMatricola: ElementRef<any>;
	@ViewChild('inputRole') inputRole: ElementRef<any>;
	// @ViewChild('inputPic') inputPic: ElementRef<any>;
	@ViewChild('selectParent') selectParent: ElementRef<any>;
	@ViewChild('inputSkill') inputSkill: ElementRef<any>;
	skills: string[] = [];

	constructor(
		applicationLogger: ApplicationLoggerService,
		private translateService: TranslateService,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		this.manageModel(this.model);
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ActivityTreeMkFormComponent';
	}

	manageModel(model: OrgTreeModel) {
		if (model) {
			if (this.inputName) {
				this.inputName.nativeElement.value = model.name;
			}
			if (this.inputMatricola) {
				this.inputMatricola.nativeElement.value = model.matricola;
			}
			if (this.inputRole) {
				this.inputRole.nativeElement.value = model.role;
			}
			if (this.selectParent) {
				this.selectParent.nativeElement.value = model.parent;
			}
			this.skills = model.skills ? model.skills : [];
		}
	}

	evalMessages(): string[] | undefined {
		const messages: string[] = [];
		if (this.inputName && !this.inputName.nativeElement.value) {
			messages.push(TranslateUtility.get(this.labels.nameRequired, this.translateService));
		}
		if (this.inputRole && !this.inputRole.nativeElement.value) {
			messages.push(TranslateUtility.get(this.labels.roleRequired, this.translateService));
		}

		return messages.length > 0 ? messages : undefined;
	}
	extractModel(): OrgTreeModel {
		const model: OrgTreeModel = { key: undefined, name: undefined, role: undefined };
		if (this.inputName) {
			model.name = this.inputName.nativeElement.value;
		}
		if (this.inputMatricola) {
			model.matricola = this.inputMatricola.nativeElement.value;
		}
		if (this.inputRole) {
			model.role = this.inputRole.nativeElement.value;
		}
		if (this.selectParent) {
			model.parent = this.selectParent.nativeElement.value;
		}
		model.skills = this.skills;
		if (this.mode === EnumFormMode.UPDATE) {
			model.key = this.model.key;
		}

		return model;
	}

	save() {
		const messages = this.evalMessages();
		if (!messages) {
			this.saveEmit.emit(this.extractModel());
		} else {
			this.messagesEmit.emit(messages);
		}
	}

	changeMode(val: EnumFormMode) {
		this.mode = val;
	}

	// ------------- FORM
	isDisabledParent(parent: OrgTreeModel) {
		return !this.model || this.model.key === parent.key;
	}

	addSkill() {
		if (this.inputSkill.nativeElement.value) {
			this.skills.push(this.inputSkill.nativeElement.value);
		}
	}

	removeSkill(text: string) {
		const index = this.skills.findIndex((el) => el === text);
		if (index !== -1) {
			this.skills.splice(index, 1);
		}
	}
}
