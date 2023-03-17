import type { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';

type OperationOutput = {
	definition: INodePropertyOptions;
	fields: INodeProperties[];
};

export class Operation {
	private fields: INodeProperties[] = [];

	constructor(private operation: INodePropertyOptions) {}

	addField(field: INodeProperties): Operation {
		this.fields.push(field);
		return this;
	}

	transformOutput<TApi extends Record<string, any>>(
		transformFn: (json: TApi) => unknown,
	): Operation {
		if (!this.operation.routing) {
			throw new Error(
				`The operation "${this.operation.name}" needs a routing object in order to transform its output.`,
			);
		}

		if (!this.operation.routing!.output?.postReceive) {
			this.operation.routing!.output = {
				...(this.operation.routing.output || {}),
				postReceive: this.operation.routing.output?.postReceive || [],
			};
		}

		this.operation.routing!.output!.postReceive!.push(async function postReceiveFn(this, items) {
			if (!this.getNodeParameter('simplify', false)) {
				return items;
			}

			return items.map((item) => ({
				...item,
				json: transformFn(item.json as TApi) as IDataObject,
			}));
		});

		if (!this.fields.find(({ name }) => name === 'simplify')) {
			this.addField({
				displayName: 'Simplify',
				name: 'simplify',
				description:
					'Whether to return a simplified version of the response instead of the raw data',
				type: 'boolean',
				default: false,
			});
		}

		return this;
	}

	apply(): OperationOutput {
		return {
			definition: this.operation,
			fields: this.fields
				.sort((field1, field2) => {
					if (field1.name === 'simplify' && field2.name !== 'simplify') {
						return 1;
					} else if (field1.name !== 'simplify' && field2.name === 'simplify') {
						return -1;
					}

					return 0;
				})
				.map((field) => ({
					...field,
					displayOptions: {
						show: {
							operation: [this.operation.value],
						},
					},
				})),
		};
	}

	get value() {
		return this.operation.value;
	}
}
