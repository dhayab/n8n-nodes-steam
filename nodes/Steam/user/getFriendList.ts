import { INodePropertyOptions } from 'n8n-workflow';

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
	},
};
