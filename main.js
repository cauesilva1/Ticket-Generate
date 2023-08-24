  import html2canvas from '/html2canvas/dist/html2canvas.esm.js';



  const input = document.querySelector('#username');
  const inputsemestre = document.querySelector('#semestre');
  const button = document.querySelector('#gerarticket');


  const nameElement = document.querySelector('#name');
  const semestreElement = document.querySelector('#semestreinput');
  const photoElement = document.querySelector('#photo');
  const errorElement = document.querySelector('#error');


  const buttonDownload = document.querySelector('#Download');

  let data;

  button.addEventListener('click', async () => {
    console.log('chegou');
    const username = input.value;
    const response = await fetch(`https://api.github.com/users/${username}`);
    data = await response.json();
    const name = data.name;
    const semestre = inputsemestre.value;
    const photo = data.avatar_url;

  console.log(data)


    if (data !== undefined && data.message === 'Not Found' && input.value == '') {
      errorElement.style.display = 'block';
      nameElement.style.display = 'block';
      photoElement.style.display = 'block';
    } else {
      console.log('chegou2');
      errorElement.style.display = 'none';
      nameElement.style.display = 'block';
      photoElement.style.display = 'block';
      buttonDownload.style.display = 'block';
      nameElement.innerHTML = name;
      semestreElement.innerHTML = semestre;
      photoElement.setAttribute('src', photo);
    }
  });


  buttonDownload.addEventListener('click', async () => {
    console.log('chegou3');
  
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
      
      console.log('chegou4');
    });
  });

  


