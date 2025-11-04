//# Method Without inbuilt method
//Algo : Sliding window(Two pointer)
//Time Com: O(n);
//Space Com: O(n);
function longestSubstring(parameter){
    /**
     * Why Set?
~A Set in JavaScript stores unique values only.
~It gives O(1) (constant-time) operations for:
~Checking if an element exists → set.has(char)
~Adding a new element → set.add(char)
~Removing an element → set.delete(char)
     */
    const seen = new Set();
    let left=0;
    let lngstStrng="";

    for(let right=0;right<parameter.length;right++){
        const char = parameter[right];
        //If duplicate found, move left pointer
        //Untill unique
        while(seen.has(char)){
            seen.delete(parameter[left])
            left++;
        }
        seen.add(char);

        const crnt = parameter.slice(left,right+1);
        if(crnt.length>lngstStrng.length){
            lngstStrng=crnt
        }
    }
    return lngstStrng
}
//Input : aabaabcdaeae
//Output : bcdae
console.log(longestSubstring("abcabcdecceae"))

//# Without Set Map
function longestSubstring_1(parameter) {
    let seen = {}; // store last seen index of each char
    let left = 0;
    let result = "";

    for (let right = 0; right < parameter.length; right++) {
        const char = parameter[right];

        if (seen[char] >= left) {
            // move left pointer right after last occurrence
            left = seen[char] + 1;
        }
        seen[char] = right;

        const current = parameter.slice(left, right + 1);
        if (current.length > result.length) {
            result = current;
        }
    }

    return result;
}

console.log(longestSubstring_1("abcabcdecceae"));

//Using Array
function longestSubstringArray(parameter) {
    const seen = []; // stores characters currently in the window
    let result = "";

    for (let char of parameter) {
        // If duplicate found, remove chars from start until unique
        while (seen.includes(char)) {
            seen.shift(); // remove first character
        }

        seen.push(char); // add new character

        // Update result if current window is longer
        if (seen.length > result.length) {
            result = seen.join("");
        }
    }

    return result;
}

console.log(longestSubstringArray("abcabcdecceae"));
