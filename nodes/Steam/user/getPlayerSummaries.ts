import { Operation } from '@helpers';

import { steamId } from '../steamId.field';

export const API_ENDPOINT = '/ISteamUser/GetPlayerSummaries/v0002';

type GetPlayerSummariesApi = {
	response: {
		players: {
			steamid: string;
			communityvisibilitystate: number;
			profilestate: 1;
			personaname: string;
			profileurl: string;
			avatar: string;
			avatarmedium: string;
			avatarfull: string;
			avatarhash: string;
			lastlogoff: number;
			personastate: number;
			commentpermission?: number;
			realname?: string;
			primaryclanid?: string;
			gameid?: number;
			gameserverip?: string;
			gameextrainfo?: number;
			timecreated: number;
			personastateflags: number;
			loccountrycode?: string;
			locstatecode?: string;
			loccityid?: number;
		}[];
	};
};

export const getPlayerSummaries = new Operation({
	name: 'Get User Profile',
	value: 'getPlayerSummaries',
	action: 'Get user profile',
	description: 'Returns basic profile information for a Steam user',
	routing: {
		request: {
			method: 'GET',
			url: API_ENDPOINT,
		},
	},
})
	.transformOutput<GetPlayerSummariesApi>((json) => json.response.players[0])
	.addField(steamId);
