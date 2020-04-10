# CSV to RDF Converter

## Dependencies

csv-reader

## Grammar

### JSON configuration file

It is necessary to create a JSON file to use ```csv2rdf.js``` program.

Samples are provided in the ```sample``` folder.

### Filename

The first argument is the JSON configuration file is the filename. It can be a full path to a file.

The first line of the CSV is considered as having the names of the columns. Currently, the CSV file is supposed to use ";" as a separator.

### Concept

A CSV file is a list of objects of type ```T```.

Each row of the CSV file contains an instance of ```T```. Generally the object is related by the name of the csv file, but not always.

In our case, we will assume that the filename is not relevant to determine what type ```T``` the CSV file is about. To address this point, we created a keyword to be able to provide the concept name inside the configuration file. This keyword is ```conceptname```.

Sample of use: ```"conceptname" : "Ingredient",``` in the JSON configuration file.

The ```conceptname``` will be potentially used several times later on.

The triple generated will be:
```
conceptname rdfs:subClassOf rdfs:Class.
```

### Primary key pattern

Each line of the CSV file must define a unique line identifier: the primary key. Primary key is defined by a pattern in the JSON configuration file.

Primary key can be defined by 5 parameters in 2 categories:

  * Fixed data
    * The concept name => represented by the "x" character;
    * The headers of the columns involved in the primary key => represented by the "c" or "u" characters;
    * One or several fixed texts included in this primary key => starting with the "$" characters.
  * Variable data
    * The row number => represented by the "R" character;
    * The values of the columns involved in the primary key => represented by the "v" or "w" characters;
  
The primary key is a crucial element to define because it will be either the subject or the object of most triples generated from the CSV file.

Warnings:

  * The program will not check the conformity of your URI. You should manage to have URI conformed to the W3C (example: a URI cannot start by a number).
  * You must have a variable part in your pattern, or depending on the values of the columns, or depending on the row number.
  
The choice of a good primary key is an essential design choice for the usability of RDF data. Choose carefully your options to be able to benefit fully from the power of RDF.

Sample of patterms for primary key:

```
    "pkey" : "c3",  => Column 3 is the primary key
    "pkey" : "c3+c4", => The concatena
    "pkey" : "c4+c3+c12",
    "pkey" : "c4+c1",
    "pkey" : "u3+u4",
    "pkey" : "$foo_+c3+u4+c7",
    "pkey" : "c3+$foo+c12+$bar",
    "pkey" : "u3+c4*+$bar",
    "pkey" : "$blah+c7+u4+_ho"
```


Each cell of the CSV file will generate one or many triples of the form ```s o p ```. Depending on the direction indicated in the configuration file 

### Building names with patterns

The "csv2rdf" program creates triples. It must convert the data into regular triples. We propose some options to do that.

Columns are referred to by their index.

The first special keyword is ```+```. It is used to concatenate the various elements in the construction of the various triples.

The second special keyword is ```rownumber```. It indicates the row number. The first row number is 1 (and not 0). ```rownumber``` is an integer _not_ padded with zeros.

The second special keyword is ```+```. It is used to concatenate the various elements in the construction of the various triples.

Spaces are removed by default in existing names. However it is possible to change spaces by "_" by putting "&" at the end of the column number.

Text characters belonging to "A-Z" and "a-z" can be used anywhere in the pattern.

Samples:

```
    "sample-pattern-1" : "3"
    "sample-pattern-2" : "3+4"
    "sample-pattern-3" : "4+3+12"
    "sample-pattern-4" : "4+rownumber"
    "sample-pattern-5" : "3&+4&+rownumber"
    "sample-pattern-6" : "foo_+3&+4&+rownumber"
    "sample-pattern-7" : "3+foo+12+bar"
    "sample-pattern-8" : "3&+4*+bar"
```

### Primary key: The identifier for instances of "conceptname"

In each row, hides a primary key. This "pkey" is very important because it will be the subject of many triples we will generate.

The keyword to fill in the JSON configuration file is ```pkeys-pattern```.

Depending on your CSV, there are several pkeys situations.

#### PKEY is a single column ####

The 

Sample: ``` "pkey-pattern" : "4", ```

Let ```pk``` be the value of the pkey in a certain line.  The triples generated will be:

```
pk a conceptname .
```

#### PKEY is a single column with prefix ####


  * Multiple columns
    * Sample: ``` "pkey-columns" : "6,2,4,8" ```
    * Without ```pkey-alias``` defined, the column names are stuck together  with spaces trimmed.
  * Using ```rownumber``` special variable
    * Sample: ``` "pkey-columns" : "3,4,rownumber" ```
    * Without ```pkey-alias``` defined, the column names are stuck together  with spaces trimmed.
  * ``` "pkey-columns" : "conceptname,2" ```
  * ``` "pkey-columns" : "conceptname,2,8,5,rownumber,4" ```
  
  
## Variables

The JSON configuration file define some variables that can be used in patterns.

```
    "filename" : "test01.csv",
    "conceptname" : "Ingredient",
    "pkey-alias" : "Ing",
```




