const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
 
let inputStream = Fs.createReadStream('/home/olivier/Documents/github/test.csv', 'utf8');

let i = 0;

inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        console.log('A row arrived: ', row);
        i++;
        console.log('Row number: ', i);
    })
    .on('end', function (data) {
        console.log('No more rows!');
        console.log('Total number of rows: ', i);
    });
 
