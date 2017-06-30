/**
 * List component interface
 */
export interface IListComponent {
    refresh(): void;
}

/**
 * Interface for doughnut component values
 */
export interface IListValue {
    percentage: number,
    color: string
}

/**
 * Interface for doughnut component options
 */

export interface IListOptions {
    height?: number;
    data?: Array<any>;
    pageSize?: number;
    autoPage?: boolean;
    template?: string;
}
