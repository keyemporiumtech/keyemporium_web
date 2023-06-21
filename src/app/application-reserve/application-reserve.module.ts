import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentLoaderService, KitModule } from '@ddc/kit';
import { environment } from '../../environments/environment';
import { RestModule } from '@ddc/rest';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationSharedModule } from '../application-shared/application-shared.module';
import { ApplicationReserveRoutingModule } from './application-reserve-routing.module';
import { HomeReserveComponent } from './pages/home-reserve/home-reserve.component';
import { LayoutReserveComponent } from './template/layout-reserve/layout-reserve.component';
import { HeaderReserveComponent } from './template/header-reserve/header-reserve.component';
import { FooterReserveComponent } from './template/footer-reserve/footer-reserve.component';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { ValidatorPasswordModule } from '../modules/validator-password/validator-password.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ResourcesModule } from '../modules/resources/resources.module';
import { VicPageComponent } from './pages/vic-page/vic-page.component';
import { ProfileImageComponent } from './components/profile/profile-image/profile-image.component';
import { ProfileAddressComponent } from './components/profile/profile-address/profile-address.component';
import { LocalesystemModule } from '../modules/localesystem/localesystem.module';
import { ProfileCellComponent } from './components/profile/profile-cell/profile-cell.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ProfileListImagesComponent } from './components/profile-list/profile-list-images/profile-list-images.component';
import { ProfileListAttachmentsComponent } from './components/profile-list/profile-list-attachments/profile-list-attachments.component';
import { ProfileListAddressesComponent } from './components/profile-list/profile-list-addresses/profile-list-addresses.component';
import { ProfileListPhonesComponent } from './components/profile-list/profile-list-phones/profile-list-phones.component';
import { ProfileListEmailsComponent } from './components/profile-list/profile-list-emails/profile-list-emails.component';
import { ProfileListLinksComponent } from './components/profile-list/profile-list-links/profile-list-links.component';
import { AppKeyemporiumModule } from '../modules/app-keyemporium/app-keyemporium.module';
import { ProfileAttachmentComponent } from './components/profile/profile-attachment/profile-attachment.component';
import { UserSubMenuComponent } from './components/user-sub-menu/user-sub-menu.component';
import { PermissionsPageComponent } from './pages/permissions-page/permissions-page.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolePermissionsComponent } from './components/roles/role-permissions/role-permissions.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { RolePageComponent } from './pages/role-page/role-page.component';

@NgModule({
	declarations: [
		HomeReserveComponent,
		LayoutReserveComponent,
		HeaderReserveComponent,
		FooterReserveComponent,
		ProfileComponent,
		ProfileImageComponent,
		VicPageComponent,
		ProfileAddressComponent,
		ProfileCellComponent,
		ProfileListComponent,
		ProfileListImagesComponent,
		ProfileListAttachmentsComponent,
		ProfileListAddressesComponent,
		ProfileListPhonesComponent,
		ProfileListEmailsComponent,
		ProfileListLinksComponent,
		ProfileAttachmentComponent,
  UserSubMenuComponent,
  PermissionsPageComponent,
  RolesComponent,
  RolePermissionsComponent,
  RoleDetailComponent,
  RolePageComponent,
	],
	imports: [
		CommonModule,
		ApplicationReserveRoutingModule,
		KitModule,
		RestModule,
		SharedModule,
		ApplicationSharedModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// modules
		ValidatorPasswordModule.forRoot(),
		AuthenticationModule.forRoot(),
		ResourcesModule.forRoot(),
		LocalesystemModule.forRoot(),
		AppKeyemporiumModule.forRoot(),
	],
})
export class ApplicationReserveModule {
	constructor(environmentLoader: EnvironmentLoaderService) {
		environmentLoader.setEnviroment(environment);
	}
	static forRoot() {
		return {
			ngModule: ApplicationReserveModule,
			providers: [],
		};
	}
}
