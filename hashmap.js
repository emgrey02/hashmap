class Node {
	constructor(key, value, node) {
		this.key = key;
		this.value = value;
		this.node = node;
	}
}

export const HashMap = () => {
	const LOAD_FACTOR = 0.75;
	let capacity = 16;
	let hashmap = [];

	// create hash code given a key
	let hash = (key) => {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % capacity;
		}

		return hashCode;
	};

	// put a key, value pair into the hash table
	let set = (key, value) => {
		// get bucket index
		let index = hash(key);

		if (index < 0 || index >= capacity) {
			throw new Error('Trying to access index out of bounds');
		}

		// if no nodes in bucket, add node to bucket
		if (!hashmap[index]) {
			hashmap[index] = [new Node(key, value, null)];
		} else {
			// create new node
			let newNode = new Node(key, value, null);
			let length = hashmap[index].length;

			// see if current bucket contains the same key, if so, update its value and exit
			for (let i = 0; i < length; i++) {
				if (hashmap[index][i].key == newNode.key) {
					hashmap[index][i].value = value;
					return;
				}
			}

			// add new node to bucket, add to linked list
			hashmap[index][length - 1].node = newNode;
			hashmap[index].push(newNode);
		}

		// check if we've reached load level
		if (triggerExpand()) {
			console.log('expansion triggered');
			capacity *= 2;
			console.log(capacity);
			repopulateHashmap();
		}
	};

	// get a value from the hash table based on its key
	let get = (key) => {
		// get bucket index
		let index = hash(key);

		if (index < 0 || index >= capacity) {
			throw new Error('Trying to access index out of bounds');
		}

		// if at least one node is in this bucket
		if (hashmap[index]) {
			// if its only one and it has the same key, return it
			if (hashmap[index].length == 1) {
				return hashmap[index][0].key == key
					? hashmap[index][0].value
					: null;
			} else {
				// if theres a linked list, go through it and return one if its the same key
				for (let i = 0; i < hashmap[index].length; i++) {
					if (hashmap[index][i].key == key) {
						return hashmap[index][i].value;
					}
				}
				return null;
			}
		}
		return null;
	};

	// see whether or not this key exists in the hash table
	let has = (key) => {
		// get bucket index
		let index = hash(key);

		if (index < 0 || index >= capacity) {
			throw new Error('Trying to access index out of bounds');
		}

		// if there's something in this bucket
		if (hashmap[index]) {
			// if there's only one node in this bucket
			if (hashmap[index].length == 1) {
				// check if its key matches arg, if so return true
				if (hashmap[index][0].key == key) {
					return true;
				}
			} else {
				// if there's more than one item in this bucket aka a linked list
				for (let i = 0; i < hashmap[index].length; i++) {
					// return true if current node's key matches arg
					if (hashmap[index][i].key == key) {
						return true;
					}
				}
				return false;
			}
		}
		return false;
	};

	// remove a node from the hash table based on its key
	let remove = (key) => {
		// get index of bucket for this key
		let index = hash(key);

		if (index < 0 || index >= capacity) {
			throw new Error('Trying to access index out of bounds');
		}

		// if there's something in this bucket
		if (hashmap[index]) {
			// if there's only one node in this bucket
			if (hashmap[index].length == 1) {
				// remove node if its key matches the arg and return true
				if (hashmap[index][0].key == key) {
					hashmap[index] = null;
					return true;
				}
			} else {
				// if there's a linked list in this bucket
				for (let i = 0; i < hashmap[index].length; i++) {
					// if this node's key matches the arg, remove it
					if (hashmap[index][i].key == key) {
						hashmap[index].splice(i, 1);

						let postRemovalLength = hashmap[index].length;

						// reconnect the linked list

						// if index removed was the last one in linked list, set new last one to null
						if (i == postRemovalLength) {
							hashmap[index][i - 1].node = null;
						} else if (i > 0) {
							// if index removed wasn't the first, set previous index's node to following node
							hashmap[index][i - 1].node = hashmap[index][i];
						}
						return true;
					}
				}
			}
		}
	};

	// returns number of stored keys in the hash map
	let length = () => {
		// declare count variable
		let count = 0;

		// cycle through hash map
		for (let i = 0; i < hashmap.length; i++) {
			// if bucket isnt empy
			if (hashmap[i]) {
				// if theres a linked list
				if (hashmap[i].length > 1) {
					for (let j = 0; j < hashmap[i].length; j++) {
						if (hashmap[i][j]) {
							count++;
						}
					}
				} else {
					count++;
				}
			}
		}
		return count;
	};

	// removes all entries in the hash map
	let clear = () => {
		// cycle through hash map
		for (let i = 0; i < hashmap.length; i++) {
			// if bucket isnt empy
			if (hashmap[i]) {
				hashmap[i] = null;
			}
		}
	};

	// returns an array of all the keys in the hash map
	let keys = () => {
		let keyArray = [];
		// cycle through hash map
		for (let i = 0; i < hashmap.length; i++) {
			// if bucket isnt empy
			if (hashmap[i]) {
				// if theres a linked list
				if (hashmap[i].length > 1) {
					for (let j = 0; j < hashmap[i].length; j++) {
						keyArray.push(hashmap[i][j].key);
					}
				} else {
					keyArray.push(hashmap[i][0].key);
				}
			}
		}
		return keyArray;
	};

	// returns an array of all the values in the hash map
	let values = () => {
		let valueArray = [];
		// cycle through hash map
		for (let i = 0; i < hashmap.length; i++) {
			// if bucket isnt empy
			if (hashmap[i]) {
				// if theres a linked list
				if (hashmap[i].length > 1) {
					for (let j = 0; j < hashmap[i].length; j++) {
						valueArray.push(hashmap[i][j].value);
					}
				} else {
					valueArray.push(hashmap[i][0].value);
				}
			}
		}
		return valueArray;
	};

	// returns an array of all the key, value pairs in the hash map
	let entries = () => {
		let entryArray = [];
		// cycle through hash map
		for (let i = 0; i < hashmap.length; i++) {
			// if bucket isnt empy
			if (hashmap[i]) {
				// if theres a linked list
				if (hashmap[i].length > 1) {
					for (let j = 0; j < hashmap[i].length; j++) {
						entryArray.push([
							hashmap[i][j].key,
							hashmap[i][j].value,
						]);
					}
				} else {
					entryArray.push([hashmap[i][0].key, hashmap[i][0].value]);
				}
			}
		}
		return entryArray;
	};

	// check if we need to expand our hash map aka double number of buckets
	let triggerExpand = () => {
		let targetBuckets = capacity * 0.75;
		let len = length();
		console.log(len);
		if (len > targetBuckets) {
			console.log('limit reached!');
			return true;
		}
		return false;
	};

	// clear out all entries and rehash them with a new capacity
	// repopulate the hash map
	let repopulateHashmap = () => {
		let currentEntries = entries();
		clear();
		for (let i = 0; i < currentEntries.length; i++) {
			set(currentEntries[i][0], currentEntries[i][1]);
		}
	};

	return {
		hash,
		set,
		get,
		has,
		remove,
		length,
		clear,
		keys,
		values,
		entries,
	};
};
