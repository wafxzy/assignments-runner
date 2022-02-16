// TODO: Check if we can rename to array instead of object
export function mapTo(array, query) {
  // TODO: Why do we need to check type of instead of existence ?
   if(!query)
   {
      // TODO: 
      return array.map((count, index) => index);
    }
    if(typeof query === 'string'){    
      return array.reduce((res, name) => {
        if (name[query]) res.push(name[query]);
        return res;
      }, []);
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
        return !this.fullname;
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

  switch (typeof query) {
    case "number":
      return object.filter((number) => number >= query);

    case "string":
      return object.filter((name) => name.hasOwnProperty(query));

    case "object":
      return object.filter((array) => {
        // Please, check if we can rename this prop from arr to more appropriate
        if (!array.hasOwnProperty(query.property)){ 
          return false;
        }
        // TODO: Please, check if we can remove this else here
     
        return query.filterCb(array[query.property]);
        
      });
  }
}

export function reduceTo(object, query) {
  
    // TODO: Refactor, need to check existence instead 
   if(!query){
      return object.reduce((pv, cv) => (pv += cv));
    }
    switch (typeof query) {
    case "string":
      {
        // TODO: Refactor, don't use shortcuts
      return object.reduce(function (pv, cv) {
          return (pv += cv[query]);
        },0);
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
          const field = key.field ?? key;
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
