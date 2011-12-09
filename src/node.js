(function(global , host){

    var NODE_FLAG = 'data-jjs-guid';

    var NATIVE_REG = /\[native code\]/ig;
    var getClassReg = function(className){
        return new RegExp('(^|\\s)' + className + '(?:\\s|$)');
    };
    

    var originCB = [] , transformedCB = [];
    var transformedElement = [];

    var createTransformedCB = function(func , thisObj){
        var temp = func.bind(thisObj);
        var transformedFunc = function(){
            jjs(function(){
                temp(window.event)
            });
        };
        var len = originCB.length;
        originCB[length] = func;
        transformedCB[length] = transformedFunc;
        return transformedFunc;
    };

    var getTransformedCB = function(func){
        var result;
        originCB.some(function(item , idx){
            if( item == func ){
                result = transformedCB[idx];
                return true;
            }
        });
        return result;
    };



    var ValueAdjust = function(){
        var needToInt= function(target){
            return ['top' , 'left' , 'right' , 'bottom' , 'width' , 'height'].indexOf(target) != -1;
        };

        
        
        return {
            toSysValue: function(type , value){
                if( needToInt(type) ){
                    return parseInt(value);
                }
                return value;
            },
            toBrowserValue: function(type , value){
                if( needToInt(type) ){
                    return value + 'px';
                }
                return value;
            }
        };
    }();




    var COMMON_NODE_METHOD = {
        getStyle: function(name){
            var value = this.style[name]|| (this.currentStyle ? this.currentStyle[name] : "")
                || document.defaultView.getComputedStyle(this, null)[name];
            return ValueAdjust.toSysValue(name , value);
        },
        setStyle: function(name , value){
            this.style[name] = ValueAdjust.toBrowserValue(name , value);
            if( name == 'opacity' ){
                this.style.filter = 'alpha(opacity=' + value*100 + ')';
            }
            
        },
        setStyles: function(){},
        removeClass: function(cn){
            this.className = this.className.replace(getClassReg(cn) , '$1');
        },
        addClass: function(cn){
            if( !this.hasClass(cn) ){
                this.className += ' ' + cn;
            }
        },
        hasClass: function(cn){
            return getClassReg(cn).test(this['className']);
        },
        
        
        getElementsByClassName: function(className){
            var els  , result = [];
            if( this._getElementsByClassName ){
                result = this._getElementsByClassName(className);
            }else{
                els = this.getElementsByTagName('*');
                for( var i=0 , l=els.length ; i<l; i++ ){
                    var el = els[i];
                    
                    if( COMMON_NODE_METHOD.hasClass.call(el , className) ){
                        result.push(el);
                    }
                }
            }
            var finalRes = [];
            for( var i=0,l=result.length ; i<l; i++ ){
                finalRes[i] = Node.create(result[i]);
            }
            return finalRes;
        },
        getElementsByTagName: function(tagName){
            if( this._getElementsByTagName ){
                var els = this._getElementsByTagName(tagName);
                var result = [];
                for( var i=0,l=els.length;i<l;i++){
                    result[i] = Node.create(els[i]);
                }
                return result;
            }  
        }
    };

    var CONDITION_NODE_METHOD = {
        addEventListener: function(event , callback){
            var el = this;
            if( el.attachEvent ){
                el.attachEvent('on' + event , createTransformedCB(callback , el));
            }
        },
        removeEventListener: function(event , callback){
            var el = this;
            if( el.detachEvent ){
                el.detachEvent('on'+event , getTransformedCB(callback));
            }
        }
    };

    var Node = {
        _list:{},
        create : function(el){
            if( typeof el == 'string' ) return Node.create(document.getElementById(el));
            if( el && el.nodeName && ( el.nodeType==1 || el.nodeType==9 ) ){
                transformedElement.push(el);
                return Node.transform(el);
            }
            return el;
        },
        transform: function(el){
            for( var method in COMMON_NODE_METHOD ){
                if( COMMON_NODE_METHOD.hasOwnProperty(method) ){
                    el['_' + method] = el[method];
                    el[method] = COMMON_NODE_METHOD[method];
                }
            }
            for( var method in CONDITION_NODE_METHOD ){
                if( CONDITION_NODE_METHOD.hasOwnProperty(method) ){
                    if( !el[method] ){
                        el[method] = COMMON_NODE_METHOD[method];
                    }
                }
            }
            return el;
        }
    };

    jjs.onunload(function(){
        while( transformedElement.length ){
            var el = transformedElement.pop() , i;
            for( i in COMMON_NODE_METHOD ){
                if( el[i] && el[i].toString && !NATIVE_REG.test(el[i].toString()) ){
                    try{
                        delete el[i];
                        delete el['_' + i]
                    }catch(e){
                        el[i] = undefined;
                        el['_' + i] = undefined;
                    }
                }
            }
            for( i in CONDITION_NODE_METHOD ){
                if( el[i] && el[i].toString && !NATIVE_REG.test(el[i].toString()) ){
                    el[i] = undefined;
                }
            }
        };
        
    });

    
    global['Node'] = Node;

})(jjs , window);