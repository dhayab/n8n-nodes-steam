import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import * as getFriendList from './getFriendList';
import * as getPlayerSummaries from './getPlayerSummaries';

export const userResource: INodePropertyOptions = {
	name: 'User',
	value: 'user',
};

// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
export const userOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['user'],
		},
	},
	default: getFriendList.operation.name,
	options: [getFriendList.operation, getPlayerSummaries.operation],
};
