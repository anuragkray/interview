const input = [1, 1, 2, 1, 3, 4, 3, 6, 5, 2, 1, 5];
//Output [1,2,3,4,5];

function rvsWif(prmtr){
    const ary=[];
    for(let otr=0;otr<prmtr.length;otr++){
        let flag=false;
        for(let inr=0;inr<ary.length;inr++){
            if(prmtr[otr]===ary[inr]){
                flag=true;
                break;
            }
        }
        if(!flag){
            ary.push(prmtr[otr])
        }
    }
    return ary;
}
console.log(rvsWif(input));

//OUTPUT:[4,6]
function cmplteRmvDplct(prmtr) {
    const ary = [];
    for (let otr = 0; otr < prmtr.length; otr++) {
        let count = 0;
        for (let inr = 0; inr < prmtr.length; inr++) {
            if (prmtr[otr] === prmtr[inr]) {
                count++;
            }
        }
        if (count === 1) {
            ary.push(prmtr[otr])
        }
    }
    return ary;
}
console.log(cmplteRmvDplct(input));