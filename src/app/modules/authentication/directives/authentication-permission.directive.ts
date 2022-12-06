import {
	Directive,
	ElementRef,
	TemplateRef,
	ViewContainerRef,
	Renderer2,
	Input,
} from '@angular/core';
import { BaseAuthPermissionsDirective, AuthPermissionsDirectiveInterface } from '@ddc/rest';
import { RenderElService } from '@ddc/kit';
import { AuthenticationService } from '../base/authentication.service';
import { Observable } from 'rxjs';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[auth-permissions]',
})
export class AuthenticationPermissionsDirective extends BaseAuthPermissionsDirective {
	// inputs
	@Input('auth-permissions')
	set authPermissions(permission: AuthPermissionsDirectiveInterface) {
		this.baseAuthPermissions(permission);
	}

	constructor(
		element: ElementRef,
		templateRef: TemplateRef<any>,
		viewContainer: ViewContainerRef,
		renderer: Renderer2,
		buildElement: RenderElService,
		private authenticationService: AuthenticationService,
	) {
		super(element, templateRef, viewContainer, renderer, buildElement);
	}
	/**
	 * Sovrascrivo il controllo dei permessi per consentire l'abilitazione solo se vengono passati.
	 * Nel metodo padre viene consentita la visualizzazione in caso di array vuoto
	 *
	 * @param permissions lista dei permessi che abilitano l'elemento che usa la direttiva
	 */
	checkPermissions(permissions: string[]): boolean {
		if (!permissions || permissions.length === 0) {
			return false;
		}
		return this.authenticationService.checkPermissions(permissions);
	}
	resolvePermissions(): Observable<string> {
		return this.authenticationService.getProfile();
	}
}
