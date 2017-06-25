document.addEventListener('DOMContentLoaded', function () {
    //    var data = [{ "text": "0" }, { "text": "1" }, { "text": "2" }, { "text": "3" }, { "text": "4" }, { "text": "5" }, { "text": "6" }, { "text": "7" }, { "text": "8" }, { "text": "9" }, { "text": "10" }, { "text": "11" }, { "text": "12" }, { "text": "13" }, { "text": "14" }, { "text": "15" }, { "text": "16" }, { "text": "17" }, { "text": "18" }, { "text": "19" }, { "text": "20" }, { "text": "21" }, { "text": "22" }, { "text": "23" }, { "text": "24" }, { "text": "25" }, { "text": "26" }, { "text": "27" }, { "text": "28" }, { "text": "29" }, { "text": "30" }, { "text": "31" }, { "text": "32" }, { "text": "33" }, { "text": "34" }, { "text": "35" }, { "text": "36" }, { "text": "37" }, { "text": "38" }, { "text": "39" }, { "text": "40" }, { "text": "41" }, { "text": "42" }, { "text": "43" }, { "text": "44" }, { "text": "45" }, { "text": "46" }, { "text": "47" }, { "text": "48" }, { "text": "49" }, { "text": "50" }, { "text": "51" }, { "text": "52" }, { "text": "53" }, { "text": "54" }, { "text": "55" }, { "text": "56" }, { "text": "57" }, { "text": "58" }, { "text": "59" }, { "text": "60" }, { "text": "61" }, { "text": "62" }, { "text": "63" }, { "text": "64" }, { "text": "65" }, { "text": "66" }, { "text": "67" }, { "text": "68" }, { "text": "69" }, { "text": "70" }, { "text": "71" }, { "text": "72" }, { "text": "73" }, { "text": "74" }, { "text": "75" }, { "text": "76" }, { "text": "77" }, { "text": "78" }, { "text": "79" }, { "text": "80" }, { "text": "81" }, { "text": "82" }, { "text": "83" }, { "text": "84" }, { "text": "85" }, { "text": "86" }, { "text": "87" }, { "text": "88" }, { "text": "89" }, { "text": "90" }, { "text": "91" }, { "text": "92" }, { "text": "93" }, { "text": "94" }, { "text": "95" }, { "text": "96" }, { "text": "97" }, { "text": "98" }, { "text": "99" }, { "text": "100" }, { "text": "101" }, { "text": "102" }, { "text": "103" }, { "text": "104" }, { "text": "105" }, { "text": "106" }, { "text": "107" }, { "text": "108" }, { "text": "109" }, { "text": "110" }, { "text": "111" }, { "text": "112" }, { "text": "113" }, { "text": "114" }, { "text": "115" }, { "text": "116" }, { "text": "117" }, { "text": "118" }, { "text": "119" }, { "text": "120" }, { "text": "121" }, { "text": "122" }, { "text": "123" }, { "text": "124" }, { "text": "125" }, { "text": "126" }, { "text": "127" }, { "text": "128" }, { "text": "129" }, { "text": "130" }, { "text": "131" }, { "text": "132" }, { "text": "133" }, { "text": "134" }, { "text": "135" }, { "text": "136" }, { "text": "137" }, { "text": "138" }, { "text": "139" }, { "text": "140" }, { "text": "141" }, { "text": "142" }, { "text": "143" }, { "text": "144" }, { "text": "145" }, { "text": "146" }, { "text": "147" }, { "text": "148" }, { "text": "149" }, { "text": "150" }, { "text": "151" }, { "text": "152" }, { "text": "153" }, { "text": "154" }, { "text": "155" }, { "text": "156" }, { "text": "157" }, { "text": "158" }, { "text": "159" }, { "text": "160" }, { "text": "161" }, { "text": "162" }, { "text": "163" }, { "text": "164" }, { "text": "165" }, { "text": "166" }, { "text": "167" }, { "text": "168" }, { "text": "169" }, { "text": "170" }, { "text": "171" }, { "text": "172" }, { "text": "173" }, { "text": "174" }, { "text": "175" }, { "text": "176" }, { "text": "177" }, { "text": "178" }, { "text": "179" }, { "text": "180" }, { "text": "181" }, { "text": "182" }, { "text": "183" }, { "text": "184" }, { "text": "185" }, { "text": "186" }, { "text": "187" }, { "text": "188" }, { "text": "189" }, { "text": "190" }, { "text": "191" }, { "text": "192" }, { "text": "193" }, { "text": "194" }, { "text": "195" }, { "text": "196" }, { "text": "197" }, { "text": "198" }, { "text": "199" }];

    //Example 1
    //var l1 = new window.Batman.List(document.getElementById('l1'), { data: data, height: 30, pageSize:10 });

    //Example 2
    // var l1 = new window.Batman.List(document.getElementById('l1'), { data: data, height: 30 });
    // window.addEventListener('resize',function(){
    //     l1.refresh();
    // });
    //Example 3
    // var l1 = new window.Batman.List(document.getElementById('l1'), { data: data, height: 30 });
    // var l2 = new window.Batman.List(document.getElementById('l2'), { data: data, height: 30 });

    //Example 4

    // var l1 = new window.Batman.List(document.getElementById('l1'), {
    //     data: data,
    //     height: 50,
    //     template: '<div><span (value)="text"></span> - <span (value)="text"></span></div>'
    // });

    // window.addEventListener('resize', function () {
    //     if (l1) l1.refresh();
    // });

    // Example 4 - Complex data

    // var data = [
    //     {"icon":"../../img/png/soundcloud.png","name":"Soundcloud","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/twitter.png","name":"Twitter","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/soundcloud.png","name":"Soundcloud","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/instagram.png","name":"Instagram","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/linkedin.png","name":"Linkedin","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/google-plus.png","name":"Google-plus","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/pinterest.png","name":"Pinterest","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/lastfm.png","name":"Lastfm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/linkedin.png","name":"Linkedin","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/lastfm.png","name":"Lastfm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/soundcloud.png","name":"Soundcloud","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/facebook.png","name":"Facebook","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/swarm.png","name":"Swarm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/facebook.png","name":"Facebook","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/dribbble.png","name":"Dribbble","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/pinterest.png","name":"Pinterest","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/pinterest.png","name":"Pinterest","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/tumblr.png","name":"Tumblr","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/lastfm.png","name":"Lastfm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/instagram.png","name":"Instagram","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/swarm.png","name":"Swarm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/badoo.png","name":"Badoo","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/instagram.png","name":"Instagram","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/tumblr.png","name":"Tumblr","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/soundcloud.png","name":"Soundcloud","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/swarm.png","name":"Swarm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/facebook.png","name":"Facebook","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/swarm.png","name":"Swarm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/facebook.png","name":"Facebook","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/twitter.png","name":"Twitter","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/badoo.png","name":"Badoo","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/twitter.png","name":"Twitter","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/linkedin.png","name":"Linkedin","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/pinterest.png","name":"Pinterest","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/behance.png","name":"Behance","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/lastfm.png","name":"Lastfm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/linkedin.png","name":"Linkedin","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/swarm.png","name":"Swarm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/pinterest.png","name":"Pinterest","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/facebook.png","name":"Facebook","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/soundcloud.png","name":"Soundcloud","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/dribbble.png","name":"Dribbble","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/flickr.png","name":"Flickr","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/dribbble.png","name":"Dribbble","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/google-plus.png","name":"Google-plus","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/swarm.png","name":"Swarm","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/dribbble.png","name":"Dribbble","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/behance.png","name":"Behance","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/deviantart.png","name":"Deviantart","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."},{"icon":"../../img/png/dribbble.png","name":"Dribbble","text":"Brunch this weekend?","description":"The quick brown fox jumps over the lazy dog."}];

    // var l1 = new window.Batman.List(document.getElementById('l1'), {
    //     data: data,
    //     height: 88,
    //     template: '<div class="flex row"><img (src)="icon" height="50" /><div class="flex column"> <span class="head" (value)="name"></span><span (value)="text"></span><span class="desc" (value)="description"></span></div></div>'
    // });


    // Example 5 - Complex data

    var l1 = new window.Batman.List(document.getElementById('l1'), {
        data: window.globalData,
        height: 88,
        template: '<div class="flex row"><img (src)="icon" height="50" /><div class="flex column"> <span class="head" (value)="name"></span><span (value)="text"></span><span class="desc" (value)="description"></span></div></div>'
    });

    var l2 = new window.Batman.List(document.getElementById('l2'), {
        data: window.globalData,
        height: 88,
        template: '<div class="flex row"><img (src)="icon" height="50" /><div class="flex column"> <span class="head" (value)="name"></span><span (value)="text"></span><span class="desc" (value)="description"></span></div></div>'
    });



    // (function dataGen() {
    //     var icons = ['badoo', 'behance', 'deviantart', 'dribbble', 'facebook', 'flickr', 'google-plus', 'instagram', 'lastfm', 'linkedin', 'pinterest', 'soundcloud', 'swarm', 'tumblr', 'twitter', 'vk']
    //     var data = [];
    //     for (var i = 0; i < 10; i++) {
    //         var index = Math.floor(Math.random() * 15)
    //         data.push({
    //             icon: '../../img/png/' + icons[index] + '.png',
    //             name: icons[index].charAt(0).toLocaleUpperCase() + icons[index].substr(1, index.length),
    //             text: 'Brunch this weekend?',
    //             description: 'The quick brown fox jumps over the lazy dog.'
    //         })
    //     }
    //     console.log(JSON.stringify(data));
    // })();

});


