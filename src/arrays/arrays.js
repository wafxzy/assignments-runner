// TODO: Check if we can rename to array instead of object
export function mapTo(object, query) {
  // TODO: Why do we need to check type of instead of existence ?
  switch (typeof query) {
    case "undefined":{
      // TODO: 
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

export function mapToProfile(array) {
  return array.map(function (elem) {
    let name = elem.name || null;
    let surname = elem.surname || null;
    let fullname = null;
    if (name || surname) {
      fullname = (name || "_") + " " + (surname || "_");
    }
    let age = elem.age || null;

    let proto = {
      get isOld() {
        return this.age >= 60;
      },
      get isAnonymous() {
        // TODO: Check Logical Not !
        return this.fullname ? false : true;
      },
    };

    let obj = Object.create(proto);
    obj.name = name;
    obj.surname = surname;
    obj.fullname = fullname;
    obj.age = age;

    return obj;
  });
}

export function filterBy(object, query) {
  // TODO: Remove unused code 
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
        // Please, check if we can rename this prop from arr to more appropriate
        if (!arr.hasOwnProperty(query.property)){ 
          return false;
        }
        // TODO: Please, check if we can remove this else here
        else{
        return query.filterCb(arr[query.property]);
        }
      });
  }
}

export function reduceTo(object, query) {
  switch (typeof query) {
    // TODO: Refactor, need to check existence instead 
    case "undefined":{
      return object.reduce((pv, cv) => (pv += cv));
    }
    case "string":
      {
        // TODO: Refactor, don't use shortcuts
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

function sortByOrder(a, b, order ) {
  let result=null;

  switch (order) {
    case "desc":{
      if (a > b) result = -1;
      if (a < b) result = 1;
      return result;
  }
    case "asc":{
      if (a < b) result =-1;
      if (a > b) result = 1;
      return result;
    }
    // TODO: Check usage
    default: 0;
  }
}

export function sort(array, sortParam) {
  switch (typeof sortParam) {
    case "undefined":
      return array.sort((a, b) => a - b);

    case "string":
      return array.sort((a, b) => a[sortParam] - b[sortParam]);

    case "object":
      return array.sort((a, b) => {
        for (let i = 0; i < sortParam.length; i++) {
          const key = sortParam[i];
          // TODO: Check this approach key.field || key
          const field = key.field ? key.field : key;
          const order = key.order ? key.order : null;
          const isDescSort = order === "desc";
    
          if (a[field] > b[field]) {
            return isDescSort ? -1 : 1;
          }
          if (a[field] < b[field]) {
            return isDescSort ? 1 : -1;
          }
        }      
        return 0;
      });
    }
}

export function complex(object, queryparam) {
  let res;
  // Refactor to reduce
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
        }
        case "sort":{
          res = res.sort((a, b) => sortByOrder(a, b, param.order));
          break;
        }
      }
  });
  return res;
}
