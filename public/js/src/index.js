(function (module) {

    module.controller('homeController', function () {
        this.header = 'Home';
    })

    module.route('/', 'home.htm', 'homeController');
    var componentRoutes = [
        { text: 'Home', url: '/', template: 'home.htm', controller: 'homeController' },
        { text: 'List', url: '/list-home', template: 'list/home.htm', controller: 'listHomeController' },
        { text: 'Basic', url: '/list-basic', template: 'list/basic.htm', controller: 'listBasicController' },
        { text: 'Auto resize', url: '/list-auto-resize', template: 'list/auto-resize.htm', controller: 'autoResizeController' },
        { text: 'Custom template', url: '/list-custom-template', template: 'list/custom-template.htm', controller: 'customTemplateController' },
        { text: 'Complex template', url: '/list-complex-template', template: 'list/complex-template.htm', controller: 'complexTemplateController' },
        { text: 'Custom event', url: '/list-custom-event', template: 'list/custom-event.htm', controller: 'customEventController' },
        { text: 'Huge data', url: '/list-huge-data', template: 'list/huge-data.htm', controller: 'hugeDataController' },
        { text: 'Tree', url: '/tree-home', template: 'tree/home.htm', controller: 'treeHomeController' },
        { text: 'Basic', url: '/tree-basic', template: 'tree/basic.htm', controller: 'treeBasicController' },
        { text: 'Table', url: '/table-home', template: 'table/home.htm', controller: 'tableHomeController' },
        { text: 'Basic', url: '/table-basic', template: 'table/basic.htm', controller: 'tableBasicController' }
    ];
    componentRoutes.forEach(function (route) {
        module.route(route.url, route.template, route.controller);
    });
    new module.components.ListMenu(document.getElementById('navbar'), { data: componentRoutes });



})(AppModule || (AppModule = {}));