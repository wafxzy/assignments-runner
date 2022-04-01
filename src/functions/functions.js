
export const counter = (function ()
{
  const counter = {
  };
  let res = null;
  return function (queryprop, name)
   {
      if(!queryprop){
        // TODO: Move prop key into constants
        if (!counter.hasOwnProperty("default")) 
        {
          counter.default=0;
        }
         else
        {
          counter.default++;
        }
        res = counter.default;
       
      }  
      switch (typeof queryprop) {
      case "number":{
        if (name === undefined) {
          counter.default = queryprop;
          res = counter.default;
             }            
        if (typeof name === "string") {
          counter[name]= queryprop;
          res = counter[name];
        }
        break;
      }
      case "string":{
        delete counter.default;
        if (!counter.hasOwnProperty(queryprop))
       {
          counter[queryprop]= 0;
        }
         else {
          counter[queryprop]++;
        }
        res = counter[queryprop];
    }
    break;
  }
    return res;
  };
})();


export const callableMultiplier = (function ()
 {
  let counter = null;
  let res = null;
  return function (...arr) 
  {
    if (arr.length>0) {
      const valcon = counter ? counter : 1;
      counter = arr.reduce((p, c)=>p*c, valcon);
      return callableMultiplier;
    }
    res = counter;
    counter = null;
    return res;
  };
})();

export function createCalculator(calcParam) {
  return new Calculator(calcParam);
}

class Calculator {
  getnum = null;
  count = null;
  constructor(count) {
    if(typeof count === "number" && count!=0) 
    {
      this.count = count;
     } 
     else{
       this.count = 0;
     }

    this.getnum = [];
    this.logOperation("init", this.count);
  }
  get log() {
    return this.getnum;
  }
  logOperation(operation, value) {
    this.getnum.push({ operation, value });
  }

  add(value) {
    this.count += value;
    this.logOperation("add", value);
  }
  subtract(value) {
    this.count -= value;
    this.logOperation("subtract", value);
  }
  multiply(value) {
    this.count *= value;
    this.logOperation("multiply", value);
  }
  divide(value) {
    this.count /= value;
    this.logOperation("divide", value);
  }
  get value() {
    return this.count;
  }
  set value(_valueinit) {}
}