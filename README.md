# CSV to RDF Converter

## Dependencies

csv-reader

## Grammar

### JSON configuration file

It is necessary to create a JSON file to use ```csv2rdf.js``` program.

Samples are provided in the ```sample``` folder.

### Filename

The first argument is the JSON configuration file is the filename. It can be a full path to a file.

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

### Primary key

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




