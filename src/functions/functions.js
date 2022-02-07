export const counter=(function () 
{
  const counter={};
  let res=null;
  return function (queryprop, name)
   {
    switch (typeof queryprop) {
      case "undefined":{
        if (!counter.hasOwnProperty("default")) 
        {
          counter.default=0;
        }
         else
        {
          counter.default++;
        }
        res=counter.default;
        break;
      }
      case "number":{
        if (name===undefined) {
          counter.default=queryprop;
          res=counter.default;   
             }            
        if (typeof name==="string") {
          counter[name]=queryprop;
          res=counter[name];
        }
        break;
      }
      case "string":{
        delete counter.default;
        if (!counter.hasOwnProperty(queryprop))
       {
          counter[queryprop]=0;
        }
         else {
          counter[queryprop]++;
        }
        res=counter[queryprop];
    }
    break;
  }
    return res;
  };
})();


export const callableMultiplier=(function ()
 {
  let counter=null;
  let res=null;;
  return function (...arr) 
  {
    if (arr.length>0) {
      const valcon=counter ? counter : 1;
      counter=arr.reduce((p, c)=>p*c, valcon);
      return callableMultiplier;
    }
    res=counter;
    counter=null;
    return res;
  };
})();

export function createCalculator() {
  // TODO:
  throw 'Not implemented';
}
