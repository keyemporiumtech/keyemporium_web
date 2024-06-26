import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../modules/authentication/base/authentication.guard';
import { HomeReserveComponent } from './pages/home-reserve/home-reserve.component';
import { PermissionsPageComponent } from './pages/permissions-page/permissions-page.component';
import { RolePageComponent } from './pages/role-page/role-page.component';
import { VicPageComponent } from './pages/vic-page/vic-page.component';
import { LayoutReserveComponent } from './template/layout-reserve/layout-reserve.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutReserveComponent,
		canActivate: [(next: ActivatedRouteSnapshot) => inject(AuthenticationGuard).canActivate(next)],
		canActivateChild: [
			(next: ActivatedRouteSnapshot) => inject(AuthenticationGuard).canActivate(next),
		],
		children: [
			{ path: '', component: HomeReserveComponent },
			{ path: 'vic', component: VicPageComponent },
			{ path: 'permissions', component: PermissionsPageComponent },
			{ path: 'role', component: RolePageComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApplicationReserveRoutingModule {}
