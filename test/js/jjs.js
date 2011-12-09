module('jjs');



test('array' , function(){
    jjs(function(){


        ok( Array.isArray( [1,2,3] ) , 'Array.isArray works correct' );
        ok( !Array.isArray( new Object() ) , 'Array.isArray works correct' );


        equal( [1,2,3,4].indexOf(4) , 3 , 'Array.indexOf works correct' );
        equal( ['22', '44','ab','dd'].indexOf(44) , -1 , 'Array.indexOf works on Type Change correct' );
        equal( ['22', '44','22','dd' , '22', '33', '55'].indexOf('22' ) , 0 , 'Array.indexOf works correct' );




        equal( [1,2,3,4].lastIndexOf(4) , 3 , 'Array.lastIndexOf works correct' );
        equal( ['22', '44','ab','dd'].lastIndexOf(44) , -1 , 'Array.lastIndexOf works on Type Change correct' );
        equal( ['22', '44','22','dd' , '22', '33', '55'].lastIndexOf('22' ) , 4 , 'Array.indexOf works correct' );





        ok( ![1,2,3,4,5,6].every( function(value){
            return 5- value;
        }) ,'Array.every works right');
        ok( [1,2,3,4,5,6].every( function(value){
            return 10- value;
        }) ,'Array.every works right');
        var Method = {
            result: 5
        };
        ok( ![1,2,3,4,5,6].every( function(value){
            return this.result- value;
        } , Method) ,'Array.every works right');




        var some = jjs.type.array.p_some;
        ok( [1,2,3,4,5,6].some(function(value){
            return 5- value;
        }) ,'Array.some works right');
        ok( ![10,10,10,10,10,10].some( function(value){
            return 10- value;
        }) ,'Array.some works right');
        var Method = {
            result: 5
        };
        ok( [1,2,3,4,5,6].some( function(value){
            return this.result;
        } , Method) ,'Array.some works right');






        var arr = [1,2,3,4,5];
        var flag = false;
        arr.forEach( function(value){
            if( !(value -5) )  {
                flag = true;
            }
        });
        ok(flag , 'Array.forEach works right');


        var arr = [1,2,3,4,5];
        var flag = false;
        deepEqual(arr.map( function(value){
            return value+1;
        }) , [2,3,4,5,6] , 'Array.map works right' );

        var Method = {
            test:1
        };
        deepEqual(arr.map( function(value){
            return value+this.test;
        } , Method) , [2,3,4,5,6] , 'Array.map works right' );


        var arr = [1,2,'333',4,5 , 'abc' , 7 , 10 ];
        var flag = false;
        deepEqual(arr.filter( function(value){
            return typeof value == 'number';
        }) , [1,2,4,5,7,10] , 'Array.filter works right' );

        var Method = {
            test:function(value){
                return parseInt(value);
            }
        };
        deepEqual(arr.filter( function(value){
            return this.test(value);
        } , Method) , [1,2 , '333' ,4,5,7,10] , 'Array.filter works right' );



        var arr = [1,2,3,4 ];
        equal(arr.reduce( function(pre,current){
            return pre+current;
        } ) , 10 , 'Array.reduce works right' );
        equal(arr.reduce( function(pre,current){
            return pre+current;
        } , 10 ) , 20 , 'Array.reduce works right' );


        var arr = [1,2,3,4 ];
        equal(arr.reduceRight(function(pre,current){
            return pre+current;
        } ) , 10 , 'Array.reduceRight works right' );
        equal(arr.reduceRight(function(pre,current){
            return pre+current;
        } , 10 ) , 20 , 'Array.reduceRight works right' );
        


    });
    

});



test('function' , function(){
    jjs(function(){
        var func = function(){
            return this.name;
        };
        var Varibles = {
            name:'success'
        };
        var result = func.bind(Varibles)();
        equal(result , 'success' , 'jss.type.function.p_bind works right');
    });
});




test('jjs trasform' , function(){
    jjs(function(){
        ok( !/\[native code\]/ig.test(setTimeout) , 'jjs construct works right' );
        ok(jjs('Selector').addClass , 'jjs construct works right');
    });
    ok( /\[native code\]/ig.test(setTimeout) , 'jjs destruct works right' );
});

test('jjs setimeout' , function(){
    stop(2);
    jjs(function(){
        setTimeout(function(){
            ok([].forEach , 'jjs settimeout work right');
            start();
        } , 100);
    });
    jjs(function(){
        var idx = 0;
        var tm = setInterval(function(){
            idx++;
            equal(idx , 1 , 'jjs setInterval works right' );
            ok([].forEach , 'jjs setInterval works right');
            clearInterval(tm);
            start();
        } , 100);
    });

});


