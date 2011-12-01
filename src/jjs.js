



(function(global){


    var jjs = function(arg){
        if( typeof arg == 'function' ){
            jjs.construct();
            return arg && arg();
            jjs.destruct();
        }else if(jjs.__init__){
            if( typeof arg == 'string' ){
                return new jjs.Node(document.getElementById(arg));
            }else{
                return arg;
            }
        }
    };




    global['jjs'] = jjs;

    
})(this);

