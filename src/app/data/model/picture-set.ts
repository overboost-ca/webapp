import { Picture } from './picture';

/**
 * Picture set descriptor.
 */
export interface PictureSet {
    /** Page title. */
    title: string,

    /** Publishing date. */
    date: Date,

    /** Document introduction section. */
    intro?: string,

    /** Slides. */
    pictures: Picture[]
}
