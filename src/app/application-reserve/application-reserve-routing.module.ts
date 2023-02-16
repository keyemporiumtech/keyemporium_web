import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../modules/authentication/base/authentication.guard';
import { HomeReserveComponent } from './pages/home-reserve/home-reserve.component';
import { PermissionsPageComponent } from './pages/permissions-page/permissions-page.component';
import { VicPageComponent } from './pages/vic-page/vic-page.component';
import { LayoutReserveComponent } from './template/layout-reserve/layout-reserve.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutReserveComponent,
		canActivate: [AuthenticationGuard],
		children: [
			{ path: '', component: HomeReserveComponent },
			{ path: 'vic', component: VicPageComponent },
			{ path: 'permissions', component: PermissionsPageComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApplicationReserveRoutingModule {}
