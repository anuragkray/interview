function longestSubstring(parameter) {
    let seen = {}; // store last seen index of each char
    let left = 0;
    let result = "";

    for (let right = 0; right < parameter.length; right++) {
        const char = parameter[right];

        if (seen[char] >= left) {
            // move left pointer right after last occurrence
            left = seen[char] + 1;
            console.log("I am left", left);
        }
        console.log("SEEN", seen);
        seen[char] = right;

        const current = parameter.slice(left, right + 1);
        if (current.length > result.length) {
            result = current;
        }
    }

    return result;
}

console.log(longestSubstring("abcabcdecceae"));
