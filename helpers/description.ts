import type { INodeProperties, INodePropertyOptions, INodeTypeDescription } from 'n8n-workflow';
import type { RequiredKeys } from './utils';

import { Resource } from './resource';

type AdditionalParameters = {
	resourceDisplayName: string;
};

export class Description {
	private description: INodeTypeDescription;
	private resourcesDescription: INodeProperties;
	private resources: Resource[] = [];

	constructor(
		description: RequiredKeys<
			INodeTypeDescription,
			'name' | 'displayName' | 'description' | 'defaults'
		>,
		additionalParameters: AdditionalParameters = {
			resourceDisplayName: 'Resource',
		},
	) {
		this.description = {
			version: 1,
			group: [],
			inputs: ['main'],
			outputs: ['main'],
			properties: [],
			...description,
		};

		this.resourcesDescription = {
			displayName: additionalParameters.resourceDisplayName,
			name: 'resource',
			noDataExpression: true,
			default: undefined,
			// TODO: allow customizing resource type
			// https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#resource-objects
			type: 'options',
			options: [],
		};
	}

	addResource(resource: Resource, setDefault = false) {
		this.resources.push(resource);
		if (setDefault) {
			this.resourcesDescription.default = resource.value;
		}
		return this;
	}

	apply(): INodeTypeDescription {
		const resourcesData = this.resources.reduce(
			({ resources, operations, fields }, resource) => {
				const {
					definition,
					operations: resourceOperations,
					fields: resourceFields,
				} = resource.apply();
				return {
					resources: [...resources, definition],
					operations: [...operations, resourceOperations],
					fields: [...fields, ...resourceFields],
				};
			},
			{ resources: [], operations: [], fields: [] } as {
				resources: INodePropertyOptions[];
				operations: INodeProperties[];
				fields: INodeProperties[];
			},
		);

		return {
			...this.description,
			properties: [
				{
					...this.resourcesDescription,
					default: this.resourcesDescription.default || this.resources[0]?.value,
					options: resourcesData.resources,
				},
				...resourcesData.operations,
				...resourcesData.fields,
			],
		};
	}
}
