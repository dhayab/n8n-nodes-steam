import { Operation } from '@helpers';

type ResolveVanityURLApi = {
	response: {
		success: number;
		steamid?: string;
		message?: string;
	};
};

export const resolveVanityURL = new Operation({
	name: 'Resolve Vanity URL',
	value: 'resolveVanityURL',
	action: 'Resolve vanity URL',
	description: 'Returns the Steam ID of a user based on its username',
	routing: {
		request: {
			method: 'GET',
			url: '/ISteamUser/ResolveVanityURL/v0001',
		},
	},
})
	.addSimplifiedOutput<ResolveVanityURLApi>((json) => json.response)
	.addField({
		displayName: 'Vanity URL',
		name: 'vanityURL',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'gabelogannewell',
		routing: {
			request: {
				qs: {
					vanityurl: '={{ $value }}',
				},
			},
		},
	});
