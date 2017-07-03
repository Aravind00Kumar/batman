var globalData = {};

globalData.optimizesTreeData =
    [
        { id: '1', level: 0, text: 'Search Engine', isOpened: true, icon: 'folder' },
        { id: '2', level: 1, text: 'Google', isOpened: false, icon: 'plusMinus' },
        { id: '3', level: 2, text: 'V8', icon: '' },
        { id: '4', level: 2, text: 'V7', icon: '' },
        { id: '5', level: 1, text: 'Yahoo', icon: '' },
        { id: '6', level: 1, text: 'MSN', icon: '' },
        { id: '7', level: 0, text: 'Browsers', isOpened: true, icon: 'folder' },
        { id: '8', level: 1, text: 'Chrome', icon: '' },
        { id: '9', level: 1, text: 'Edge', icon: '' },
        { id: '10', level: 1, text: 'Opera', icon: '' },
        { id: '11', level: 1, text: 'Firefox', icon: '' },
        { id: '12', level: 0, text: 'Personal Computer', isOpened: true, icon: 'folder' },
        { id: '13', level: 1, text: 'HP', icon: '' },
        { id: '14', level: 1, text: 'Dell', icon: '' },
        { id: '15', level: 1, text: 'Fujitsu', icon: '' },
        { id: '16', level: 1, text: 'Asus', icon: '' },
        { id: '17', level: 0, text: 'Smart Phones', isOpened: true, icon: 'folder' },
        { id: '18', level: 1, text: 'Samsung', isOpened: false, icon: 'folder' },
        { id: '19', level: 2, text: 'Galaxy S7', icon: '' },
        { id: '20', level: 2, text: 'Galaxy S8', icon: '' },
        { id: '21', level: 1, text: 'LG', icon: '' },
        { id: '22', level: 1, text: 'OnePlus', icon: '' },
        { id: '23', level: 1, text: 'HTC', icon: '' }
    ];


globalData.treeData = [
    {
        text: 'Search Engines',
        isOpened: true,
        icon: ['', ''],
        children: [{
            text: 'Google',
            isOpened: true,
            icon: ['', ''],
            children: [{
                text: 'v1',
                isOpened: false,
                icon: ['', ''],
            }, {
                text: 'v2',
                isOpened: false,
                icon: ['', ''],

            }]
        }, {
            text: 'Yahoo',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'MSN',
            isOpened: false,
            icon: ['', '']
        }]
    },
    {
        text: 'Browsers',
        isOpened: true,
        icon: ['', ''],
        children: [{
            text: 'Chrome',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'Edge',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'Opera',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'Firefox',
            isOpened: false,
            icon: ['', '']
        }]
    }, {
        text: 'Computer',
        isOpened: false,
        icon: ['', ''],
        children: [{
            text: 'Dell',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'HP',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'IBM',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'Fujistu',
            isOpened: false,
            icon: ['', '']
        }]
    }, {
        text: 'Mobile',
        isOpened: false,
        icon: ['', ''],
        children: [{
            text: 'IPhone',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'Samsung',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'Pixel',
            isOpened: false,
            icon: ['', '']
        }, {
            text: 'OnePlus',
            isOpened: false,
            icon: ['', '']
        }]

    }
];