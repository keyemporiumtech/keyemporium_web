import { Component, OnInit } from '@angular/core';
import { SocialUserUtilConverter } from '../../../converters/social-user.converter';
import { SocialUserModel } from '../../../lib/social-user.model';
import { UserModel } from '../../../models/user.model';
import { AuthCommonService } from '../../../services/auth-common.service';

@Component({
	selector: 'wiki-test-user-oauth',
	templateUrl: './test-user-oauth.component.html',
	styleUrls: ['./test-user-oauth.component.scss'],
})
export class TestUserOauthComponent implements OnInit {
	user: UserModel;
	constructor(private authCommonService: AuthCommonService) {}

	ngOnInit() {}

	onSocialUser(user: SocialUserModel) {
		console.error('Login Oauth', SocialUserUtilConverter.toDto(user));
	}
	onPageUser(user: UserModel) {
		// console.error('Login System', user);
		this.user = user;
		this.authCommonService.notifySession(this.user ? true : false);
	}
}
