import { INodePropertyOptions } from 'n8n-workflow';
import { simplify } from '../shared';

type GetFriendListApi = {
	friendslist: {
		friends: {
			steamid: string;
			relationship: string;
			friend_since: number;
		}[];
	};
};

export const operation: INodePropertyOptions = {
	name: 'Get Friend List',
	value: 'getFriendList',
	action: 'Get friend list',
	description: 'Returns the friend list of any Steam user with a public profile',
	routing: {
		request: {
			method: 'GET',
			url: '/ISteamUser/GetFriendList/v0001',
			qs: {
				relationship: 'friend',
			},
		},
		output: {
			postReceive: simplify<GetFriendListApi>((json) => json.friendslist),
		},
	},
};
