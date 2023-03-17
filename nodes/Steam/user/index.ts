import { Resource } from '@helpers';

import { getBadges } from './getBadges';
import { getFriendList } from './getFriendList';
import { getPlayerSummaries } from './getPlayerSummaries';
import { resolveVanityURL } from './resolveVanityURL';

export const user = new Resource({
	name: 'User',
	value: 'user',
})
	.addOperation(getBadges)
	.addOperation(getFriendList)
	.addOperation(getPlayerSummaries)
	.addOperation(resolveVanityURL);
