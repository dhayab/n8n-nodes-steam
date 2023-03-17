import { Operation } from '../../../helpers';
import { steamId } from '../steamId.field';

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

export const getPlayerAchievements = new Operation({
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
	},
})
	.transformOutput<GetPlayerAchievementsApi>((json) => json.playerstats)
	.addField(steamId)
	.addField({
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				qs: {
					appid: '={{ $value }}',
				},
			},
		},
	});
