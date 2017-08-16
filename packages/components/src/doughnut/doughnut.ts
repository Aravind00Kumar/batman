import { BaseComponent, ProjectorOptions, VNode, h, hParser } from './../libs';

/**
 * Doughnut component interface
 */
export interface IDoughnutComponent {
    updateAngle(startAngle, angle): void;
    updateOptions(IDoughnutOptions): void
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
    image?: string,
    values?: Array<IDoughnutValue>,
    title?: string,
    size?: number
}


export class Doughnut extends BaseComponent<IDoughnutOptions> implements IDoughnutComponent {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: IDoughnutOptions = {
        stroke: 10,
        startAngle: 0,
        endAngle: 0,
        sectorColor: '#789',
        circleColor: '#DDD',
        image: '',
        values: <Array<IDoughnutValue>>[],
        title: '',
        size: 200
    }

    // Private Properties
    private _scale: number;
    private _strokeScale: number;
    private _center: number;
    private _radius: number;
    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(element: HTMLElement, options?: IDoughnutOptions) {
        super('Doughnut', element, { ...Doughnut.defaultOptions, ...options }, <ProjectorOptions>{ namespace: 'NAMESPACE_SVG' });

        this._scale = 70;
        this._strokeScale = 0;
        this._center = 50;
        this._radius = this.options.stroke ? this._center - this.options.stroke / 2 : this._center;

        if (!this.validateValues()) return;
        this.projector.append(this.element, this.render.bind(this));
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    private render(): VNode {
        return h('div.doughnut-component.parent',
            { style: `min-height:${this.options.size}px; min-width:${this.options.size}px` }, [
                h('div.child', {
                    'style': `transition: ${this.animationSpeed}; transform:scale(${1 - (this.options.stroke) / this._scale})`
                }, [h('img', { src: this.options.image, style: this.options.image ? 'display:block' : 'display:none' }),
                h('div.head.flex', [this.options.title])]),
                h('div.child', {
                    key: this.options.title,
                    'tip': this.options.title,
                    'tip-pos': 'top',
                    onmouseenter: this.mouseEnter.bind(this),
                    onmouseleave: this.mouseExit.bind(this)
                }, [
                        h('svg', { class: 'doughnut-component', viewBox: '0 0 100 100' }, [
                            h('circle', {
                                'stroke-width': this.options.stroke,
                                stroke: this.options.circleColor,
                                cx: this._center,
                                cy: this._center,
                                r: this._radius
                            }), this.valuesTemplate()
                        ])
                    ])
            ]);
    }
    /**
     * Validation method for values; values will be invalid when  values property in the options together should not exceed 100 
     */
    private validateValues(): boolean {
        if (this.options.values.length > 0) {
            let sum = 0;
            for (let index = 0; index < this.options.values.length; index++) {
                let element = this.options.values[index];
                sum += element.percentage;
            }
            if (sum > 100) {
                this.logger.error('Doughnut sum of percentages values should be less than or equal to 100%');
                return false;
            } else if (sum < 100) {
                this.options.values.push(<IDoughnutValue>{ percentage: 100 - sum, color: this.options.circleColor })
            }
        }
        return true;
    }

    /**
     * Generates H template from values or angles
     */
    private valuesTemplate(): Array<VNode> | VNode {
        if (this.options.values.length > 0) {
            return this.options.values.map((item, index) => {
                this.options.startAngle = this.options.endAngle;
                let p = (item.percentage * 360) / 100;
                this.options.endAngle = p + this.options.startAngle;
                return h('path', {
                    kay: index,
                    'stroke-width': this.options.stroke,
                    stroke: item.color,
                    d: this.getAcr(this.options.startAngle, this.options.endAngle)
                });
            });
        } else return h('path', {
            'stroke-width': this.options.stroke,
            stroke: this.options.sectorColor,
            d: this.getAcr(this.options.startAngle, this.options.endAngle)
        });
    }

    private mouseEnter() {
        this._scale = 90;
    }

    private mouseExit(ev) {
        this._scale = 70;
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
    private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
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
    public getAcr(startAngle: number, endAngle: number) {
        let start = this.polarToCartesian(this._center, this._center, this._radius, endAngle);
        let end = this.polarToCartesian(this._center, this._center, this._radius, startAngle);
        let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M${start.x} ${start.y} A${this._radius} ${this._radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
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
    public updateOptions(options: IDoughnutOptions) {
        this.options = <IDoughnutOptions>{ ...this.options, ...options };
        this.projector.scheduleRender();
    }

}