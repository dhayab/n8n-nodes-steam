import { Operation } from '@helpers';

import { steamId } from '../steamId.field';

type GetRecentlyPlayedGamesApi = {
	response: {
		total_count: number;
		games: {
			appid: number;
			name: string;
			playtime_2weeks: number;
			playtime_forever: number;
			img_icon_url: string;
			playtime_windows_forever: number;
			playtime_mac_forever: number;
			playtime_linux_forever: number;
		}[];
	};
};

export const getRecentlyPlayedGames = new Operation({
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
})
	.transformOutput<GetRecentlyPlayedGamesApi>((json) => json.response)
	.addField(steamId);
