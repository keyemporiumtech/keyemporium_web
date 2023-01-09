import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from './base/authentication.service';
import { ActivityService } from './services/activity.service';
import { ClienttokenService } from './services/clienttoken.service';
import { ContactreferenceService } from './services/contactreference.service';
import { PermissionService } from './services/permission.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';
import { ProfilepermissionService } from './services/profilepermission.service';
import { UserprofileService } from './services/userprofile.service';
import { UserreportService } from './services/userreport.service';
import { AuthCommonService } from './services/auth-common.service';
import { TestAuthenticationComponent } from './components/test-authentication/test-authentication.component';
import { TestLoginComponent } from './components/test-authentication/test-login/test-login.component';
import { TestVerifyComponent } from './components/test-authentication/test-verify/test-verify.component';
import { AuthenticationPermissionsDirective } from './directives/authentication-permission.directive';
import { AuthenticationGuard } from './base/authentication.guard';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { TestProfilesComponent } from './components/test-authentication/test-profiles/test-profiles.component';
import { UserOauthComponent } from './components/user-oauth/user-oauth.component';
import { UseroauthsocialService } from './services/useroauthsocial.service';
import { UserreferenceService } from './services/userreference.service';
import { UseraddressService } from './services/useraddress.service';
import { UserattachmentService } from './services/userattachment.service';
import { ActivityreferenceService } from './services/activityreference.service';
import { ActivityaddressService } from './services/activityaddress.service';
import { ActivityattachmentService } from './services/activityattachment.service';
import { OauthloginService } from './services/oauthlogin.service';
import { TestUserOauthComponent } from './components/test-authentication/test-user-oauth/test-user-oauth.component';
import { InputReferenceComponent } from './components/input-reference/input-reference.component';
import { TestInputReferenceComponent } from './components/test-authentication/test-input-reference/test-input-reference.component';

@NgModule({
	declarations: [
		AuthenticationPermissionsDirective,
		TestAuthenticationComponent,
		TestLoginComponent,
		TestVerifyComponent,
		TestProfilesComponent,
		UserProfilesComponent,
		UserOauthComponent,
		TestUserOauthComponent,
		InputReferenceComponent,
		TestInputReferenceComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		KitModule,
		SharedModule,
		ApiModule,
	],
	exports: [
		AuthenticationPermissionsDirective,
		TestAuthenticationComponent,
		TestLoginComponent,
		TestVerifyComponent,
		TestProfilesComponent,
		UserProfilesComponent,
		UserOauthComponent,
		TestUserOauthComponent,
		InputReferenceComponent,
		TestInputReferenceComponent,
	],
})
export class AuthenticationModule {
	static forRoot() {
		return {
			ngModule: AuthenticationModule,
			providers: [
				AuthCommonService,
				AuthenticationService,
				AuthenticationGuard,
				ActivityService,
				ClienttokenService,
				ContactreferenceService,
				PermissionService,
				ProfileService,
				ProfilepermissionService,
				UserService,
				UserprofileService,
				UserreportService,
				UseroauthsocialService,
				UserreferenceService,
				UseraddressService,
				UserattachmentService,
				ActivityreferenceService,
				ActivityaddressService,
				ActivityattachmentService,
				OauthloginService,
			],
		};
	}
}
