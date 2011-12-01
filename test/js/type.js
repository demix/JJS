module('type');


test('array' , function(){
    var array = jjs.type.array;
    ok( array.isArray( [1,2,3] ) , 'jjs.type.array.isArray works correct' );
    ok( !array.isArray( new Object() ) , 'jjs.type.array.isArray works correct' );
    ok( !array.isArray( 1 ) , 'jjs.type.array.isArray works correct' );
    ok( !array.isArray( 'ss' ) , 'jjs.type.array.isArray works correct' );
    ok( !array.isArray( function(){} ) , 'jjs.type.array.isArray works correct' );
    ok( !array.isArray( null ) , 'jjs.type.array.isArray works correct' );
    ok( !array.isArray( undefined ) , 'jjs.type.array.isArray works correct' );



    var indexOf = jjs.type.array.p_indexOf;
    equal( indexOf( [1,2,3,4] , 4) , 3 , 'jjs.type.array.p_indexOf works correct' );
    equal( indexOf( ['22','44','ab','dd'] , '44') , 1 , 'jjs.type.array.p_indexOf works correct' );
    equal( indexOf( ['22', '44','ab','dd'] , 44) , -1 , 'jjs.type.array.p_indexOf works on Type Change correct' );
    equal( indexOf( ['22', '44','ab','dd'] , 1) , -1 , 'jjs.type.array.p_indexOf works correct' );
    equal( indexOf( ['22', '44','ab','dd'] , '44' , 3) , -1 , 'jjs.type.array.p_indexOf works on fromeIndex correct' );
    equal( indexOf( ['22', '44','ab','dd'] , 'dd' , 3) , 3 , 'jjs.type.array.p_indexOf works on fromeIndex correct' );
    equal( indexOf( ['22', '44','ab','dd'] , 'dd' , 4) , -1 , 'jjs.type.array.p_indexOf works on fromeIndex correct' );
    equal( indexOf( ['22', '44','ab','dd'] , 'dd' , -1) , 3 , 'jjs.type.array.p_indexOf works on fromeIndex correct' );
    equal( indexOf( ['22', '44','ab','dd'] , 'dd' , -10) , 3 , 'jjs.type.array.p_indexOf works on fromeIndex correct' );
    equal( indexOf( ['22', '44','22','dd' , '22', '33', '55'] , '22' ) , 0 , 'jjs.type.array.p_indexOf works correct' );




    var lastIndexOf = jjs.type.array.p_lastIndexOf;
    equal( lastIndexOf( [1,2,3,4] , 4) , 3 , 'jjs.type.array.p_lastIndexOf works correct' );
    equal( lastIndexOf( ['22','44','ab','dd'] , '44') , 1 , 'jjs.type.array.p_lastIndexOf works correct' );
    equal( lastIndexOf( ['22', '44','ab','dd'] , 44) , -1 , 'jjs.type.array.p_lastIndexOf works on Type Change correct' );
    equal( lastIndexOf( ['22', '44','ab','dd'] , 1) , -1 , 'jjs.type.array.p_lastIndexOf works correct' );
    equal( lastIndexOf( ['22', '44','ab','dd'] , 'ab' , 1) , -1 , 'jjs.type.array.p_lastIndexOf works on fromeIndex correct' );
    equal( lastIndexOf( ['22', '44','ab','dd'] , 'ab' , 10) , 2 , 'jjs.type.array.p_lastIndexOf works on fromeIndex correct' );
    equal( lastIndexOf( ['22', '44','ab','dd'] , 'ab' , -1) , 2 , 'jjs.type.array.p_lastIndexOf works on fromeIndex correct' );
    equal( lastIndexOf( ['22', '44','ab','dd'] , 'ab' , -3) , -1 , 'jjs.type.array.p_lastIndexOf works on fromeIndex correct' );
    equal( lastIndexOf( ['22', '44','22','dd' , '22', '33', '55'] , '22' ) , 4 , 'jjs.type.array.p_indexOf works correct' );





    var every = jjs.type.array.p_every;
    raises( function(){
        every([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    ok( !every([1,2,3,4,5,6] , function(value){
        return 5- value;
    }) ,'jjs.type.array.p_every works right');
    ok( every([1,2,3,4,5,6] , function(value){
        return 10- value;
    }) ,'jjs.type.array.p_every works right');
    var Method = {
        result: 5
    };
    ok( !every([1,2,3,4,5,6] , function(value){
        return this.result- value;
    } , Method) ,'jjs.type.array.p_every works right');




    var some = jjs.type.array.p_some;
    raises( function(){
        some([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    ok( some([1,2,3,4,5,6] , function(value){
        return 5- value;
    }) ,'jjs.type.array.p_some works right');
    ok( !some([10,10,10,10,10,10] , function(value){
        return 10- value;
    }) ,'jjs.type.array.p_some works right');
    var Method = {
        result: 5
    };
    ok( some([1,2,3,4,5,6] , function(value){
        return this.result;
    } , Method) ,'jjs.type.array.p_some works right');






    var forEach = jjs.type.array.p_forEach;
    raises( function(){
        forEach([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    var arr = [1,2,3,4,5];
    var flag = false;
    forEach(arr , function(value){
        if( !(value -5) )  {
            flag = true;
        }
    });
    ok(flag , 'jjs.type.array.p_forEach works right');


    var map = jjs.type.array.p_map;
    raises( function(){
        map([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    var arr = [1,2,3,4,5];
    var flag = false;
    deepEqual(map(arr , function(value){
        return value+1;
    }) , [2,3,4,5,6] , 'jjs.type.array.p_map works right' );

    var Method = {
        test:1
    };
    deepEqual(map(arr , function(value){
        return value+this.test;
    } , Method) , [2,3,4,5,6] , 'jjs.type.array.p_map works right' );


    var filter = jjs.type.array.p_filter;
    raises( function(){
        filter([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    var arr = [1,2,'333',4,5 , 'abc' , 7 , 10 ];
    var flag = false;
    deepEqual(filter(arr , function(value){
        return typeof value == 'number';
    }) , [1,2,4,5,7,10] , 'jjs.type.array.p_filter works right' );

    var Method = {
        test:function(value){
            return parseInt(value);
        }
    };
    deepEqual(filter(arr , function(value){
        return this.test(value);
    } , Method) , [1,2 , '333' ,4,5,7,10] , 'jjs.type.array.p_filter works right' );


    var reduce = jjs.type.array.p_reduce;
    raises( function(){
        reduce([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    var arr = [1,2,3,4 ];
    equal(reduce( arr , function(pre,current){
        return pre+current;
    } ) , 10 , 'jss.type.array.p_reduce works right' );
    equal(reduce( arr , function(pre,current){
        return pre+current;
    } , 10 ) , 20 , 'jss.type.array.p_reduce works right' );

    var reduceRight = jjs.type.array.p_reduceRight;
    raises( function(){
        reduceRight([1,2,3,4],'1111')
    }, TypeError , 'throw error right');
    var arr = [1,2,3,4 ];
    equal(reduceRight( arr , function(pre,current){
        return pre+current;
    } ) , 10 , 'jss.type.array.p_reduceRight works right' );
    equal(reduceRight( arr , function(pre,current){
        return pre+current;
    } , 10 ) , 20 , 'jss.type.array.p_reduceRight works right' );
});


