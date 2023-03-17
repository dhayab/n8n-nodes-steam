import { Resource } from '@helpers';

import { getFriendList } from './getFriendList';
import { getPlayerSummaries } from './getPlayerSummaries';
import { resolveVanityURL } from './resolveVanityURL';

export const user = new Resource({
	name: 'User',
	value: 'user',
})
	.addOperation(getFriendList)
	.addOperation(getPlayerSummaries)
	.addOperation(resolveVanityURL);
