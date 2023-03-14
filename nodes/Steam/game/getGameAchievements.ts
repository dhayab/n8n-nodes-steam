import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export const operation: INodePropertyOptions = {
	name: 'Get Game Achievements',
	value: 'getGameAchievements',
	action: 'Get game achievements',
	description: 'Returns a list of achievements for a player',
	routing: {
		request: {
			method: 'GET',
			url: '/ISteamUserStats/GetPlayerAchievements/v0001',
			qs: {
				l: 'english',
			},
		},
	},
};

export const fields: INodeProperties[] = [
	{
		displayName: 'App ID',
		name: 'appid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['getGameAchievements'],
			},
		},
		default: '',
		routing: {
			request: {
				qs: {
					appid: '={{ $value }}',
				},
			},
		},
	},
];
