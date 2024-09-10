const pUrl = document.getElementById('url');

Swal.fire({
  title: 'Link para encurtar',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  padding: '3rem',
  color: 'white',
  background: '#340634',
  backdrop: 'rgba(255,255,255,0.4)',
  allowOutsideClick: false,
  showCancelButton: false,
  confirmButtonText: 'ENTRAR',
  confirmButtonColor: '#351151',
  showLoaderOnConfirm: true,
  preConfirm: async (link) => {
    try {
      if (link.trim() === '') {
        Swal.showValidationMessage(`Não é um link válido`);
      }
      const response = await fetch(link);
      if (!response.ok) {
        Swal.showValidationMessage(`Não é um link válido`);
      }
    } catch (error) {
    }
  },
}).then(async (result) => {
  const response = await fetch("https://nosmove.com/urls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      longUrl: result.value
    })
  });
  const data = await response.json();
  pUrl.innerText = JSON.stringify(data);
});
