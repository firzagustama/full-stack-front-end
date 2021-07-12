'use strict';

describe('myApp.car module', function() {

  beforeEach(module('myApp.car'));

  describe('car controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var userLoginCtrl = $controller('CarCtrl');
      expect(userLoginCtrl).toBeDefined();
    }));

  });
});