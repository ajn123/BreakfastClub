/// <reference types="react" />

import '@inertiajs/react'
import 'framer-motion'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

import { Config } from 'ziggy-js';

export type LocationPreference = 'NW' | 'NE' | 'SW' | 'SE' | 'NOVA' | 'MD';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    // Add other relationships as needed
    created_at: string;
    updated_at: string;
}

export interface QuestionAnswer {
    question_id: number;
    answer: string;
    options: string[];
}
// PageProps is a generic type that defines the shape of props passed to pages in the application
// T is a generic parameter that defaults to Record<string,unknown> (an object with string keys and unknown values)
// The type extends T with additional required properties:

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    // auth contains the authenticated user information
    auth: {
        user: User; // User type defined above
    };
    // ziggy contains route configuration and current location
    ziggy: Config & { location: string };
    // toast contains flash message data for notifications
    toast: {
        message: string; // The message to display
        type: 'success' | 'error'; // The type of toast message
    };
};
