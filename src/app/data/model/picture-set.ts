import { Picture } from './picture';

/**
 * Picture set descriptor.
 */
export interface PictureSet {
    /** Original path. */
    path: string,

    /** Page title. */
    title: string,

    /** Publishing date. */
    date: Date,

    /** Document introduction section. */
    intro?: string,

    /** Slides. */
    pictures: Picture[]
}
