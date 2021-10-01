import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeReserveComponent } from './pages/home-reserve/home-reserve.component';
import { LayoutReserveComponent } from './template/layout-reserve/layout-reserve.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutReserveComponent,
		children: [{ path: '', component: HomeReserveComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApplicationReserveRoutingModule {}
