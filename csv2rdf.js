//******************************************************
// csv2rdf.js
// Author: O. Rey
// email: rey.olivier@gmail.com
// Date: April 04 2020
// Main entry point
// License: GNU GPL V3
// *****************************************************
'use strict';

//const rdfjs = require('./rdfjs');

const patternSeparator = "+";
const pkeyPatternElements = ["x", "c", "u", "v", "w", "$", "R"];


function parseLine(line, separator) {
    return line.split(separator);
}

function createConfig(){

}






/**
 * Use the "pkeyPattern" to build the primary key from
 * the first row of the CSV file with column names
 * @param {conceptname} The concept name
 * @param {headers} An array of headers
 * @param {data} The array of strings containing column names
 * @param {data} The array of strings containing column names
 * @param {pat} The pkeyPattern
 */
function pkeyParser(conceptname, headers, linedata, pat, rn) {
    let tokens = pat.split(patternSeparator);
    let acc = "";
    let e = '';
    for (let i=0; i<tokens.length; i++) {
        e = tokens[i][0];
        if (e == "c") {
            let k = parseInt(tokens[i].substring(1));
            if (k > 7) throw ("Error: Column " + k + " does not exist.");
            acc += data[k - 1].replace(/ /g,'');
        }
        else if (e == "u"){
            let k = parseInt(tokens[i].substring(1));
            if (k > 7) throw ("Error: Column " + k + " does not exist.");
            acc += data[k - 1].replace(/ /g,'_');
        }
        else if (e == "$")
	    acc += tokens[i].substring(1);
        else if (e == "R")
	    acc += rn;
	else {
	    throw ("Error: Pattern in token not recognized: " + e);
	    return;
        }
    }
    return acc;
}



/*=======================================
 * Exports
 *=======================================*/
module.exports = {
    parseLine : parseLine,
    pkeyParser : pkeyParser,
}

