document.addEventListener('DOMContentLoaded', function () {
    mapper()
    var  example1 = new window.Batman.Doughnut(document.querySelector('.example1'),
        {
            startAngle: parseInt(window.startAngle.value, 10),
            endAngle: parseInt(window.endAngle.value, 10),
            sectorColor: '#03a9f4'
        });
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
        example1.updateAngle(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    })


    document.getElementById('end').addEventListener('change', function () {
        var startAngle = window.start.value;
        var endAngle = window.end.value;
        mapper(true)
        example1.updateAngle(parseInt(startAngle, 10), parseInt(endAngle, 10), 500);
    })

    document.getElementById('stroke').addEventListener('change', function () {
        window.strokeValue.value = window.stroke.value;
        example1.updateOptions({stroke: window.stroke.value });
    })

    document.getElementById('apply').addEventListener('click', function () {
        var startAngle = window.startAngle.value;
        var endAngle = window.endAngle.value;
        mapper();
        example1.updateAngle(parseInt(startAngle, 10), parseInt(endAngle, 10));
    });


    var  m1 = new window.Batman.Doughnut(document.querySelector('.m1'),
        {
            values: [
                { percentage: 10, color: '#e91e63' },
                { percentage: 30, color: '#009688' },
                { percentage: 10, color: '#ff5722' },
                { percentage: 20, color: '#00bcd4' },
                { percentage: 30, color: '#9c27b0' }
            ],
            title:'Tasks',
            sectorColor: '#03a9f4',
        });

    var  m2 = new window.Batman.Doughnut(document.querySelector('.m2'),
        {
            values: [
                { percentage: 20, color: '#e91e63' },
                { percentage: 10, color: '#009688' },
                { percentage: 70, color: '#585858' }
            ],
            sectorColor: '#03a9f4',
            image:'./img/FwG8UYtj.jpg', 

        });


    var d1 = new window.Batman.Doughnut(document.getElementById('d1'),
        {
            values: [
                { percentage: 90, color: '#a52a22'}
            ],
            image:'./img/themanastics-supermanasjesus-150.jpg', 
            sectorColor: '#03a9f4',
            title:'Superman'
        });

    var d2 = new window.Batman.Doughnut(document.getElementById('d2'),
        {
            values: [
                { percentage: 70, color: '#4f727e'}
            ],
            image:'./img/Batman-7-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Batman'
        });

    var d3 = new window.Batman.Doughnut(document.getElementById('d3'),
        {
            values: [
                { percentage: 80, color: '#b8823e'}
            ],
            image:'./img/Wonder-Woman-9-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Wonder Woman'
        });

    var d4 = new window.Batman.Doughnut(document.getElementById('d4'),
        {
            values: [
                { percentage: 60, color: '#f51d18'}
            ],
            image:'./img/The-Flash-Season-2-Subtitle-Indonesia-English.jpg?resize=150%2C150', 
            sectorColor: '#03a9f4',
            title:'Flash'
        });

    var d5 = new window.Batman.Doughnut(document.getElementById('d5'),
        {
            values: [
                { percentage: 70, color: '#47af41'}
            ],
            image:'./img/Green-Lantern-Movie-Universe-John-Stewart-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Green Lantern'
        });
    
    var d6 = new window.Batman.Doughnut(document.getElementById('d6'),
        {
            values: [
                { percentage: 55, color: '#6168ab'}
            ],
            image:'./img/injustice_cyborg_02.jpeg', 
            sectorColor: '#03a9f4',
            title:'Cyborg'
        });
    
    var d7 = new window.Batman.Doughnut(document.getElementById('d7'),
        {
            values: [
                { percentage: 50, color: '#1f94a5'}
            ],
            image:'./img/2763121-justl_cv4_asdjkhf69s87dafkwlq-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Aquaman'
        });

});


