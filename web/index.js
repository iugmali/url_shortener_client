const detectedLanguage = navigator.language.slice(0, 2);
const supportedLanguages = ['en', 'pt', 'es', 'fr'];
const language = supportedLanguages.includes(detectedLanguage) ? detectedLanguage : 'en';

const phrases = {
  en: {
    title: 'URL Shortener',
    description: 'Shorten your URLs easily with Nosmove.',
    invalidUrl: 'Please input a valid URL',
    shrinkUrlButton: 'Shrink the URL\n',
    newUrlbutton: 'Shrink another URL',
    failedToFetch: 'Failed to fetch. Ensure you are running it from app.nosmove.com',
    tryAgain: 'Try again',
  },
  pt: {
    title: 'Encurtador de URL',
    description: 'Encurte suas URLs facilmente com o Nosmove.',
    invalidUrl: 'Please input a valid URL',
    shrinkUrlButton: 'Encurtar URL\n',
    newUrlbutton: 'Encurtar outra URL',
    failedToFetch: 'Falha ao buscar. Certifique-se de que está executando a partir de app.nosmove.com',
    tryAgain: 'Tentar novamente',
  },
  es: {
    title: 'Acortador de URL',
    description: 'Acorta tus URLs fácilmente con Nosmove.',
    invalidUrl: 'Por favor, ingresa una URL válida',
    shrinkUrlButton: 'Acortar URL\n',
    newUrlbutton: 'Acortar otra URL',
    failedToFetch: 'Error al obtener. Asegúrate de que lo estás ejecutando desde app.nosmove.com',
    tryAgain: 'Inténtalo de nuevo',
  },
  fr: {
    title: 'Raccourcisseur d\'URL',
    description: 'Raccourcissez vos URLs facilement avec Nosmove.',
    invalidUrl: 'Veuillez saisir une URL valide',
    shrinkUrlButton: 'Raccourcir l\'URL\n',
    newUrlbutton: 'Raccourcir une autre URL',
    failedToFetch: 'Échec de la récupération. Assurez-vous de l\'exécuter depuis app.nosmove.com',
    tryAgain: 'Réessayer',
  }
}

const pUrl = document.getElementById('url');
const newUrlButton = document.getElementById('newUrl');


const fireSwal = () => {
  Swal.fire({
    title: phrases[language].title,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    padding: '3rem',
    color: 'white',
    background: '#340634',
    backdrop: 'rgba(255,255,255,0.1)',
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonText: phrases[language].shrinkUrlButton,
    confirmButtonColor: '#351151',
    showLoaderOnConfirm: true,
    preConfirm: async (link) => {
      try {
        if (link.trim() === '') {
          Swal.showValidationMessage(phrases[language].invalidUrl);
        }
        const response = await fetch(link, {mode: 'no-cors'});
        if (!(response.ok || response.status === 0)) {
          Swal.showValidationMessage(phrases[language].invalidUrl);
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
    pUrl.innerHTML = data.data.shortUrl;
    newUrlButton.innerHTML = phrases[language].newUrlbutton;

    await navigator.clipboard.writeText(data.data.shortUrl);

    Swal.fire({
      text: `Link copied to clipboard!`,
      color: 'white',
      showConfirmButton: false,
      background: '#340634',
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-right',
    });
  }).catch((e) => {
    pUrl.innerHTML = `<a href="/" target="_blank" rel="noopener noreferrer">${phrases[language].tryAgain}</a>`;
    Swal.fire({
      title: 'Error',
      text: phrases[language].failedToFetch,
      icon: 'error',
      confirmButtonText: 'OK',
      background: '#e04949',
      color: 'white',
    });
  });
}

fireSwal();