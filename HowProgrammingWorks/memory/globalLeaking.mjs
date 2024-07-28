const memory = [];
let k = 0;

const bytesToMb = (bytes) => Math.round(bytes / 1000, 2) / 1000;


const timer = setInterval(() => {
 k++;
 const key = 'globalVariable' + k;
 global[key] = new Array(1000).fill(key);
}, 5); // mixine big array to global object every 5ms


setInterval(() => {
 console.clear();
 const usage = process.memoryUsage();
 const row = {
   rss: bytesToMb(usage.rss), // process resident set size
   heapTotal: bytesToMb(usage.heapTotal), // v8 heap allocated
   heapUsed: bytesToMb(usage.heapUsed), // v8 heap used
   external: bytesToMb(usage.external), // c++ allocated
   stack: bytesToMb(usage.rss - usage.heapTotal), // stack
 };
 memory.push(row);
 console.table(memory);
}, 1000);


setTimeout(() => {
 clearInterval(timer);
}, 10000); // stop mixing global object after 10s


setTimeout(() => {
 process.exit(0);
}, 15000); // exite node process after 15s