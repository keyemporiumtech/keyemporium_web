export const authenticationList = {
	authentication: {
		tokenvalid: 'authentication/tokenValid',
		loginvalid: 'authentication/loginValid',
	},
	application: {
		unique: 'application/get',
		paginate: 'application/table',
		save: 'application/save',
		edit: 'application/edit',
		delete: 'application/delete',
		generate: 'application/generate',
		check: 'application/check',
	},
	authentication2fa: {
		generate: 'authentication2fa/generate',
		check: 'authentication2fa/check',
	},
	clienttoken: {
		unique: 'clienttoken/get',
		paginate: 'clienttoken/table',
		save: 'clienttoken/save',
		edit: 'clienttoken/edit',
		delete: 'clienttoken/delete',
	},
	user: {
		unique: 'user/get',
		paginate: 'user/table',
		save: 'user/save',
		edit: 'user/edit',
		delete: 'user/delete',
		login: 'user/login',
		confirmlogin: 'user/confirmLogin',
		checksession: 'user/checkSession',
		logout: 'user/logout',
		profile: 'user/profile',
		changeProfile: 'user/changeProfile',
		restorePassword: 'user/restorePassword',
		remindPassword: 'user/remindPassword',
		changePassword: 'user/changePassword',
		register: 'user/register',
	},
	userrelation: {
		unique: 'userrelation/get',
		paginate: 'userrelation/table',
		save: 'userrelation/save',
		edit: 'userrelation/edit',
		delete: 'userrelation/delete',
		tpuserrelation: 'userrelation/tpuserrelation',
	},
	userrelationpermission: {
		unique: 'userrelationpermission/get',
		paginate: 'userrelationpermission/table',
		save: 'userrelationpermission/save',
		edit: 'userrelationpermission/edit',
		delete: 'userrelationpermission/delete',
	},
	activity: {
		unique: 'activity/get',
		paginate: 'activity/table',
		save: 'activity/save',
		edit: 'activity/edit',
		delete: 'activity/delete',
		tpactivity: 'activity/tpactivity',
		tpcat: 'activity/tpcat',
		tree: 'activity/tree',
		profile: 'activity/profile',
		changeProfile: 'activity/changeProfile',
		employers: 'activity/employers',
	},
	activityrelation: {
		unique: 'activityrelation/get',
		paginate: 'activityrelation/table',
		save: 'activityrelation/save',
		edit: 'activityrelation/edit',
		delete: 'activityrelation/delete',
		tpactivityrelation: 'activityrelation/tpactivityrelation',
	},
	activityrelationpermission: {
		unique: 'activityrelationpermission/get',
		paginate: 'activityrelationpermission/table',
		save: 'activityrelationpermission/save',
		edit: 'activityrelationpermission/edit',
		delete: 'activityrelationpermission/delete',
	},
	contactreference: {
		unique: 'contactreference/get',
		paginate: 'contactreference/table',
		save: 'contactreference/save',
		edit: 'contactreference/edit',
		delete: 'contactreference/delete',
		tpcontactreference: 'contactreference/tpcontactreference',
		tpsocialreference: 'contactreference/tpsocialreference',
	},
	userreport: {
		unique: 'userreport/get',
		paginate: 'userreport/table',
		save: 'userreport/save',
		edit: 'userreport/edit',
		delete: 'userreport/delete',
	},
	confirmoperation: {
		unique: 'confirmoperation/get',
		paginate: 'confirmoperation/table',
		save: 'confirmoperation/save',
		edit: 'confirmoperation/edit',
		delete: 'confirmoperation/delete',
	},
	profile: {
		unique: 'profile/get',
		paginate: 'profile/table',
		save: 'profile/save',
		edit: 'profile/edit',
		delete: 'profile/delete',
	},
	permission: {
		unique: 'permission/get',
		paginate: 'permission/table',
		save: 'permission/save',
		edit: 'permission/edit',
		delete: 'permission/delete',
	},
	profilepermission: {
		unique: 'profilepermission/get',
		paginate: 'profilepermission/table',
		save: 'profilepermission/save',
		edit: 'profilepermission/edit',
		delete: 'profilepermission/delete',
		updatepermissions: 'profilepermission/updatepermissions',
	},
	userprofile: {
		unique: 'userprofile/get',
		paginate: 'userprofile/table',
		save: 'userprofile/save',
		edit: 'userprofile/edit',
		delete: 'userprofile/delete',
		createprofile: 'userprofile/createprofile',
		removeprofile: 'userprofile/removeprofile',
	},
	useroauthsocial: {
		unique: 'useroauthsocial/get',
		paginate: 'useroauthsocial/table',
		save: 'useroauthsocial/save',
		edit: 'useroauthsocial/edit',
		delete: 'useroauthsocial/delete',
		oauth: 'useroauthsocial/getByOauth',
	},
	userreference: {
		unique: 'userreference/get',
		paginate: 'userreference/table',
		save: 'userreference/save',
		edit: 'userreference/edit',
		delete: 'userreference/delete',
		principal: 'userreference/getPrincipal',
		setprincipal: 'userreference/setPrincipal',
		saverelation: 'userreference/saveRelation',
	},
	useraddress: {
		unique: 'useraddress/get',
		paginate: 'useraddress/table',
		save: 'useraddress/save',
		edit: 'useraddress/edit',
		delete: 'useraddress/delete',
		principal: 'useraddress/getPrincipal',
		setprincipal: 'useraddress/setPrincipal',
		saverelation: 'useraddress/saveRelation',
	},
	userattachment: {
		unique: 'userattachment/get',
		paginate: 'userattachment/table',
		save: 'userattachment/save',
		edit: 'userattachment/edit',
		delete: 'userattachment/delete',
		principal: 'userattachment/getPrincipal',
		setprincipal: 'userattachment/setPrincipal',
		saverelation: 'userattachment/saveRelation',
	},
	activityreference: {
		unique: 'activityreference/get',
		paginate: 'activityreference/table',
		save: 'activityreference/save',
		edit: 'activityreference/edit',
		delete: 'activityreference/delete',
		principal: 'activityreference/getPrincipal',
		setprincipal: 'activityreference/setPrincipal',
		saverelation: 'activityreference/saveRelation',
	},
	activityaddress: {
		unique: 'activityaddress/get',
		paginate: 'activityaddress/table',
		save: 'activityaddress/save',
		edit: 'activityaddress/edit',
		delete: 'activityaddress/delete',
		principal: 'activityaddress/getPrincipal',
		setprincipal: 'activityaddress/setPrincipal',
		saverelation: 'activityaddress/saveRelation',
	},
	activityattachment: {
		unique: 'activityattachment/get',
		paginate: 'activityattachment/table',
		save: 'activityattachment/save',
		edit: 'activityattachment/edit',
		delete: 'activityattachment/delete',
		principal: 'activityattachment/getPrincipal',
		setprincipal: 'activityattachment/setPrincipal',
		saverelation: 'activityattachment/saveRelation',
	},
	activityprofile: {
		unique: 'activityprofile/get',
		paginate: 'activityprofile/table',
		save: 'activityprofile/save',
		edit: 'activityprofile/edit',
		delete: 'activityprofile/delete',
		createprofile: 'userprofile/createprofile',
		removeprofile: 'userprofile/removeprofile',
	},
	oauthlogin: {
		check: 'oauthlogin/check',
		login: 'oauthlogin/login',
	},
	activitydiagram: {
		unique: 'activitydiagram/get',
		paginate: 'activitydiagram/table',
		save: 'activitydiagram/save',
		edit: 'activitydiagram/edit',
		delete: 'activitydiagram/delete',
	},
	userdiagram: {
		unique: 'userdiagram/get',
		paginate: 'userdiagram/table',
		save: 'userdiagram/save',
		edit: 'userdiagram/edit',
		delete: 'userdiagram/delete',
	},
	newsletter: {
		unique: 'newsletter/get',
		paginate: 'newsletter/table',
		save: 'newsletter/save',
		edit: 'newsletter/edit',
		delete: 'newsletter/delete',
	},
	activitynewsletter: {
		unique: 'activitynewsletter/get',
		paginate: 'activitynewsletter/table',
		save: 'activitynewsletter/save',
		edit: 'activitynewsletter/edit',
		delete: 'activitynewsletter/delete',
	},
	usernewsletter: {
		unique: 'usernewsletter/get',
		paginate: 'usernewsletter/table',
		save: 'usernewsletter/save',
		edit: 'usernewsletter/edit',
		delete: 'usernewsletter/delete',
	},
};
