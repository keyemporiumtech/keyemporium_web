import { Component, Input } from '@angular/core';
import { Output, EventEmitter, ViewChild } from '@angular/core';
import { ITreeOptions, IActionMapping, TreeNode, TreeComponent } from 'angular-tree-component';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { TreeHtmlModel } from '../../models/tree-html.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnumTreeMouseEvent } from '../../enums/tree-mouse-event.enum';
import { EnumKeyMouseEvent } from '../../../html/enums/key-mouse-event.enum';

@Component({
	selector: 'ddc-init-tree-html',
	templateUrl: './tree-html.component.html',
	styleUrls: ['./tree-html.component.scss'],
})
export class TreeHtmlComponent extends BaseComponent {
	@Output() manageEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() childrenEmit: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
	@ViewChild('tree') tree: TreeComponent;
	@Input() nodes: TreeHtmlModel[];
	@Input() childrens: TreeHtmlModel[];
	@Input() initialOptions: ITreeOptions;
	// childrens
	@Input() flgLoadChildrens: boolean;
	@Input() flgUseFnForChildren: boolean;
	/**
	 * dato un nodo con <b>node.children=undefined</b> e <b>node.hasChildren=true</b>
	 * e le proprietà <b>flgLoadChildrens=true</b> e <b>flgUseFnForChildren=true</b>,
	 * questa funzione identifica la chiamata da fare al click del nodo per caricare
	 * in maniera asincrona i suoi figli
	 */
	@Input() fnForChildren: (node: TreeNode) => Observable<any[]>;
	// checkbox
	@Input() flgCheckbox: boolean;
	@Input() flgCheckboxDistinct: boolean;
	// used
	nodesTree: any[];
	optionsTree: ITreeOptions;
	actionsTree: IActionMapping;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.nodes = [];
		this.childrens = [];
		this.initialOptions = {};
		this.nodesTree = [];
		this.optionsTree = {};
		this.actionsTree = {};
	}

	ngOnInitForChildren() {
		this.optionsTree = this.initialOptions;
		if (this.flgCheckbox) {
			this.addOption('useCheckbox', true);
			if (this.flgCheckboxDistinct) {
				this.addOption('useTriState', true);
			}
		}
		if (this.flgLoadChildrens) {
			this.optionsTree.getChildren = (node: TreeNode) => {
				if (this.flgUseFnForChildren) {
					return this.callbackChildren(node);
				} else {
					this.childrenEmit.emit(node);
					return Promise.resolve(this.childrens);
				}
			};
		}

		// nodes
		this.buildNodes(this.nodes, undefined, this.nodesTree);
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TreeComponent';
	}

	buildNodes(list: TreeHtmlModel[], parent?: any, nodes?: any[]) {
		for (const node of list) {
			const obj: any = {};
			obj.id = node.id;
			obj.name = node.name;
			obj.hasChildren = node.hasChildren;
			if (node.children && node.children.length) {
				obj.children = [];
				this.buildNodes(node.children, obj);
			}
			if (!parent) {
				nodes.push(obj);
			} else {
				parent.children.push(obj);
			}
		}
	}

	callbackChildren(node: TreeNode): Promise<any> {
		return this.fnForChildren(node)
			.pipe(
				map((response: TreeHtmlModel[]) => {
					const arr: any[] = [];
					this.buildNodes(response, undefined, arr);
					return arr;
				}),
			)
			.toPromise()
			.then((res) => {
				return res;
			});
	}

	/**
	 * Se è attivo il flgCheckbox ritorna un array con gli id dei nodi selezionati
	 */
	getCheckedNodes() {
		return Object.keys(this.tree.treeModel.selectedLeafNodeIds.$mobx['target']);
	}

	// UTILITY
	/**
	 * see https://angular2-tree.readme.io/v8.2.0/docs/options
	 * @param key option name
	 * @param value option value
	 */
	addOption(key: any, value: any) {
		this.optionsTree[key] = value;
	}

	/**
	 * see https://angular2-tree.readme.io/docs/action-mapping
	 * @param key action name
	 * @param value action value
	 */
	addMouseAction(key: EnumTreeMouseEvent, value: any) {
		this.optionsTree.actionMapping.mouse[key] = value;
	}

	/**
	 * see https://angular2-tree.readme.io/docs/action-mapping
	 * @param key key name
	 * @param value key value
	 */
	addKeyAction(key: EnumKeyMouseEvent, value: any) {
		this.optionsTree.actionMapping.keys[key] = value;
	}

	/**
	 * see https://angular2-tree.readme.io/docs/events
	 * @param event event started
	 */
	onEvent(event: any) {
		this.log.info('event called', event.eventName);
		this.manageEvent.emit(event);
	}
}
