(function(global){


    var Class = function(){

    };

    Class.create = function(parent , constructor , params){
        if( typeof parent == 'function' && !parent.prototype.__super__ ){ //no parent
            params = constructor;
            constructor = parent;
            parent = Class;
        }
        var F = constructor || function(){
            this.__super__.apply(this , arguments);
        };
        F.prototype = new parent();
        F.prototype.constructor = F;
        F.prototype.__super__ = parent;

        if( params && typeof params == 'object' ){
            for( var i in params ) {
                if( params.hasOwnProperty(i) ){
                    F.prototype[i] = params[i];
                }
            }
        }
        return F;
    };


    
    Class.prototype = {
        addEventListener: function(name , cb){
            if(!this._subscribers)this._subscribers = {};
            if( !this._subscribers[name] ){
                this._subscribers[name] = [cb];
            }else{
                this._subscribers[name].push(cb);
            }
        },
        removeEventListener: function(name , cb){
            var subscribers = this._subscribers;
            var subs = subscribers[name];
            if(!subs) return;

            global.type.array.p_forEach( subs , function(sub , i){
                if(sub == cb){
                    subs[i] = null;
                }
            } );
            
        },
        dispathEvent: function(name){
            var subscribers = this._subscribers;
            var args = Array.prototype.slice.call(arguments);
            var name = args.shift();

            if( !subscribers[name] ) return;

            global.type.array.p_forEach(subscribers[name], function(sub) {
                if (sub) {
                    sub.apply(this, args);
                }
            });
            
        },
        dispose: function(name){
            delete this._subscribers[name];
        },
        extend: function(protos){
            for( i in protos ){
                if( protos.hasOwnProperty(i) ){
                    this.prototype[i] = protos[i];
                }
            }
        }
    };

    global.addGlobal({
        'Class':Class
    });
    

})(jjs);