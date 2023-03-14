import { INodePropertyOptions } from 'n8n-workflow';
import { simplify } from '../shared';

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

export const operation: INodePropertyOptions = {
	name: 'Get User Profile',
	value: 'getPlayerSummaries',
	action: 'Get user profile',
	description: 'Returns basic profile information for a Steam user',
	routing: {
		request: {
			method: 'GET',
			url: '/ISteamUser/GetPlayerSummaries/v0002',
		},
		output: {
			postReceive: simplify<GetPlayerSummariesApi>((json) => json.response.players[0]),
		},
	},
};
