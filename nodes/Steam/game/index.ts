import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import * as getPlayerAchievements from './getPlayerAchievements';
import * as getOwnedGames from './getOwnedGames';
import * as getRecentlyPlayedGames from './getRecentlyPlayedGames';

export const gameResource: INodePropertyOptions = {
	name: 'Game',
	value: 'game',
};

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
export const gameOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['game'],
		},
	},
	default: getPlayerAchievements.operation.name,
	options: [
		getPlayerAchievements.operation,
		getOwnedGames.operation,
		getRecentlyPlayedGames.operation,
	],
};

export const gameFields: INodeProperties[] = [...getPlayerAchievements.fields];
