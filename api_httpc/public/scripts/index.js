const form = [...document.getElementsByClassName('body-form')];
const tANumber = [...document.getElementsByClassName('tx-number')];
const tABody = [...document.getElementsByClassName('tx-body')];
let isJsonError = false;

tABody.forEach((body_) =>
  body_.addEventListener('scroll', (e) => {
    getTANum(body_).scrollTop = body_.scrollTop;
  })
);

tABody.forEach((body_) => body_.addEventListener('keyup', (e) => { }));

const getTANum = (body) => {
  for (const ten of tANumber) {
    if (ten.id === body.id) {
      return ten;
    }
  }
};

tABody.forEach((body_) =>
  body_.addEventListener('input', (e) => {
    try {
      const parseJSON = JSON.parse(e.target.value);
      const JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);

      e.target.value = JSONInPrettyFormat;

      body_.style.color = 'white';
      body_.style.backgroundColor = 'black';
      getTANum(body_).style.color = 'white';
      getTANum(body_).style.backgroundColor = 'black';
      isJsonError = false;
    } catch {
      isJsonError = true;
      body_.style.color = 'red';
      body_.style.backgroundColor = '#ffa1a1';
      getTANum(body_).style.color = 'red';
      getTANum(body_).style.backgroundColor = '#ffa1a1';
    }

    let rows = body_.value.split('\n').length;
    let msj = '';
    for (let i = 0; i < rows; i++) {
      msj += i + 1 + '\n';
    }
    getTANum(body_).innerHTML = msj;
  })
);

function submit(event) {
  event.preventDefault();

  let isfetch = true;
  const loading = event.target.querySelector('.ld-dual-ring');
  const btnSubmit = event.target.querySelector('.btn-submit');
  const father = event.target.parentNode;

  const bcr = father.querySelector('.body-container-result');
  const statusCode = bcr.querySelector('.text-status-code');
  const copy = bcr.querySelector('.copy');
  const result = bcr.querySelector('.result');

  copy.addEventListener('click', function () {
    result.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('¡Contenido copiado!');
  });

  bcr.style.display = 'none';
  btnSubmit.style.pointerEvents = 'none';
  btnSubmit.style.color = '#aeaeaec2';
  btnSubmit.style.backgroundColor = '#373737c2';
  loading.style.display = 'block';

  const formData = new FormData(event.target);

  let url = '';
  let httpMethod = 'get';
  let body = null;

  for (const [key, value] of formData.entries()) {
    if (key === 'url') url = value;
    else if (key === 'http-method') httpMethod = value;
    else if (key.includes('paramn-')) {
      const newkey = key.replace('paramn-', '');
      url = url.replace(`:${newkey}`, value);
      if (value === '') isfetch = false;
    } else if (key === 'tx-body-post') {
      if (value === '') isfetch = false;
      body = value;
    }
  }

  if (isfetch && !isJsonError) {
    setTimeout(() => {
      _fetch(url, httpMethod, body)
        .then((response) => {
          bcr.style.display = 'grid';
          bcr.style.borderColor = getColorByStatusCode(response.status);
          bcr.style.boxShadow = 'inset 0px 0px 10px 5px ' + getColorByStatusCode(response.status);
          statusCode.innerHTML = `${response.statusText}  `;
          statusCode.innerHTML += `${response.status}`;

          if (!response.ok) {
            // throw new Error(');
            console.log('Error al recuperar el HTML');
          }

          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then((data) => {
          result.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch((err) => {
          console.log('fetch: ', err);
          bcr.style.borderColor = '#ff0000';
          //result.style.backgroundColor = '#f90000c2';
          result.innerHTML =
            'Hubo un problema con la petición Fetch: ' + err.message;
        })
        .finally(() => {
          loading.style.display = 'none';
          btnSubmit.style.color = '#ffffff';
          btnSubmit.style.backgroundColor = '#000000';
          btnSubmit.style.pointerEvents = 'auto';
        });
    }, 1000);
  } else {
    loading.style.display = 'none';
    btnSubmit.style.pointerEvents = 'auto';
    btnSubmit.style.color = '#ffffff';
    btnSubmit.style.backgroundColor = '#000000';
    statusCode.innerHTML = '';
    alert('All the fild required');
  }
}

function getColorByStatusCode(statusCode) {
  if (statusCode >= 200 && statusCode < 300) return '#09ff0d';
  else if (statusCode >= 300 && statusCode < 400) return '#002ef9f8';
  else if (statusCode >= 400 && statusCode < 500) return '#f90000';
  else if (statusCode >= 500) return '#606060';
  else return 'transparent';
}

function _fetch(url, httpMethod, body) {
  return fetch(url, {
    method: httpMethod,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: body,
  });
}

form.forEach((form_) => form_.addEventListener('submit', submit, false));
