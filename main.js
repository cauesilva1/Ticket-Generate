const input = document.querySelector('#username');
const inputsemestre = document.querySelector('#semestre');
const button = document.querySelector('#gerarticket');


const nameElement = document.querySelector('#name');
const semestreElement = document.querySelector('#semestreinput');
const photoElement = document.querySelector('#photo');
const errorElement = document.querySelector('#error');


const buttonDownload = document.querySelector('#Download');


button.addEventListener('click', async () => {
  const username = input.value;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  const name = data.name;
  const semestre = inputsemestre.value;
  const photo = data.avatar_url;




  if (data !== undefined && data.message === 'Not Found' && input.value == '') {
    errorElement.style.display = 'block';
    nameElement.style.display = 'block';
    photoElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
    nameElement.style.display = 'block';
    photoElement.style.display = 'block';
    buttonDownload.style.display = 'block';
    nameElement.innerHTML = name;
    semestreElement.innerHTML = semestre;
    photoElement.setAttribute('src', photo);
  }
});


buttonDownload.addEventListener('click', () => {

  console.log('chegou');

  const ticket = document.querySelector('#ticket');

  const options = {
    margin:       [10,10,10,10],
    filename:     'ticket.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  // html2pdf().set(options).from(ticket).save();
  html2pdf().set(options).from(ticket).save();

  console.log(html2pdf().set(options).from(ticket).save());

  console.log('chegou2');

})

 


