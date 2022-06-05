import {ValidatorFn} from '@angular/forms';

export interface InputConfig {
    type: string;
    name: string;
    placeholder?: string;
    value?: any;
}

export interface ControlConfig {
    config: InputConfig;
    validators?: ValidatorFn[];
}

export interface FormConfig {
    [controlName: string] : ControlConfig;
}
