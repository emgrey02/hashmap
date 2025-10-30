class Node {
	constructor(key, value, node) {
		this.key = key;
		this.value = value;
		this.node = node;
	}

	set node(newNode) {
		this._node = newNode;
	}
}

const HashMap = () => {
	const LOAD_FACTOR = 0.75;
	let capacity = 16;
	let hashmap = [];

	let hash = (key) => {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % capacity;
		}

		return hashCode;
	};

	let set = (key, value) => {
		let index = hash(key);

		if (index < 0 || index >= capacity) {
			throw new Error('Trying to access index out of bounds');
		}

		if (!hashmap[index]) {
			hashmap[index] = [new Node(key, value, null)];
		} else {
			newNode = new Node(key, value, null);
			length = hashmap[index].length;

			hashmap[index][length - 1].node = newNode;
			hashmap[index].push(newNode);
		}
	};

	let get = (key) => {
		let index = hash(key);

		if (hashmap[index]) {
			if (hashmap[index].length == 1) {
				return hashmap[index][0].key == key
					? hashmap[index][0].value
					: null;
			} else {
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

	// let has = (key) => {
	// 	let index = hash(key);

	// 	if (hashmap[index]) {
	// 		if (hashmap[index].length == 1) {
	// 			return hashmap[index][0].key == key && true;
	// 		} else {
	// 			for (let i = 0; i < hashmap[index].length; i++) {
	// 				if (hashmap[index][i].key == key) {
	// 					return hashmap[index][i].value;
	// 				}
	// 			}
	// 			return null;
	// 		}
	// 	}
	// 	return null;
	// };

	let print = () => {
		return hashmap;
	};

	return { hash, set, print, get };
};

let mappyMap = HashMap();
mappyMap.set('Fred', 'Smith');
console.log(mappyMap.get('Fred'));
console.log(mappyMap.print());
