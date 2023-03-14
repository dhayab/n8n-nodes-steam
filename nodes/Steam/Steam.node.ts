import { INodeProperties, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { gameResource, gameOperations, gameFields } from './game';
import { appIdField, simplifyField } from './shared';
import { userOperations, userResource } from './user';

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
const resources: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	default: gameResource.value,
	options: [gameResource, userResource],
};

export class Steam implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Steam Web API',
		name: 'Steam',
		icon: 'file:steam.svg',
		group: [],
		version: 1,
		description: 'Get data from the Steam Web API',
		subtitle: '={{ $parameter.operation }}',
		defaults: {
			name: 'Steam',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'steamApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'http://api.steampowered.com',
		},
		properties: [
			resources,
			gameOperations,
			userOperations,
			appIdField,
			...gameFields,
			simplifyField,
		],
	};
}
