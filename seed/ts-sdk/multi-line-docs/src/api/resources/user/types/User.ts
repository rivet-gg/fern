/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * A user object. This type is used throughout the following APIs:
 *
 * - createUser
 * - getUser
 */
export interface User {
    id: string;
    /**
     * The user's name. This name is unique to each user. A few examples are included below:
     *
     * - Alice
     * - Bob
     * - Charlie
     */
    name: string;
    /** The user's age. */
    age?: number;
}