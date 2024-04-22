import { PlayerStyleModel } from '../model/player-style.model';

export interface TournmentProperties {
	styleLevel?: Map<string | number, PlayerStyleModel>;
	separatorPlayerColor?: string;
	linkColor?: string;
	stylePlayer?: PlayerStyleModel;
	stylePlayer1?: PlayerStyleModel;
	stylePlayer2?: PlayerStyleModel;
}
