



(function(global){


    var jjs = function(arg){
        if( typeof arg == 'function' ){
            jjs.construct();
            try{
                return arg && arg.call(jjs);
            }catch(e){
                window['console'] && console.log(jjs.type.object.keys(e) , e);
            }finally{
                jjs.destruct();
            }
        }else if(jjs.__init__){
            if( typeof arg == 'string' || (arg.nodeName && (arg.nodeType == 1 || arg.nodeType == 9 )) ){
                return jjs.Node.create(arg);
            }else{
                return arg;
            }
        }
    };



    jjs.guid = function(){
        var idx = 0;

        return function(){
            idx ++;
            return 'jjs_' + idx;
        }
    }();


    global['jjs'] = jjs;

    
})(this);

