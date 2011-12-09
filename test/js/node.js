module('node');


test('node' , function(){
    jjs(function(){
        var Selector = jjs('Selector');
        equal(Selector , document.getElementById('Selector') , 'get element works right');
        equal(Selector.getElementsByClassName('item').length , 4 , 'element.getElementsByClassName works right');
        ok(Selector.getElementsByClassName('item').forEach , 'element.getElementsByClassName works right');
        equal(Selector.getElementsByTagName('p').length , 4 , 'element.getElementsByTagName works right');
        ok(Selector.getElementsByTagName('p').forEach , 'element.getElementsByTagName works right');
        
        ok(!Selector.hasClass('test') , 'element.hasClass works right');
        ok(Selector.hasClass('select') , 'element.hasClass works right');

        Selector.removeClass('select');
        ok(!Selector.hasClass('select') , 'element.removeClass works right');
        Selector.removeClass('select');
        ok(!Selector.hasClass('select') , 'element.removeClass works right');

        Selector.addClass('select');
        ok(Selector.hasClass('select') , 'element.addClass works right');
        Selector.addClass('select');
        equal(Selector.className.trim() , 'select' , 'element.addClass works right');
    });
    
});