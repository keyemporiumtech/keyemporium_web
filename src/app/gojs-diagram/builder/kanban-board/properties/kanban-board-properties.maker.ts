import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { KanbanBoardUtility } from '../utility/kanban-board.utility';
import { KanbanBoardProperties } from './kanban-board.properties';

export class KanbanBoardPropertiesMaker {
	static setValues(properties?: KanbanBoardProperties) {
		if (properties && properties.startDate) {
			KanbanBoardUtility.StartDate = properties.startDate;
		}
		if (properties && properties.noteColors) {
			KanbanBoardUtility.noteColors = properties.noteColors;
		}
		if (properties && properties.shapeGroup) {
			this.putShapeGroup(properties.shapeGroup);
		}
		if (properties && properties.textGroup) {
			this.putTextGroup(properties.textGroup);
		}
		if (properties && properties.shapeStatus) {
			this.putShapeStatus(properties.shapeStatus);
		}
		if (properties && properties.shapeNode) {
			this.putShapeNode(properties.shapeNode);
		}
		if (properties && properties.textNode) {
			this.putTextNode(properties.textNode);
		}
		if (properties && properties.textStatusSTOP) {
			this.putTextSTOP(properties.textStatusSTOP);
		}
		if (properties && properties.textStatusPROGRESS) {
			this.putTextPROGRESS(properties.textStatusPROGRESS);
		}
		if (properties && properties.textStatusCOMPLETE) {
			this.putTextCOMPLETE(properties.textStatusCOMPLETE);
		}
	}

	static putShapeGroup(shape?: ShapeModel) {
		if (shape) {
			if (shape.type) {
				KanbanBoardUtility.shapeGroup.type = shape.type;
			}
			if (shape.background) {
				KanbanBoardUtility.shapeGroup.background = shape.background;
			}
			if (shape.borderColor) {
				KanbanBoardUtility.shapeGroup.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				KanbanBoardUtility.shapeGroup.borderSize = shape.borderSize;
			}
			if (shape.payload && shape.payload.backgroundHighlight) {
				KanbanBoardUtility.shapeGroup.payload.backgroundHighlight =
					shape.payload.backgroundHighlight;
			}
		}
	}

	static putTextGroup(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				KanbanBoardUtility.textGroup.font = text.font;
			}
			if (text.textColor) {
				KanbanBoardUtility.textGroup.textColor = text.textColor;
			}

			if (text.payload && text.payload.fontHighlight) {
				KanbanBoardUtility.textGroup.payload.fontHighlight = text.payload.fontHighlight;
			}
			if (text.payload && text.payload.textColorHighlight) {
				KanbanBoardUtility.textGroup.payload.textColorHighlight = text.payload.textColorHighlight;
			}
		}
	}

	static putShapeStatus(shape?: ShapeModel) {
		if (shape) {
			if (shape.type) {
				KanbanBoardUtility.shapeNode.type = shape.type;
			}
			if (shape.background) {
				KanbanBoardUtility.shapeNode.background = shape.background;
			}
			if (shape.borderColor) {
				KanbanBoardUtility.shapeNode.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				KanbanBoardUtility.shapeNode.borderSize = shape.borderSize;
			}
		}
	}

	static putShapeNode(shape?: ShapeModel) {
		if (shape) {
			if (shape.type) {
				KanbanBoardUtility.shapeNode.type = shape.type;
			}
			if (shape.background) {
				KanbanBoardUtility.shapeNode.background = shape.background;
			}
			if (shape.borderColor) {
				KanbanBoardUtility.shapeNode.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				KanbanBoardUtility.shapeNode.borderSize = shape.borderSize;
			}
		}
	}

	static putTextNode(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				KanbanBoardUtility.textNode.font = text.font;
			}
			if (text.textColor) {
				KanbanBoardUtility.textNode.textColor = text.textColor;
			}

			if (text.payload && text.payload.fontContent) {
				KanbanBoardUtility.textNode.payload.fontContent = text.payload.fontContent;
			}
			if (text.payload && text.payload.textColorContent) {
				KanbanBoardUtility.textNode.payload.textColorContent = text.payload.textColorContent;
			}
		}
	}

	static putTextSTOP(text?: { color?: string; text?: string }) {
		if (text) {
			if (text.color) {
				KanbanBoardUtility.textStatusSTOP.color = text.color;
				KanbanBoardUtility.noteColors[1] = text.color;
			}
			if (text.text) {
				KanbanBoardUtility.textStatusSTOP.text = text.text;
			}
		}
	}

	static putTextPROGRESS(text?: { color?: string; text?: string }) {
		if (text) {
			if (text.color) {
				KanbanBoardUtility.textStatusPROGRESS.color = text.color;
				KanbanBoardUtility.noteColors[2] = text.color;
			}
			if (text.text) {
				KanbanBoardUtility.textStatusPROGRESS.text = text.text;
			}
		}
	}

	static putTextCOMPLETE(text?: { color?: string; text?: string }) {
		if (text) {
			if (text.color) {
				KanbanBoardUtility.textStatusCOMPLETE.color = text.color;
				KanbanBoardUtility.noteColors[3] = text.color;
			}
			if (text.text) {
				KanbanBoardUtility.textStatusCOMPLETE.text = text.text;
			}
		}
	}

	// -------------- DEFAULT
	static default(): KanbanBoardProperties {
		const properties: KanbanBoardProperties = {};
		properties.startDate = new Date();
		properties.noteColors = ['lightgray', '#CC293D', '#FFD700', '#009CCC'];
		properties.shapeGroup = {
			type: EnumFigureType.RETTANGOLO,
			background: '#F1F1F1',
			borderSize: 4,
			payload: { backgroundHighlight: '#D6D6D6' },
		};
		properties.textGroup = {
			font: '15px Lato, sans-serif',
			payload: { fontHighlight: '15px Lato, sans-serif' },
		};
		properties.shapeStatus = {
			type: EnumFigureType.RETTANGOLO,
			background: 'darkred', // lightgray
			borderColor: '#CCCCCC',
			borderSize: 1,
		};
		properties.shapeNode = {
			type: EnumFigureType.RETTANGOLO,
			background: 'white',
			borderColor: '#CCCCCC',
			borderSize: 1,
		};
		properties.textNode = {
			font: 'bold 12px Lato, bold sans-serif',
			textColor: 'black',
			payload: { fontContent: '11px Lato, sans-serif', textColorContent: 'black' },
		};
		properties.textStatusSTOP = {
			color: '#CC293D',
			text: 'Stopped',
		};
		properties.textStatusPROGRESS = {
			color: '#FFD700',
			text: 'In Progress',
		};
		properties.textStatusCOMPLETE = {
			color: '#009CCC',
			text: 'Completed',
		};
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
