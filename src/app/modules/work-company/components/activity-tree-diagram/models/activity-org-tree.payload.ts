import { ActivityModel } from '../../../../authentication/models/activity.model';
import { UserModel } from '../../../../authentication/models/user.model';
import { AttachmentModel } from '../../../../resources/models/attachment.model';
import { ActivityuserModel } from '../../../models/activityuser.model';
import { WorkroleModel } from '../../../models/workrole.model';

export interface ActivityOrgTreePayload {
	activityuser: ActivityuserModel;
	activity: ActivityModel;
	user: UserModel;
	role: WorkroleModel;
	father: UserModel;
	pic: AttachmentModel;
}
