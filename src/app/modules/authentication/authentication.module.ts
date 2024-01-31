import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitModule } from '@ddc/kit';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { AuthenticationGuard } from './base/authentication.guard';
import { AuthenticationService } from './base/authentication.service';
import { Auth2faGeneratorComponent } from './components/auth-2fa-generator/auth-2fa-generator.component';
import { InputReferenceComponent } from './components/input-reference/input-reference.component';
import { TestA2faCheckComponent } from './components/test-authentication/test-a2fa-check/test-a2fa-check.component';
import { TestA2FAComponent } from './components/test-authentication/test-a2fa/test-a2fa.component';
import { TestAuthenticationComponent } from './components/test-authentication/test-authentication.component';
import { TestInputReferenceComponent } from './components/test-authentication/test-input-reference/test-input-reference.component';
import { TestLoginComponent } from './components/test-authentication/test-login/test-login.component';
import { TestProfilesComponent } from './components/test-authentication/test-profiles/test-profiles.component';
import { TestUserOauthComponent } from './components/test-authentication/test-user-oauth/test-user-oauth.component';
import { TestVerifyComponent } from './components/test-authentication/test-verify/test-verify.component';
import { UserOauthComponent } from './components/user-oauth/user-oauth.component';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { AuthenticationPermissionsDirective } from './directives/authentication-permission.directive';
import { ActivityService } from './services/activity.service';
import { ActivityaddressService } from './services/activityaddress.service';
import { ActivityattachmentService } from './services/activityattachment.service';
import { ActivitydiagramService } from './services/activitydiagram.service';
import { ActivityprofileService } from './services/activityprofile.service';
import { ActivityreferenceService } from './services/activityreference.service';
import { ActivityrelationService } from './services/activityrelation.service';
import { ActivityrelationpermissionService } from './services/activityrelationpermission.service';
import { AuthCommonService } from './services/auth-common.service';
import { Authentication2faService } from './services/authentication2fa.service';
import { ClienttokenService } from './services/clienttoken.service';
import { ContactreferenceService } from './services/contactreference.service';
import { OauthloginService } from './services/oauthlogin.service';
import { PermissionService } from './services/permission.service';
import { ProfileService } from './services/profile.service';
import { ProfilepermissionService } from './services/profilepermission.service';
import { UserService } from './services/user.service';
import { UseraddressService } from './services/useraddress.service';
import { UserattachmentService } from './services/userattachment.service';
import { UserdiagramService } from './services/userdiagram.service';
import { UseroauthsocialService } from './services/useroauthsocial.service';
import { UserprofileService } from './services/userprofile.service';
import { UserreferenceService } from './services/userreference.service';
import { UserrelationService } from './services/userrelation.service';
import { UserrelationpermissionService } from './services/userrelationpermission.service';
import { UserreportService } from './services/userreport.service';

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
		TestA2FAComponent,
		Auth2faGeneratorComponent,
		TestA2faCheckComponent,
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
		TestA2FAComponent,
		Auth2faGeneratorComponent,
		TestA2faCheckComponent,
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
				ActivityprofileService,
				OauthloginService,
				UserrelationService,
				UserrelationpermissionService,
				ActivityrelationService,
				ActivityrelationpermissionService,
				Authentication2faService,
				ActivitydiagramService,
				UserdiagramService,
			],
		};
	}
}
