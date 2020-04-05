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

const testHeader = "DS origin;DS Number;DS Type;DS Version;DS Name;DS State;DS Part Classification";

const testPatterns = ["c3", "c3+c4", "c4+c3+c12", "c4+R", "u3+u4+R", "$foo_+c3+u4+R+c7",
                       "c3+$foo+c12+$bar", "u3+c4*+$bar"];

const patternElements = ["c", "u", "$", "R"];
const patternSeparator = "+";

console.log(testPatterns.length);

function transform(data, pat, rn) {
    var tokens = pat.split(patternSeparator);
    var token;
    var acc = "";
    var e = '';
    for token in tokens {
        e = token[0];
        switch(e) {
        case 'c':
            acc += data[parseInt(token.substring(1)) - 1].replace(/ /g,'');
        case 'u':
	    acc += data[parseInt(token.substring(1)) - 1].replace(/ /g,'_');
	case '$':
	    acc += token.substring(1);
	case 'R':
	    acc += rn;
	default:
	    console.log("Pattern in token not recognized: " + e);
	    return;
	    
	    
	    
            
        }
    }
}





