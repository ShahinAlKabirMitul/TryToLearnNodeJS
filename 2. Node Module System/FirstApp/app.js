
const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(`Total Memory ${totalMemory}`);
console.log(`Total Free Memory ${freeMemory}`);

