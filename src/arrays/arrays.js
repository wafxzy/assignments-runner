export function mapTo(object, query) {
  switch (typeof query) {
    case "undefined":{
      return object.map((count, index) => index);
    }
    case "string":{    
      return object.reduce((res, name) => {
        if (name[query]) res.push(name[query]);
        return res;
      }, []);
  }
}
}

export function mapToProfile() {
  // TODO:
  throw 'Not implemented';
}

export function filterBy(object, query) {
 //var res=a.filter(a=> a>=5);
 //return res;
 /*var nn=a.filter(n=>n.name && n>=5 && n.age<=10);
  return nn;*/
  switch (typeof query) {
    case "number":
      return object.filter((number) => number >= query);

    case "string":
      return object.filter((name) => name.hasOwnProperty(query));

    case "object":
      return object.filter((arr) => {
        if (!arr.hasOwnProperty(query.property)){ 
          return false;
        }
        else{
        return query.filterCb(arr[query.property]);
        }
      });
  }
}

export function reduceTo(object, query) {
  switch (typeof query) {
    case "undefined":{
      return object.reduce((pv, cv) => (pv += cv));
    }
    case "string":
      {
      return object.reduce((pv, cv) => (pv += cv[query]),0);
     }
    case "object":{
      return object.reduce(
        (pv, cv) => {
          pv[0] += cv[query[0]];
          pv[1] += cv[query[1]];
          return pv;
        },[0, 0]
      );
    }
  }
}

export function sort(object, query) {
  switch (typeof query) {
    case "undefined":{
      return object.sort((a, b) => a - b);      
    }
    case "string":{
      return object.sort((a, b) => a[query] - b[query]);
    }
  }
}

export function complex(object, queryparam) {
  let res;
  queryparam.forEach((param) => {
    switch (param.operation) {
      case "filter":{
        res = object.filter((el) => param.callback(el[param.property]));
        break;
      }
      case "map":{
        res = res.map((r) => r[param.property]);
        break;
      }
      case "reduce":{
        res = res.reduce((pv, cv) => {
          pv += cv[param.property];
          return pv;},
           0);
        break;
        }}
  });
  return res;
}
