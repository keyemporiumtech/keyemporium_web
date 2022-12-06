import { Component, OnInit } from '@angular/core';
import { TreeHtmlModel } from '@ddc/kit';

@Component({
	selector: 'wiki-test-kit-tree-html',
	templateUrl: './test-kit-tree-html.component.html',
	styleUrls: ['./test-kit-tree-html.component.css'],
})
export class TestKitTreeHtmlComponent implements OnInit {
	nodesA: TreeHtmlModel[];
	nodesB: TreeHtmlModel[];
	nodesC: TreeHtmlModel[];

	constructor() {}

	ngOnInit(): void {
		this.nodesA = this.buildNodes();
		this.nodesB = this.buildNodes();
		this.nodesC = this.buildNodes();
	}

	private buildNodes(): TreeHtmlModel[] {
		const nodeA1 = new TreeHtmlModel();
		nodeA1.id = 1;
		nodeA1.name = 'Nodo 1';
		nodeA1.hasChildren = true;

		const nodeA1_1 = new TreeHtmlModel();
		nodeA1_1.id = 1.1;
		nodeA1_1.name = 'Foglia 1.1';
		nodeA1_1.hasChildren = false;
		const nodeA1_2 = new TreeHtmlModel();
		nodeA1_2.id = 1.2;
		nodeA1_2.name = 'Nodo Foglia 1.2';
		nodeA1_2.hasChildren = true;

		const nodeA1_2_1 = new TreeHtmlModel();
		nodeA1_2_1.id = 1.21;
		nodeA1_2_1.name = 'Foglia 1.2.1';
		nodeA1_2_1.hasChildren = false;
		const nodeA1_2_2 = new TreeHtmlModel();
		nodeA1_2_2.id = 1.22;
		nodeA1_2_2.name = 'Foglia 1.2.2';
		nodeA1_2_2.hasChildren = false;

		nodeA1_2.children = [nodeA1_2_1, nodeA1_2_2];
		nodeA1.children = [nodeA1_1, nodeA1_2];

		const nodeA2 = new TreeHtmlModel();
		nodeA2.id = 2;
		nodeA2.name = 'Nodo 2';
		nodeA2.hasChildren = false;

		return [nodeA1, nodeA2];
	}
}
