  import html2canvas from '/html2canvas/dist/html2canvas.esm.js';

  const input = document.querySelector('#username');
  const inputsemestre = document.querySelector('#semestre');
  const inputra = document.querySelector('#ra');
  const button = document.querySelector('#gerarticket');

  const nameElement = document.querySelector('#name');
  const semestreElement = document.querySelector('#semestreinput');
  const raElement = document.querySelector('#rainput');
  const photoElement = document.querySelector('#photo');
  const errorElement = document.querySelector('#error');

  const buttonDownload = document.querySelector('#Download');

  let data;

  button.addEventListener('click', async () => {

    const username = input.value;
    const response = await fetch(`https://api.github.com/users/${username}`);
    data = await response.json();
    const name = data.name;
    const semestre = inputsemestre.value;
    const ra = inputra.value;
    const photo = data.avatar_url;


    if (data !== undefined && data.message === 'Not Found' || input.value == '') {

      const [name, setName] = useState("");
      const [ra, setRa] = useState("");
      const [converter, setConverter] = useState("");


      nameElement.style.display = 'block';
      photoElement.style.display = 'block';
      raElement.style.display = 'block';
      buttonDownload.style.display = 'block';

      nameElement.innerHTML = username;
      semestreElement.innerHTML = semestre;
      raElement.innerHTML = ra;
      photoElement.setAttribute('src', photodefault);

    } else {

      errorElement.style.display = 'none';
      nameElement.style.display = 'block';
      photoElement.style.display = 'block';
      raElement.style.display = 'block';
      buttonDownload.style.display = 'block';

      nameElement.innerHTML = name;
      semestreElement.innerHTML = semestre;
      raElement.innerHTML = ra;
      photoElement.setAttribute('src', photo);

    }

  });


  buttonDownload.addEventListener('click', async () => {
  
    // Carregar a imagem
    const image = new Image();
    image.crossOrigin = "Anonymous"; // Define a política de mesma origem para a imagem
    image.src = data.avatar_url;
  
    // Esperar pelo carregamento da imagem
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
  
    // Agora que a imagem está carregada, podemos continuar com o html2canvas
    html2canvas(document.querySelector("#ticket"), { useCORS: true }).then(canvas => {
      const imageURL = canvas.toDataURL("image/png");
  
      const downloadLink = document.createElement("a");
      downloadLink.href = imageURL;
      downloadLink.download = "ticket.png";
  
      // Anexe o link ao corpo do documento
      document.body.appendChild(downloadLink);
  
      // Simule um clique no link para iniciar o download
      downloadLink.click();
  
      // Remova o link após o clique ser simulado
      document.body.removeChild(downloadLink);

    });
  });

  


