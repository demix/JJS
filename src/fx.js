(function(global){

    var Transition = {
        linear: function(value){
            return value;
        },
	    pow: function(p, x){
		    return Math.pow(p, x && x[0] || 6);
	    },
	    expo: function(p){
		    return Math.pow(2, 8 * (p - 1));
	    },
	    circ: function(p){
		    return 1 - Math.sin(Math.acos(p));
	    },
	    sine: function(p){
		    return 1 - Math.cos(p * Math.PI / 2);
	    },
	    back: function(p, x){
		    x = x && x[0] || 1.618;
		    return Math.pow(p, 2) * ((x + 1) * p - x);
	    },
	    bounce: function(p){
		    var value;
		    for (var a = 0, b = 1; 1; a += b, b /= 2){
			    if (p >= (7 - 4 * a) / 11){
				    value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
				    break;
			    }
		    }
		    return value;
	    },

	    elastic: function(p, x){
		    return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x && x[0] || 1) / 3);
	    }
        
    };

    Transition.get = function(func){
        func = func.split(':');
        return Transition.transform[func[1]||'easeIn'](Transition[func[0]]);
    };

    Transition.transform = {
        easeIn: function(func){
            return func;
        },
        easeOut: function(func){
            return function(pos){
                return 1- func(1-pos , arguments[1]);
            }
        },
        easeInOut: function(func){
            return function(pos){
                var params = arguments[1];
			    return (pos <= 0.5 ? func(2 * pos, params) : (2 - func(2 * (1 - pos), params))) / 2;
            }
        }
    };


    var Tween = global.Class.create(function(element, options){
        this.el = jjs(element);
        this._setOptions(options || {});
        this.frame = -1;
        this.options.frameInterval = 1000 / this.options.fps;
        this.frames = Math.round(this.options.duration / this.options.frameInterval)
        this.transition = Transition.get(this.options.transition);
    } , {
        _setOptions: function(options){
            if( !this._firstInit ){
                this.options = {};
                for( var i in Tween.defaultOptions ){
                    if( Tween.defaultOptions.hasOwnProperty(i) ){
                        this.options[ i ] = options[i] || Tween.defaultOptions[i];
                    }
                }
                
                this._firstInit = true;
            }else{
                for( var i in Tween.defaultOptions ){
                    if( Tween.defaultOptions.hasOwnProperty(i) ) {
                        this.options[ i ] = options[i] || this.options[i] || Tween.defaultOptions[i];
                    }
                }
            }
        },
        
        set: function(options){
            this._setOptions(options);
            return this;
        },
        
        start: function( property ,  begin , end){
            if( arguments.length == 2 ){
                if( this.options.property ){
                    end = begin;
                    begin = property;
                }else{
                    this.options.property = property;
                    end = begin;
                    begin = this.el.getStyle(this.options.property) || 0;//TODO
                }
            }else if( arguments.length == 1 ){
                begin = this.el.getStyle(this.options.property);
                end = property;
            }else{
                this.options.property = property;
            }
            this.el.setStyle(this.options.property ,begin);
            this.begin = begin;
            this.end = end;
            
            this.tm = setInterval((function(){
                this.step.call(this);
            }).bind(this) , this.options.frameInterval);

        },
        step: function(){
            this.frame++;
            if( this.frame < this.frames ){
			    var delta = this.transition(this.frame / this.frames);
			    this.setStyle(this.compute(this.begin, this.end, delta));
            }else{
			    this.frame = this.frames;
			    this.setStyle(this.compute(this.begin, this.end, 1));
			    this.stop();
            }
        },
        setStyle: function(value){
            this.el.setStyle(this.options.property , value);
        },
        compute: function(from, to ,delta){
            return (to-from) * delta + from;
        },
        stop: function(){
            clearInterval(this.tm);
            this.tm = null;
        }
    });

    Tween.defaultOptions = {
        duration: 500,
        transition: 'linear',
        property: null,
        delay: 0,
        fps:50
    };



    global.addGlobal({
        'Tween': Tween
    });


})(jjs);