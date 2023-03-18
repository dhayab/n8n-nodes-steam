import { Operation } from '@helpers';

import { steamId } from '../shared/steamId.field';

type GetBadgesApi = {
	response: {
		badges: {
			badgeid: number;
			level: number;
			completion_time: number;
			xp: number;
			scarcity: number;
			appid?: number;
			communityitemid?: string;
			border_color?: number;
		}[];
		player_level: number;
		player_xp: number;
		player_xp_needed_to_level_up: number;
		player_xp_needed_current_level: number;
	};
};

export const getBadges = new Operation({
	name: 'Get Badges',
	value: 'getBadges',
	action: 'Get badges',
	description: 'Returns the badges that are owned by a Steam user',
	routing: {
		request: {
			method: 'GET',
			url: '/IPlayerService/GetBadges/v0001',
		},
	},
})
	.addSimplifiedOutput<GetBadgesApi>((json) => json.response)
	.addField(steamId);
