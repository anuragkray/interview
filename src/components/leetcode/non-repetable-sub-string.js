//--------------Non Repetable Sub String------------------------
function extractSubString(value) {
  const len = value.length - 1;
  const container = new Set();

  //Helper method for non repetable
  function isHelper(helpervalue) {
    const helperSet = new Set();
    for (let char of helpervalue) {
      if (helperSet.has(char)) {
        return false;
      }
      helperSet.add(char);
    }
    return true;
  }

  //Looping over the value
  for (let start = 0; start < len; start++) {
    for (let end = start + 1; end <= len; end++) {
      const piece = value.substring(start, end);
      if (isHelper(piece) && piece.length > 2) container.add(piece);
    }
  }
  const largest = Array.from(container).sort((a, b) => b.length - a.length);
  const lengthOfLarget = largest[0].length;
  const subStringHavingLargetLength = largest.filter(
    (item) => item.length === lengthOfLarget
  );
  return subStringHavingLargetLength;
}
console.log(extractSubString("anuragkumarrayfafshiva"));
