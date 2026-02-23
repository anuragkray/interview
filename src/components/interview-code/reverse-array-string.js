//Reverse Array String

// Without any built-in method
function reverse_1(params) {
  for (let left = 0, right = params.length; left < right; left++, right--) {
    [params[left], params[right]] = [params[right], params[left]];
  }
  return params;
}
console.log(reverse_1([1, 2, 3, 4, 5]));
