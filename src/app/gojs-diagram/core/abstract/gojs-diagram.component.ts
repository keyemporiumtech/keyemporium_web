import {
	AfterViewInit,
	Directive,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import * as go from 'gojs';
import { ModalPropertiesInterface } from '../../../shared/interfaces/properties/modal/modal-properties.interface';
import { ModalPropertiesMaker } from '../../../shared/interfaces/properties/modal/modal-properties.maker';
import { GojsModalOperationsComponent } from '../../components/gojs-modal-operations/gojs-modal-operations.component';
import { ArrowBuilder } from '../arrow.builder';
import { FigureBuilder } from '../figure.builder';
import { GojsDiagramModel } from '../model/gojs-diagram.model';
import { GojsLinkDataModel } from '../model/gojs-link-data.model';
import { GojsNodeDataModel } from '../model/gojs-node-data.model';
import { GojsBuilder } from './gojs.builder';

@Directive()
export abstract class GojsDiagramComponent<T extends GojsBuilder, M extends GojsNodeDataModel>
	implements OnInit, AfterViewInit
{
	// Quando emesso è disponibile il diagramma senza dati
	@Output() onDiagram: EventEmitter<go.Diagram> = new EventEmitter<go.Diagram>();
	// Quando è emesso è disponibile il modello del diagramma con i dati
	@Output() onModel: EventEmitter<any> = new EventEmitter<any>();
	// --------------- MANAGE DIAGRAM
	private _diagramModel: GojsDiagramModel;
	@Input() set diagramModel(val: GojsDiagramModel) {
		this._diagramModel = val;
		this.afterModel(val);
		if (this.diagram && this.diagram.model) {
			this.buildDiagramModel(this.diagram);
			this.onModel.emit(this.diagram.model);
		}
	}
	get diagramModel(): GojsDiagramModel {
		return this._diagramModel;
	}
	private _diagramProperties: any;
	@Input() set diagramProperties(val: any) {
		this._diagramProperties = val;
		if (!this.builder) {
			this.builder = this.instanceBuilder();
		}
		this.builder.makeProperties(val);
	}
	get diagramProperties(): any {
		return this._diagramProperties;
	}
	@Input() divId: string = '';
	@Input() borderColor: string = 'black';
	@Input() backgroundColor: string = 'white';
	@Input() filename: string = '';

	diagram: go.Diagram;
	builder: T;

	// --- messages and operations
	@ViewChild('modalShared') modalShared: GojsModalOperationsComponent;
	@Input() modalProperties: ModalPropertiesInterface;
	@Output() ok: EventEmitter<any> = new EventEmitter<any>();
	@Output() close: EventEmitter<any> = new EventEmitter<any>();
	@Input() templateBody: TemplateRef<any>;
	@Input() templateFooter: TemplateRef<any>;

	constructor() {
		FigureBuilder.run();
		ArrowBuilder.run();
	}

	ngOnInit(): void {
		if (!this.modalProperties) {
			this.modalProperties = ModalPropertiesMaker.instance();
		}
	}
	ngAfterViewInit(): void {
		setTimeout(() => {
			this.afterViewInitCall();
		}, 1000);
	}

	afterViewInitCall() {
		if (!this.builder) {
			this.builder = this.instanceBuilder();
		}
		this.diagram = this.builder.make(this.divId, this.diagramProperties);
		this.buildDiagram(this.diagram);
		this.onDiagram.emit(this.diagram);
		const myModel = this.getModel();
		this.diagram.model = myModel;
		this.buildDiagramModel(this.diagram);
		this.onModel.emit(this.diagram.model);
	}

	reload(model?: GojsDiagramModel) {
		this.diagram.div = null;
		setTimeout(() => {
			this.afterViewInitCall();
			if (model) {
				this.loadJson(model);
			}
		}, 1000);
	}

	/**
	 * Operazioni da fare appena viene acquisito il modello in input.
	 * In questo metodo è possibile modificare e arricchire i dati e i link di input
	 * anche senza ridisegnare il grafo
	 */
	abstract afterModel(state: GojsDiagramModel): void;

	/**
	 * Torna il modello con i nodeDataArray e i nodeLinkArray di input
	 * go.GraphLinksModel or go.TreeModel
	 */
	abstract getModel(): any;

	/**
	 * Deve istanziare un template builder
	 */
	abstract instanceBuilder(): T;

	/**
	 * Personalizza il diagramma passato in input costruendo il nodeTemplate se necessario,
	 * aggiungendo pulsanti, tooltip etc. etc.
	 * @param diagram diagramma da personalizzare
	 */
	abstract buildDiagram(diagram: go.Diagram): void;

	/**
	 * Personalizza il model del diagramma passato in input arricchendo le property,
	 * aggiungendo funzionalità etc. etc.
	 * @param diagram diagramma da personalizzare
	 */
	abstract buildDiagramModel(diagram: go.Diagram): void;

	// --- style
	setModalProperties(key: string, value: any) {
		if (this.modalProperties) {
			ModalPropertiesMaker.setValue(this.modalProperties, key, value);
		}
	}
	resetProperties() {
		this.builder.resetProperties();
	}

	// -------------- operations
	openModal() {
		this.modalShared.openModal();
	}
	closeModal() {
		this.modalShared.closeModal();
	}
	saveModel(model: M, diagram?: go.Diagram) {
		if (!diagram) {
			diagram = this.diagram;
		}
		diagram.model.commit((m: any) => {
			m.addNodeData(model);
			diagram?.select(diagram.findNodeForData(model));
		});
	}
	updateModel(model: M, diagram?: go.Diagram) {
		if (!diagram) {
			diagram = this.diagram;
		}
		diagram.model.commit((m: any) => {
			const nodeModel = m.findNodeDataForKey(model.key);
			m.assignAllDataProperties(nodeModel, model);
			diagram?.select(diagram.findNodeForData(model));
		});
	}
	onClickOk($event: any) {
		this.ok.emit($event);
	}
	onClickClose($event: any) {
		this.close.emit($event);
	}

	// -------------- utility
	defaultModel(): go.GraphLinksModel {
		return new go.GraphLinksModel({
			modelData: this.diagramModel.diagramModelData,
			nodeDataArray: this.diagramModel.diagramNodeData,
			linkDataArray: this.diagramModel.diagramLinkData,
		});
	}

	getNodes(): M[] {
		return this.diagramModel ? this.diagramModel.diagramNodeData : undefined;
	}
	getLinks(): GojsLinkDataModel[] {
		return this.diagramModel ? this.diagramModel.diagramLinkData : undefined;
	}

	// -------------- manage json

	getJson(): GojsDiagramModel {
		return this.diagramModel;
	}

	getJsonString(): string {
		return JSON.stringify(this.getJson(), null, 4);
	}

	loadJson(model: GojsDiagramModel, diagram?: go.Diagram): void {
		if (!diagram) {
			diagram = this.diagram;
		}
		this.diagramModel = model;
		const myModel = this.getModel();
		diagram.model = myModel;
		this.buildDiagram(diagram);
	}

	loadJsonString(json: string, diagram?: go.Diagram): void {
		this.loadJson(JSON.parse(json), diagram);
	}

	// -------------- manage validations
	setMessage(message: string): void {
		if (this.modalShared) {
			this.modalShared.setMessage(message);
		}
	}
	setMessages(messages: string[]): void {
		if (this.modalShared) {
			this.modalShared.setMessages(messages);
		}
	}
	emptyMessages() {
		if (this.modalShared) {
			this.modalShared.emptyMessages();
		}
	}

	hasMessage(): boolean {
		return this.modalShared ? this.modalShared.hasMessage() : false;
	}

	// -------------- download
	makeBlobCallback(blob: any, filename: string | undefined) {
		if (!filename) {
			filename = 'Graph.png';
		}
		var url = window.URL.createObjectURL(blob);

		const a: any = document.createElement('a');
		a.style = 'display: none';
		a.href = url;
		a.download = filename;

		// IE 11
		/*
    if (window.navigator['msSaveBlob'] !== undefined) {
      window.navigatormsSaveBlob(blob, filename);
      return;
    }
    */

		document.body.appendChild(a);
		requestAnimationFrame(() => {
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		});
	}

	download(filename?: string) {
		if (!filename && this.filename) {
			filename = this.filename;
		}
		var blob = this.diagram.makeImageData({
			background: 'white',
			returnType: 'blob',
			callback: (val) => this.makeBlobCallback(val, filename),
		});
	}
}
