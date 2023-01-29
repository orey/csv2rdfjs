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

const linedata = "ATTB item;U010A0602E02;Paperware Design Solution;A;BONDING AIRFRAME BARE STRUCTURE;Released;"

const testPatterns = ["c3", "c3+c4", "c4+c3+c12", "c4+c1", "u3+u4", "$foo_+c3+u4+c7",
                      "c3+$foo+c12+$bar", "u3+c4*+$bar", "$blah+c7+u4+_ho"];

function test01() {
    let tab = testHeader.split(";");
    for (var i=0;i< testPatterns.length;i++) {
        try {
            console.log(C2R.pkeyParser(tab, testPatterns[i], 456));
        }
        catch (e){
            console.error(e);
        }
    }
}

test01();

