/**
 * One picture slide.
 */
export interface Picture {
    /** Filename */
    path: string,

    /** Title text. */
    title: string,

    /** Publishing date. */
    date: Date,

    /** Image width. */
    width?: number,

    /** Image height. */
    height?: number,

    /** Description text. */
    description?: string
}
