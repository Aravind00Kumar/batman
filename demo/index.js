document.addEventListener('DOMContentLoaded', function () {

    var context = document.querySelector('.example-two');
    var doughnut = new window.Batman.Doughnut(context,
        {
            size: 200,
            stroke: 20,
            arc: true,
            angle: window.endAngle.value,
            startAngle: window.startAngle.value,
            sectorColor: '#bD2828',
            fillCircle: false,
            angleOffset: 0
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
        doughnut.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    });


})


