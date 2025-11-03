//# Method Without inbuilt method
//Algo : Sliding window(Two pointer)
//Time Com: O(n);
//Space Com: O(n);
function longestSubstring(parameter){
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
console.log(longestSubstring("aabaabcdaeae"))