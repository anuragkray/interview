//Prime number logic to get the prime nummber as per user input
//If user enter 100 than output be like 541, if user enter 5 than output be like 11

//helper function for prime nummber
function isPrime(number) {
  if (number < 2) return false;
  //Continue the loop till half of number:>[we can also use Math.floor(number/2)]
  for (let index = 2; index <= Math.sqrt(number); index++) {
    if (number % index === 0) return false;
  }
  return true;
}
//For return the exact prime number
function getPrime(userInput) {
  let counter = 0;
  let primeNumCount = 1;

  while (counter < userInput) {
    primeNumCount++;
    if (isPrime(primeNumCount)) counter++;
  }
  return primeNumCount;
}
console.log(getPrime(100));
