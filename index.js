'use strict';

function isAny() {
	return true;
}

function isMissing(arg) {
	return arg == null;
}

function isArguments(arg) {
	return isObject(arg) && arg.hasOwnProperty('callee');
}

function isArray(arg) {
	//console.log('isArray()', arg);
	var isArr = Array.isArray(arg);
	var isArg = isObject(arg) && arg.hasOwnProperty('callee');
	return isArr || isArg;
}

function isString(arg) {
	return typeof arg === 'string';
}

function isNumber(arg) {
	var isNum = (typeof arg === 'number');
	var isNan = isNaN(arg);
	return isNum && !isNan;
}

function isFunction(arg) {
	return typeof arg === 'function';
}

function isObject(arg) {
	var isObj = (typeof arg === 'object');
	var isArr = Array.isArray(arg);
	var isErr = arg instanceof Error;
	return isObj && !isArr && !isErr;
}

function isBoolean(arg) {
	return typeof arg === 'boolean';
}

function isError(arg) {
	return arg instanceof Error;
}

var dsls = {
	'*': ['any', isAny],

	'A': ['array', isArray, true],
	'S': ['string', isString, true],
	'N': ['number', isNumber, true],
	'F': ['function', isFunction, true],
	'O': ['object', isObject, true],
	'B': ['boolean', isBoolean, true],
	'G': ['arguments', isArguments, true],
	'E': ['error', isError, true],

	'a': ['array', isArray, false],
	's': ['string', isString, false],
	'n': ['number', isNumber, false],
	'f': ['function', isFunction, false],
	'o': ['object', isObject, false],
	'b': ['boolean', isBoolean, false],
	'g': ['arguments', isArguments, true],
	'e': ['error', isError, false]
};

var prove = function(schema, args) {

	// validate
	if (!schema) throw missing(0, 'schema');
	if (!args) throw missing(1, 'args');
	if (!isString(schema)) throw invalid(0, 'string', schema);
	if (!isArguments(args) && !isArray(args)) throw invalid(0, 'arguments or array', args);

	for (var i = 0; i < schema.length; ++i) {
		proveOne(schema[i], args[i], i);
	}

	if (schema.length < args.length) throw tooMany(schema, args);
};

function proveOne(type, arg, i) {

	var dsl = dsls[type], label, check, required;

    if (!dsl) throw unsupported(i, type);
    label = dsl[0];
    check = dsl[1];
	required = dsl[2];

	if (!required && isMissing(arg)) return;
    if (isMissing(arg)) throw missing(i, label);
    if (!check(arg)) throw invalid(i, label, arg);
}

function whatType(arg) {
	var what;
	Object.keys(dsls).forEach(function (type) {
		var dsl = dsls[type];
		var check = dsl[1];
		var label = dsl[0];
		var is = check(arg);
		if (is) what = label;
	});
	return what;
}

function unsupported(i, type) {
	return newError('EUNKNOWNTYPE', 'Unknown type `' + type + '` in argument #' + (i + 1));
}

function invalid(i, expected, arg) {
	var got = whatType(arg);
    return newError('EINVALIDTYPE', 'Argument #' + (i + 1) + ': Expected `' + expected + '` but got `' + got + '`');
}

function missing(i, expected) {
	return newError('EMISSINGARG', 'Missing required `' + expected + '` argument #' + (i + 1));
}

function tooMany(expected, got) {
	return newError('ETOOMANYARGS', 'Too many arguments, expected ' + expected.length + ' and got ' + got.length);
}

function newError(code, msg) {
	var e = new Error(msg);
	e.code = code;
	Error.captureStackTrace(e, prove);
	return e;
}

module.exports = prove;
