// import { Component, AfterViewInit, ElementRef } from '@angular/core';
// import { OptimalTree, IOptimalTreeNode, IOptimalTreeOptions } from '@batman/components/components';
// @Component({
//     selector: 'bat-tree',
//     styles: ['.bat-list { height:100% }'],
//     template: `<div class="bat-list"></div>`,
// })
// export class BatTreeComponent implements AfterViewInit {
//     constructor(private e: ElementRef) {
//         //let opt = Configuration.getOptions();
//     }
//     public ngAfterViewInit() {
//         var element = this.e.nativeElement.firstChild;
//         var optimizesTreeData =
//             [
//                 <IOptimalTreeNode>{ id: '1', level: 0, text: 'Search Engine', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
//                 { id: '2', level: 1, text: 'Google', isOpened: false, icon: ['./img/o.png', './img/c.png'] },
//                 { id: '3', level: 2, text: 'V8', icon: './img/f.png' },
//                 { id: '4', level: 2, text: 'V7', icon: './img/f.png' },
//                 { id: '5', level: 1, text: 'Yahoo', icon: './img/f.png' },
//                 { id: '6', level: 1, text: 'MSN', icon: './img/f.png' },
//                 { id: '7', level: 0, text: 'Browsers', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
//                 { id: '8', level: 1, text: 'Chrome', icon: './img/f.png' },
//                 { id: '9', level: 1, text: 'Edge', icon: './img/f.png' },
//                 { id: '10', level: 1, text: 'Opera', icon: './img/f.png' },
//                 { id: '11', level: 1, text: 'Firefox', icon: './img/f.png' },
//                 { id: '12', level: 0, text: 'Personal Computer', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
//                 { id: '13', level: 1, text: 'HP', icon: './img/f.png' },
//                 { id: '14', level: 1, text: 'Dell', icon: './img/f.png' },
//                 { id: '15', level: 1, text: 'Fujitsu', icon: './img/f.png' },
//                 { id: '16', level: 1, text: 'Asus', icon: './img/f.png' },
//                 { id: '17', level: 0, text: 'Smart Phones', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
//                 { id: '18', level: 1, text: 'Samsung', isOpened: false, icon: ['./img/o.png', './img/c.png'] },
//                 { id: '19', level: 2, text: 'Galaxy S7', icon: './img/f.png' },
//                 { id: '20', level: 2, text: 'Galaxy S8', icon: './img/f.png' },
//                 { id: '21', level: 1, text: 'LG', icon: './img/f.png' },
//                 { id: '22', level: 1, text: 'OnePlus', icon: './img/f.png' },
//                 { id: '23', level: 1, text: 'HTC', icon: './img/f.png' }
//             ];
//         var l1 = new OptimalTree(element, {
//             data: optimizesTreeData,
//             height: 30,
//             activeScroll: false
//         });
//     }
// }
//# sourceMappingURL=bat-tree.component.js.map