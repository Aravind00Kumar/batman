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