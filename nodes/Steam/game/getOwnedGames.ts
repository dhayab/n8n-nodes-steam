import { INodePropertyOptions } from 'n8n-workflow';

export const operation: INodePropertyOptions = {
	name: 'Get Owned Games',
	value: 'getOwnedGames',
	action: 'Get owned games',
	description: 'Returns a list of games a player owns along with some playtime information',
	routing: {
		request: {
			method: 'GET',
			url: '/IPlayerService/GetOwnedGames/v0001',
			qs: {
				include_appinfo: true,
			},
		},
	},
};
