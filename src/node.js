(function(global){


    var Node = function(el){
        this._el = el;
    };




    Node.prototype = {
        /**
         * dom
         **/
        getElementsByClassName:function(){},
        /**
         * event
         **/
        addEventListener: function(){},
        removeEventListener: function(){}
    };


    global['Node'] = Node;

})(jjs);