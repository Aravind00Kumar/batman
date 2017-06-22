import { h, createProjector, Projector, ProjectorOptions, VNode } from '../../common/maquette';
import { IBaseComponent, BaseComponent } from '../base-component'

/**
 * Doughnut component interface
 */
export interface IDoughnutComponent {
    updateAngle(startAngle, angle): void;
}

/**
 * Interface for doughnut component values
 */
export interface IDoughnutValue {
    percentage: number,
    color: string
}

/**
 * Interface for doughnut component options
 */

export interface IDoughnutOptions {
    stroke?: number,
    startAngle?: number,
    endAngle?: number,
    sectorColor?: string,
    circleColor?: string
    image: URL,
    values?: Array<IDoughnutValue>,
    title?: string
}

export class Doughnut extends BaseComponent implements IDoughnutComponent {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: IDoughnutOptions = {
        stroke: 10,
        startAngle: 0,
        endAngle: 0,
        sectorColor: '#789',
        circleColor: '#DDD',
        image: null,
        values: <Array<IDoughnutValue>>[],
        title: ''
    }

    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(private element: HTMLElement, options?: IDoughnutOptions) {
        super('Doughnut', <ProjectorOptions>{ namespace: 'NAMESPACE_SVG' });
        this.options = <IDoughnutOptions>{ ...Doughnut.defaultOptions, ...options };

        // Circle dimensions
        this.options.center = 50;//this.options.size / 2;
        this.options.radius = this.options.stroke ? this.options.center - this.options.stroke / 2 : this.options.center;

        if (!this.validateValues()) return;
        this.projector.append(this.element, this.renderMaquette.bind(this));
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    private renderMaquette() {
        if (this.options.values.length > 0)
            return this.multiArc();
        return this.singleArc();
    }
    /**
     * Validation method for values; values will be invalid when  values property in the options together should not exceed 100 
     */
    private validateValues() {
        if (this.options.values.length > 0) {
            let sum = 0;
            for (let index = 0; index < this.options.values.length; index++) {
                let element = this.options.values[index];
                sum += element.percentage;
            }
            if (sum > 100) {
                this.logger.error('Doughnut sum of percentages values should be less than or equal to 100%');
                return false;
            }
        }
        return true;
    }

    /**
     * Generates H template for multiple arcs
     */
    private multiArc() {
        return h('div', { class: 'parent' }, [
            h('div', { class: 'child', 'style': `border-radius: 100%; overflow: hidden; transform:scale(${1 - (this.options.stroke) / 70})` }, [
                h('img', {
                    src: this.options.image,
                    height: '100%',
                    width: '100%'
                })
            ]),
            h('div', { class: 'child', title: this.options.title }, [
                h('svg', { class: 'doughnut-component', viewBox: '0 0 100 100' }, [
                    h('circle', {
                        class: 'doughnut-circle',
                        'stroke-width': this.options.stroke,
                        fill: 'none',
                        stroke: this.options.circleColor,
                        cx: this.options.center,
                        cy: this.options.center,
                        r: this.options.radius
                    }),
                    this.options.values.map((item, index) => {

                        this.options.startAngle = this.options.endAngle;
                        var p = (item.percentage * 360) / 100;
                        this.options.endAngle = p + this.options.startAngle;

                        return h('path', {
                            kay: 'p_' + index,
                            'class': "doughnut-sector",
                            'stroke-width': this.options.stroke,
                            'fill': "none",
                            'stroke': item.color,
                            'd': this.getAcr(this.options.startAngle, this.options.endAngle)
                        })
                    })
                ])
            ])
        ]);
    }



    /**
     * Generates H template for single arc
     */
    private singleArc() {
        return h('svg', { class: 'doughnut-component', viewBox: '0 0 100 100' }, [
            h('circle', {
                class: 'doughnut-circle',
                'stroke-width': this.options.stroke,
                fill: 'none',
                stroke: this.options.circleColor,
                cx: this.options.center,
                cy: this.options.center,
                r: this.options.radius
            }),
            h('path', {
                class: 'doughnut-sector',
                'stroke-width': this.options.stroke,
                fill: 'none',
                stroke: this.options.sectorColor,
                d: this.getAcr(this.options.startAngle, this.options.endAngle)
            })
        ]);
    }

    /**
     * Verifies if angle is more than 360 degree, if angle is more than calculates angle value as (angle % 350) 
     */
    private checkAngle() {
        if (this.options.endAngle > 360) {
            this.options.endAngle = this.options.endAngle % 360;
        }
        if (this.options.startAngle > this.options.endAngle) {
            this.options.startAngle = 0;
        }
    }

    /**
     * Converts polar values to cartesian
     * @param centerX X center value
     * @param centerY Y center value
     * @param radius radius of the circle
     * @param angleInDegrees arc angle value
     */
    private polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: (centerX + (radius * Math.cos(angleInRadians))),
            y: (centerY + (radius * Math.sin(angleInRadians)))
        };
    }

    /**
     * Generated 'd' value for the arc 
     * @param startAngle Start angle value
     * @param endAngle End angle value
     */
    public getAcr(startAngle, endAngle) {

        var x = this.options.center;
        var y = this.options.center;
        var radius = this.options.radius;

        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    private step(startAngleOffset, angleOffset, startAngle, endAngle, time, endTime) {
        var now = new Date().valueOf();
        var timeOffset = endTime - now;
        var eAngle = endAngle - angleOffset * timeOffset / time;
        var sAngle = startAngle - startAngleOffset * timeOffset / time;
        if (timeOffset <= 0) {
            this.logger.log(`${sAngle}: ${eAngle}`)
            this.updateAngle(sAngle, eAngle);
        } else {
            this.updateAngle(sAngle, eAngle);
            requestAnimationFrame(() => {
                return this.step(startAngleOffset, angleOffset, startAngle, endAngle, time, endTime);
            });
        }
    }

    /**
     * Updates the arc
     * @param startAngle Start angle angle 
     * @param endAngle End angle value
     */
    public updateAngle(startAngle: number, endAngle: number) {
        this.options.endAngle = endAngle;
        this.options.startAngle = startAngle;
        this.checkAngle();
        this.projector.scheduleRender();
    }

    /**
     * Updates the arc
     * @param startAngle Start angle angle 
     * @param endAngle End angle value
     */
    public updateOptions(options:any) {
        this.options = <IDoughnutOptions>{ ...this.options, ...options };
        this.projector.scheduleRender();
    }


    public animateTo(startAngle, angle, time: number = 0) {
        if (angle > 360) {
            angle = angle % 360;
        }
        var startTime = new Date().valueOf();
        var endTime = startTime + time;
        if (startAngleOffset > angleOffset) {
            startAngleOffset = 0;
        }
        var startAngleOffset = startAngle - this.options.startAngle;
        var angleOffset = angle - this.options.endAngle;

        this.step(startAngleOffset, angleOffset, startAngle, angle, time, endTime);
        requestAnimationFrame(() => {
            return this.step(startAngleOffset, angleOffset, startAngle, angle, time, endTime);
        });
    }

}