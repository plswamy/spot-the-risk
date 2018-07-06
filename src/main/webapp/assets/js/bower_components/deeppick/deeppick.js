/*
 (function(){
  if(typeof window === 'object' && typeof _ === 'undefined'){
    throw new Error('Deep Pick Underscore plug-in expects _ in global context');
  }
  
  function deepPick(object, json){
    if(_.isArray(json) && _.isArray(object)){
      return _.map(object, function(item){
        if(_.isObject(item)) {
          return deepPick(item, json[0]);
        } else {
          return item;
        }
      });
    }
    object = _.pick(object, _.keys(json));
    _.each(_.keys(json), function(key){
      if(_.isObject(json[key] && object[key])){
        object[key] = deepPick(object[key], json[key]);
      };
    });
    return object;
  }

    if (typeof module !== 'undefined') {
      module.exports = deepPick;
    } else {
     _.mixin({
      deepPick: deepPick
    }); 
    }
})();
*/
(function(){
_.mixin({
    /**
     * Return a copy of the object only containing the whitelisted properties.
     * Nested properties are concatenated with dots (e.g. "property.value").
     * 
     * Example:
     * a = {a:'a', b:{c:'c', d:'d', e:'e'}};
     * _.pickDeep(a, 'b.c','b.d')
     *
     * Returs:
     * {b:{c:'c',d:'d'}}
     *
     * @param obj
     * @returns {{}}
     */
    pickDeep: function(obj) {
        var copy = {},
            keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
 
        this.each(keys, function(key) {
            var subKeys = key.split('.');
            key = subKeys.shift();
 
            if (key in obj) {
                // pick nested properties
                if(subKeys.length>0) {
                    // extend property (if defined before)
                    if(copy[key]) {
                        _.extend(copy[key], _.pickDeep(obj[key], subKeys.join('.')));
                    }
                    else {
                        copy[key] = _.pickDeep(obj[key], subKeys.join('.'));
                    }
                }
                else {
                    copy[key] = obj[key];
                }
            }
        });
 
        return copy;
    }
});
})();