import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

import { operation as getPlayerSummaries } from '../nodes/Steam/user/getPlayerSummaries';

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
			url: `http://api.steampowered.com${getPlayerSummaries.routing?.request?.url}`,
			qs: {
				steamids: '0',
			},
		},
	};
}
