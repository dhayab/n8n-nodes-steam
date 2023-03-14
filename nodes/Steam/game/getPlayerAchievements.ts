import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { simplify } from '../shared';

type GetPlayerAchievementsApi = {
	playerstats: {
		steamID: string;
		gameName: string;
		achievements: {
			apiname: string;
			achieved: number;
			unlocktime: number;
			name?: string;
			description?: string;
		}[];
		success: boolean;
	};
};

export const operation: INodePropertyOptions = {
	name: 'Get Game Achievements',
	value: 'getPlayerAchievements',
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
		output: {
			postReceive: simplify<GetPlayerAchievementsApi>((json) => json.playerstats),
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
				operation: ['getPlayerAchievements'],
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
