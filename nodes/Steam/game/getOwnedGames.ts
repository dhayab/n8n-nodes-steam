import { Operation } from '@helpers';

import { steamId } from '../steamId.field';

type GetOwnedGamesApi = {
	response: {
		game_count: number;
		games: {
			appid: number;
			name: string;
			playtime_2weeks?: number;
			playtime_forever: number;
			img_icon_url: string;
			has_community_visible_stats?: boolean;
			has_leaderboards?: boolean;
			playtime_windows_forever: number;
			playtime_mac_forever: number;
			playtime_linux_forever: number;
			rtime_last_played: number;
			content_descriptorids?: number[];
		}[];
	};
};

export const getOwnedGames = new Operation({
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
})
	.transformOutput<GetOwnedGamesApi>((json) => json.response)
	.addField(steamId);
