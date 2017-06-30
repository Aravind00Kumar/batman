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
    text: string,
    isOpened?: boolean,
    icon?: Array<string>,
    children?: Array<ITreeNode>
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
