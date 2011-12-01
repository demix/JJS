
(function(global){


    global.type = {};


    global.type.array = {
        isArray: function(arg){
            if( typeof arg != 'object' ) return false;
            if( arg instanceof Array ) return true;
            return false;
        },
        p_indexOf: function(arr , searchElement , fromIndex){
            var O = arr,
            len = arr.length;
            if( !len ) return -1;
            var n = fromIndex || 0;
            if( n>=len ) return -1;
            var k;
            if( n>=0 ){
                k=n;
            }else{
                k = len - Math.abs(n);
                k < 0 ? ( k=0 ):'';
            }

            while( k < len ){
                if( O.hasOwnProperty(k) ){
                    var elementK = O[k];
                    var same = ( elementK === searchElement );
                    if(same) return k;
                }
                k++;
            }
            return -1;
        },
        p_lastIndexOf: function(arr , searchElement , fromIndex){
            var O = arr;
            var len = O.length;
            if( !len ) return -1;
            var n = fromIndex || len;
            var k;
            if( n >= 0 ){
                k = Math.min(n , len-1);
            }else{
                k = len - Math.abs(n);
            }

            while( k >=0 ){
                if( O.hasOwnProperty(k) ){
                    var elementK = O[k];
                    var same = ( elementK === searchElement );
                    if( same ) return k;
                }
                k--;
            }
            return -1;
        },
        p_every: function(arr , callbackfn , thisArg){
            var O = arr;
            var len = arr.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            var T = thisArg ? thisArg : undefined;
            var k = 0;
            while( k<len ) {
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k];
                    var testResult = callbackfn.call(T , kValue , k , O);
                    if( !testResult ) return false;
                }
                k ++;
            }
            return true;
        },
        p_some: function(arr , callbackfn , thisArg){
            var O = arr;
            var len = O.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            var T = thisArg ? thisArg : undefined;
            var k=0;
            while( k < len ){
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k];
                    var testResult = callbackfn.call(T , kValue , k , O);
                    if( testResult ) return true;
                }
                k++;
            }
            return false;
        },
        p_forEach: function(arr , callbackfn , thisArg){
            var O = arr;
            var len = O.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            var T = thisArg ? thisArg : undefined;
            var k = 0;
            while( k<len ){
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k];
                    callbackfn.call(T , kValue , k , O);
                }
                k++;
            }
            return;
        },
        p_map: function(arr , callbackfn , thisArg){
            var O = arr;
            var len = O.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            var T = thisArg ? thisArg : undefined;
            var A = new Array(len);
            var k = 0;
            while( k<len ){
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k];
                    var mappedValue = callbackfn.call(T , kValue , k , O);
                    A[k] = mappedValue;
                }
                k++;
            }
            return A;
        },
        p_filter: function(arr , callbackfn , thisArg){
            var O = arr;
            var len = O.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            var T = thisArg ? thisArg: undefined;
            var A = new Array();
            var k = 0, t = 0;
            while(k<len){
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k]
                    var selected = callbackfn.call(T , kValue , k , O);
                    if( selected ){
                        A[t] = kValue;
                        t++;
                    }
                }
                k++;
            }
            return A;
        },
        p_reduce: function(arr , callbackfn , initialValue){
            var O = arr;
            var len = O.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            if( len == 0 && !initialValue ) throw new TypeError();
            var k = 0 , accumulator;
            if( initialValue ){
                accumulator = initialValue;
            }else{
                var kPresent = false;
                while( !kPresent && k < len ){
                    kPresent = O.hasOwnProperty(k);
                    if( kPresent )  {
                        accumulator = O[k];
                    }
                    k++;
                }
                if( !kPresent ) throw new TypeError();
            }

            while( k<len ){
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k];
                    accumulator = callbackfn.call(undefined , accumulator , kValue , k ,O);
                }
                k++;
            }
            return accumulator;
        },
        p_reduceRight: function(arr,callbackfn , initialValue){
            var O = arr;
            var len = O.length;
            if( typeof callbackfn != 'function' ) throw new TypeError();
            if( len == 0 && !initialValue ) throw new TypeError();
            var k = len-1, accumulator;
            if( initialValue ){
                accumulator = initialValue;
            }else{
                var kPresent = false;
                while( !kPresent && k>=0 ){
                    kPresent = O.hasOwnProperty(k);
                    kPresent && ( accumulator = O[k] );
                    k--;
                }
                if( !kPresent ) throw new TypeError();
            }
            while (k>=0){
                if( O.hasOwnProperty(k) ){
                    var kValue = O[k];
                    accumulator = callbackfn.call(undefined , accumulator , kValue  , k , O);
                }
                k--;
            }
            return accumulator;
        }
    };


    global.type.object = {
        getPrototypeOf: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return O.prototype;
        },
        getOwnPropertyDescriptor: function(O , P){
            if( typeof O != 'object' ) throw new TypeError();
            var name = P.toString();
            var desc = O[name];
            return {
                value: desc,
                enumerable: true,
                writable: true
            };
        },
        getOwnPropertyNames: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            var array = new Array();
            var n = 0;
            for( P in O ){
                var name = P.toString();
                array[n] = name;
                n++;
            }
            return array;
        },
        create: function(O , Properties){
            if( typeof O != 'object' ) throw new TypeError();
            var obj = new Object;
            var F = function(){};
            F.prototype = O;
            obj = new F();
            if( Properties )  {
                this.defineProperties(obj , Properties);
            }
            return obj;
        },
        defineProtperty: function(O,P,attr){
            if( typeof O != 'object' ) throw new TypeError();
            var name = P.toString();
            O[name] = attr.value;
            return O;
        },
        defineProperties: function(O , Properties){
            if( typeof O != 'object' ) throw new TypeError();
            var props = Properties;
            for( var i in props ){
                O[i] = props[i]['value'];
            }
            return O;
        },
        seal: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return O;
        },
        freeze: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return O;
        },
        preventExtensions: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return O;
        },
        isSealed: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return false;
        },
        isFrozen: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return fasle;
        },
        isExtensible: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            return true;
        },
        keys: function(O){
            if( typeof O != 'object' ) throw new TypeError();
            var array = new Array() , 
            index = 0;
            for( var P in O ){
                if( O.hasOwnProperty(P) ){
                    array[index] = P;
                    index++;
                }
            }

            /*
              bug fix
              */
            var hasDontEnumBug = true,
            dontEnums = [
                "toString",
                "toLocaleString",
                "valueOf",
                "hasOwnProperty",
                "isPrototypeOf",
                "propertyIsEnumerable",
                "constructor"
            ],
            dontEnumsLength = dontEnums.length; 
            for (var key in {"toString": null})
                hasDontEnumBug = false;
            if (hasDontEnumBug) {
                for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
                    var dontEnum = dontEnums[i];
                    if (P.hasOwnProperty(dontEnum)) {
                        array.push(dontEnum);
                    }
                }
            }
            
            
            

            return array;
        }
    };



    global.type['function'] = {
        p_bind: function(func,thisArg){
            var Target = func;
            if( typeof this != 'function' ) throw new TypeError();
            var A = arguments.length > 1 ? [].slice.call(arguments , 1) : null;
            var F = function(){
                if( A && A.length ) {
                    return Target.apply(thisArg , A.concat([].slice.call(arguments)));
                }else{
                    return Target.apply(thisArg , A);
                }
            };

            return F;
        }
    };


    global.type.string = {
        p_trim: function(str){
            return str.replace(/^\s+|\s+$/g,'');
        }
    };


    global.type['JSON'] = {
        parse:function(data){
            return (new Function("return (" + data + ")"))();
        },
        stringify: function () {
            /**
             * 字符串处理时需要转义的字符表
             * @private
             */
            var escapeMap = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"' : '\\"',
                "\\": '\\\\'
            };
            
            /**
             * 字符串序列化
             * @private
             */
            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                            /["\\\x00-\x1f]/g, 
                        function (match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00" 
                                + Math.floor(c / 16).toString(16) 
                                + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }
            
            /**
             * 数组序列化
             * @private
             */
            function encodeArray(source) {
                var result = ["["], 
                l = source.length,
                preComma, i, item;
                
                for (i = 0; i < l; i++) {
                    item = source[i];
                    
                    switch (typeof item) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if(preComma) {
                            result.push(',');
                        }
                        result.push(baidu.json.stringify(item));
                        preComma = 1;
                    }
                }
                result.push("]");
                return result.join("");
            }
            
            /**
             * 处理日期序列化时的补零
             * @private
             */
            function pad(source) {
                return source < 10 ? '0' + source : source;
            }
            
            /**
             * 日期序列化
             * @private
             */
            function encodeDate(source){
                return '"' + source.getFullYear() + "-" 
                    + pad(source.getMonth() + 1) + "-" 
                    + pad(source.getDate()) + "T" 
                    + pad(source.getHours()) + ":" 
                    + pad(source.getMinutes()) + ":" 
                    + pad(source.getSeconds()) + '"';
            }
            
            return function (value) {
                switch (typeof value) {
                case 'undefined':
                    return 'undefined';
                    
                case 'number':
                    return isFinite(value) ? String(value) : "null";
                    
                case 'string':
                    return encodeString(value);
                    
                case 'boolean':
                    return String(value);
                    
                default:
                    if (value === null) {
                        return 'null';
                    } else if (value instanceof Array) {
                        return encodeArray(value);
                    } else if (value instanceof Date) {
                        return encodeDate(value);
                    } else {
                        var result = ['{'],
                        encode = global.type['JSON'].stringify,
                        preComma,
                        item;
                        
                        for (var key in value) {
                            if (Object.prototype.hasOwnProperty.call(value, key)) {
                                item = value[key];
                                switch (typeof item) {
                                case 'undefined':
                                case 'unknown':
                                case 'function':
                                    break;
                                default:
                                    if (preComma) {
                                        result.push(',');
                                    }
                                    preComma = 1;
                                    result.push(encode(key) + ':' + encode(item));
                                }
                            }
                        }
                        result.push('}');
                        return result.join('');
                    }
                }
            };
        }()
    };


})(jjs);


