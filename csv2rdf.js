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

const patternElements = ["c", "u", "$", "R"];
const patternSeparator = "+";


function transform(data, pat, rn) {
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
	    console.log("Pattern in token not recognized: " + e);
	    return;
        }
    }
    return acc;
}



/*=======================================
 * Exports
 *=======================================*/
module.exports = {
    transform : transform,
}

