(function () {
    angular.module('app', ['ui.router','batman'])
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

            $stateProvider.state({
                name: 'home',
                url: '/home',
                templateUrl: 'home.htm',
                controller: 'app.homeController',
                controllerAs: 'homeCtrl'
            })
                .state({
                    name: 'doughnut',
                    url: '/doughnut',
                    templateUrl: 'app/views/doughnut-tpl.html',
                    controller: 'app.doughnutController',
                    controllerAs: 'doughnutCtrl'
                })
                .state({ name: 'listhome', url: '/list-home',
                    templateUrl: 'app/list/home.htm',
                    controller: 'app.listHomeController',
                    controllerAs: 'listHomeCtrl'
                })
                .state({ name: 'listbasic', url: '/list-basic',
                    templateUrl: 'app/list/basic.htm',
                    controller: 'app.listBasicController',
                    controllerAs: 'listBasicCtrl'
                })
                .state({ name: 'listautoresize', url: '/list-auto-resize',
                    templateUrl: 'app/list/auto-resize.htm',
                    controller: 'app.autoResizeController',
                    controllerAs: 'listAutoReziseCtrl'
                })
                .state({ name: 'listcustomtemplate', url: '/list-custom-template',
                    templateUrl: 'app/list/custom-template.htm',
                    controller: 'app.customTemplateController',
                    controllerAs: 'listCustomTemplateCtrl'
                })
                .state({ name: 'listcomplextemplate', url: '/list-complex-template',
                    templateUrl: 'app/list/complex-template.htm',
                    controller: 'app.complexTemplateController',
                    controllerAs: 'listComplexTemplateCtrl'
                })
                .state({ name: 'listcustomevent', url: '/list-custom-event',
                    templateUrl: 'app/list/custom-event.htm',
                    controller: 'app.customEventController',
                    controllerAs: 'listCustomEventCtrl'
                })
                .state({ name: 'listhugedata', url: '/list-huge-data',
                    templateUrl: 'app/list/huge-data.htm',
                    controller: 'app.hugeDataController',
                    controllerAs: 'listHugeDataCtrl'
                })


            ;
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