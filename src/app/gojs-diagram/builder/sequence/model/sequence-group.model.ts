import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface SequenceGroupModel extends GojsNodeDataModel {
	duration?: number; // Indica l'altezza tratteggiata del gruppo (durata totale del gruppo)
	loc?: string; // for group 0 0, 100 0, 200 0 etc. etc
}
