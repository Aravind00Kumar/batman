(function () {

    function DoughnutController($scope) {
        var vm = this;
        this.example1 = {
            options: {
                startAngle: 0,
                endAngle: 100,
                sectorColor: '#03a9f4',
                stroke: 10,
                onLoad: function (api) { this.example1.api = api; }.bind(this),
            },
            refresh: function () { this.example1.api.refresh(); }.bind(this)
        }

        this.example2 = {
            options: {
                startAngle: 0,
                endAngle: 100,
                sectorColor: '#03a9f4',
                stroke: 10,
                onLoad: function (api) {
                    vm.example2.api = api;
                },
            },
            refresh: function () {
                vm.example2.api.refresh();
            }
        }

        this.m1 = {
            options: {
                values: [
                    { percentage: 20, color: '#e91e63' },
                    { percentage: 15, color: '#009688' },
                    { percentage: 10, color: '#ff5722' },
                    { percentage: 25, color: '#00bcd4' },
                    { percentage: 30, color: '#9c27b0' }
                ],
                title: 'Tasks',
                sectorColor: '#03a9f4',
            }
        }

        this.m2 = {
            options: {
                values: [
                    { percentage: 20, color: '#e91e63' },
                    { percentage: 10, color: '#009688' },
                    { percentage: 70, color: '#585858' }
                ],
                sectorColor: '#03a9f4',
                image: '../img/FwG8UYtj.jpg',
                title: 'Justice League episodes',
            }
        }

        this.m3 = [ {
                values: [
                    { percentage: 90, color: '#a52a22' }
                ],
                image: '../img/themanastics-supermanasjesus-150.jpg',
                sectorColor: '#03a9f4',
                title: 'Superman',
                size: 150

            }, {
                values: [
                    { percentage: 70, color: '#4f727e' }
                ],
                image: '../img/Batman-7-150x150.jpg',
                sectorColor: '#03a9f4',
                title: 'Batman',
                size: 150

            }, {
                values: [
                    { percentage: 80, color: '#b8823e' }
                ],
                image: '../img/Wonder-Woman-9-150x150.jpg',
                sectorColor: '#03a9f4',
                title: 'Wonder Woman',
                size: 150

            }, {
                values: [
                    { percentage: 60, color: '#f51d18' }
                ],
                image: '../img/The-Flash-Season-2-Subtitle-Indonesia-English.jpg?resize=150%2C150',
                sectorColor: '#03a9f4',
                title: 'Flash',
                size: 150

            }, {
                values: [
                    { percentage: 70, color: '#47af41' }
                ],
                image: '../img/Green-Lantern-Movie-Universe-John-Stewart-150x150.jpg',
                sectorColor: '#03a9f4',
                title: 'Green Lantern',
                size: 150

            }, {
                values: [
                    { percentage: 55, color: '#6168ab' }
                ],
                image: '../img/injustice_cyborg_02.jpeg',
                sectorColor: '#03a9f4',
                title: 'Cyborg',
                size: 150

            }, {
                values: [
                    { percentage: 50, color: '#1f94a5' }
                ],
                image: '../img/2763121-justl_cv4_asdjkhf69s87dafkwlq-150x150.jpg',
                sectorColor: '#03a9f4',
                title: 'Aquaman',
                size: 150
            } ]

    }

    angular.module('app').controller('app.doughnutController', ['$scope', DoughnutController]);

})();
