const object={
    A: { B: { C: { D: 1, E: { F: 2 } }, G: 3 }, H: 4 }
}
/**
 * Object.entries()--> Give the first level into key value pair
 */
// Without any in-built method
function flattenObject(params,parentKey="",newObject={}){

    //looping over the params object
    for(let key in params){
        const updatedkey = parentKey ? `${parentKey}.${key}` : key;

        if(typeof params[key]==="object" && params[key]!== null){
            flattenObject(params[key],updatedkey,newObject)
        }else{
            newObject[updatedkey]=params[key]
        }
    }
    return newObject;
}
console.log(flattenObject(object)) //{ 'A.B.C.D': 1, 'A.B.C.E.F': 2, 'A.B.G': 3, 'A.H': 4 }

//Optimize the code

function flattenObject_2(params,parentKey=""){
    return Object.entries(params).reduce((acc,[key,value])=>{
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if(typeof value ==="object" && value !== "null"){
            Object.assign(acc, flattenObject(value,newKey))
        }else{
            acc[newKey]=value
        }
        return acc;
    },{})
}
console.log(flattenObject_2(object))//{ 'A.B.C.D': 1, 'A.B.C.E.F': 2, 'A.B.G': 3, 'A.H': 4 }

// METHOD : 3 More Optimize 
const object_1 = {
    A: { B: 2, C: { D: 2, E: { F: 2, G: 3 } } }
}

function flattenObject(objParams, parentkey = "") {
    return Object.entries(objParams).reduce((acc, [key, value]) => {
        const updatedKey = parentkey ? `${parentkey}.${key}` : key;

        return (typeof value === "object" && value !== null)
            ? { ...acc, ...flattenObject(value, updatedKey) }
            : { ...acc, [updatedKey]: value };
    }, {})
}
console.log(flattenObject(object_1));