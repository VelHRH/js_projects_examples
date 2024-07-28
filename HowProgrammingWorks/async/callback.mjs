function asyncMockFunction(divisor, divident, callback) {
    setTimeout(() => {
        if (divident === 0) {
        callback(new Error('An error occurred'));
        } else {
        const result = divisor/divident;
        callback(null, result);
        }
    }, 0); 
}

// Usage
asyncMockFunction(7, 0, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Result:', result);
    }
});


console.log('Sync output')