import { EnumDBLike } from '../enums/db-like.enum';

export interface RequestGroupsConditionsInterface {
	groups?: string[];
	likegroups?: EnumDBLike;
	groupssave?: string[];
	groupsdel?: string[];
}
