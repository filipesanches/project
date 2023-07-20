'use strict';
const casesNotes = () => {
  //mensagens no console
  const consoleText = text =>
    console.log(`%c${text}`, 'background:#fff; color:#000; font-size:15px');
  const consoleSucess = text =>
    console.log(`%c${text}`, 'background:green; color:yellow; font-size:15px');
  const consoleAlert = text =>
    console.log(`%c${text}`, 'background:yellow; color:red; font-size:15px');
  const consoleError = text =>
    console.log(`%c${text}`, 'background:red; color:yellow; font-size:15px');

  //coleção de eventos pra reuso
  const bubbleEventClick = new Event('click', { bubbles: true });
  const bubbleEventFocus = new Event('focus', { bubbles: true });
  const bubbleEventBlur = new Event('blur', { bubbles: true });
  const bubbleEventInput = new Event('input', { bubbles: true });

  //data Formatada pra utilizar quando precisar
  const dateFormatted = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const dateDDMMAAAA = dateFormatted();

  //cria folha css a aplica no head
  const createStyle = atr => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = atr;
    return document.head.appendChild(link);
  };
  criaStyle('https://filipesanches.github.io/teste/assets/css/style.css');
  criaStyle('https://fonts.googleapis.com/icon?family=Material+Icons');

  //Inicio Mover note
  const dragElement = element => {
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

    if (document.getElementById(element.id + 'moove')) {
      document.getElementById(element.id + 'moove').onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
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
      const maxPosX = windowWidth - element.offsetWidth;
      const maxPosY = windowHeight - element.offsetHeight;

      // Set the new position of the element
      const newPosX = element.offsetLeft - pos1;
      const newPosY = element.offsetTop - pos2;
      element.style.left = `${Math.min(Math.max(newPosX, 0), maxPosX)}px`;
      element.style.top = `${Math.min(Math.max(newPosY, 0), maxPosY)}px`;
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };
  dragElement(notes);

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
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    };
    resizer.addEventListener('mousedown', initResize);

    const resize = e => {
      const maxWidth = window.innerWidth - element.offsetLeft;
      const maxHeight = window.innerHeight - element.offsetTop;
      const newWidth = Math.min(e.clientX - element.offsetLeft, maxWidth);
      const newHeight = Math.min(e.clientY - element.offsetTop, maxHeight);
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';
    };

    const stopResize = e => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    };
  };

  resizeWindow();
  // Fim resize

  //Controla botoes interface
  const tabsButtons = document.querySelectorAll('[data-abas]');
  tabsButtons.forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.destaque').forEach(e => {
        e.classList.remove('destaque');
      });
      tab.classList.add('destaque');
      const tabId = tab.getAttribute('data-abas');
      console.log(tabId);
      const contents = document.querySelectorAll('[id^=content]');
      contents.forEach(e => {
        e.classList.remove('exibe');
      });
      const tabElement = document.getElementById(tabId);
      console.log(tabElement);
      tabElement.classList.add('exibe');
    });
  });

  const minimizeWindowElements = document.querySelectorAll(
    '[class*="minimize"]'
  );
  minimizeWindowElements.forEach(e => {
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

  // carrega e popula dados QA
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
  const observeChanges = callback => {
    return new Promise(resolve => {
      const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
          if (mutation.type === 'childList') {
            Array.from(mutation.addedNodes).forEach(addedNode => {
              if (addedNode instanceof HTMLElement && !addedNode.processed) {
                addedNode.processed = true;
                if (typeof callback == 'function')
                  callback(addedNode, observer);
              }
            });
          }
        });
      });

      observer.observe(document, { childList: true, subtree: true });

      resolve(observer);
    });
  };

  const checkElements = (element, targetTextOrElement) => {
    if (
      element.textContent.includes(targetTextOrElement) ||
      element.querySelector(targetTextOrElement)
    ) {
      return true;
    }

    for (const childElement of element.children) {
      if (checkElements(childElement, targetTextOrElement)) {
        return true;
      }
    }

    return false;
  };

  const actionChanges = (targetTextOrElement, callback) => {
    return new Promise((resolve, reject) => {
      let foundElement = false;

      const observer = observeChanges((modifiedElement, observer) => {
        if (!foundElement && modifiedElement instanceof HTMLElement) {
          consoleSucess('Elemento localizado:');
          console.log(modifiedElement);
          consoleText(`Texto: '${modifiedElement.textContent}'`);

          if (checkElements(modifiedElement, targetTextOrElement)) {
            foundElement = true; //elemento encontrado
            consoleSucess('Encontrou o elemento:');
            console.log(modifiedElement);

            if (typeof callback === 'function') {
              callback(modifiedElement);
            }

            observer.disconnect();
            resolve(modifiedElement);
          }
        }
      });
    });
  };

  const homeCasesElement = document.querySelector(
    '[debug-id="dock-item-home"]'
  ); //home cases elemento

  const buttonCreateWriteCard = document.querySelector(
    '[aria-label="Create a write card"]'
  ); //Botão + do cases abre a nota e email

  //Salva a nota ou emal
  const draftSaved = () => {
    setTimeout(document.execCommand('insertText', false, ' '), 500);
  };

  const setCustumer = () => {
    return new Promise((resolve, reject) => {
      homeCasesElement.click();
      const customerElement = document.querySelector(
        'span[class*="button-text"]'
      );
      if (customerElement.textContent !== 'Customer') {
        customerElement.click();
        actionChanges('Customer', element => {
          const customerOption = element.querySelectorAll(
            'material-select-dropdown-item'
          )[0];
          if (customerOption) {
            customerOption.click();
            consoleSucess('Customer selecionado');
            resolve();
          } else {
            consoleAlert('Option Customer não encontrada');
            resolve();
          }
        });
      } else {
        consoleAlert('Customer já está selecionado');
        resolve();
      }
    });
  };

  const setLanguage = language => {
    homeCasesElement.click();
    const inputLocale = document.querySelector('[aria-label="Locale"]');
    if (inputLocale.value !== language) {
      inputLocale.dispatchEvent(bubbleEventFocus);
      return actionChanges(language).then(() => {
        const languageItems = Array.from(
          document.querySelectorAll('material-select-dropdown-item')
        ).find(e => e.innerHTML.includes(language));

        if (languageItems) {
          languageItems.click();
          inputLocale.dispatchEvent(bubbleEventBlur);
          consoleSucess(`Idioma alterado: ${language}`);
          return actionChanges(`Successfully changed language to ${language}`);
        } else {
          consoleError(`Idioma (${language}) não encontrado!`);
          throw new Error(`Idioma (${language}) não encontrado!`);
        }
      });
    } else {
      consoleAlert(`Idioma ${language} já está selecionado!`);
      return Promise.resolve();
    }
  };

  const createEmail = hotKey => {
    return new Promise((resolve, reject) => {
      buttonCreateWriteCard.dispatchEvent(bubbleEventFocus);
      setTimeout(() => {
        document.querySelector('[aria-label="Create new email"]').click();
        buttonCreateWriteCard.dispatchEvent(bubbleEventBlur);

        setTimeout(() => {
          actionChanges('#email-body-content')
            .then(() => {
              const bodyEmail = document.querySelectorAll(
                '#email-body-content'
              );
              const emailTechnicalSolutions = document.querySelectorAll(
                '[buttoncontent][class*="address"]'
              );
              emailTechnicalSolutions[
                emailTechnicalSolutions.length - 1
              ].click();

              setTimeout(() => {
                document
                  .querySelector(
                    '[id="email-address-id--technical-solutions@google.com"]'
                  )
                  .click();
                const elementCr = document.querySelectorAll(
                  '[debug-id="canned_response_button"]'
                );
                elementCr[elementCr.length - 1].click();
                consoleSucess('Corpo do e-mail criado!');

                return actionChanges('canned-response-dialog')
                  .then(element => {
                    const inputCR = element.querySelector('input');
                    inputCR.value = hotKey;
                    inputCR.dispatchEvent(bubbleEventInput);
                    consoleSucess('hotKey inserida');
                    bodyEmail[bodyEmail.length - 1].innerText = '';
                    return actionChanges('highlight-value');
                  })
                  .then(element => {
                    element.querySelector('highlight-value').click();
                    resolve();
                  });
              }, 500);
            })
            .catch(error => {
              reject(error);
            });
        }, 500);
      }, 500);
    });
  };

  const createNote = textHTML => {
    homeCasesElement.click();
    buttonCreateWriteCard.dispatchEvent(bubbleEventFocus);
    setTimeout(() => {
      document.querySelector('[aria-label="Create new case note"]').click();
      buttonCreateWriteCard.dispatchEvent(bubbleEventBlur);
      consoleSucess('Nota Criada!');
    }, 500);
    actionChanges('case-note-card-content-wrapper', element => {
      element.querySelector('[aria-label="Case Note"]').innerHTML = textHTML;
      consoleSucess('Texto inserido na nota!');
      draftSaved();
    });
  };

  // inicio Gera nota "gerar-note" aba agendamento
  const gerarNoteButton = document.querySelector('#gerar-note-agendamento');
  gerarNoteButton.addEventListener('click', function () {
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

    // Coleta os valores dos checkboxes
    const tagsImplement = Array.from(
      document.querySelectorAll('input[name^="tag"]:checked')
    ).map(checkbox => checkbox.value);
    const badValues = Array.from(
      document.querySelectorAll('input[name^="bval"]:checked')
    ).map(checkbox => checkbox.value);

    //Formato da nota
    const noteHTML = `
     <br>
     <p><b>Date:</b> ${dateDDMMAAAA}</p>
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
     <p><b>*Bad Lead: </b><br> ${badValues}</p>
   `;
    criaNota(noteHTML);
  });
  // fim Gera "gerar-note" aba agendamento

  // comeca Gera email "gerar-note" aba agendamento
  //hotkey controle
  const hotkey = document.querySelector('#hotkey-agendamento');
  hotkey.addEventListener('click', function (e) {
    const selectedLanguageValue = document.querySelector(
      'input[name="language-agendamento"]:checked'
    )
      ? document.querySelector('input[name="language-agendamento"]:checked')
          .value
      : false;
    const hotkeyValue = e.target.textContent;
    consoleSucess(`Hotkey clicada: ${e.target.textContent}`);
    if (selectedLanguageValue && hotkeyValue != '-') {
      setCustumer()
        .then(() => setLanguage(selectedLanguageValue))
        .then(() => {
          consoleSucess('Próximo passo');
          return createEmail(hotkeyValue);
        })
        .then(() => {
          consoleSucess('Todas as etapas foram concluídas.');
        })
        .catch(error => {
          consoleError('Erro:', error);
        });
    } else if (hotkeyValue != '-') {
      setCustumer()
        .then(() => {
          consoleSucess('Próximo passo');
          return createEmail('ts as new');
        })
        .then(() => {
          consoleSucess('E-mail criado com sucesso.');
        })
        .catch(error => {
          consoleError('Erro:', error);
        });
    }
  });
  // fim Gera email "gerar-note" aba agendamento
};
//Fim Gera nota e Email - controle
const estruturaHTML = fetch('https://filipesanches.github.io/teste/assets/html/estrutura.html').then(e => e.text());
estruturaHTML.then(e => {
  notes.innerHTML = e;
  casesNotes();
  console.log('HTML aplicado!');
});

