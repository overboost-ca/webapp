import { Document } from './document';

/**
 * Document category descriptor.
 */
export interface Category {
    /** Category display name. */
    name: string,

    /** List of documents. */
    documents: Document[]
}
