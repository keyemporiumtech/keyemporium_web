import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { SocialUserModel } from '../../../lib/social-user.model';
import { SocialUserUtilConverter } from '../../../converters/social-user.converter';

@Component({
	selector: 'wiki-test-user-oauth',
	templateUrl: './test-user-oauth.component.html',
	styleUrls: ['./test-user-oauth.component.scss'],
})
export class TestUserOauthComponent implements OnInit {
	@Output() emitLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor() {}

	ngOnInit() {}

	onSocialUser(user: SocialUserModel) {
		console.error('Login Oauth', SocialUserUtilConverter.toDto(user));
	}
	onPageUser(user: UserModel) {
		// console.error('Login System', user);
		this.emitLogin.emit(user ? true : false);
	}
}
