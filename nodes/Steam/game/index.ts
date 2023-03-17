import { Resource } from '@helpers';

import { getOwnedGames } from './getOwnedGames';
import { getPlayerAchievements } from './getPlayerAchievements';
import { getRecentlyPlayedGames } from './getRecentlyPlayedGames';

export const game = new Resource({
	name: 'Game',
	value: 'game',
})
	.addOperation(getOwnedGames)
	.addOperation(getPlayerAchievements)
	.addOperation(getRecentlyPlayedGames);
