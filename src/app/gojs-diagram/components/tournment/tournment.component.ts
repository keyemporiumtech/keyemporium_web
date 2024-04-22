import { Component } from '@angular/core';
import * as go from 'gojs';
import { TournmentModel } from '../../builder/tournment/model/torunment.model';
import { TournmentTemplate } from '../../builder/tournment/tournment.template';
import { TournmentUtility } from '../../builder/tournment/utility/tournment.utility';
import { GojsDiagramComponent } from '../../core/abstract/gojs-diagram.component';
import { GojsDiagramModel } from '../../core/model/gojs-diagram.model';

@Component({
	selector: 'gojs-cmp-tournment',
	templateUrl: './tournment.component.html',
	styleUrls: ['./tournment.component.scss'],
})
export class TournmentComponent extends GojsDiagramComponent<TournmentTemplate, TournmentModel> {
	override afterModel(state: GojsDiagramModel): void {}

	override getModel(): go.TreeModel {
		const model = new go.TreeModel({
			nodeDataArray: this.diagramModel.diagramNodeData,
		});

		model.addChangedListener((e) => {
			// Appen when score changes
			if (e.propertyName !== 'score1' && e.propertyName !== 'score2') return;
			var data = e.object;

			TournmentUtility.setLevelByKey(data);

			TournmentUtility.setStyleModel(data, this.diagram);

			TournmentUtility.setWinnerMatch(data, this.diagram);
		});

		return model;
	}
	override instanceBuilder(): TournmentTemplate {
		return new TournmentTemplate();
	}

	override buildDiagram(diagram: go.Diagram): void {}
	override buildDiagramModel(diagram: go.Diagram): void {
		TournmentUtility.makeMatchControls(diagram.model.nodeDataArray, diagram);
	}
}
