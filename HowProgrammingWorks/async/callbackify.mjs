import fs from 'fs'

const callbackify = (fn) => (...args) => {
    const callback = args.pop(); // original function doesn't need last arg
    fn(...args)
        .then((res) => callback(null,res))
        .catch((err) => callback(err))
}

const functionThatReturnsPromise = () => Promise.resolve(1+2);

const callbackAsyncFunction = callbackify(functionThatReturnsPromise)