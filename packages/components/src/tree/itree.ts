/**
 * Tree component interface
 */
export interface ITreeComponent {
    refresh(): void;
}

/**
 * Interface for doughnut component values
 */
export interface ITreeNode {
    text: string;
    isOpened?: boolean;
    icon?: string[];
    children?: ITreeNode[];
}

/**
 * Interface for doughnut component values
 */
export interface IOptimalTreeNode {
    id: string;
    text: string;
    level: number;
    isOpened?: boolean;
    icon?: string;
}


/**
 * Interface for doughnut component options
 */

export interface ITreeOptions {
    height?: number;
    data?: Array<ITreeNode>;
    pageSize?: number;
    autoPage?: boolean;
    template?: string;

}

export interface IOptimalTreeOptions {
    height?: number;
    data?: IOptimalTreeNode[];
    pageSize?: number;
    autoPage?: boolean;
    template?: string;
    icons?: any,
    caret: boolean
}
