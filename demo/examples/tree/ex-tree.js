document.addEventListener('DOMContentLoaded', function () {

    //Example 1
    //var t1 = new window.Batman.Tree(document.getElementById('t1'), { data: window.globalData.treeData, height: 30, pageSize: 5 });
    var t1 = new window.Batman.OptimalTree(document.getElementById('t1'), {
        data: window.globalData.optimizesTreeData, 
        height: 30, 
        pageSize: 5,
        icon: globalData.icons
    });

});


