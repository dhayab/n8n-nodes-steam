import { INodePropertyOptions } from 'n8n-workflow';

export const operation: INodePropertyOptions = {
	name: 'Get User Profile',
	value: 'getUserProfile',
	action: 'Get user profile',
	description: 'Returns basic profile information for a Steam user',
	routing: {
		request: {
			method: 'GET',
			url: '/ISteamUser/GetPlayerSummaries/v0002',
		},
	},
};
