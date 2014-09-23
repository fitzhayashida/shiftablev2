var shiftableApp = angular.module('shiftableApp', ['ngRoute', 'ui.bootstrap', 'ui.calendar']);


shiftableApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

  // home page
  .when('/', {
    templateUrl: '/views/main.html',
    controller: 'MainController'
  })

  // shifts page that will use the ShiftController
  .when('/shifts', {
    templateUrl: '/views/shift.html',
    controller: 'ShiftController'
  })

  // users page that will use the UserControl
  .when('/users', {
    templateUrl: '/views/user.html',
    controller: 'UserController'  
  });

$locationProvider.html5Mode(true);

}]);