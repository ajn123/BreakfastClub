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

export interface Questionnaire {
    id: number;
    user_id: number;
    // Add other questionnaire fields here
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    questionnaire?: Questionnaire | null;
    // Add other relationships as needed
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
