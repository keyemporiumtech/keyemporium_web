import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface KanbanBoardModel extends GojsNodeDataModel {
	start?: number;
	duration?: number;
	color: EnumKanbanBoardStatus;
	isGroup?: boolean;
	group?: string;
	text: string;
	loc?: string;
	percent?: number;
	persons?: any[];

	dtaInit?: Date;
	dtaEnd?: Date;

	statusColor?: string;
	statusText?: string;
}

export enum EnumKanbanBoardStatus {
	NONE = '0',
	STOPPED = '1',
	IN_PROGRESS = '2',
	COMPLETED = '3',
}
