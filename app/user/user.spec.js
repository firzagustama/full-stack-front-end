'use strict';

describe('myApp.user module', function() {

  beforeEach(module('myApp.user'));

  describe('user controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var userLoginCtrl = $controller('UserCtrl');
      expect(userLoginCtrl).toBeDefined();
    }));

  });
});