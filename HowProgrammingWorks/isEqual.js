console.log(0 == '0');  // true
console.log(0 === '0'); // false

console.log(0 == false);  // true
console.log(0 === false); // false
console.log(1 == true);   // true
console.log(1 === true);  // false

console.log('' == 0);  // true
console.log('' === 0); // false

console.log(null == undefined);  // true
console.log(null === undefined); // false

console.log({} == '[object Object]');  // false
console.log({} == true);  // false
console.log({} === true); // false
console.log({} == false); // false
console.log({} === false); // false

console.log([] == '');  // true
console.log([] === ''); // false
console.log([] == 0);  // true
console.log([] === 0); // false
console.log([1] == 1); // true
console.log([1] === 1); // false

console.log(null == 0);  // false
console.log(undefined == 0); // false

console.log(false == '');  // true
console.log(false === ''); // false
console.log(true == '1');  // true
console.log(true === '1'); // false

console.log(42 == { valueOf: () => 42 }); // true
console.log(42 === { valueOf: () => 42 }); // false

console.log('42' == { toString: () => '42' }); // true
console.log('42' === { toString: () => '42' }); // false