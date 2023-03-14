import { INodePropertyOptions } from 'n8n-workflow';

export const operation: INodePropertyOptions = {
	name: 'Get Recently Played Games',
	value: 'getRecentlyPlayedGames',
	action: 'Get recently played games',
	description: 'Returns a list of games a player has played in the last two weeks',
	routing: {
		request: {
			method: 'GET',
			url: '/IPlayerService/GetRecentlyPlayedGames/v0001',
		},
	},
};
