export function _merge(...objects: Object[]){
    // create a new object
    let target = {};
   
    // deep merge the object into the target object
    const merger = (object: Object) => {
        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(object[prop]) === '[object Object]') {
                    // if the property is a nested object
                    target[prop] = _merge(target[prop], object[prop]);
                } else {
                    // for regular property
                    target[prop] = object[prop];
                }
            }
        }
    };

    // iterate through all objects and 
    // deep merge them with target
    for (let i = 0; i < objects.length; i++) {
        merger(objects[i]);
    }

    return target;
};