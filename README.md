# CSV to RDF Converter

## Dependencies

csv-reader

## Grammar

### JSON configuration file

It is necessary to create a JSON file to use ```csv2rdf.js``` program.

Samples are provided in the ```sample``` folder.

### Filename

The first argument is the JSON configuration file is the filename. It can be a full path to a file.

The first line of the CSV is considered as having the names of the columns.

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




