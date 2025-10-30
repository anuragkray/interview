const object = {
    A: { B: 2, C: { D: 2, E: { F: 2, G: 3 } } }
}
console.log(Object.entries(object));

function flattenObject(objParams, parentkey = "") {
    return Object.entries(objParams).reduce((acc, [key, value]) => {
        const updatedKey = parentkey ? `${parentkey}.${key}` : key;

        return (typeof value === "object" && value !== null) 
            ? { ...acc, ...flattenObject(value, updatedKey) }
            : { ...acc, [updatedKey]: value };
    }, {})
}
console.log(flattenObject(object))