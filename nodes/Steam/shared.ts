import { IDataObject, INodeProperties, PostReceiveAction } from 'n8n-workflow';

export const appIdField: INodeProperties = {
	displayName: 'Steam ID',
	name: 'steamId',
	type: 'string',
	required: true,
	hint: 'You can get your ID on your Steam <a href="https://store.steampowered.com/account/">account page</a>.',
	displayOptions: {
		show: {
			resource: ['game', 'user'],
		},
		hide: {
			operation: ['resolveVanityURL'],
		},
	},
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

export function simplify<TApi extends Record<string, any>>(
	simplifyFn: (json: TApi) => unknown,
): PostReceiveAction[] {
	return [
		async function postReceive(this, items) {
			if (this.getNodeParameter('simplify', false)) {
				return items.map((item) => ({
					...item,
					json: simplifyFn(item.json as TApi) as IDataObject,
				}));
			}

			return items;
		},
	];
}

export const simplifyField: INodeProperties = {
	displayName: 'Simplify',
	name: 'simplify',
	description: 'Whether to return a simplified version of the response instead of the raw data',
	type: 'boolean',
	default: false,
	displayOptions: {
		show: {
			resource: ['game', 'user'],
		},
	},
};
