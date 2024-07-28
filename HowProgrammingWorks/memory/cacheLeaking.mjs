import fs from "node:fs";

const memory = [];
const FILE_NAME = "cacheLeaking.mjs";

const bytesToMb = (bytes) => Math.round(bytes / 1000, 2) / 1000;

const fileCache = new Map();

let k = 0;

const timer = setInterval(() => {
  k++;
  fs.readFile(
    FILE_NAME,
    /*'utf8',*/ (err, data) => {
      // if we don't pass 'utf8', file reads as buffer, the code creates Buffer for it, so js-unmanaged memory is leaking, othewise the code creates strings for it, so js-heap is leaking
      fileCache.set(FILE_NAME + k, data);
    }
  );
}, 5);

setInterval(() => {
  console.clear();
  const usage = process.memoryUsage();
  const row = {
    rss: bytesToMb(usage.rss),
    heapTotal: bytesToMb(usage.heapTotal),
    heapUsed: bytesToMb(usage.heapUsed),
    external: bytesToMb(usage.external),
    stack: bytesToMb(usage.rss - usage.heapTotal),
  };
  memory.push(row);
  console.table(memory);
}, 1000);

setTimeout(() => {
  clearInterval(timer);
}, 10000);

setTimeout(() => {
  process.exit(0);
}, 15000);
