export const counter = (function ()
{
  const counter = {};
  let res = null;
  return function (queryprop, name)
   {
    switch (typeof queryprop) {
      // TODO: Refactor, need to check existence instead 
      case "undefined":{
        // TODO: Move prop key into constants
        if (!counter.hasOwnProperty("default")) 
        {
          counter.default = 0;
        }
         else
        {
          counter.default++;
        }
        res = counter.default;
        break;
      }
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
  // TODO: Check typo
  let res = null;;
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
    // TODO: 
    // Check this.count = count ?? 0
    if(typeof count === "number" && count!=0) 
    {
      this.count = count;
     } 
     else{
       this.count = 0;
     }

    this.getnum = [];
    this.logF("init", this.count);
  }
  get log() {
    return this.getnum;
  }
  // TODO: Rename according to functionality
  logF(operation, value) {
    this.getnum.push({ operation, value });
  }

  add(value) {
    this.count += value;
    this.logF("add", value);
  }
  subtract(value) {
    this.count -= value;
    this.logF("subtract", value);
  }
  multiply(value) {
    this.count *= value;
    this.logF("multiply", value);
  }
  divide(value) {
    this.count /= value;
    this.logF("divide", value);
  }
  get value() {
    return this.count;
  }
  set value(_valueinit) {}
}