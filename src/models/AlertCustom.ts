export interface AlertCustomProps{
    id:any;
    tipoAlerta:any;
    titulo:string;
    mensaje:string;
    estadoBotonCancelar?:boolean;
    mensajeConfirmar?:string;
    mensajeCancelar?:string;
}