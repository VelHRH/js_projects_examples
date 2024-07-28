import fs from 'node:fs'
import promisify from 'node:util'

const myPromisify = (fn) => (...args) => new Promise((resolve, reject) => {
    args.push((err, res) => {
        if (err) reject(err);
        resolve(res);
    })
    fn(...args) // ...args of func that works on promise is the same as func that works on callback except last callback, so we generated in manually before
});

const functionThatReturnsPromise = myPromisify(fs.readFile);
const functionThatReturnsPromise2 = promisify(fs.readFile);
