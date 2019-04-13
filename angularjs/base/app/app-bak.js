
'use strict';

angular.module('APP', [])

.factory('estado', function ($q, $timeout) {

    var estados = {}

    return {

        getId: function(idEstado) {

            if(!estados[idEstado]) {

                estados[idEstado] = '...cargando...'

                var deferred = $q.defer();
                deferred.promise.then(function() {
            
                    estados[idEstado] = ' async procesado ' + 
                                        idEstado + 
                                        ' ' + 
                                        Math.round(Math.random() * 1000);
                });
            
                $timeout(function() {
            
                    deferred.resolve();
                }, 2000);
            }

            return estados[idEstado];
        }
    }
})

.filter('test', function(estado) {

    function process(id) {  

        return estado.getId(id);
    }
    
    process.$stateful = true;

    return process;
})

.directive('root', function() {

    function controller($scope) {

        $scope.value = 'Value';
    }

    return {
        restrict: 'E',
        scope: true,
        controller: controller,
        templateUrl: './template.html',
        replace: true
    };
});

angular.bootstrap(document, ['APP']);
