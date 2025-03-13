export interface InputCustomProps{
    label: string;
    name: string;
    type?:string;
    value:any;
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
    fullWidth?:boolean;
    InputLabelProps?:boolean;
    error?:boolean;
    helperText?:string;
};