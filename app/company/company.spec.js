'use strict';

describe('myApp.company module', function() {

  beforeEach(module('myApp.company'));

  describe('company controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var userLoginCtrl = $controller('CompanyCtrl');
      expect(userLoginCtrl).toBeDefined();
    }));

  });
});