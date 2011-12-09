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
        for( var i=0,l=onconstruct.length ; i<l ; i++ ){
            var func = onconstruct[i];
            if( typeof func == 'function' ){
                func();
            }
        }
        
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
        for( var i=0,l=ondestruct.length ; i<l ; i++ ){
            var func = ondestruct[i];
            if( typeof func == 'function' ){
                func();
            }
        }
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

    var ondestruct = [];
    global.ondestruct = function(func){
        ondestruct.push(func);
    };

    var onconstruct = [];
    global.onconstruct = function(func){
        onconstruct.push(func);
    };

    var onwindowunload = [];
    global.onunload = function(func){
        onwindowunload.push(func);
    };


    var Global = [];
    global.addGlobal = function(items){
        for( var i in items ){
            if( items.hasOwnProperty(i) ){
                Global.push(i);
                global[i] = items[i];
            }
        }
    };

    global.onconstruct(function(){
        global.type.array.p_forEach(Global , function(item){
            window[item] = global[item];
        });
    });

    global.ondestruct(function(){
        global.type.array.p_forEach(Global , function(item){
            try{
                delete window[item];
            }catch(e){//for ie
                window[item] = null;
            }
        });
    });

    
    window.onunload  =function(){
        for( var i=0,l=ondestruct.length ; i<l ; i++ ){
            var func = ondestruct[i];
            if( typeof func == 'function' ){
                func();
            }
        }
    };


})(jjs);