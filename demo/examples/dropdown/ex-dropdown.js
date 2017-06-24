document.addEventListener('DOMContentLoaded', function () {
    var dropdown = new window.Batman.Dropdown(document.getElementById('d1'));

    document.getElementById('show').addEventListener('click', function () {
        dropdown.show();
    });
    document.getElementById('hide').addEventListener('click', function () {
        dropdown.hide();
    });

    var element = document.getElementById('d2');
    var left = 0;
    var size = 20;

    var timer = function () {
        left = left + 1;
        size += 1;

        element.style.height = size + 'px';
        element.style.width = size + 'px';

        element.style.left = left + 'px';
        if (left > 400) left = 0;
        if (size > 40) size = 20;

    };

    //window.setInterval(timer, 1);
});


