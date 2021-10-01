import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
	selector: 'keyemporium-web-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title: string = '';
	idMessageModal: string = '';
	idMessageDiv: string = '';

	constructor() {
		this.title = environment.appName;
		this.idMessageModal = environment.messages.idMessageModal;
		this.idMessageDiv = environment.messages.idMessageDiv;
	}
}
