import Swal from 'sweetalert2'
import { SweetAlertIcon } from 'sweetalert2'

function Toast ( icon?: SweetAlertIcon | undefined, title?: string | undefined, text?: string | undefined) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })

  return Toast.fire({
    icon,
    title,
    text
  })
}

export default Toast
