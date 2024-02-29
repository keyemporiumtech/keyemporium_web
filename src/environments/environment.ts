// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageInfo from '../../package.json';
import versioningInfo from '../../versioning.json';
export const environment = {
	name: 'LOCAL',
	VERSION: packageInfo.version,
	TEMPLATE_VERSION: versioningInfo.template,
	production: false,
	appName: '&copy; Keyemporium',
	clientId: 'KEYEMPORIUM_REST',
	activityPIVA: undefined,
	api: {
		tokenApp: 'ab7414e3975ae96b2d6ef4bf641252feda9d633b',
		services: window.location.origin + '/REST/',
		mobile: 'http://localhost:8100',
		privacyPolicy: undefined, // '_projects/keyemporium/privacy.pdf'
		cookiePolicy: undefined, // '_projects/keyemporium/cookie.pdf'
		termPolicy: undefined, // '_projects/keyemporium/conditions.pdf'
	},
	url: {
		message: ['commons', 'message'],
		home: ['app'],
		privacyPolicy: 'assets/files/Privacy.pdf',
		cookiePolicy: 'assets/files/Cookie.pdf',
		termPolicy: 'assets/files/Conditions.pdf',
	},
	social: {
		google_oauth_flgssl: 'true',
		google_oauth_app_name: 'TESTING',
		google_oauth_app_id: 'modulare_web',
		google_oauth_client_id:
			'492743495086-mk8ua50bf68746mv9rnruvkddogr8gn8.apps.googleusercontent.com',
		google_oauth_app_name_ssl: 'TESTING',
		google_oauth_app_id_ssl: 'modulare_web',
		google_oauth_client_id_ssl:
			'326525595781-nuhrcs3n5ca61u1d3cc8tchgv9kqcijj.apps.googleusercontent.com',
		google_oauth_scopes: [
			'email',
			'profile',
			'https://www.googleapis.com/auth/profile.agerange.read',
			'https://www.googleapis.com/auth/profile.emails.read',
			'https://www.googleapis.com/auth/profile.language.read',
			// 'https://www.googleapis.com/auth/user.addresses.read',
			'https://www.googleapis.com/auth/user.birthday.read',
			'https://www.googleapis.com/auth/user.emails.read',
			'https://www.googleapis.com/auth/user.gender.read',
			// 'https://www.googleapis.com/auth/user.organization.read',
			// 'https://www.googleapis.com/auth/user.phonenumbers.read',
		],
		google_oauth_apiKey: 'AIzaSyCu3X4UzhI_3qGoFKZ7UXIH8UstCytsFNM',
		google_oauth_fields: [
			'ageRanges',
			// 'addresses',
			'biographies',
			'birthdays',
			'genders',
			// 'phoneNumbers',
		],
		facebook_oauth_app_name: 'TESTING',
		facebook_oauth_app_id: '565642658004447',
		facebook_oauth_scopes: [
			'email',
			'public_profile',
			// 'user_hometown',
			'user_link',
			'user_birthday',
			'user_gender',
			// 'user_location',
		],
		facebook_oauth_apiKey: '',
		facebook_oauth_fields: [
			'name',
			'email',
			'picture',
			'first_name',
			'last_name',
			'birthday',
			'gender',
			// 'hometown',
			'link',
			// 'location',
		],
	},
	messages: {
		idMessagePrincipal: 'appMessage',
		idMessageDiv: 'appMessageDiv',
		idMessageModal: 'appMessage',
	},
	security: {
		servername: 'KEYEMPORIUM_REST',
	},
	default: {
		language: 'ita',
		languageName: 'Italiano',
		languages: ['ita', 'eng', 'fra'],
		currency: 'EUR',
		currencySymbol: '€',
		currencyName: 'Euro',
		currencies: ['EUR', 'CHF', 'GBP', 'USD', 'JPY'],
		nation: 'IT',
		nationName: 'Italia',
		nations: undefined,
		timezoneVal: '+01:00',
		timezoneName: 'Europe/Berlin',
		timezoneChatSocketVal: '+01:00',
		timezoneChatSocketName: 'Europe/Berlin',
	},
	loading: {
		color: '#17a2b8',
		type: 'ellipsis',
	},
	enable: {
		debugMode: true,
		innerStorage: true,
		languages: true,
		currencies: true,
		nations: true,
		init: true,
		cookie: false,
		apiLogError: true,
	},
	logger: {
		request: true,
		response: true,
		constructors: true,
		serviceFunctions: true,
		security: true,
		storage: true,
		color: {
			component: {
				info: 'darkgreen',
				debug: 'darkorange',
				error: 'darkred',
			},
			service: {
				info: '#4a235a',
				debug: '#7e5109',
				error: '#641e16',
			},
			request: '#7FB3D5',
			response: '#D2B4DE',
			constructors: '#0b5345',
			serviceFunctions: '#1b2631',
			security: '#F2D7D5',
		},
	},
	contacts: {
		contactName: 'Keyemporium Team',
		contactEmail: 'keyemporium.tech@gmail.it',
		contactPhone: '+393281044127',
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
