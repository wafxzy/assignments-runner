export function add(a, b) {
 /* if(typeof Number(a)&&typeof Number(b)){
  return a + b
  }*/
 /* if(a==Number.NEGATIVE_INFINITY && b==Number.POSITIVE_INFINITY){
    return null;
  }*/
  /*if(a==='' && b==0){
return null;
  }*/
 /*if(b===null || !b.length && typeof String(a)==='1'){
   return null;
 }*/
 /*if(isNaN(a) && typeof Number(b) && b===1){
   return null;
 }*/
 if (a == Number.NEGATIVE_INFINITY || b == Number.POSITIVE_INFINITY || a == '' || typeof  b == "object" || isNaN(a) == true || a == null || b == null) 
   {
   return null;
 }
 else{
   return a+b;
 }
}

export function subtract(a, b) {
 /* if( typeof Number(a)&&typeof Number(b) && a>b){
    return a - b;
    }*/
   /* if(a.length==1 && typeof Number(b) && b===1){
     let res=a[1]-1;
     if(isNaN(res) || res===0){
     return  null;
     }
    }*/
 /*   if(typeof Number(a) && b==='' ){      
      return null;
    }*/
   /* if(typeof Number(a) && b===null){
      return null;
    }*/
    if( typeof a=="object"  || b == '' || b == null || typeof isNaN(a)==true){
      return null;
    }
    else {
      return a-b;
    }
}

export function complex(a, b) {
  let multi = a[0] * a[1];
  let divide = b[0] / b[1];
  let isNull = function (element) {
    return element === null;
  };
  if (divide == Infinity || isNaN(multi) == true || b.some(isNull)) {
    return null
  } else {
    return Math.pow(multi, divide)
  }
}
