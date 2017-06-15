document.addEventListener('DOMContentLoaded', function () {

    var d1 = new window.Batman.Doughnut(document.querySelector('.d1'),
        {
            angle: window.endAngle.value,
            startAngle: window.startAngle.value,
            sectorColor: '#03a9f4',
        });
    var d2 = new window.Batman.Doughnut(document.querySelector('.d2'),
        {
            stroke: 5,
            size:40,
            angle: window.endAngle.value,
            startAngle: window.startAngle.value,
            sectorColor: '#ff5722',
        });
    var d3 = new window.Batman.Doughnut(document.querySelector('.d3'),
        {
            angle: window.endAngle.value,
            startAngle: window.startAngle.value,
            sectorColor: '#4caf50',
        });
    var d4 = new window.Batman.Doughnut(document.querySelector('.d4'),
        {
            angle: window.endAngle.value,
            startAngle: window.startAngle.value,
            sectorColor: '#e91e63',
        });

    document.getElementById('add').addEventListener('click', function () {
        window.endAngle.value++;
        document.getElementById('apply').click();
    })

    document.getElementById('remove').addEventListener('click', function () {
        window.endAngle.value--;
        document.getElementById('apply').click();
    })

    document.getElementById('apply').addEventListener('click', function () {
       var startAngle = window.startAngle.value;
        var endAngle = window.endAngle.value;
        d1.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
        d2.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
        d3.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
        d4.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    });


})


