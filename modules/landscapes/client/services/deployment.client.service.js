'use strict';

angular.module('landscapes')
    .factory('DeploymentService', function DeploymentService($location, $rootScope, Deployment, $http) {
      return {
        create: function(deployment, callback) {

          console.log(deployment)

          var cb = callback || angular.noop;

          return Deployment.save(deployment,
                    function(deployment) {
                      return cb(deployment);
                    },
                    function(err) {
                      return cb(err);
                    }
                ).$promise;
        },
        retrieveForLandscape: function(id, callback) {
          var cb = callback || angular.noop;

          $http.get('/api/landscapes/' + id + '/deployments')
                    .success(function(deployments) {
                      return cb(null, deployments);
                    })
                    .error(function(err) {
                      return cb(err);
                    });
        },
        update: function(id, deployment, callback) {
          var cb = callback || angular.noop;

          $http.put('/api/deployments/' + id, deployment)
                    .success(function(data) {
                      return cb(null, data);
                    })
                    .error(function(err) {
                      return cb(err);
                    });
        },
        delete: function (stackName, region, accountName) {
            return $http.delete('/api/deployments/' + stackName + '/' + region + '/' + accountName).then(function (response) {
                if (response.status === 200) {
                    return response
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        purge: function (stackName) {
            return $http.delete('/api/deployments/' + stackName).then(function (response) {
                if (response.status === 200) {
                    return response
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        describe: function (stackName, region, accountName) {
            return $http.get('/api/deployments/describe/' + stackName + '/' + region + '/' + accountName).then(function (response) {
                if (response.status === 200) {
                    return response.data.Stacks
                }
            }).catch(function (err) {
                console.log(err)
            })
        }
      };
    });

angular.module('landscapes')
    .factory('Deployment', function ($resource) {
      return $resource('/api/deployments/:id', {
        id: '@id'
      }, {
        update: { method: 'PUT' }
      });
    });
