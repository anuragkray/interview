// Sliding window
function longestSubstring(parameter) {
    const seen = new Set();
    let left = 0;
    let longestString = "";

    for (let right = 0; right < parameter.length; right++) {
        const char = parameter[right];

        while (seen.has(char)) {
            seen.delete(parameter[left])
            left++
        }
        seen.add(char);

        const current = parameter.slice(left, right + 1);
        if (current.length > longestString.length) {
            longestString = current
        }
    }
    return longestString;
}
console.log(longestSubstring("abcdade"))