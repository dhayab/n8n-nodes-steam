import { Operation } from '@helpers';

import { steamId } from '../steamId.field';

type GetFriendListApi = {
	friendslist: {
		friends: {
			steamid: string;
			relationship: string;
			friend_since: number;
		}[];
	};
};

export const getFriendList = new Operation({
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
	},
})
	.transformOutput<GetFriendListApi>((json) => json.friendslist)
	.addField(steamId);
