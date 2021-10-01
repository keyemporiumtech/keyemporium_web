import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStorageService, EnumTypeMime, FileEmbedModel, FileService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-commons-page-file',
	templateUrl: './test-commons-page-file.component.html',
	styleUrls: ['./test-commons-page-file.component.scss'],
})
export class TestCommonsPageFileComponent implements OnInit {
	embedFile: FileEmbedModel;
	embedTitle: string;
	EnumTypeMime = EnumTypeMime;
	width: string;
	heigth: string;
	constructor(
		private router: Router,
		private applicationStorage: ApplicationStorageService,
		private fileService: FileService,
	) {}

	ngOnInit() {}

	// VISUALIZZAZIONE FILES
	load(
		title: string,
		mime: string,
		type: EnumTypeMime,
		ext: string,
		path: string,
		width?: string,
		heigth?: string,
	) {
		const fileEmbed = this.fileService.buildFileEmbed(title, mime, type, ext, undefined, path);
		fileEmbed.back = undefined; // IMPORTANTE IMPOSTARE back A undefined PER FARE EMBED DEL FILE
		this.embedFile = fileEmbed;
		this.embedTitle = title;
		this.width = width;
		this.heigth = heigth;
	}

	close() {
		this.embedFile = undefined;
		this.embedTitle = undefined;
		this.width = undefined;
		this.heigth = undefined;
	}

	go(
		title: string,
		mime: string,
		type: EnumTypeMime,
		ext: string,
		path: string,
		width?: string,
		heigth?: string,
	) {
		const fileEmbed = this.fileService.buildFileEmbed(title, mime, type, ext, undefined, path);
		fileEmbed.back = this.router.url;
		this.applicationStorage.fileEmbed.setObj(fileEmbed);
		this.router.navigate(['commons', 'file', 1]);
		this.width = width;
		this.heigth = heigth;
	}
}
