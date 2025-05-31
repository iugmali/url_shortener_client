const pUrl = document.getElementById('url');

Swal.fire({
  title: 'URL',
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
  confirmButtonText: 'Shrink the URL\n',
  confirmButtonColor: '#351151',
  showLoaderOnConfirm: true,
  preConfirm: async (link) => {
    try {
      if (link.trim() === '') {
        Swal.showValidationMessage(`Não é um link válido`);
      }
      const response = await fetch(link, {mode: 'no-cors'});
      if (!(response.ok || response.status === 0)) {
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
  pUrl.innerText = data.data.shortUrl;
  await navigator.clipboard.writeText(data.data.shortUrl);

  Swal.fire({
    text: `O link gerado já foi copiado`,
    color: 'white',
    showConfirmButton: false,
    background: '#340634',
    timer: 1500,
    timerProgressBar: true,
    toast: true,
    position: 'center',
  });
});
