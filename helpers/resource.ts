import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { Operation } from './operation';

type AdditionalParameters = {
	operationDisplayName: string;
};

export class Resource {
	private operationDescription: INodeProperties;
	private operations: Operation[] = [];

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

	addOperation(operation: Operation, setDefault = false) {
		this.operations.push(operation);
		if (setDefault) {
			this.operationDescription.default = operation.value;
		}
		return this;
	}

	apply() {
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

	get value() {
		return this.resource.value;
	}
}
