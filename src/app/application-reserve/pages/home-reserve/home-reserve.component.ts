import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'reserve-home-reserve',
	templateUrl: './home-reserve.component.html',
	styleUrls: ['./home-reserve.component.scss'],
})
export class HomeReserveComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	goToVic() {
		this.router.navigate(['reserve', 'vic']);
	}
}
