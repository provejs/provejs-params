# prove-params

Prove function parameters using a simple schema.

## Install

```bash
npm install prove-params --save
```

## Usage

```js
var Prove = require('prove-params');

function myFunction(myArray, myNumber) {
	Prove('AN', arguments);
}

myFunction([], []); // bug here
```
will result in
```bash
{ Error: Argument #2: Expected `function` but got `array`
    at myFunction (/Users/dan/repos/.../test.js:122:2)
    at Object.<anonymous> (/Users/dan/repos/.../test.js:125:1)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3 code: 'EINVALIDTYPE' }
```

Supported Types
<table>
<tr>
<th>Letter</th>
<th>Data Types</th>
<th>Required</th>
<tr>
<tr>
<td>*</td>
<td>matches any type</td>
<td>true</td>
<tr>
<tr>
<td>A</td>
<td>Array or Arguments</td>
<td>true</td>
<tr>
<tr>
<td>S</td>
<td>String</td>
<td>true</td>
<tr>
<tr>
<td>N</td>
<td>Number</td>
<td>true</td>
<tr>
<tr>
<td>F</td>
<td>Function</td>
<td>true</td>
<tr>
<tr>
<td>O</td>
<td>Object</td>
<td>true</td>
<tr>
<tr>
<td>B</td>
<td>Boolean</td>
<td>true</td>
<tr>
<tr>
<td>G</td>
<td>Arguments</td>
<td>true</td>
<tr>
<tr>
<td>E</td>
<td>Error</td>
<td>true</td>
<tr>
<tr>
<td>a</td>
<td>Array or Arguments</td>
<td>false</td>
<tr>
<tr>
<td>s</td>
<td>String</td>
<td>false</td>
<tr>
<tr>
<td>n</td>
<td>Number</td>
<td>false</td>
<tr>
<tr>
<td>f</td>
<td>Function</td>
<td>false</td>
<tr>
<tr>
<td>o</td>
<td>Object</td>
<td>falsee</td>
<tr>
<tr>
<td>b</td>
<td>Boolean</td>
<td>false</td>
<tr>
<tr>
<td>g</td>
<td>Arguments</td>
<td>false</td>
<tr>
<tr>
<td>e</td>
<td>Error</td>
<td>false</td>
<tr>
</table>

This work was inspired by: https://github.com/iarna/aproba
