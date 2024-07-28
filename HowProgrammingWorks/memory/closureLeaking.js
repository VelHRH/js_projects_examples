const recursiveClosure = (arr) => {
    return (fn) => {
        const newF = recursiveClosure(arr.map(a => fn(a)))
        return newF;
    }
}

let f = recursiveClosure(new Array(1000).fill(i => i*2))

const timer = setInterval(() => {
    f = f((a) => {
        return (x) => {
            return a(x) * 2
        }
    })
}, 5)

/* 
On first recursiveClosure call we create closure with something like 
{i=>i*2,  i=>i*2,  i=>i*2,  i=>i*2,  ...  i=>i*2}
Then every 5 seconds we call f with fn => x => fn(x)*2 as parametr wich means we turn every element to x => x*2*2, so:
{x=>x*2*2,  x=>x*2*2,  x=>x*2*2,  x=>x*2*2,  ...  x=>x*2*2}
Every 5 secs a new closure with araay of 1000 functions and additional *2 in each will be created 
*/

const memory = [];

const bytesToMb = (bytes) => Math.round(bytes / 1000, 2) / 1000;

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