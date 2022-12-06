import {
	OnInit,
	OnDestroy,
	ElementRef,
	TemplateRef,
	ViewContainerRef,
	Renderer2,
	EmbeddedViewRef,
	Input,
	Directive,
} from '@angular/core';
import { RenderElService, KeyvalueObject } from '@ddc/kit';
import { Observable, Subscription } from 'rxjs';

/**
 * E' possibile DEFINIRE UN Input set PER OGNI METODO keyAuthPermission CON IL NOME DELLA TUA DIRETTIVA
 * in modo da poter utilizzare un input differente per ogni tipo di operazione ed evitare il baseAuthPermission
 * @Input()
 * set myPermission(options: string[]) {
 * 		this.keyAuthPermission(options);
 * }
 * @Input()
 * set myPermissionType(type: number) {
 * 		this.keyAuthPermissionType(type);
 * }
 * ugual modo per keyAuthPermissionStyleDefault e keyAuthPermissionStyleActive
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseAuthPermissionsDirective implements OnInit, OnDestroy {
	private _permissions: string[] = [];
	private element: ElementRef;
	private templateRef: TemplateRef<any>;
	private viewContainer: ViewContainerRef;
	private renderer: Renderer2;
	private buildElement: RenderElService;
	// input
	apType: number;
	apClassActive: string;
	apStyleActive: string;
	apClassDefault: string;
	apStyleDefault: string;
	apAttributesDefault: KeyvalueObject[];
	apAttributesActive: KeyvalueObject[];
	// sub
	subPermissions: Subscription;

	constructor(
		element: ElementRef,
		templateRef: TemplateRef<any>,
		viewContainer: ViewContainerRef,
		renderer: Renderer2,
		buildElement: RenderElService,
	) {
		this.element = element;
		this.templateRef = templateRef;
		this.viewContainer = viewContainer;
		this.renderer = renderer;
		this.buildElement = buildElement;
		this.buildElement.setRenderer(this.renderer);
	}

	ngOnInit() {
		this.subPermissions = this.resolvePermissions().subscribe((data) => {
			this.updateView();
		});
	}
	ngOnDestroy() {
		if (this.subPermissions) {
			this.subPermissions.unsubscribe();
		}
	}

	// PERMESSI
	/**
	 * Questo è il metodo principale della direttiva. Bisogna usarlo nella definizione dell'input della direttiva.
	 * ES.
	 * @Input('data-permission')
	 * set dataPermissions(permissionModel: AuthPermissionsDirectiveInterface) {
	 * 	this.baseAuthPermissions(permissionModel);
	 * }
	 * @param permissionModel
	 */
	baseAuthPermissions(permissionModel: AuthPermissionsDirectiveInterface) {
		this.keyAuthPermission(permissionModel.permissions);
		if (permissionModel.hidden) {
			this.keyAuthPermissionType(EnumAuthPermissionTypeVisibility.HIDDEN);
		} else if (permissionModel.disabled) {
			this.keyAuthPermissionType(EnumAuthPermissionTypeVisibility.DISABLE);
		}

		if (permissionModel.styleActive) {
			this.keyAuthPermissionStyleActive(permissionModel.styleActive);
		}

		if (permissionModel.classActive) {
			this.keyAuthPermissionClassActive(permissionModel.classActive);
		}

		if (permissionModel.attributesActive) {
			this.keyAuthPermissionAttributesActive(permissionModel.attributesActive);
		}

		if (permissionModel.styleNA) {
			this.keyAuthPermissionStyleDefault(permissionModel.styleNA);
		}

		if (permissionModel.classNA) {
			this.keyAuthPermissionClassDefault(permissionModel.classNA);
		}

		if (permissionModel.attributesNA) {
			this.keyAuthPermissionAttributesDefault(permissionModel.attributesNA);
		}
	}
	keyAuthPermission(options: string[]) {
		this._permissions = options;
		this.updateView();
	}
	keyAuthPermissionType(type: number) {
		this.apType = type;
		this.updateView();
	}
	keyAuthPermissionStyleDefault(style: string) {
		this.apType = EnumAuthPermissionTypeVisibility.STYLE;
		this.apStyleDefault = style;
		this.updateView();
	}
	keyAuthPermissionStyleActive(style: string) {
		this.apType = EnumAuthPermissionTypeVisibility.STYLE;
		this.apStyleActive = style;
		this.updateView();
	}
	keyAuthPermissionClassDefault(cssClass: string) {
		this.apType = EnumAuthPermissionTypeVisibility.STYLE;
		this.apClassDefault = cssClass;
		this.updateView();
	}
	keyAuthPermissionClassActive(cssClass: string) {
		this.apType = EnumAuthPermissionTypeVisibility.STYLE;
		this.apClassActive = cssClass;
		this.updateView();
	}
	keyAuthPermissionAttributesDefault(attributes: KeyvalueObject[]) {
		this.apType = EnumAuthPermissionTypeVisibility.STYLE;
		this.apAttributesDefault = attributes;
		this.updateView();
	}
	keyAuthPermissionAttributesActive(attributes: KeyvalueObject[]) {
		this.apType = EnumAuthPermissionTypeVisibility.STYLE;
		this.apAttributesActive = attributes;
		this.updateView();
	}

	// OPERAZIONI
	private updateView() {
		setTimeout(() => {
			if (this) {
				switch (this.apType) {
					case EnumAuthPermissionTypeVisibility.HIDDEN:
						this.updateHiddenType();
						break;
					case EnumAuthPermissionTypeVisibility.DISABLE:
						this.updateDisableType();
						break;
					case EnumAuthPermissionTypeVisibility.STYLE:
						this.updateStyleType();
						break;
					default:
						this.updateHiddenType();
						break;
				}
			}
		}, 0);
	}

	private updateHiddenType() {
		this.viewContainer.clear();
		if (this.checkPermissions(this._permissions)) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		}
	}
	private updateStyleType() {
		const viewRef: EmbeddedViewRef<any> = this.templateRef.createEmbeddedView(null),
			renderElement: any = viewRef.rootNodes[0];
		this.viewContainer.clear();

		if (this.apStyleDefault) {
			this.buildElement.setStyle(this.apStyleDefault, renderElement);
		}
		if (this.apClassDefault) {
			if (this.apClassActive) {
				this.buildElement.removeCSSClass(this.apClassActive, renderElement);
			}
			this.buildElement.setCSSClass(this.apClassDefault, renderElement);
		}
		if (this.apAttributesDefault && this.apAttributesDefault.length) {
			if (this.apAttributesActive && this.apAttributesActive.length) {
				this.apAttributesActive.forEach((el) => {
					this.buildElement.removeHTMLAttribute(el.key, renderElement);
				});
			}

			this.apAttributesDefault.forEach((el) => {
				this.buildElement.setHTMLAttribute(el.key, el.value, renderElement);
			});
		}
		if (this.checkPermissions(this._permissions)) {
			if (this.apStyleActive) {
				this.buildElement.setStyle(this.apStyleActive, renderElement);
			}
			if (this.apClassActive) {
				if (this.apClassDefault) {
					this.buildElement.removeCSSClass(this.apClassDefault, renderElement);
				}
				this.buildElement.setCSSClass(this.apClassActive, renderElement);
			}
			if (this.apAttributesActive && this.apAttributesActive.length) {
				if (this.apAttributesDefault && this.apAttributesDefault.length) {
					this.apAttributesDefault.forEach((el) => {
						this.buildElement.removeHTMLAttribute(el.key, renderElement);
					});
				}

				this.apAttributesActive.forEach((el) => {
					this.buildElement.setHTMLAttribute(el.key, el.value, renderElement);
				});
			}
		}

		this.viewContainer.insert(viewRef, 0);
	}
	private updateDisableType() {
		const viewRef: EmbeddedViewRef<any> = this.templateRef.createEmbeddedView(null),
			renderElement: any = viewRef.rootNodes[0];
		this.viewContainer.clear();

		if (this.checkPermissions(this._permissions)) {
			this.buildElement.removeHTMLAttribute('disabled', renderElement);
		} else {
			this.buildElement.setHTMLAttribute('disabled', 'true', renderElement);
		}

		this.viewContainer.insert(viewRef, 0);
	}

	abstract checkPermissions(permissions: string[]): boolean;
	abstract resolvePermissions(): Observable<any>;
}

export enum EnumAuthPermissionTypeVisibility {
	HIDDEN = 1,
	DISABLE = 2,
	STYLE = 3,
}

export interface AuthPermissionsDirectiveInterface {
	permissions: string[];
	hidden?: boolean;
	disabled?: boolean;
	styleActive?: string;
	styleNA?: string;
	classActive?: string;
	classNA?: string;
	attributesActive: KeyvalueObject[];
	attributesNA: KeyvalueObject[];
}
