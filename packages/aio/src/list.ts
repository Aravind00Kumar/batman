import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { List, IListComponent, IListOptions } from './libs';


@Component({
    selector: 'bat-list',
    template: `<div class="bat-list"></div>`
})
export class BatListComponent implements AfterViewInit {

    @Input('options') options: IListOptions;
    public list: IListComponent
    constructor(private e: ElementRef) { }
    public ngAfterViewInit() {
        var element = this.e.nativeElement.firstChild;
        this.list = new List(element, this.options);
    }
}
