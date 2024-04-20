const groupBy = <T, K extends keyof T>(collection: Array<T>, property: K) => {
	let i = 0;
	let val: T[K];
	let index: number;
	const values = [];
	const result = [];
	for (; i < collection.length; i++) {
		val = collection[i][property];
		index = values.indexOf(val);
		if (index > -1) result[index].push(collection[i]);
		else {
			values.push(val);
			result.push([collection[i]]);
		}
	}
	return result;
};
export { groupBy };
