(function (module) {
    var Table = Batman.table.Table;

    module.controller('tableHomeController', function () {
        this.header = 'Table Home';
    })

    module.controller('tableBasicController', function () {
        this.header = 'Table Basic Example';
        this.data = [{
            "id": 1,
            "first_name": "Verena",
            "last_name": "Goaley",
            "email": "vgoaley0@diigo.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "127.42.218.68"
        }, {
            "id": 2,
            "first_name": "Valerye",
            "last_name": "Devine",
            "email": "vdevine1@paginegialle.it",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "129.59.203.91"
        }, {
            "id": 3,
            "first_name": "Eyde",
            "last_name": "Joyner",
            "email": "ejoyner2@angelfire.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "118.66.75.89"
        }, {
            "id": 4,
            "first_name": "Ezechiel",
            "last_name": "Kleingrub",
            "email": "ekleingrub3@lycos.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "235.87.165.246"
        }, {
            "id": 5,
            "first_name": "Rollie",
            "last_name": "Basezzi",
            "email": "rbasezzi4@hatena.ne.jp",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "180.146.12.104"
        }, {
            "id": 6,
            "first_name": "Cordelia",
            "last_name": "O'Halligan",
            "email": "cohalligan5@ted.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "49.133.48.170"
        }, {
            "id": 7,
            "first_name": "Halimeda",
            "last_name": "Eyres",
            "email": "heyres6@photobucket.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "33.0.34.189"
        }, {
            "id": 8,
            "first_name": "Dominique",
            "last_name": "Toohey",
            "email": "dtoohey7@wsj.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "47.21.112.132"
        }, {
            "id": 9,
            "first_name": "Dana",
            "last_name": "Devlin",
            "email": "ddevlin8@123-reg.co.uk",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "103.164.205.182"
        }, {
            "id": 10,
            "first_name": "Tanya",
            "last_name": "Lauchlan",
            "email": "tlauchlan9@shinystat.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "103.63.53.190"
        }, {
            "id": 11,
            "first_name": "Alyss",
            "last_name": "Ohrtmann",
            "email": "aohrtmanna@ycombinator.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "213.74.171.24"
        }, {
            "id": 12,
            "first_name": "Wolf",
            "last_name": "Nurny",
            "email": "wnurnyb@nature.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "177.172.34.138"
        }, {
            "id": 13,
            "first_name": "Sandy",
            "last_name": "Golagley",
            "email": "sgolagleyc@fastcompany.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "82.132.226.20"
        }, {
            "id": 14,
            "first_name": "Garvy",
            "last_name": "Vedntyev",
            "email": "gvedntyevd@squidoo.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "142.136.104.204"
        }, {
            "id": 15,
            "first_name": "Killie",
            "last_name": "Vaan",
            "email": "kvaane@goo.ne.jp",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "149.153.96.206"
        }, {
            "id": 16,
            "first_name": "Joellyn",
            "last_name": "Kinder",
            "email": "jkinderf@jiathis.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "178.199.242.211"
        }, {
            "id": 17,
            "first_name": "Therese",
            "last_name": "Garmey",
            "email": "tgarmeyg@newyorker.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "25.132.140.44"
        }, {
            "id": 18,
            "first_name": "Bealle",
            "last_name": "Gosnoll",
            "email": "bgosnollh@shinystat.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "122.181.146.26"
        }, {
            "id": 19,
            "first_name": "Marlow",
            "last_name": "Pellant",
            "email": "mpellanti@hhs.gov",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "118.103.159.8"
        }, {
            "id": 20,
            "first_name": "Lane",
            "last_name": "Skirvane",
            "email": "lskirvanej@mediafire.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "52.200.215.203"
        }, {
            "id": 21,
            "first_name": "Ransom",
            "last_name": "Grolmann",
            "email": "rgrolmannk@moonfruit.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "220.219.202.155"
        }, {
            "id": 22,
            "first_name": "Prisca",
            "last_name": "Wort",
            "email": "pwortl@google.it",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "104.219.194.110"
        }, {
            "id": 23,
            "first_name": "Wenona",
            "last_name": "Howatt",
            "email": "whowattm@shutterfly.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "115.5.17.148"
        }, {
            "id": 24,
            "first_name": "Lloyd",
            "last_name": "Veljes",
            "email": "lveljesn@google.com.au",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "61.136.153.157"
        }, {
            "id": 25,
            "first_name": "Flori",
            "last_name": "Watters",
            "email": "fwatterso@telegraph.co.uk",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "98.93.153.234"
        }, {
            "id": 26,
            "first_name": "Maxwell",
            "last_name": "Stabler",
            "email": "mstablerp@ucla.edu",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "239.58.23.207"
        }, {
            "id": 27,
            "first_name": "Fonz",
            "last_name": "Martijn",
            "email": "fmartijnq@xrea.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "186.119.79.200"
        }, {
            "id": 28,
            "first_name": "Eliza",
            "last_name": "Addis",
            "email": "eaddisr@zdnet.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "151.155.124.20"
        }, {
            "id": 29,
            "first_name": "Brew",
            "last_name": "Varfolomeev",
            "email": "bvarfolomeevs@bizjournals.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "22.171.59.45"
        }, {
            "id": 30,
            "first_name": "Doroteya",
            "last_name": "Moppett",
            "email": "dmoppettt@earthlink.net",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "70.142.179.134"
        }, {
            "id": 31,
            "first_name": "Ellsworth",
            "last_name": "Ekell",
            "email": "eekellu@ning.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "177.242.149.61"
        }, {
            "id": 32,
            "first_name": "Westley",
            "last_name": "Lochhead",
            "email": "wlochheadv@economist.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "74.93.83.242"
        }, {
            "id": 33,
            "first_name": "Chaddy",
            "last_name": "Dunridge",
            "email": "cdunridgew@twitpic.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "203.74.213.192"
        }, {
            "id": 34,
            "first_name": "Debera",
            "last_name": "Toffolo",
            "email": "dtoffolox@freewebs.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "171.28.137.245"
        }, {
            "id": 35,
            "first_name": "Fraser",
            "last_name": "Ridger",
            "email": "fridgery@last.fm",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "222.244.237.187"
        }, {
            "id": 36,
            "first_name": "Marion",
            "last_name": "Angier",
            "email": "mangierz@indiegogo.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "8.81.159.147"
        }, {
            "id": 37,
            "first_name": "Laurens",
            "last_name": "Lye",
            "email": "llye10@com.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "157.40.39.234"
        }, {
            "id": 38,
            "first_name": "Lu",
            "last_name": "Ronaghan",
            "email": "lronaghan11@npr.org",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "222.246.244.161"
        }, {
            "id": 39,
            "first_name": "Panchito",
            "last_name": "Bamford",
            "email": "pbamford12@vimeo.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "125.208.163.1"
        }, {
            "id": 40,
            "first_name": "Justus",
            "last_name": "Pagitt",
            "email": "jpagitt13@dagondesign.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "208.54.54.9"
        }, {
            "id": 41,
            "first_name": "Linnie",
            "last_name": "Baigrie",
            "email": "lbaigrie14@ustream.tv",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "42.206.236.138"
        }, {
            "id": 42,
            "first_name": "Esta",
            "last_name": "Perocci",
            "email": "eperocci15@wiley.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "232.228.112.193"
        }, {
            "id": 43,
            "first_name": "Alameda",
            "last_name": "Baudain",
            "email": "abaudain16@zimbio.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "100.154.205.203"
        }, {
            "id": 44,
            "first_name": "Lennie",
            "last_name": "Beaston",
            "email": "lbeaston17@addtoany.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "165.220.14.167"
        }, {
            "id": 45,
            "first_name": "Delbert",
            "last_name": "Mogridge",
            "email": "dmogridge18@gnu.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "161.128.63.235"
        }, {
            "id": 46,
            "first_name": "Sib",
            "last_name": "Skyrme",
            "email": "sskyrme19@123-reg.co.uk",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "170.44.0.16"
        }, {
            "id": 47,
            "first_name": "Zack",
            "last_name": "Pummery",
            "email": "zpummery1a@issuu.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "97.49.231.151"
        }, {
            "id": 48,
            "first_name": "Barris",
            "last_name": "De Bischop",
            "email": "bdebischop1b@usda.gov",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "72.149.180.203"
        }, {
            "id": 49,
            "first_name": "Thom",
            "last_name": "Arrault",
            "email": "tarrault1c@omniture.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "233.209.69.162"
        }, {
            "id": 50,
            "first_name": "Winnifred",
            "last_name": "Strain",
            "email": "wstrain1d@4shared.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "74.247.138.250"
        }, {
            "id": 51,
            "first_name": "Pierette",
            "last_name": "Snuggs",
            "email": "psnuggs1e@dell.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "179.251.182.67"
        }, {
            "id": 52,
            "first_name": "Arne",
            "last_name": "Zupa",
            "email": "azupa1f@delicious.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "116.196.152.73"
        }, {
            "id": 53,
            "first_name": "Trey",
            "last_name": "Caldron",
            "email": "tcaldron1g@woothemes.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "42.230.189.116"
        }, {
            "id": 54,
            "first_name": "Laurette",
            "last_name": "Abramowitch",
            "email": "labramowitch1h@cdc.gov",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "76.47.135.14"
        }, {
            "id": 55,
            "first_name": "Camellia",
            "last_name": "McWhin",
            "email": "cmcwhin1i@techcrunch.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "16.147.254.73"
        }, {
            "id": 56,
            "first_name": "Velvet",
            "last_name": "Rozea",
            "email": "vrozea1j@multiply.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "90.212.131.236"
        }, {
            "id": 57,
            "first_name": "Daniella",
            "last_name": "Spawton",
            "email": "dspawton1k@tinypic.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "228.127.103.66"
        }, {
            "id": 58,
            "first_name": "Laurent",
            "last_name": "Wetherhead",
            "email": "lwetherhead1l@fda.gov",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "26.204.115.99"
        }, {
            "id": 59,
            "first_name": "Jacobo",
            "last_name": "Quittonden",
            "email": "jquittonden1m@redcross.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "62.132.103.81"
        }, {
            "id": 60,
            "first_name": "Mariquilla",
            "last_name": "Cawthorne",
            "email": "mcawthorne1n@twitter.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "185.48.197.51"
        }, {
            "id": 61,
            "first_name": "Robbi",
            "last_name": "Darwent",
            "email": "rdarwent1o@xinhuanet.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "55.64.90.132"
        }, {
            "id": 62,
            "first_name": "Frederigo",
            "last_name": "Summerill",
            "email": "fsummerill1p@apache.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "210.239.66.226"
        }, {
            "id": 63,
            "first_name": "Carita",
            "last_name": "Gillings",
            "email": "cgillings1q@lulu.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "190.49.155.25"
        }, {
            "id": 64,
            "first_name": "Rudolph",
            "last_name": "Bointon",
            "email": "rbointon1r@dyndns.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "28.70.94.110"
        }, {
            "id": 65,
            "first_name": "Kirk",
            "last_name": "Cooksey",
            "email": "kcooksey1s@statcounter.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "91.16.23.24"
        }, {
            "id": 66,
            "first_name": "Seumas",
            "last_name": "Tebbit",
            "email": "stebbit1t@redcross.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "201.107.99.205"
        }, {
            "id": 67,
            "first_name": "Webb",
            "last_name": "Dingivan",
            "email": "wdingivan1u@google.fr",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "33.144.243.67"
        }, {
            "id": 68,
            "first_name": "Tudor",
            "last_name": "Nell",
            "email": "tnell1v@nba.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "151.46.95.174"
        }, {
            "id": 69,
            "first_name": "Linnea",
            "last_name": "Liquorish",
            "email": "lliquorish1w@reuters.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "146.246.66.9"
        }, {
            "id": 70,
            "first_name": "Glyn",
            "last_name": "Zanetto",
            "email": "gzanetto1x@fastcompany.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "1.183.21.182"
        }, {
            "id": 71,
            "first_name": "Reamonn",
            "last_name": "Jedraszek",
            "email": "rjedraszek1y@guardian.co.uk",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "198.39.240.159"
        }, {
            "id": 72,
            "first_name": "Orville",
            "last_name": "Vivien",
            "email": "ovivien1z@miibeian.gov.cn",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "220.253.149.195"
        }, {
            "id": 73,
            "first_name": "Rosalyn",
            "last_name": "Sanderson",
            "email": "rsanderson20@rediff.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "175.156.35.157"
        }, {
            "id": 74,
            "first_name": "Nonie",
            "last_name": "Andrey",
            "email": "nandrey21@example.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "31.108.121.195"
        }, {
            "id": 75,
            "first_name": "Marchall",
            "last_name": "Thake",
            "email": "mthake22@kickstarter.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "219.125.207.17"
        }, {
            "id": 76,
            "first_name": "Justis",
            "last_name": "Glancy",
            "email": "jglancy23@cbc.ca",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "47.243.144.132"
        }, {
            "id": 77,
            "first_name": "Aleta",
            "last_name": "Horick",
            "email": "ahorick24@who.int",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "145.112.182.20"
        }, {
            "id": 78,
            "first_name": "Lazare",
            "last_name": "Tayler",
            "email": "ltayler25@dion.ne.jp",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "145.5.74.175"
        }, {
            "id": 79,
            "first_name": "Vasily",
            "last_name": "Bellin",
            "email": "vbellin26@apple.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "70.189.186.43"
        }, {
            "id": 80,
            "first_name": "Paula",
            "last_name": "Caston",
            "email": "pcaston27@adobe.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "7.8.137.88"
        }, {
            "id": 81,
            "first_name": "Moselle",
            "last_name": "Martignoni",
            "email": "mmartignoni28@craigslist.org",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "15.195.126.198"
        }, {
            "id": 82,
            "first_name": "Ichabod",
            "last_name": "Grollmann",
            "email": "igrollmann29@opensource.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "36.183.116.105"
        }, {
            "id": 83,
            "first_name": "Jamima",
            "last_name": "Allom",
            "email": "jallom2a@wikipedia.org",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "39.214.196.157"
        }, {
            "id": 84,
            "first_name": "Ramon",
            "last_name": "Oloman",
            "email": "roloman2b@topsy.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "191.66.87.157"
        }, {
            "id": 85,
            "first_name": "Sascha",
            "last_name": "Hearthfield",
            "email": "shearthfield2c@webmd.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "87.38.200.49"
        }, {
            "id": 86,
            "first_name": "Derril",
            "last_name": "Hillett",
            "email": "dhillett2d@dion.ne.jp",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "75.67.11.2"
        }, {
            "id": 87,
            "first_name": "Brose",
            "last_name": "Coutts",
            "email": "bcoutts2e@ihg.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "97.129.0.80"
        }, {
            "id": 88,
            "first_name": "Les",
            "last_name": "Hurburt",
            "email": "lhurburt2f@printfriendly.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "199.83.234.4"
        }, {
            "id": 89,
            "first_name": "Haskell",
            "last_name": "Badini",
            "email": "hbadini2g@twitpic.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "218.131.198.130"
        }, {
            "id": 90,
            "first_name": "Alexia",
            "last_name": "Ridgewell",
            "email": "aridgewell2h@liveinternet.ru",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "74.224.252.238"
        }, {
            "id": 91,
            "first_name": "Terrel",
            "last_name": "Rittmeyer",
            "email": "trittmeyer2i@ucla.edu",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "7.211.29.37"
        }, {
            "id": 92,
            "first_name": "Vivian",
            "last_name": "Wyndham",
            "email": "vwyndham2j@usgs.gov",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "37.146.24.236"
        }, {
            "id": 93,
            "first_name": "Elvira",
            "last_name": "Broose",
            "email": "ebroose2k@1688.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "24.231.97.25"
        }, {
            "id": 94,
            "first_name": "Zedekiah",
            "last_name": "Daniello",
            "email": "zdaniello2l@nydailynews.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "172.226.29.124"
        }, {
            "id": 95,
            "first_name": "Chan",
            "last_name": "Faull",
            "email": "cfaull2m@springer.com",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "206.214.16.186"
        }, {
            "id": 96,
            "first_name": "Kelbee",
            "last_name": "Ruthven",
            "email": "kruthven2n@unicef.org",
            "gender": "Male", "icon":"../../img/png/male.png",
            "ip_address": "4.107.197.71"
        }, {
            "id": 97,
            "first_name": "Gail",
            "last_name": "Fillgate",
            "email": "gfillgate2o@spotify.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "231.120.36.235"
        }, {
            "id": 98,
            "first_name": "Libbi",
            "last_name": "Cashin",
            "email": "lcashin2p@usa.gov",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "68.52.57.112"
        }, {
            "id": 99,
            "first_name": "Rea",
            "last_name": "Blacket",
            "email": "rblacket2q@skyrock.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "172.26.231.43"
        }, {
            "id": 100,
            "first_name": "Blake",
            "last_name": "Rudman",
            "email": "brudman2r@constantcontact.com",
            "gender": "Female", "icon":"../../img/png/female.png",
            "ip_address": "21.253.254.231"
        }];

        this.dynamicLoading = function(){

        };


        this.onload = function (view) {
            new Table(view.querySelector('#t1'), {
                data: this.data,
                height: 40,
                pageSize:15,
                //isCacheEnabled:false,
                rowClick : function(){
                    console.log(this.email);
                },
                columns: [{ name: 'id', text: 'ID', width: 120 },
                { name: 'first_name', text: 'First Name', width: 140 },
                { name: 'last_name', text: 'Last Name', width: 140, template:'<span value="{{last_name[0]===\'V\' ? \'TTT\' : last_name }}"></span>' },
                { name: 'first_name1', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name2', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name13', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name14', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name15', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name16', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name17', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name18', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name19', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name10', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name111', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'first_name113', text: 'First Name', width: 250, template:'<strong [value]="email"></strong>'  },
                { name: 'email', text: 'Email', width: 240, template:'<strong [value]="email"></strong>' },
                { name: 'gender', text: 'Gender', width: 120, template:'<img height="35px" [src]="icon" (onclick)="rowClick"></img>' },
                { name: 'ip_address', text: 'IP Address', width: 160 },
                { name: 'rating', text: 'Rating', width: 120, template:'<span value="{{ gender===\'Male\' ? \'4\' : \'5\' }}"></span>'  },
                { name: 'stars', text: 'Stars', width: 120, template:'<span value="{{ gender === \'Male\' ? \'<span>☆</span><span>☆</span><span>☆</span><span>☆</span>\' : \'<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>\' }}"></span>'  },
                { name: 'function', text: 'Function', width: 160, template:'<span value="{{ \'none\' }}"></span>'  },
            ]
        });
        }
    })

})(AppModule || (AppModule = {}));