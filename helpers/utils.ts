// removes intermediary composed types in IntelliSense
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// Make certain keys in an object required
export type RequiredKeys<TObject, TKeys extends keyof TObject> = Expand<
	Required<Pick<TObject, TKeys>> & Omit<Partial<TObject>, TKeys>
>;
