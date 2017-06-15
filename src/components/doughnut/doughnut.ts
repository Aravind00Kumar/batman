/**
 * --------------------------------------------------------------------------
 * Doughnut Component
 * Licensed under MIT 
 * --------------------------------------------------------------------------
 */
import { IBaseComponent, BaseComponent } from '../base-component'

export interface IDoughnutComponent {

}

export interface IDoughnutOptions {
    size?: number,
    stroke?: number,
    arc?: boolean,
    startAngle?: number,
    angle?: number,
    sectorColor?: string,
    circleColor?: string,
    fillCircle?: boolean
}

export class Doughnut extends BaseComponent {
    public defaultOptions: IDoughnutOptions = {
        size: 100,
        stroke: 10,
        arc: false,
        startAngle: 0,
        angle: 180,
        sectorColor: '#789',
        circleColor: '#DDD',
        fillCircle: true
    }

    //private element: any;
    private sector: any;

    constructor(private element: HTMLElement, options?: IDoughnutOptions) {
        super('Doughnut');
        //this.context = context;
        this.options = <IDoughnutOptions>{ ...this.defaultOptions, ...options };

        // Reset stroke to 0 if drawing full sector
        this.options.stroke = this.options.arc ? this.options.stroke : 0;

        // Circle dimensions
        this.options.center = this.options.size / 2;
        this.options.radius = this.options.stroke ? this.options.center - this.options.stroke / 2 : this.options.center;

        var svg = '<svg class=\'doughnut-component\' viewBox=\'0 0 ' + this.options.size + ' ' + this.options.size + '\'>\n      ' + this.getCircle() + '\n      ' + this.getSector() + '\n    </svg>';

        this.element.innerHTML = svg;
        this.sector = this.element.querySelector('.doughnut-sector');
    }

    private getCircle() {
        var options = this.options;
        var circleFill = options.fillCircle || !options.arc ? options.circleColor : 'none';
        return '<circle\n      class=\'doughnut-circle\'\n      stroke-width=\'' + options.stroke + '\'\n      fill=' + circleFill + '\n      stroke=' + options.circleColor + '\n      cx=\'' + options.center + '\'\n      cy=\'' + options.center + '\'\n      r=\'' + options.radius + '\' />';
    }

    private checkAngle() {
        if (this.options.angle > 360) {
            this.options.angle = this.options.angle % 360;
        }
        if (this.options.startAngle > this.options.angle) {
            this.options.startAngle = 0;
        }
    }

    private changeAngle(startAngle: number, angle: number) {
        this.options.angle = angle;
        this.options.startAngle = startAngle;
        this.checkAngle();
        this.sector.setAttribute('d', this.getSector(true));
    }

    private getSector(returnD?: boolean) {
        //var returnD = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        var options = this.options;

        // Colors
        var sectorFill = options.arc ? 'none' : options.sectorColor;
        var sectorStroke = options.arc ? options.sectorColor : 'none';

        // Arc angles
        var firstAngle = options.angle > 180 ? 90 : options.angle - 90;
        var secondAngle = -270 + options.angle - 180;

        var fsAngle = options.startAngle > 180 ? 90 : options.startAngle - 90;
        var ssAngle = -270 + options.startAngle - 180;

        // Arcs
        var firstArc = this.getArc(firstAngle);
        var secondArc = options.angle > 180 ? this.getArc(secondAngle) : '';

        var fArc = this.getMove(fsAngle);
        var sArc = options.startAngle > 180 ? this.getMove(ssAngle) : '';

        // start -> starting line
        // end -> will path be closed or not
        var end = '';
        var start = null;

        if (options.arc) {
            if (sArc)
                start = sArc;
            else if (fArc)
                start = fArc;
            else
                start = 'M' + options.center + ',' + options.stroke / 2;
        } else {
            start = 'M' + options.center + ',' + options.center + ' L' + options.center + ',' + options.stroke / 2;
            end = 'z';
        }

        var d = start + ' ' + firstArc + ' ' + secondArc + ' ' + end;

        if (returnD) {
            return d;
        }

        return '<path\n    class=\'doughnut-sector\'\n    stroke-width=\'' + options.stroke + '\'\n    fill=' + sectorFill + '\n    stroke=' + sectorStroke + '\n    d=\'' + d + '\' />';
    }
    // Generates SVG arc string
    private getArc(angle: number) {
        var options = this.options;

        var x = options.center + options.radius * Math.cos(this.radians(angle));
        var y = options.center + options.radius * Math.sin(this.radians(angle));

        return 'A' + options.radius + ',' + options.radius + ' 1 0 1 ' + x + ',' + y;
    }

    private getMove(angle: number) {
        var options = this.options;

        var x = options.center + options.radius * Math.cos(this.radians(angle));
        var y = options.center + options.radius * Math.sin(this.radians(angle));

        return 'M' + x + ',' + y;
    }

    // Converts from degrees to radians.
    private radians(degrees: number) {
        return degrees / 180 * Math.PI;
    }


    private step(startAngleOffset, angleOffset, startAngle, endAngle, time, endTime) {
        var now = new Date().valueOf();
        var timeOffset = endTime - now;

        if (timeOffset <= 0) {
            this.changeAngle(startAngle, endAngle);
        } else {
            var angle = endAngle - angleOffset * timeOffset / time;
            var sAngle = startAngle - startAngleOffset * timeOffset / time;

            this.changeAngle(sAngle, angle);
            requestAnimationFrame(() => {
                return this.step(startAngleOffset, angleOffset, startAngle, endAngle, time, endTime);
            });
        }
    }

    public animateTo(startAngle, angle) {
        var _this2 = this;

        var time = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];

        if (angle > 360) {
            angle = angle % 360;
        }

        var startTime = new Date().valueOf();
        var endTime = startTime + time;
        if (startAngleOffset > angleOffset) {
            startAngleOffset = 0;
        }
        var startAngleOffset = startAngle - this.options.startAngle;
        var angleOffset = angle - this.options.angle;

        this.step(startAngleOffset, angleOffset, startAngle, angle, time, endTime);
        requestAnimationFrame(()=> {
            return this.step(startAngleOffset, angleOffset, startAngle, angle, time, endTime);
        });
    }

}