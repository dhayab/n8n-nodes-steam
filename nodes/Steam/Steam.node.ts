import type { INodeType } from 'n8n-workflow';

import { Description } from '@helpers';

import { game } from './game';
import { user } from './user';

const description = new Description({
	displayName: 'Steam Web API',
	name: 'Steam',
	icon: 'file:steam.svg',
	version: 1,
	description: 'Get data from the Steam Web API',
	subtitle: '={{ $parameter.operation.replace(/([a-z])([A-Z])/g, "$1 $2").toTitleCase() }}',
	defaults: {
		name: 'Steam',
	},
	credentials: [
		{
			name: 'steamApi',
			required: true,
		},
	],
	requestDefaults: {
		baseURL: 'http://api.steampowered.com',
	},
})
	.addResource(game)
	.addResource(user);

export class Steam implements INodeType {
	description = description.apply();
}
