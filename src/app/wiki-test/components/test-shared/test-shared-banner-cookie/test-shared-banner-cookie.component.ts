import { Component, OnInit, ViewChild } from '@angular/core';
import { EnumBannerPosition } from '@ddc/kit';
import { BannerCookieComponent } from '../../../../shared/components/banner-cookie/banner-cookie.component';

@Component({
	selector: 'wiki-test-shared-banner-cookie',
	templateUrl: './test-shared-banner-cookie.component.html',
	styleUrls: ['./test-shared-banner-cookie.component.scss'],
})
export class TestSharedBannerCookieComponent implements OnInit {
	position: EnumBannerPosition;
	EnumBannerPosition = EnumBannerPosition;
	load: boolean;
	@ViewChild('bannerTest') bannerTest: BannerCookieComponent;
	constructor() {}

	ngOnInit() {}

	setPosition(pos: EnumBannerPosition) {
		this.position = pos;
		this.load = true;
	}

	close() {
		this.position = undefined;
		this.load = false;
	}
}
