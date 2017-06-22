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
            sectorColor: '#03a9f4',
        });

    var  m2 = new window.Batman.Doughnut(document.querySelector('.m2'),
        {
            values: [
                { percentage: 20, color: '#e91e63' },
                { percentage: 10, color: '#009688' },
                { percentage: 70, color: '#00bcd4' }
            ],
            sectorColor: '#03a9f4',
            image:'https://vignette3.wikia.nocookie.net/newdcmovieuniverse/images/3/39/FwG8UYtj.jpg/revision/latest/scale-to-width-down/250?cb=20160724112551', 

        });


    var d1 = new window.Batman.Doughnut(document.getElementById('d1'),
        {
            values: [
                { percentage: 90, color: '#e91e63'}
            ],
            image:'https://www.drawingtutorials101.com/drawing-tutorials/Cartoon-Characters/Superman/superman-full/tn_how-to-draw-superman.jpg', 
            sectorColor: '#03a9f4',
            title:'Superman'
        });

    var d2 = new window.Batman.Doughnut(document.getElementById('d2'),
        {
            values: [
                { percentage: 40, color: '#e91e63'}
            ],
            image:'http://cartoonbros.com/wp-content/uploads/2016/05/Batman-6-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Batman'
        });

    var d3 = new window.Batman.Doughnut(document.getElementById('d3'),
        {
            values: [
                { percentage: 80, color: '#e91e63'}
            ],
            image:'http://www.ramascreen.com/wp-content/uploads/2017/05/Wonder-Woman-9-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Wonder Woman'
        });

    var d4 = new window.Batman.Doughnut(document.getElementById('d4'),
        {
            values: [
                { percentage: 60, color: '#e91e63'}
            ],
            image:'https://i0.wp.com/9jarocks.com/wp-content/uploads/2017/02/The-Flash-Season-2-Subtitle-Indonesia-English.jpg?resize=150%2C150', 
            sectorColor: '#03a9f4',
            title:'Flash'
        });

    var d5 = new window.Batman.Doughnut(document.getElementById('d5'),
        {
            values: [
                { percentage: 70, color: '#e91e63'}
            ],
            image:'http://blackherodatabase.com/wp-content/uploads/2017/02/Green-Lantern-Movie-Universe-John-Stewart-150x150.jpg', 
            sectorColor: '#03a9f4',
            title:'Green Lantern'
        });

});


