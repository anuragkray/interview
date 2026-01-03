const item = [
  { name: "banana", type: "fruit", quantity: 4 },
  { name: "fish", type: "meat", quantity: 5 },
  { name: "potato", type: "vegetable", quantity: 1 },
  { name: "chicken", type: "meat", quantity: 6 },
  { name: "mango", type: "fruit", quantity: 10 },
  { name: "lichi", type: "fruit", quantity: 4 },
];
//Custom GroupBy FIRST_WAY
function customGroupBy(value) {
  const result = value.reduce((acc, cur) => {
    (acc[cur.type] = acc[cur.type] || []).push(cur);
    return acc;
  }, {});
  return result;
}
console.log(customGroupBy(item));

//SECOND_WAY
function GroupBy(value) {
  const result = {};
  value.forEach((element) => {
    (result[element.type] = result[element.type] || []).push(element);
  });
  return result;
}
console.log(GroupBy(item));
