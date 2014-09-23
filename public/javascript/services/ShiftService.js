shiftableApp.factory('Shift', ['$http', function($http) {

  return {
    // call to get all shifts
    get : function() {
      return $http.get('/api/shifts');
    },

    // call to POST and create a new shift
    create : function(shiftData) {
      return $http.post('/api/shifts', shiftData);
    },

    // call to DELETE a shift
    delete : function(id) {
      return $http.delete('/api/shifts/' + id);
    }
  }
  
}]);