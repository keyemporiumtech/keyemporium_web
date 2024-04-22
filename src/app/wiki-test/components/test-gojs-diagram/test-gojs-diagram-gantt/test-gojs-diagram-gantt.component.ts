import { Component, ViewChild } from '@angular/core';
import * as go from 'gojs';
import {
	DiagramBuilder,
	GanttComponent,
	GanttModel,
	GanttProperties,
	GojsDiagramModel,
} from 'gojs-diagram';

@Component({
	selector: 'wiki-test-gojs-diagram-gantt',
	templateUrl: './test-gojs-diagram-gantt.component.html',
	styleUrls: ['./test-gojs-diagram-gantt.component.scss'],
})
export class TestGojsDiagramGanttComponent {
	diagramModel: GojsDiagramModel;
	diagramProperties: any;
	divId: string = '';

	// --- dati modal
	@ViewChild('ganttCmp') ganttCmp: GanttComponent;
	dataShow: GanttModel;
	@ViewChild('plusTemplateBody') plusTemplateBody: any;
	@ViewChild('asteriskTemplateBody') asteriskTemplateBody: any;
	@ViewChild('asteriskTemplateFooter') asteriskTemplateFooter: any;
	templateBody: any;
	templateFooter: any;

	constructor() {
		this.init();
	}

	init(): void {
		const n0: GanttModel = {
			key: 'n0',
			text: 'Project',
		};
		const n1: GanttModel = {
			key: 'n1',
			text: 'Task 1',
			color: '#F1E904',
		};

		const n11: GanttModel = {
			key: 'n11',
			text: 'Task 1.1',
			color: '#39C31D',
			duration: 7,
		};
		const n2: GanttModel = {
			key: 'n2',
			text: 'Task 2',
			color: '#ff0000',
			start: 7,
			duration: 15,
		};

		const data = [n0, n1, n11, n2];

		const link = [
			{ key: 'n0n1', from: 'n0', to: 'n1' },
			{ key: 'n1n11', from: 'n1', to: 'n11' },
			{ key: 'n0n2', from: 'n0', to: 'n2' },
		];

		this.diagramModel = { diagramNodeData: data, diagramLinkData: link };

		const properties: GanttProperties = {
			startDate: new Date('1995-12-17T03:24:00'),
		};
		this.diagramProperties = properties;

		this.divId = 'myGantt';
	}

	buildDiagram(diagram: go.Diagram): void {
		// const $ = go.GraphObject.make;
		const contextMenu = DiagramBuilder.makeContextMenu([
			DiagramBuilder.makeButton(
				this.plusClick,
				{ icon: 'PlusLine', props: { width: 10, height: 10 } },
				'Dettaglio 1',
			),
			DiagramBuilder.makeButton(
				this.asteriskClick,
				{ icon: 'AsteriskLine', props: { width: 10, height: 10 } },
				'Dettaglio 2',
			),
		]);
		// diagram.contextMenu = contextMenu;
		if (this.ganttCmp) {
			this.ganttCmp.builder.myTask.nodeTemplate.contextMenu = contextMenu;
			this.ganttCmp.builder.myGantt.nodeTemplate.contextMenu = contextMenu;
		}
	}

	plusClick = (data: GanttModel) => {
		this.dataShow = data;
		this.ganttCmp.setModalProperties('title', 'Plus');
		this.templateBody = this.plusTemplateBody;
		this.templateFooter = undefined;
		this.ganttCmp.emptyMessages();
		this.ganttCmp.setMessage('Ho cliccato su Plus');
		this.ganttCmp.openModal();
	};
	asteriskClick = (data: GanttModel) => {
		this.dataShow = data;
		this.ganttCmp.setModalProperties('title', 'Asterisk');
		this.templateBody = this.asteriskTemplateBody;
		this.templateFooter = this.asteriskTemplateFooter;
		this.ganttCmp.emptyMessages();
		this.ganttCmp.setMessages(['Ho cliccato su Asyterisk', 'Ho provato un nuovo footer']);
		this.ganttCmp.openModal();
	};
}
