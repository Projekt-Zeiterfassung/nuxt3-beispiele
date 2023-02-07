import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentOptionsMixin,
    DefineComponent,
    ExtractPropTypes,
    VNodeProps,
} from 'vue';

export default FontAwesomeIcon as unknown as DefineComponent<
    FontAwesomeIconProps,
    {},
    unknown,
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    {},
    string,
    VNodeProps & AllowedComponentProps & ComponentCustomProps,
    Readonly<ExtractPropTypes<FontAwesomeIconProps>>,
    FontAwesomeIconProps
>;
