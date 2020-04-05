//******************************************************
// test.js
// Author: O. Rey
// email: rey.olivier@gmail.com
// Date: April 05 2020
// Main entry point
// License: GNU GPL V3
// *****************************************************
'use strict';

const C2R    = require("./csv2rdf");
const assert = require("assert");

const testHeader = "DS origin;DS Number;DS Type;DS Version;DS Name;DS State;DS Part Classification";

const testPatterns = ["c3", "c3+c4", "c4+c3+c12", "c4+R", "u3+u4+R", "$foo_+c3+u4+R+c7",
                      "c3+$foo+c12+$bar", "u3+c4*+$bar", "$blah+c7+u4+_ho"];

function test01() {
    let tab = testHeader.split(";");
    for (var i=0;i< testPatterns.length;i++) {
        try {
            console.log(C2R.transform(tab, testPatterns[i], 456));
        }
        catch (e){
            console.error(e);
        }
    }
}

test01();

