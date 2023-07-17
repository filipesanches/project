const casesNotes = function(){
  const notes = document.querySelector('#notes');
  //cria folha css a aplica no head
  const criaStyle = atr => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = atr;
    return document.head.appendChild(link);
  };
  criaStyle('https://filipesanches.github.io/teste/assets/css/style.css');
  criaStyle('https://fonts.googleapis.com/icon?family=Material+Icons');

  //Inicio Mover note
  const dragElement = elmnt => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = e => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    if (document.getElementById(elmnt.id + 'moove')) {
      document.getElementById(elmnt.id + 'moove').onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    const elementDrag = e => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // Get the window size
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Get the maximum allowed position of the element
      const maxPosX = windowWidth - elmnt.offsetWidth;
      const maxPosY = windowHeight - elmnt.offsetHeight;

      // Set the new position of the element
      const newPosX = elmnt.offsetLeft - pos1;
      const newPosY = elmnt.offsetTop - pos2;
      elmnt.style.left = `${Math.min(Math.max(newPosX, 0), maxPosX)}px`;
      elmnt.style.top = `${Math.min(Math.max(newPosY, 0), maxPosY)}px`;
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };
  dragElement(document.querySelector('#notes'));
  // Fim Mover note

  //Inicio resize
  const resizeWindow = () => {
    const element = document.getElementById('notes');
    const resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'none';
    resizer.style.position = 'absolute';
    resizer.style.right = 0;
    resizer.style.bottom = 0;
    resizer.style.cursor = 'se-resize';
    element.appendChild(resizer);

    const initResize = e => {
      window.addEventListener('mousemove', resize, false);
      window.addEventListener('mouseup', stopResize, false);
    };
    resizer.addEventListener('mousedown', initResize, false);

    const resize = e => {
      const maxWidth = window.innerWidth - element.offsetLeft;
      const maxHeight = window.innerHeight - element.offsetTop;
      const newWidth = Math.min(e.clientX - element.offsetLeft, maxWidth);
      const newHeight = Math.min(e.clientY - element.offsetTop, maxHeight);
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';
    };

    const stopResize = e => {
      window.removeEventListener('mousemove', resize, false);
      window.removeEventListener('mouseup', stopResize, false);
    };
  };
  resizeWindow();
  // Fim resize

  //Controla botoes interface
  const abasButtons = document.querySelectorAll('[data-abas]');
  abasButtons.forEach(aba => {
    aba.addEventListener('click', function () {
      document.querySelectorAll('.destaque').forEach(e => {
        e.classList.remove('destaque');
      });
      aba.classList.add('destaque');
      const abaId = aba.getAttribute('data-abas');
      console.log(abaId);
      const abas = document.querySelectorAll('[id^=content]');
      abas.forEach(abas => {
        abas.classList.remove('exibe');
      });
      const abaa = document.getElementById(abaId);
      console.log(abaa);
      abaa.classList.add('exibe');
    });
  });
  const minimize = document.querySelectorAll('[class*="minimize"]');
  minimize.forEach(e => {
    e.addEventListener('click', function (e) {
      if (e.target.matches('.notes-minimize')) {
        e.target.classList.remove('notes-minimize');
        e.target.classList.remove('material-icons');
      }
      if (e.target.matches('.minimize')) {
        notes.classList.add('notes-minimize');
        notes.classList.add('material-icons');
      }
    });
  });
  //fim Controla botoes interface

  // dados QA
  const dadosQa = fetch('https://filipesanches.github.io/teste/assets/js/dadosqa.json').then(e => e.json());
  dadosQa
    .then(data => {
      data.emailList.forEach((email, i) => {
        const option = document.createElement('option');
        option.value = data.hotkeystr[i];
        option.innerText = email;
        document.querySelector('#substatus-agendamento').appendChild(option);
      });

      const tags = document.querySelector('#tags-implement-agendamento');
      data.tagsImplement.forEach((tag, i) => {
        const p = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `tag-agendamento-${i}`;
        checkbox.name = `tag-agendamento-${i}`;
        checkbox.value = tag;
        const label = document.createElement('label');
        label.setAttribute('for', `tag-agendamento-${i}`);
        label.innerText = tag;
        p.appendChild(checkbox);
        p.appendChild(label);
        tags.appendChild(p);
      });

      const bads = document.querySelector('#bads-agendamento');
      data.badList.forEach((bad, i) => {
        const p = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `bval-agendamento-${i}`;
        checkbox.name = `bval-agendamento-${i}`;
        checkbox.value = data.badvalue[i];
        const label = document.createElement('label');
        label.setAttribute('for', `bval-agendamento-${i}`);
        label.innerText = bad;
        p.appendChild(checkbox);
        p.appendChild(label);
        bads.appendChild(p);
      });
      console.log('Dados QA aplicados!');
    })
    .catch(error => {
      console.log('Ocorreu um erro:', error);
    });
  //Fim dados QA

  //Altera a os email e seleciona hotkey
  document
    .querySelector('#substatus-agendamento')
    .addEventListener('change', e => {
      const hotkey = document.querySelector('#hotkey-agendamento');
      if (
        e.target.value == 'ts in oosu' ||
        e.target.value == 'ts in oos seller'
      ) {
        document.querySelector(
          '#content-1 > #buttons-agendamento > hotkey > h3 > #hotkey-agendamento'
        ).textContent = '';
        document.querySelector(
          '#content-1 > #buttons-agendamento > hotkey > h3 > #hotkey-content-agendamento'
        ).innerHTML =
          '<span style="color: #ff0000;">Atenção envie o email para o anunciante (ts in oosu) e AM (ts in oos seller)</span>';
        console.log('Email para anunciante e AM!');
      } else {
        document.querySelector(
          '#content-1 > #buttons-agendamento > hotkey > h3 > #hotkey-agendamento'
        ).textContent = e.target.value;
        document.querySelector(
          '#content-1 > #buttons-agendamento > hotkey > h3 > #hotkey-content-agendamento'
        ).innerHTML = '';
        console.log(`Substatus alterado: ${e.target.value}`);
      }
    });

  //Começa Gera nota e Email - controle
  const observarElemento = (targetSelector, callback) => {
    const observer = new MutationObserver((mutationsList, observer) => {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        callback();
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const criaNota = text => {
    //seleciana a home do cases
    document
      .querySelector('[debug-id="dock-item-home"]')
      .dispatchEvent(new Event('click', { bubbles: true }));
    //abre o menu cards
    document
      .querySelector('[aria-label="Create a write card"]')
      .dispatchEvent(new Event('focus', { bubbles: true }));
    observarElemento('[aria-label="Create new case note"]', e => {
      //cria a nota
      document
        .querySelector('[aria-label="Create new case note"]')
        .dispatchEvent(new Event('click', { bubbles: true }));
      console.log('Nota Criada!');
      observarElemento('[aria-label="Case Note"]', () => {
        //seleciona todas notas
        const note = document.querySelectorAll('[aria-label="Case Note"]');
        //seleciona ultima nota e insere os dados
        note[note.length - 1].innerHTML = text;
        console.log('Dados da nota inseridos!');
        //fecha o menu cards
        document
          .querySelector('[aria-label="Create a write card"]')
          .dispatchEvent(new Event('blur', { bubbles: true }));
        //salva nota
        setTimeout(() => {
          document.execCommand('insertText', false, ' ');
          return console.log('Nota Salva!');
        }, 500);
      });
    });
  };
  //Começa Gera nota e Email - controle
  // Captura o botão "gerar-note"
  const gerarNoteButton = document.querySelector('#gerar-note-agendamento');
  // Adiciona um ouvinte de evento para o clique no botão
  gerarNoteButton.addEventListener('click', function () {
    document.querySelector('#tag-other-agendamento').value =
      document.querySelector('#tag-other-input-agendamento').value;
    document.querySelector('#bval-other-agendamento').value =
      document.querySelector('#bval-other-input-agendamento').value;
    // Coleta os valores dos campos do formulário
    const sepekeasyValue = document.querySelector(
      '#sepekeasy-agendamento'
    ).value;
    const oncallValue = document.querySelector('#oncal-agendamento').value;
    const substatusValue = document.querySelector(
      '#substatus-agendamento'
    ).value;
    const reasonValue = document.querySelector('#reason-agendamento').value;
    const gravacao_qaValue = document.querySelector(
      '#gravacao_qa-agendamento'
    ).value;
    const gtmValue = document.querySelector('#gtm-agendamento').value;
    const backupValue = document.querySelector('#backup-agendamento').value;
    const assistantValue = document.querySelector(
      '#assistant-agendamento'
    ).value;
    const commentsValue = document.querySelector('#comments-agendamento').value;
    const screenshotsValue = document.querySelector(
      '#screenshots-agendamento'
    ).value;
    const mcidsValue = document.querySelector('#mcids-agendamento').value;
    const selectedLanguageValue = document.querySelector(
      'input[name="language-agendamento"]:checked'
    )
      ? document.querySelector('input[name="language-agendamento"]:checked')
          .value
      : '';
    // Coleta os valores dos checkboxes
    const tagsImplement = Array.from(
      document.querySelectorAll('input[name^="tag"]:checked')
    ).map(checkbox => checkbox.value);

    const badValues = Array.from(
      document.querySelectorAll('input[name^="bval"]:checked')
    ).map(checkbox => checkbox.value);
    const noteHTML = `
     <br>
     <p><b>Date:</b> data teste</p>
     <p><b>Speakeasy ID:</b> ${sepekeasyValue}</p>
     <p><b>On Call( Call Started) signaled on time?:</b> ${oncallValue}</p>
     <p><b>Substatus:</b> ${substatusValue}</p>
     <p><b>Reason/Comments:</b> ${reasonValue}</p>
     <p><b>O anunciante estava de acordo com a gravação da chamada para fins de treinamento e qualidade?:</b> ${gravacao_qaValue}</p>
     <p><b>Implementação feita via GTM ?:</b> ${gtmValue}</p>
     <p><b>Anunciante tinha Backup ?:</b> ${backupValue}</p>
     <p><b>Conversão testada no Tag Assistant?:</b> ${assistantValue}</p>
     <p><b>On Call Comments:</b> ${commentsValue}</p>
     <p><b>Tags Implemented:</b><br> ${tagsImplement.join(', ')}</p>
     <p><b>Screenshots:</b><br> ${screenshotsValue}</p>
     <p><b>Multiple CIDs:</b> ${mcidsValue}</p>
     <p><b>*Bad Lead: </b><br> ${selectedLanguageValue}</p>
   `;

    criaNota(noteHTML);
    // Imprime os valores coletados no console
    console.log('Speakeasy ID:', sepekeasyValue);
    console.log('On Call( Call Started) signaled on time?:', oncallValue);
    console.log('Substatus:', substatusValue);
    console.log('Reason/Comments:', reasonValue);
    console.log(
      'O anunciante estava de acordo com a gravação da chamada para fins de treinamento e qualidade?:',
      gravacao_qaValue
    );
    console.log('Implementação feita via GTM ?:', gtmValue);
    console.log('Anunciante tinha Backup ?:', backupValue);
    console.log('Conversão testada no Tag Assistant?:', assistantValue);
    console.log('On Call Comments:', commentsValue);
    console.log('Tags Implemented:', tagsImplement.join(', '));
    console.log('Screenshots:', screenshotsValue);
    console.log('Multiple CIDs:', mcidsValue);
    console.log('Bad Leads:', badValues.join(', '));
    console.log('Language:', selectedLanguageValue);
    // Aqui você pode fazer o que desejar com os valores coletados, como enviar para um servidor, processar, exibir em uma mensagem, etc.
  });

  //hotkey controle
  const hotkey = document.querySelector('#hotkey-agendamento');
  hotkey.addEventListener('click', function (e) {
    if (e.target.matches('#hotkey-agendamento')) {
      console.log(`Hotkey clicada: ${e.target.textContent}`);
    }
  });
};

const estruturaHTML = fetch('https://filipesanches.github.io/teste/assets/html/estrutura.html').then(e => e.text());
estruturaHTML.then(e => {
  notes.innerHTML = e;
  casesNotes();
  console.log('HTML aplicado!');
});

/*
// Realiza uma requisição fetch para obter o arquivo de texto
fetch('assets/txt/emailpt10min.txt')
  .then(response => {
    // Verifica o status da resposta HTTP
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    // Retorna o conteúdo do arquivo de texto como uma Promise
    return response.text();
  })
  .then(fileContent => {
    // Exibe o conteúdo do arquivo no elemento de saída
    console.log(fileContent);
    document.querySelector('#teste').innerHTML += fileContent;
  })
  .catch(error => {
    // Exibe uma mensagem de erro em caso de falha na requisição
    console.log(error);
  });
*/
