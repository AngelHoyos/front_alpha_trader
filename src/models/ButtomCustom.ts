import { IconDefinition } from './../../node_modules/@fortawesome/fontawesome-common-types/index.d';
export interface ButtonCustomProps{
    className?: string;
    text:string;
    onClick:()=>void;
    disabled?:boolean;
    fullWidth?:boolean;
    icon?:IconDefinition
}