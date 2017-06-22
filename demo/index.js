document.addEventListener('DOMContentLoaded', function () {
    mapper()
    var d1;
    d1 = new window.Batman.Doughnut(document.querySelector('.d1'),
        {
            startAngle: parseInt(window.startAngle.value, 10),
            endAngle: parseInt(window.endAngle.value, 10),
            // values: [
            //     { percentage: 10, color: '#e91e63' },
            //     { percentage: 30, color: '#009688' },
            //     { percentage: 10, color: '#ff5722' },
            //     { percentage: 20, color: '#00bcd4' },
            //     { percentage: 30, color: '#9c27b0' }
            // ],
            sectorColor: '#03a9f4',
        });


    // var d2 = new window.Batman.Doughnut(document.querySelector('.d2'),
    //     {
    //         stroke: 5,
    //         size:40,
    //         angle: window.endAngle.value,
    //         startAngle: window.startAngle.value,
    //         sectorColor: '#ff5722',
    //     });
    // var d3 = new window.Batman.Doughnut(document.querySelector('.d3'),
    //     {
    //         angle: window.endAngle.value,
    //         startAngle: window.startAngle.value,
    //         sectorColor: '#4caf50',
    //     });
    // var d4 = new window.Batman.Doughnut(document.querySelector('.d4'),
    //     {
    //         angle: window.endAngle.value,
    //         startAngle: window.startAngle.value,
    //         sectorColor: '#e91e63',
    //     });

    function mapper(reverse) {
        if (reverse) {
            window.startAngle.value = window.start.value;
            window.endAngle.value = window.end.value;
        } else {
            window.start.value = window.startAngle.value;
            window.end.value = window.endAngle.value;
        }
    }

    document.getElementById('start').addEventListener('change', function () {
        var startAngle = window.start.value;
        var endAngle = window.end.value;
        mapper(true)
        d1.updateAngle(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    })


    document.getElementById('end').addEventListener('change', function () {
        var startAngle = window.start.value;
        var endAngle = window.end.value;
        mapper(true)
        d1.updateAngle(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    })

    document.getElementById('apply').addEventListener('click', function () {
        var startAngle = window.startAngle.value;
        var endAngle = window.endAngle.value;
        mapper();
        d1.updateAngle(parseInt(startAngle, 10), parseInt(endAngle, 10));
        // d2.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
        // d3.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
        // d4.animateTo(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    });
});


