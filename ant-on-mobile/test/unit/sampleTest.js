'use strict';

xdescribe('onScreenSoftKeys', function() {
    var keyPressCounts = {};

    beforeEach(function(){
        keyPressCounts = {};
        document.onkeydown = function checkKey(e) {
            console.log("B");
            e = e || window.event;
            if (e.keyCode == '37') {
                keyPressCounts.left = keyPressCounts.left ? keyPressCounts.left + 1 : 1;
            }
            else if (e.keyCode == '39') {
                keyPressCounts.right = keyPressCounts.right ? keyPressCounts.right + 1 : 1;
            }
        };
    });
    it('should not have triggered onkeydown', function() {
        expect(keyPressCounts).toEqual({});
    });

    var keysToTest = {
        left: 37,
        right: 39
    };

    for(var key in keysToTest){
        describe('when ' + key + ' soft key is pressed once', function() {
            triggerKeyboardEvent(document, keysToTest[key]);
            it('shouldTrigger_onkeydown', function(){
                expect(keyPressCounts[key]).toBe(1);
            });
        });

        describe('when ' + key + ' soft key is pressed multiple times', function(){
            for(var i=1; i<=10; i++){
                triggerKeyboardEvent(document, keysToTest[key]);
                it('should have trigger onkeydown ' + i + ' times', function(){
                    expect(keyPressCounts[key]).toBe(i);
                });
            }
        });
    }
});
