import Swal from 'sweetalert2'

export const modalInit = (): void => {
  const employeeModals = document.querySelectorAll('.employee-card');

  employeeModals.forEach((modal) => {
    modal.addEventListener('click', () => {
      Swal.fire({
        showConfirmButton: false,
        html: `
          <div>123123</div>
        `
      })
    })
  });
}
