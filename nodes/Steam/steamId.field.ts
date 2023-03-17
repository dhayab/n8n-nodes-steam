import type { INodeProperties } from 'n8n-workflow';

export const steamId: INodeProperties = {
	displayName: 'Steam ID',
	name: 'steamId',
	type: 'string',
	required: true,
	hint: 'You can get your ID on your Steam <a href="https://store.steampowered.com/account/">account page</a>.',
	default: '',
	routing: {
		request: {
			qs: {
				steamids: '={{ $value }}',
				steamid: '={{ $value }}',
			},
		},
	},
};
