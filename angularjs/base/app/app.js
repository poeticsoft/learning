
'use strict';

angular.module('APP', [])

/* simulación del servicio estado */

.factory('estado', function ($q, $timeout) {

    return {

        getId: function(idEstado) {

            var deferred = $q.defer();        
            $timeout(function() {
        
                deferred.resolve(
                    idEstado + 
                    ' devuelve ' + 
                    Math.random()
                );
            }, 2000);

            return deferred.promise;
        }
    }
})

.filter('getEstado', function(estado) {

    var cache = {};

    function process(id) { 

        if(!cache[id]) {
            
            cache[id] = '...cargando...';

            estado.getId(id).then(function(data) {

                cache[id] = data;
            });
        }

        return cache[id];
    }
    
    process.$stateful = true;

    return process;
})

.directive('root', function() {

    function controller($scope) {

        $scope.onclick = function($event) {
            
            $event.stopPropagation();
            $event.preventDefault();

            console.log($event);
        }
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
