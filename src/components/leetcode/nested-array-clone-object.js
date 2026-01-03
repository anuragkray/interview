//OBJECT-COLONE:-:
function cloneObject(objParam) {

  if (objParam === null || objParam === undefined) return objParam;

  if (typeof objParam !== "object" || !Array.isArray(objParam)) return objParam;

  if (objParam instanceof Date) return new Date(objParam);

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
