(function () {
    function doughnutComponent() {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            bindToController: {
                options: '=?'
            },
            controller: function () {
                this.refresh = function () {
                    this.doughnut.updateAngle(parseInt(this.options.startAngle, 10), parseInt(this.options.endAngle, 10))
                    this.doughnut.updateOptions(this.options);
                }.bind(this)
            },
            link: function (scope, elmnt, attrs, ctrl) {
                ctrl.doughnut = new window.Batman.Doughnut(elmnt[0], ctrl.options);
                if (ctrl.options.onLoad) {
                    ctrl.options.onLoad.call(ctrl, {
                        __doughnut: ctrl.doughnut,
                        refresh: ctrl.refresh
                    });
                }
            }
        }
    }
    angular.module('app').directive('batDoughnut', doughnutComponent);
})();