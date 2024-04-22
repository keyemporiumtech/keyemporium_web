import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface TournmentModel extends GojsNodeDataModel {
	key?: string;
	player1?: string;
	player2?: string;
	score1?: number;
	score2?: number;
	parent?: string | number | undefined;
	parentNumber?: number;
	level?: string | number;
	// style
	backgroundPlayer1?: string;
	backgroundPlayer2?: string;
	colorPlayer1?: string;
	colorPlayer2?: string;
	backgroundScore1?: string;
	backgroundScore2?: string;
	colorScore1?: string;
	colorScore2?: string;
}
