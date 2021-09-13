import Swal from 'sweetalert2'

export const SwalError = ({ text = 'Error' }: { text?: string }) => {
  return Swal.fire({
    title: 'Error!',
    text: text,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

export const SwallSuccess = async ({ title = "Success", text = "Data has been saved" }: { title?: string; text?: string; }) => {
  return await Swal.fire({
    icon: "success",
    title,
    text,
  }).then((result) => {
    return result
  })
}
