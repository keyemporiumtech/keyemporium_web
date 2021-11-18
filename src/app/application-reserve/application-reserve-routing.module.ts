import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeReserveComponent } from './pages/home-reserve/home-reserve.component';
import { LayoutReserveComponent } from './template/layout-reserve/layout-reserve.component';
import { AuthenticationGuard } from '../modules/authentication/base/authentication.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutReserveComponent,
		canActivate: [AuthenticationGuard],
		children: [
			{ path: '', component: HomeReserveComponent },
			{ path: 'profile', component: ProfilePageComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApplicationReserveRoutingModule {}
