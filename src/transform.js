(function(global){

    var upperFirstLetter = function(letter){
        return letter.slice(0,1).toUpperCase() + letter.slice(1);
    };


    var properDic = {};
    var addProperty = function(obj , prop){
        if( !properDic[obj] ) properDic[obj] = {};
        properDic[obj][prop] = true;
    };


    global.construct = function(){
        var type = global.type;

        for( var strObj in type ){
            if( type.hasOwnProperty(strObj) ){
                var obj = window[upperFirstLetter(strObj)];
                if( !obj ){
                    obj = window[upperFirstLetter(strObj)] = {};
                }
                
                var jjsObj = type[strObj];
                for( var prop in jjsObj ){
                    if( jjsObj.hasOwnProperty(prop) ){
                        
                        if( prop.indexOf('p_') == 0 ){//prototype
                            var trueProp = prop.slice(2);
                            if( !( trueProp in obj.prototype )   ) {
                                obj.prototype[prop.slice(2)] = (function(jjsObj , prop){
                                    return function(){
                                        var args = [].slice.call(arguments);
                                        args.unshift(this);
                                        return jjsObj[prop].apply(this,args);
                                    }
                                })(jjsObj , prop);
                                addProperty(strObj , prop);
                            }
                        }else{
                            if( !( prop in obj ) ){
                                obj[prop] = (function(jjsObj , prop){
                                    return function(){
                                        return jjsObj[prop].apply(null,arguments);
                                    };
                                })(jjsObj , prop);
                                addProperty(strObj , prop);
                            }
                        }
                    }

                }
            }
        }
        

        global.__init__ = true;

    };


    global.destruct = function(){
        for( var strObj in properDic ) {
            if( properDic.hasOwnProperty(strObj)){
                var obj = window[upperFirstLetter(strObj)];
                
                var jjsObj = properDic[strObj];


                for( var prop in jjsObj ) {
                    if( jjsObj.hasOwnProperty(prop) ){
                        
                        if( prop.indexOf('p_') == 0 ){//prototype
                            var trueProp = prop.slice(2);
                            delete obj.prototype[trueProp];
                        }else{
                            delete obj[prop];
                        }
                        delete properDic[strObj][prop];
                    }
                }
            }
        }
        global.__init__ = false;

    };


})(jjs);