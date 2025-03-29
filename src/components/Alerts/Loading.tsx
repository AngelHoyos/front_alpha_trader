import Swal from 'sweetalert2'

export const Loading = (mensaje:string='Cargando...') => {
  Swal.fire({
    title:mensaje,
    allowOutsideClick:false,
    didOpen:()=>{
        Swal.showLoading();
    },
  });
}

export const closeLoading = ()=>{
    Swal.close()
}