import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { PlayerStyleModel } from '../model/player-style.model';
import { TournmentUtility } from '../utility/tournment.utility';
import { TournmentProperties } from './tournment.properties';

export class TournmentPropertiesMaker {
	static setValues(properties?: TournmentProperties) {
		if (!properties) {
			properties = this.default();
		}
		if (properties) {
			if (properties.separatorPlayerColor) {
				TournmentUtility.separatorPlayerColor = properties.separatorPlayerColor;
			}
			if (properties.linkColor) {
				TournmentUtility.linkColor = properties.linkColor;
			}

			if (properties.styleLevel) {
				TournmentUtility.styleLevel = properties.styleLevel;
				this.fillStyleLevel();
			}
			// ------Player1
			// normal
			if (properties.stylePlayer1 && properties.stylePlayer1.shape) {
				this.putShapePlayer1(properties.stylePlayer1.shape);
			} else if (properties.stylePlayer) {
				this.putShapePlayer1(properties.stylePlayer.shape);
			}

			if (properties.stylePlayer1 && properties.stylePlayer1.text) {
				this.putTextPlayer1(properties.stylePlayer1.text);
			} else if (properties.stylePlayer) {
				this.putTextPlayer1(properties.stylePlayer.text);
			}

			if (properties.stylePlayer1 && properties.stylePlayer1.shapeScore) {
				this.putShapeScorePlayer1(properties.stylePlayer1.shapeScore);
			} else if (properties.stylePlayer1 && properties.stylePlayer1.shape) {
				this.putShapeScorePlayer1(properties.stylePlayer1.shape);
			} else if (properties.stylePlayer && properties.stylePlayer.shapeScore) {
				this.putShapeScorePlayer1(properties.stylePlayer.shapeScore);
			} else if (properties.stylePlayer && properties.stylePlayer.shape) {
				this.putShapeScorePlayer1(properties.stylePlayer.shape);
			}

			if (properties.stylePlayer1 && properties.stylePlayer1.textScore) {
				this.putTextScorePlayer1(properties.stylePlayer1.textScore);
			} else if (properties.stylePlayer1 && properties.stylePlayer1.text) {
				this.putTextScorePlayer1(properties.stylePlayer1.text);
			} else if (properties.stylePlayer && properties.stylePlayer.textScore) {
				this.putTextScorePlayer1(properties.stylePlayer.textScore);
			} else if (properties.stylePlayer && properties.stylePlayer.text) {
				this.putTextScorePlayer1(properties.stylePlayer.text);
			}

			// win
			if (properties.stylePlayer1 && properties.stylePlayer1.shapeWin) {
				this.putShapeWinPlayer1(properties.stylePlayer1.shapeWin);
			} else if (properties.stylePlayer) {
				this.putShapeWinPlayer1(properties.stylePlayer.shapeWin);
			}

			if (properties.stylePlayer1 && properties.stylePlayer1.textWin) {
				this.putTextWinPlayer1(properties.stylePlayer1.textWin);
			} else if (properties.stylePlayer) {
				this.putTextWinPlayer1(properties.stylePlayer.textWin);
			}

			if (properties.stylePlayer1 && properties.stylePlayer1.shapeScoreWin) {
				this.putShapeScoreWinPlayer1(properties.stylePlayer1.shapeScoreWin);
			} else if (properties.stylePlayer1 && properties.stylePlayer1.shapeWin) {
				this.putShapeScoreWinPlayer1(properties.stylePlayer1.shapeWin);
			} else if (properties.stylePlayer && properties.stylePlayer.shapeScoreWin) {
				this.putShapeScoreWinPlayer1(properties.stylePlayer.shapeScoreWin);
			} else if (properties.stylePlayer && properties.stylePlayer.shapeWin) {
				this.putShapeScoreWinPlayer1(properties.stylePlayer.shapeWin);
			}

			if (properties.stylePlayer1 && properties.stylePlayer1.textScoreWin) {
				this.putTextScoreWinPlayer1(properties.stylePlayer1.textScoreWin);
			} else if (properties.stylePlayer1 && properties.stylePlayer1.textWin) {
				this.putTextScoreWinPlayer1(properties.stylePlayer1.textWin);
			} else if (properties.stylePlayer && properties.stylePlayer.textScoreWin) {
				this.putTextScoreWinPlayer1(properties.stylePlayer.textScoreWin);
			} else if (properties.stylePlayer && properties.stylePlayer.textWin) {
				this.putTextScoreWinPlayer1(properties.stylePlayer.textWin);
			}

			// ------Player2
			// normal
			if (properties.stylePlayer2 && properties.stylePlayer2.shape) {
				this.putShapePlayer2(properties.stylePlayer2.shape);
			} else if (properties.stylePlayer) {
				this.putShapePlayer2(properties.stylePlayer.shape);
			}

			if (properties.stylePlayer2 && properties.stylePlayer2.text) {
				this.putTextPlayer2(properties.stylePlayer2.text);
			} else if (properties.stylePlayer) {
				this.putTextPlayer2(properties.stylePlayer.text);
			}

			if (properties.stylePlayer2 && properties.stylePlayer2.shapeScore) {
				this.putShapeScorePlayer2(properties.stylePlayer2.shapeScore);
			} else if (properties.stylePlayer2 && properties.stylePlayer2.shape) {
				this.putShapeScorePlayer2(properties.stylePlayer2.shape);
			} else if (properties.stylePlayer && properties.stylePlayer.shapeScore) {
				this.putShapeScorePlayer2(properties.stylePlayer.shapeScore);
			} else if (properties.stylePlayer && properties.stylePlayer.shape) {
				this.putShapeScorePlayer2(properties.stylePlayer.shape);
			}

			if (properties.stylePlayer2 && properties.stylePlayer2.textScore) {
				this.putTextScorePlayer2(properties.stylePlayer2.textScore);
			} else if (properties.stylePlayer2 && properties.stylePlayer2.text) {
				this.putTextScorePlayer2(properties.stylePlayer2.text);
			} else if (properties.stylePlayer && properties.stylePlayer.textScore) {
				this.putTextScorePlayer2(properties.stylePlayer.textScore);
			} else if (properties.stylePlayer && properties.stylePlayer.text) {
				this.putTextScorePlayer2(properties.stylePlayer.text);
			}

			// win
			if (properties.stylePlayer2 && properties.stylePlayer2.shapeWin) {
				this.putShapeWinPlayer2(properties.stylePlayer2.shapeWin);
			} else if (properties.stylePlayer) {
				this.putShapeWinPlayer2(properties.stylePlayer.shapeWin);
			}

			if (properties.stylePlayer2 && properties.stylePlayer2.textWin) {
				this.putTextWinPlayer2(properties.stylePlayer2.textWin);
			} else if (properties.stylePlayer) {
				this.putTextWinPlayer2(properties.stylePlayer.textWin);
			}

			if (properties.stylePlayer2 && properties.stylePlayer2.shapeScoreWin) {
				this.putShapeScoreWinPlayer2(properties.stylePlayer2.shapeScoreWin);
			} else if (properties.stylePlayer2 && properties.stylePlayer2.shapeWin) {
				this.putShapeScoreWinPlayer2(properties.stylePlayer2.shapeWin);
			} else if (properties.stylePlayer && properties.stylePlayer.shapeScoreWin) {
				this.putShapeScoreWinPlayer2(properties.stylePlayer.shapeScoreWin);
			} else if (properties.stylePlayer && properties.stylePlayer.shapeWin) {
				this.putShapeScoreWinPlayer2(properties.stylePlayer.shapeWin);
			}

			if (properties.stylePlayer2 && properties.stylePlayer2.textScoreWin) {
				this.putTextScoreWinPlayer2(properties.stylePlayer2.textScoreWin);
			} else if (properties.stylePlayer2 && properties.stylePlayer2.textWin) {
				this.putTextScoreWinPlayer2(properties.stylePlayer2.textWin);
			} else if (properties.stylePlayer && properties.stylePlayer.textScoreWin) {
				this.putTextScoreWinPlayer2(properties.stylePlayer.textScoreWin);
			} else if (properties.stylePlayer && properties.stylePlayer.textWin) {
				this.putTextScoreWinPlayer2(properties.stylePlayer.textWin);
			}
		}
	}

	static fillStyleLevel() {
		TournmentUtility.styleLevel.forEach((style, level) => {
			if (!style.shapeScore && style.shape) {
				style.shapeScore = style.shape;
			} else if (style.shapeScore) {
				if (!style.shapeScore.background) {
					style.shapeScore.background = style.shape.background;
				}
				if (!style.shapeScore.borderColor) {
					style.shapeScore.borderColor = style.shape.borderColor;
				}
				if (!style.shapeScore.type) {
					style.shapeScore.type = style.shape.type;
				}
			}

			if (!style.shapeWin && style.shape) {
				style.shapeWin = style.shape;
			} else if (style.shapeWin) {
				if (!style.shapeWin.background) {
					style.shapeWin.background = style.shape.background;
				}
				if (!style.shapeWin.borderColor) {
					style.shapeWin.borderColor = style.shape.borderColor;
				}
				if (!style.shapeWin.type) {
					style.shapeWin.type = style.shape.type;
				}
			}

			if (!style.textScore && style.text) {
				style.textScore = style.text;
			} else if (style.textScore) {
				if (!style.textScore.textAlign) {
					style.textScore.textAlign = style.text.textAlign;
				}
				if (!style.textScore.textColor) {
					style.textScore.textColor = style.text.textColor;
				}
				if (!style.textScore.font) {
					style.textScore.font = style.text.font;
				}
			}

			if (!style.textWin && style.text) {
				style.textWin = style.text;
			} else if (style.textWin) {
				if (!style.textWin.textAlign) {
					style.textWin.textAlign = style.text.textAlign;
				}
				if (!style.textWin.textColor) {
					style.textWin.textColor = style.text.textColor;
				}
				if (!style.textWin.font) {
					style.textWin.font = style.text.font;
				}
			}
		});
	}

	static putShapePlayer1(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer1.shape.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer1.shape.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer1.shape.borderColor = shape.borderColor;
			}
		}
	}

	static putTextPlayer1(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer1.text.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer1.text.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer1.text.textColor = text.textColor;
			}
		}
	}

	static putShapeWinPlayer1(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer1.shapeWin.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer1.shapeWin.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer1.shapeWin.borderColor = shape.borderColor;
			}
		}
	}

	static putTextWinPlayer1(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer1.textWin.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer1.textWin.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer1.textWin.textColor = text.textColor;
			}
		}
	}

	static putShapeScorePlayer1(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer1.shapeScore.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer1.shapeScore.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer1.shapeScore.borderColor = shape.borderColor;
			}
		}
	}

	static putTextScorePlayer1(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer1.textScore.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer1.textScore.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer1.textScore.textColor = text.textColor;
			}
		}
	}

	static putShapeScoreWinPlayer1(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer1.shapeScoreWin.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer1.shapeScoreWin.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer1.shapeScoreWin.borderColor = shape.borderColor;
			}
		}
	}

	static putTextScoreWinPlayer1(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer1.textScoreWin.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer1.textScoreWin.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer1.textScoreWin.textColor = text.textColor;
			}
		}
	}

	// player 2
	static putShapePlayer2(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer2.shape.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer2.shape.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer2.shape.borderColor = shape.borderColor;
			}
		}
	}

	static putTextPlayer2(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer2.text.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer2.text.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer2.text.textColor = text.textColor;
			}
		}
	}

	static putShapeWinPlayer2(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer2.shapeWin.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer2.shapeWin.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer2.shapeWin.borderColor = shape.borderColor;
			}
		}
	}

	static putTextWinPlayer2(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer2.textWin.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer2.textWin.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer2.textWin.textColor = text.textColor;
			}
		}
	}

	static putShapeScorePlayer2(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer2.shapeScore.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer2.shapeScore.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer2.shapeScore.borderColor = shape.borderColor;
			}
		}
	}

	static putTextScorePlayer2(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer2.textScore.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer2.textScore.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer2.textScore.textColor = text.textColor;
			}
		}
	}

	static putShapeScoreWinPlayer2(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				TournmentUtility.stylePlayer2.shapeScoreWin.type = shape.type;
			}
			if (shape.background) {
				TournmentUtility.stylePlayer2.shapeScoreWin.background = shape.background;
			}
			if (shape.borderColor) {
				TournmentUtility.stylePlayer2.shapeScoreWin.borderColor = shape.borderColor;
			}
		}
	}

	static putTextScoreWinPlayer2(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				TournmentUtility.stylePlayer2.textScoreWin.font = text.font;
			}
			if (text.textAlign) {
				TournmentUtility.stylePlayer2.textScoreWin.textAlign = text.textAlign;
			}
			if (text.textColor) {
				TournmentUtility.stylePlayer2.textScoreWin.textColor = text.textColor;
			}
		}
	}

	// -------------- DEFAULT
	static default(): TournmentProperties {
		const properties: TournmentProperties = {};

		properties.styleLevel = new Map<string | number, PlayerStyleModel>();

		properties.linkColor = 'white';
		properties.separatorPlayerColor = 'black';
		properties.stylePlayer = {
			shape: {
				type: EnumFigureType.RETTANGOLO,
				background: '#8C8C8C',
				borderColor: '#8C8C8C',
			},
			text: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'left',
			},
			shapeScore: {
				type: EnumFigureType.RETTANGOLO,
				background: '#BABABA',
				borderColor: '#BABABA',
			},
			textScore: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeWin: {
				type: EnumFigureType.RETTANGOLO,
				background: 'darkred',
				borderColor: '#8C8C8C',
			},
			textWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'left',
			},
			shapeScoreWin: {
				type: EnumFigureType.RETTANGOLO,
				background: 'green',
				borderColor: '#BABABA',
			},
			textScoreWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'center',
			},
		};

		properties.stylePlayer1 = {
			shape: {
				type: EnumFigureType.RETTANGOLO,
				background: '#8C8C8C',
				borderColor: '#8C8C8C',
			},
			text: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'left',
			},
			shapeScore: {
				type: EnumFigureType.RETTANGOLO,
				background: '#BABABA',
				borderColor: '#BABABA',
			},
			textScore: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeWin: {
				type: EnumFigureType.RETTANGOLO,
				background: 'darkred',
				borderColor: '#8C8C8C',
			},
			textWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'left',
			},
			shapeScoreWin: {
				type: EnumFigureType.RETTANGOLO,
				background: 'green',
				borderColor: '#BABABA',
			},
			textScoreWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'center',
			},
		};

		properties.stylePlayer2 = {
			shape: {
				type: EnumFigureType.RETTANGOLO,
				background: '#8C8C8C',
				borderColor: '#8C8C8C',
			},
			text: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'left',
			},
			shapeScore: {
				type: EnumFigureType.RETTANGOLO,
				background: '#BABABA',
				borderColor: '#BABABA',
			},
			textScore: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'black',
				textAlign: 'center',
			},
			shapeWin: {
				type: EnumFigureType.RETTANGOLO,
				background: 'darkred',
				borderColor: '#8C8C8C',
			},
			textWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'left',
			},
			shapeScoreWin: {
				type: EnumFigureType.RETTANGOLO,
				background: 'green',
				borderColor: '#BABABA',
			},
			textScoreWin: {
				font: '10pt  Segoe UI,sans-serif',
				textColor: 'white',
				textAlign: 'center',
			},
		};

		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
