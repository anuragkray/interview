const nestedArray = [1, 2, [3, [4, 5, [6, [7]]]]];
//METHOD_1
function customNestedArray(value) {
  const result = (curParam) => {
    return curParam.reduce((acc, cur) => {
      Array.isArray(cur) ? acc.push(...result(cur)) : acc.push(cur);
      return acc;
    }, []);
  };
  return result(value);
}
// console.log("Result", customNestedArray(nestedArray));

//METHOD_2
function customNestedArray_2(value) {
  const plainArray = [];
  //Helper Method
  (function helperNested(helperParam) {
    helperParam.forEach((element) => {
      Array.isArray(element) ? helperNested(element) : plainArray.push(element);
    });
  })(value);
  return plainArray;
}
// console.log("Result", customNestedArray_2(nestedArray));

/*----------------------------------------------------------------------------------*/

//OBJECT-COLONE:-:
function cloneObject(objParam) {
  //Checking undefined or null
  if (objParam === null || objParam === undefined) return objParam;

  //checking type of item is not Object or Array
  if (typeof objParam !== "object" || !Array.isArray(objParam)) return objParam;

  //Checking Date
  if (objParam instanceof Date) return new Date(objParam);

  //Checking regular expression
  if (objParam instanceof RegExp) return new RegExp(objParam);

  //Considering Array
  if (Array.isArray(objParam)) {
    const copyArray = [];
    for (let index = 0; index < objParam.length; index++) {
      copyArray[index] = cloneObject(objParam[index]);
    }
    return copyArray;
  }
  //considering object
  const copyObj = {};
  for (const key in objParam) {
    if (copyObj.hasOwnProperty(key)) {
      copyObj[key] = cloneObject(objParam[key]);
    }
  }
  return copyObj;
}
const object = {
  name: "a",
  company: { b: "value", c: [1, "2", { d: "data" }, null] },
};
console.log("BEFORE CLONE", object.company.c[2].d);
console.log(cloneObject(object));
object.company.c[2].d = "modified value";
console.log("AFTER_CLONE", object, object.company.c[2].d);
