import { HashMap } from './hashmap.js';

const test = HashMap();

test.length();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.length());

test.set('kite', 'booyah');
test.set('lion', 'boob');

console.log(test.length());

test.set('moon', 'silver');

test.set('dog', 'broon');
test.set('hat', 'teeth');
