'use strict';

describe('myApp.employee module', function() {

  beforeEach(module('myApp.employee'));

  describe('employee controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var userLoginCtrl = $controller('EmployeeCtrl');
      expect(userLoginCtrl).toBeDefined();
    }));

  });
});