export function add(a, b) {
 
//  TODO: Check strict equal instead
 if (a === Number.NEGATIVE_INFINITY || b === Number.POSITIVE_INFINITY || a == '' || typeof  b == "object" || isNaN(a) == true || a === null || b === null) 
   {
   return null;
 }
 else{
   return a+b;
 }
}

export function subtract(a, b) {

    if( typeof a=="object"  || b == '' || b == null || typeof isNaN(a)==true){
      return null;
    }
    else {
      return a-b;
    }
}
let isNull = function (element) {
    return element === null;
  };
export function complex(a, b) {
  let multi = a[0] * a[1];
  let divide = b[0] / b[1];
  // TODO: Move outside this function
  
  if (divide == Infinity || isNaN(multi) == true || b.some(isNull)) {
    return null
  } else {
    return Math.pow(multi, divide)
  }
}
