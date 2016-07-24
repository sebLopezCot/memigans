
module.exports = {
  // By key will generate a sort function for arrays that have
  // json objects that keys on a certain element in the object
  // Note: for strings only
  sortByKey: function sortByKey(key){
    return function(thisObj, thatObj) {
      if(thisObj[key] && thatObj[key]){
        var thisKey = thisObj[key].toUpperCase(); // ignore upper and lowercase
        var thatKey = thatObj[key].toUpperCase(); // ignore upper and lowercase
        if (thisKey < thatKey) {
          return -1;
        }
        if (thisKey > thatKey) {
          return 1;
        }
      }

      // names must be equal
      return 0;
    };
  }
};
