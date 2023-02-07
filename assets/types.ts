import { IconDefinition } from '@fortawesome/pro-duotone-svg-icons';

// UI --------------------------------------------------------------

// Nav

export interface NavLink {
    icon: IconDefinition;
    text: string;
    props?: { [key: string]: any };
    iconProps?: { [key: string]: any };
}

export interface NavApp {
    icon: string | IconDefinition;
    name: string;
    extern?: boolean;
    props?: Record<string, any>;
    iconProps?: Record<string, any>;
    badges?: { text: string; ping?: boolean; attrs?: Record<string, any> }[];
}

// Files

// School Notes ----------------------------------------------------

interface SchoolNote {
    title: string;
    important: boolean;
    subject: string;
    date: string;
    content: string;
}

export interface SchoolNoteSelect extends SchoolNote {
    id: string;
    done: boolean;
    public: string;
    files: { filename: string; filetype: string }[];
    owner: string;
}

export interface SchoolNoteCreate extends SchoolNote {
    files: File[];
}

export interface SchoolNoteUpdate extends SchoolNote {
    id: string;
    filesToUpload?: File[];
    filesToDelete?: string[];
    done: boolean;
}

