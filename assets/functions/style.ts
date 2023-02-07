type colors =
    | 'white'
    | 'black'
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';

type colorsSteps = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type singleColors =
    | 'current'
    | 'transparent'
    | 'primary'
    | 'primary-light'
    | 'vue-green'
    | 'vue-gray';

export type accent = `${singleColors}` | `${colors}-${colorsSteps}`;

export function convertStyle(style?: { [key: string]: string }): string {
    if (!style) return '';
    return Object.keys(style).reduce((previous, current) => {
        return previous + current + ':' + style[current] + ';';
    }, '');
}