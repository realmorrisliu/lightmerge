const getType = o => Object.prototype.toString.call(o);

const isString = o => getType(o) === '[object String]';
const isNumber = o => getType(o) === '[object Number]';
const isBoolean = o => getType(o) === '[object Boolean]';
const isUndefined = o => getType(o) === '[object Undefined]';
const isNull = o => getType(o) === '[object Null]';
const isObject = o => getType(o) === '[object Object]';
const isArray = o => getType(o) === '[object Array]';
const isFunction = o => getType(o) === '[object Function]';

module.exports = {
  isString,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isObject,
  isArray,
  isFunction,
  getType,
};
