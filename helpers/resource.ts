import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { Operation } from './operation';

type AdditionalParameters = {
	/**
	 * The label used for the operations UI element
	 * @default "Operation"
	 */
	operationDisplayName: string;
};

type ResourceOutput = {
	definition: INodePropertyOptions;
	operations: INodeProperties;
	fields: INodeProperties[];
};

export class Resource {
	private operationDescription: INodeProperties;
	private operations: Operation[] = [];

	/**
	 * This helper creates a resource that can be added to a {@link Description}.
	 * @param resource A resource's option object as specified by the n8n reference
	 * @param additionalParameters
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#resource-objects
	 */
	constructor(
		private resource: INodePropertyOptions,
		additionalParameters: AdditionalParameters = { operationDisplayName: 'Operation' },
	) {
		this.resource = resource;

		this.operationDescription = {
			displayName: additionalParameters.operationDisplayName,
			name: 'operation',
			// TODO: allow customizing operation type
			// https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#operations-objects
			type: 'options',
			noDataExpression: true,
			default: undefined,
			options: [],
		};
	}

	/**
	 * Adds an Operation to this Resource.
	 * `displayOptions` is automatically applied by the Resource.
	 * @param operation The operation's option object as specified by the n8n reference
	 * @param setDefault Whether to make this Operation selected by default
	 * @chainable
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#operations-objects
	 */
	addOperation(operation: Operation, setDefault = false) {
		this.operations.push(operation);
		if (setDefault) {
			this.operationDescription.default = operation.value;
		}
		return this;
	}

	/**
	 * Returns a description of the Resource, to be used by the Description helper in order to create a compatible n8n Node description.
	 * @internal
	 */
	apply(): ResourceOutput {
		const operationsData = this.operations.reduce(
			({ operations, fields }, operation) => {
				const { definition, fields: operationFields } = operation.apply();
				return {
					operations: [...operations, definition],
					fields: [...fields, ...operationFields],
				};
			},
			{ operations: [], fields: [] } as {
				operations: INodePropertyOptions[];
				fields: INodeProperties[];
			},
		);

		if (this.operations.length === 0) {
			throw new Error(
				`The resource "${this.resource.name}" needs to contain at least one operation.`,
			);
		}

		const operations: INodeProperties = {
			...this.operationDescription,
			displayOptions: {
				show: {
					resource: [this.resource.value],
				},
			},
			default: this.operationDescription.default || this.operations[0]?.value || '',
			options: operationsData.operations,
		};

		return {
			definition: this.resource,
			operations,
			fields: operationsData.fields,
		};
	}

	/**
	 * The resource's identifier
	 */
	get value() {
		return this.resource.value;
	}
}
