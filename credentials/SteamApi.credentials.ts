import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

import { operation as getUserProfile } from '../nodes/Steam/user/getUserProfile';

export class SteamApi implements ICredentialType {
	name = 'steamApi';
	displayName = 'Steam Web API';
	documentationUrl = 'https://steamcommunity.com/dev/apikey';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				key: '={{ $credentials.apiKey }}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			url: `http://api.steampowered.com${getUserProfile.routing?.request?.url}`,
			qs: {
				steamids: '0',
			},
		},
	};
}
