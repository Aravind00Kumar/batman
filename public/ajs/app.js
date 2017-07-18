(function () {
    angular.module('app', ['ui.router'])
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

            $stateProvider.state({
                name: 'home',
                url: '/home',
                templateUrl: 'app/views/home-tpl.html',
                controller: 'app.homeController',
                controllerAs: 'homeCtrl'
            })
                .state({
                    name: 'doughnut',
                    url: '/doughnut',
                    templateUrl: 'app/views/doughnut-tpl.html',
                    controller: 'app.doughnutController',
                    controllerAs: 'doughnutCtrl'
                });
            $urlRouterProvider.otherwise('/home');
        }])
        .run(['$transitions', '$rootScope', function ($transitions, $rootScope) {
            var criteria = {
                to: function (state) {
                    return state.name != null;
                }
            }
            $transitions.onBefore(criteria, function (trans) {
                $rootScope.stateType = trans.to().name == 'home' ? 'master' : 'slave';
            });
        }]);

    angular.element(function () {
        angular.bootstrap(document, ['app']);
    });
})();