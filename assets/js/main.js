const casesNotes = () => {
  //Elementos de reuso
  const homeCasesElement = document.querySelector('[debug-id="dock-item-home"]'); //home do cases elemento
  const buttonCreateWriteCard = document.querySelector('[aria-label="Create a write card"]'); //Botão + do cases abre a nota e email
  let dataCase; // Variável para acessar objeto com dados do case
  let speakeasyIDCase = []; //ID speakeasy

  //coleção de eventos pra reuso
  const bubbleEventClick = new Event('click', { bubbles: true });
  const bubbleEventFocus = new Event('focus', { bubbles: true });
  const bubbleEventBlur = new Event('blur', { bubbles: true });
  const bubbleEventInput = new Event('input', { bubbles: true });

  //mensagens no console colorida e com texto grande e colorido para testes
  const consoleText = text => console.log(`%c${text}`, 'background:#fff; color:#000; font-size:15px');
  const consoleSucess = text => console.log(`%c${text}`, 'background:green; color:yellow; font-size:15px');
  const consoleAlert = text => console.log(`%c${text}`, 'background:yellow; color:red; font-size:15px');
  const consoleError = text => console.log(`%c${text}`, 'background:red; color:yellow; font-size:15px');

  //Função para formatar data dd/mm/aaaa
  const formatData = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //Função para criar folha de estilo css a aplicar no head
  const createStyle = atribute => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = atribute;
    return document.head.appendChild(link);
  };

  //Função para mover o elemento
  const dragElement = element => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    // Função chamada quando o mouse é pressionado sobre o elemento arrastável
    const dragMouseDown = e => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };
    // Verifica se existe um elemento com o id do elemento arrastável seguido de 'moove'
    // Se existir, permite arrastar o elemento por esse elemento secundário, caso contrário, permite arrastar o próprio elemento
    if (document.getElementById(element.id + 'moove')) {
      document.getElementById(element.id + 'moove').onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
    }
    // Função chamada enquanto o mouse é movido após o pressionamento inicial
    const elementDrag = e => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Obter o tamanho da janela
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      // Obter a posição máxima permitida do elemento
      const maxPosX = windowWidth - element.offsetWidth;
      const maxPosY = windowHeight - element.offsetHeight;
      // Defina a nova posição do elemento dentro dos limites da janela
      const newPosX = element.offsetLeft - pos1;
      const newPosY = element.offsetTop - pos2;
      element.style.left = `${Math.min(Math.max(newPosX, 0), maxPosX)}px`;
      element.style.top = `${Math.min(Math.max(newPosY, 0), maxPosY)}px`;
    };
    // Função chamada quando o mouse é liberado, parando o arraste
    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };

  //Função para alterar o tamanho do elemento
  const resizeWindow = element => {
    // Cria um elemento 'div' para ser o redimensionador
    const resizer = document.createElement('div');
    resizer.className = 'resizer'; // Define uma classe para o redimensionador (pode ser estilizado usando CSS)
    resizer.style.width = '10px'; // Define a largura do redimensionador
    resizer.style.height = '10px'; // Define a altura do redimensionador
    resizer.style.background = 'none'; // Define o plano de fundo do redimensionador (pode ser estilizado com cores)
    resizer.style.position = 'absolute'; // Define a posição como absoluta
    resizer.style.right = 0; // Alinha o redimensionador à direita
    resizer.style.bottom = 0; // Alinha o redimensionador à parte inferior
    resizer.style.cursor = 'se-resize'; // Define o cursor do mouse ao passar sobre o redimensionador
    element.appendChild(resizer); // Adiciona o redimensionador como filho do elemento alvo
    // Função chamada quando o mouse é pressionado sobre o redimensionador
    const initResize = e => {
      window.addEventListener('mousemove', resize); // Escuta o evento de movimento do mouse para redimensionar
      window.addEventListener('mouseup', stopResize); // Escuta o evento de liberação do mouse para parar o redimensionamento
    };
    resizer.addEventListener('mousedown', initResize); // Escuta o evento de pressionamento do mouse no redimensionador
    // Função chamada durante o movimento do mouse após o pressionamento inicial
    const resize = e => {
      const maxWidth = window.innerWidth - element.offsetLeft; // Largura máxima permitida do elemento
      const maxHeight = window.innerHeight - element.offsetTop; // Altura máxima permitida do elemento
      const newWidth = Math.min(e.clientX - element.offsetLeft, maxWidth); // Nova largura calculada
      const newHeight = Math.min(e.clientY - element.offsetTop, maxHeight); // Nova altura calculada
      element.style.width = newWidth + 'px'; // Define a largura do elemento
      element.style.height = newHeight + 'px'; // Define a altura do elemento
    };
    // Função chamada quando o mouse é liberado, parando o redimensionamento
    const stopResize = e => {
      window.removeEventListener('mousemove', resize); // Remove o ouvinte do evento de movimento do mouse
      window.removeEventListener('mouseup', stopResize); // Remove o ouvinte do evento de liberação do mouse
    };
  };

  // Função que trata a exibição do conteúdo de acordo com a aba selecionada
  const handleTabClick = tabId => {
    // Remove a classe 'highlight' de todos os botões das abas
    document.querySelectorAll('.highlight').forEach(tabButton => {
      tabButton.classList.remove('highlight');
    });
    // Adiciona a classe 'highlight' ao botão da aba selecionada
    const selectedTabButton = document.querySelector(`[data-abas="${tabId}"]`);
    selectedTabButton.classList.add('highlight');
    // Esconde todos os conteúdos exibidos anteriormente
    document.querySelectorAll('[id^="content"]').forEach(contentElement => {
      contentElement.classList.remove('show');
    });
    // Exibe o conteúdo correspondente à aba selecionada
    const selectedTabContent = document.getElementById(tabId);
    if (selectedTabContent) {
      selectedTabContent.classList.add('show');
    }
  };

  // Função para criar um popup com o conteúdo passado
  const createPopup = contentPopUp => {
    // cria uma div pai
    const popupDivFather = document.createElement('div');
    popupDivFather.classList.add('popup-alert-father');
    // cria uma div filho
    const popupDiv = document.createElement('div');
    popupDiv.classList.add('popup-alert');
    // insere a div filho no pai
    popupDivFather.appendChild(popupDiv);
    // Criando o botão de fechamento
    const closeButton = document.createElement('button');
    closeButton.classList.add('button-success');
    closeButton.textContent = 'Confirmo';
    // Adicionando um ouvinte de evento ao botão de fechamento para remover o popup
    closeButton.addEventListener('click', () => {
      popupDivFather.remove();
    });
    // Adicionando o conteúdo do popup ao div
    popupDiv.innerHTML = contentPopUp;
    popupDiv.appendChild(closeButton); // Adicionando o botão de fechamento ao div
    notes.appendChild(popupDivFather);
  };
  // Função para exibir o popup
  const showPopup = data => {
    // Faz uma requisição assíncrona para obter o conteúdo do popup a partir de um arquivo HTML
    fetch(`https://filipesanches.github.io/teste/assets/html/template_popup/${data}.html`)
      .then(response => {
        // Verifica se a requisição foi bem sucedida
        if (!response.ok) {
          throw new Error('Erro ao carregar conteúdo do popup');
        }
        // Retorna o conteúdo do popup como texto
        return response.text();
      })
      .then(contentPopUp => {
        // Verifica se o conteúdo do popup contém o identificador "id="popup-important""
        if (contentPopUp.includes('id="popup-important"')) {
          // Se contém, cria o popup com o conteúdo obtido
          createPopup(contentPopUp);
        }
      })
      .catch(error => {
        // Trata erros que possam ocorrer durante o processo
        console.log('Ocorreu um erro:', error);
      });
  };

  //Função reseta inputs text area e select
  const resetFields = () => {
    // Obtém todos os elementos input, textarea e select dentro do elemento com o ID "notes"
    const inputsElements = notes.querySelectorAll('input, textarea, select');
    // Itera sobre cada elemento encontrado
    inputsElements.forEach(element => {
      // Obtém o tipo do elemento ou a tag em letras minúsculas, caso o elemento não possua um atributo "type"
      const elementType = element.type ? element.type.toLowerCase() : element.tagName.toLowerCase();
      // Realiza ações de reset de acordo com o tipo do elemento
      switch (elementType) {
        case 'text':
        case 'password':
        case 'textarea':
        case 'select-one':
          element.value = ''; // Limpa o valor do campo
          break;
        case 'radio':
        case 'checkbox':
          element.checked = false; // Desmarca o checkbox ou radio button
          break;
        default:
          break;
      }
    });
  };

  // Função para definir o conteúdo do elemento com o ID "hotkey-agendamento" com o valor selecionado
  const setHotkeyValue = value => {
    const hotkeyValueElement = document.querySelector('#hotkey-agendamento');
    hotkeyValueElement.textContent = value;
  };

  // Função para lidar com a mudança no elemento com o ID "substatus-agendamento"
  const handleSubstatusChange = e => {
    const selectedValue = e.target.value;
    setHotkeyValue(selectedValue);
    console.log(`Substatus alterado: ${selectedValue}`);
  };

  // Função que observa mudanças no DOM e chama o callback quando um novo elemento é adicionado
  const observeChanges = callback => {
    return new Promise(resolve => {
      // Criação do MutationObserver
      const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
          if (mutation.type === 'childList') {
            Array.from(mutation.addedNodes).forEach(addedNode => {
              // Verifica se o nó adicionado é um HTMLElement não processado
              if (addedNode instanceof HTMLElement && !addedNode.processed) {
                addedNode.processed = true; // Marca o nó como processado para evitar processamento duplicado
                if (typeof callback === 'function') {
                  // Chama o callback com o nó adicionado e o próprio MutationObserver
                  callback(addedNode, observer);
                }
              }
            });
          }
        });
      });
      // Inicia a observação do DOM
      observer.observe(document, { childList: true, subtree: true });
      resolve(observer); // Resolve a Promise com o MutationObserver para futura manipulação
    });
  };

  // Função recursiva que verifica se um elemento ou um de seus descendentes contém um texto específico ou um elemento com o seletor fornecido
  const checkElements = (element, targetTextOrSelector) => {
    try {
      // Verifica se o texto específico está contido no conteúdo do elemento ou se o seletor corresponde a algum de seus descendentes
      if (element.textContent.includes(targetTextOrSelector) || element.querySelector(targetTextOrSelector)) {
        return true; // Elemento ou descendente encontrado
      }
      // Percorre recursivamente os elementos filhos do elemento atual
      for (const childElement of element.children) {
        if (checkElements(childElement, targetTextOrSelector)) {
          return true; // Elemento encontrado em algum dos descendentes
        }
      }
      return false; // Nenhum elemento com o texto ou seletor encontrado
    } catch (error) {
      console.error(error); // Trata e registra qualquer erro ocorrido
    }
  };

  // Função que realiza a ação quando um elemento com o texto específico ou seletor fornecido é adicionado ao DOM
  const actionChanges = (targetTextOrSelector, callback) => {
    return new Promise((resolve, reject) => {
      let foundElement = false;
      // Chama a função observeChanges para observar mudanças no DOM
      const observer = observeChanges((modifiedElement, observer) => {
        if (!foundElement && modifiedElement instanceof HTMLElement) {
          console.log('Elemento localizado:');
          console.log(modifiedElement);
          console.log(`Texto: '${modifiedElement.textContent}'`);
          // Verifica se o elemento atual ou seus descendentes contêm o texto ou seletor específico
          if (checkElements(modifiedElement, targetTextOrSelector)) {
            foundElement = true; // Elemento encontrado
            console.log('Encontrou o elemento:');
            console.log(modifiedElement);
            if (typeof callback === 'function') {
              callback(modifiedElement); // Chama o callback passando o elemento encontrado
            }
            observer.disconnect(); // Encerra a observação do DOM
            resolve(modifiedElement); // Resolve a Promise com o elemento encontrado
          }
        }
      });
    });
  };

  // Função que adiciona um espaço em branco ao conteúdo após um atraso de 500 milissegundos
  const draftSaved = () => {
    setTimeout(() => {
      document.execCommand('insertText', false, ' ');
    }, 500);
  };

  // Função que seleciona a opção "Customer" em um elemento após ações e observações no DOM
  const setCustumer = () => {
    return new Promise((resolve, reject) => {
      // Clica no elemento "homeCasesElement"
      homeCasesElement.click();
      // Encontra o elemento que contém o texto "Customer"
      const customerElement = document.querySelector('span[class*="button-text"]');
      // Verifica se o elemento não contém o texto "Customer"
      if (customerElement.textContent !== 'Customer') {
        // Clica no elemento "customerElement" para exibir as opções relacionadas a "Customer"
        customerElement.click();
        // Chama a função "actionChanges" para aguardar a adição do elemento contendo "Customer" no DOM
        actionChanges('Customer', element => {
          // Encontra a primeira opção de "Customer" dentro do elemento e clica nela
          const customerOption = element.querySelectorAll('material-select-dropdown-item')[0];
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

  // Função que define o idioma do documento para o idioma especificado
  const setLanguage = language => {
    // Clica no elemento "homeCasesElement"
    homeCasesElement.click();
    // Encontra o elemento de input para o idioma com o atributo "aria-label" igual a "Locale"
    const inputLocale = document.querySelector('[aria-label="Locale"]');
    // Verifica se o idioma atual é diferente do idioma especificado
    if (inputLocale.value !== language) {
      // Dispara o evento de foco (bubbleEventFocus) para o inputLocale
      inputLocale.dispatchEvent(bubbleEventFocus);
      // Chama a função "actionChanges" para aguardar a adição do elemento contendo o idioma especificado no DOM
      return actionChanges(language).then(() => {
        // Encontra o item de idioma específico dentro do elemento "material-select-dropdown-item"
        const languageItems = Array.from(document.querySelectorAll('material-select-dropdown-item')).find(e => e.innerHTML.includes(language));
        if (languageItems) {
          // Clica no item de idioma específico para selecioná-lo
          languageItems.click();
          // Dispara o evento de blur (bubbleEventBlur) para o inputLocale
          inputLocale.dispatchEvent(bubbleEventBlur);
          consoleSucess(`Idioma alterado: ${language}`);
          // Chama a função "actionChanges" para aguardar a adição do elemento contendo a mensagem de sucesso
          return actionChanges(`Successfully changed language to ${language}`);
        } else {
          // Caso o idioma não seja encontrado, exibe um erro no console e rejeita a Promise
          consoleError(`Idioma (${language}) não encontrado!`);
          throw new Error(`Idioma (${language}) não encontrado!`);
        }
      });
    } else {
      // Caso o idioma já esteja selecionado, exibe um alerta no console e resolve a Promise
      consoleAlert(`Idioma ${language} já está selecionado!`);
      return Promise.resolve();
    }
  };

  // Função que cria um e-mail com a hotKey especificada
  const createEmail = hotKey => {
    return new Promise((resolve, reject) => {
      // Dispara o evento de foco (bubbleEventFocus) para o botão "buttonCreateWriteCard"
      buttonCreateWriteCard.dispatchEvent(bubbleEventFocus);
      setTimeout(() => {
        // Clica no botão "Create new email" para criar um novo e-mail
        document.querySelector('[aria-label="Create new email"]').click();
        // Dispara o evento de blur (bubbleEventBlur) para o botão "buttonCreateWriteCard"
        buttonCreateWriteCard.dispatchEvent(bubbleEventBlur);
        setTimeout(() => {
          // Chama a função "actionChanges" para aguardar a adição do elemento contendo o conteúdo do e-mail
          actionChanges('#email-body-content')
            .then(element => {
              // Encontra os elementos de corpo do e-mail
              const bodyEmail = element.querySelectorAll('#email-body-content');
              // Lista com os emails de serviços
              const emailList = document.querySelectorAll('[buttoncontent][class*="address"]');
              emailList[emailList.length - 1].click();
              setTimeout(() => {
                // Clica no endereço de e-mail específico para selecioná-lo
                document.querySelector('[id="email-address-id--technical-solutions@google.com"]').click();
                // Encontra os elementos de "canned-response-dialog" para inserir a hotKey
                const elementCr = document.querySelectorAll('[debug-id="canned_response_button"]');
                elementCr[elementCr.length - 1].click();
                consoleSucess('Corpo do e-mail criado!');
                // Chama a função "actionChanges" para aguardar a adição do elemento contendo "canned-response-dialog"
                return actionChanges('canned-response-dialog')
                  .then(element => {
                    // Encontra o input para a hotKey e insere o valor de hotKey
                    const inputCR = element.querySelector('input');
                    inputCR.value = hotKey;
                    inputCR.dispatchEvent(bubbleEventInput);
                    consoleSucess('hotKey inserida');
                    // Limpa o conteúdo do corpo do e-mail
                    bodyEmail[bodyEmail.length - 1].innerText = '';
                    // Chama a função "actionChanges" para aguardar a adição do elemento contendo "highlight-value"
                    return actionChanges('highlight-value');
                  })
                  .then(element => {
                    // Clica no elemento "highlight-value" para salvar o e-mail como rascunho
                    element.querySelector('highlight-value').click();
                    // Chama a função draftSaved para adicionar um espaço em branco no conteúdo após um atraso de 500 milissegundos
                    draftSaved();
                    resolve(); // Resolve a Promise após a criação bem-sucedida do e-mail
                  });
              }, 800);
            })
            .catch(error => {
              reject(error); // Rejeita a Promise caso ocorra algum erro
            });
        }, 500);
      }, 500);
    });
  };

  // Função que cria um novo e-mail com o conteúdo fornecido como templateHTML
  const createEmailTemplate = templateHTML => {
    // Dispara o evento de foco (bubbleEventFocus) para o botão "buttonCreateWriteCard"
    buttonCreateWriteCard.dispatchEvent(bubbleEventFocus);
    setTimeout(() => {
      // Clica no botão "Create new email" para criar um novo e-mail
      document.querySelector('[aria-label="Create new email"]').click();
      // Dispara o evento de blur (bubbleEventBlur) para o botão "buttonCreateWriteCard"
      buttonCreateWriteCard.dispatchEvent(bubbleEventBlur);
      // Chama a função "actionChanges" para aguardar a adição do elemento contendo o conteúdo do e-mail
      actionChanges('#email-body-content', element => {
        // Encontra os elementos de corpo do e-mail
        const bodyEmail = element.querySelectorAll('#email-body-content');
        // Lista com os emails de serviços
        const emailList = document.querySelectorAll('[buttoncontent][class*="address"]');
        emailList[emailList.length - 1].click();
        setTimeout(() => {
          // Clica no endereço de e-mail específico para selecioná-lo
          document.querySelector('[id="email-address-id--technical-solutions@google.com"]').click();
          // Encontra os elementos de corpo do e-mail
          // Define o conteúdo do corpo do e-mail como o templateHTML fornecido
          bodyEmail[bodyEmail.length - 1].innerHTML = templateHTML;
          // Chama a função draftSaved para adicionar um espaço em branco no conteúdo após um atraso de 500 milissegundos
          draftSaved();
        }, 500);
      });
    }, 500);
  };

  // Função que cria uma nova nota no caso (card) e insere o conteúdo HTML fornecido no corpo da nota
  const createNote = textHTML => {
    // Clica no elemento que leva à lista de casos (homeCasesElement)
    homeCasesElement.click();
    // Dispara o evento de foco (bubbleEventFocus) para o botão "buttonCreateWriteCard"
    buttonCreateWriteCard.dispatchEvent(bubbleEventFocus);
    // Adiciona um atraso de 500 milissegundos antes de continuar
    setTimeout(() => {
      // Clica no botão "Create new case note" para criar uma nova nota
      document.querySelector('[aria-label="Create new case note"]').click();
      // Dispara o evento de blur (bubbleEventBlur) para o botão "buttonCreateWriteCard"
      buttonCreateWriteCard.dispatchEvent(bubbleEventBlur);
      // Registra a criação da nota no console
      consoleSucess('Nota Criada!');
    }, 500);
    // Chama a função actionChanges para aguardar a adição do elemento contendo o corpo da nota
    actionChanges('case-note-card-content-wrapper', element => {
      // Encontra o elemento onde será inserido o conteúdo da nota
      const noteBody = element.querySelector('[aria-label="Case Note"]');
      // Insere o conteúdo HTML fornecido no corpo da nota
      noteBody.innerHTML = textHTML;
      // Registra a inserção do texto no corpo da nota no console
      consoleSucess('Texto inserido na nota!');
      // Chama a função draftSaved para adicionar um espaço em branco no conteúdo após um atraso de 500 milissegundos
      draftSaved();
    });
  };

  // Função para coletar os valores do formulário
  const getFormValues = () => {
    const sepekeasyValue = document.querySelector('#speakeasy-agendamento').value;
    const oncallValue = document.querySelector('#oncal-agendamento').value;
    const substatusSelect = document.querySelector('#substatus-agendamento');
    const substatusValue = substatusSelect.options[substatusSelect.selectedIndex].innerText.trim();
    const reasonValue = document.querySelector('#reason-agendamento').value;
    const gravacao_qaValue = document.querySelector('input[name="gravacao_qa-agendamento"]:checked').value;
    // const gtmValue = document.querySelector('#gtm-agendamento').value;
    // const backupValue = document.querySelector('#backup-agendamento').value;
    // const assistantValue = document.querySelector('#assistant-agendamento').value;
    const commentsValue = document.querySelector('#comments-agendamento').value;
    const commentsValueFormateed = commentsValue.split('\n').join('<br/>');
    const screenshotsValue = document.querySelector('#screenshots-agendamento').value;
    const mcidsValue = document.querySelector('#mcids-agendamento').value;
    const otherTagValuesInput = document.querySelector('#tag-other-input-agendamento');
    const otherTagValuesCheck = document.querySelector('#tag-other-agendamento');
    otherTagValuesCheck.value = otherTagValuesInput.value;
    const tagsImplement = Array.from(document.querySelectorAll('input[name^="tag"]:checked')).map(checkbox => checkbox.value);
    const otherBadValuesInput = document.querySelector('#bad-value-other-input-agendamento');
    const otherBadValuesCheck = document.querySelector('#bad-value-other-agendamento');
    otherBadValuesCheck.value = otherBadValuesInput.value;
    const badValues = Array.from(document.querySelectorAll('input[name^="bad-value"]:checked')).map(checkbox => checkbox.value);

    return {
      sepekeasyValue,
      oncallValue,
      substatusValue,
      reasonValue,
      gravacao_qaValue,
      //gtmValue,
      //backupValue,
      //assistantValue,
      commentsValueFormateed,
      screenshotsValue,
      mcidsValue,
      tagsImplement,
      badValues,
    };
  };

  // Função para criar uma nova nota com base nos valores do formulário
  const createNoteFromForm = () => {
    // Coleta os valores dos campos do formulário
    const {
      sepekeasyValue,
      oncallValue,
      substatusValue,
      reasonValue,
      gravacao_qaValue,
      //gtmValue,
      //backupValue,
      //assistantValue,
      commentsValueFormateed,
      screenshotsValue,
      mcidsValue,
      tagsImplement,
      badValues,
    } = getFormValues();
    // Formato da nota
    const noteHTML = `
   <br>
   <p><b>Date:</b> ${formatData()}</p>
   <p><b>Speakeasy ID:</b> ${sepekeasyValue}</p>
   <p><b>On Call( Call Started) signaled on time?:</b> ${oncallValue}</p>
   <p><b>Substatus:</b> ${substatusValue}</p>
   <p><b>Reason/Comments:</b> ${reasonValue}</p>
   <p><b>O anunciante estava de acordo com a gravação da chamada para fins de treinamento e qualidade?:</b> ${gravacao_qaValue}</p>
   <!--Partes Removidas-->
   <p><b>On Call Comments:</b> ${commentsValueFormateed}</p>
   <p><b>Tags Implemented:</b><br> ${tagsImplement.join('<br/>')}</p>
   <p><b>Screenshots:</b><br> ${screenshotsValue.split('\n').join('<br/>')}</p>
   <p><b>Multiple CIDs:</b> ${mcidsValue}</p>
   <p><b>*Bad Lead: </b><br> ${badValues.join('<br/>')}</p>
  `;
    /**
     * Partes Removidas
     * <p><b>Implementação feita via GTM ?:</b> ${ gtmValue}</p>
     * <p><b>Anunciante tinha Backup ?:</b> $ {backupValue}</p>
     * <p><b>Conversão testada no Tag Assistant?:</b> $ {assistantValue}</p>
     */

    //Chama a função para abrir e criar e colar a template
    createNote(noteHTML);
  };

  // Função que trata o clique na hotkey
  const handleHotkeyClick = async hotkeyValue => {
    try {
      // Executa a ação setCustumer
      await setCustumer();
      // Obtém o valor do idioma selecionado
      const selectedLanguageValue = document.querySelector('input[name="language-agendamento"]:checked')
        ? document.querySelector('input[name="language-agendamento"]:checked').value
        : false;
      // Se foi selecionado um idioma válido, executa a ação setLanguage
      if (selectedLanguageValue && hotkeyValue !== '-') {
        await setLanguage(selectedLanguageValue);
      }
      // Executa a ação createEmail com a hotkey clicada
      await createEmail(hotkeyValue);
      // Exibe uma mensagem de sucesso
      consoleSucess(hotkeyValue !== '-' ? 'E-mail criado com sucesso.' : 'Todas as etapas foram concluídas.');
      showPopup('popupalert');
    } catch (error) {
      // Trata o erro de forma mais específica
      consoleError('Erro:', error);
    }
  };

  // Função que trata o clique no botão "gerar-note-live-transfer"
  const handleNoteButtonLiveTransferClick = () => {
    // Coleta os valores dos campos do formulário
    const cidValue = document.querySelector('#cid-live-transfer').value;
    const conversaoValue = document.querySelector('#conversao-live-transfer').value;
    const siteValue = document.querySelector('#site-live-transfer').value;
    const modeloValue = document.querySelector('#modelo-live-transfer').value;
    const nomeValue = document.querySelector('#nome-live-transfer').value;
    const emailValue = document.querySelector('#email-live-transfer').value;
    const ldapValue = document.querySelector('#ldap-live-transfer').value;
    const telValue = document.querySelector('#tel-live-transfer').value;
    // Formatação da nota
    const noteHTML = `
    <br>
    <p><b>CID:</b> ${cidValue}</p>
    <p><b>Conversão a ser feita:</b> ${conversaoValue}</p>
    <p><b>Site e onde deverá ser feita a conversão:</b> ${siteValue}</p>
    <p><b>Modelo de Atribuição:</b> ${modeloValue}</p>
    <p><b>Nome do Anunciante:</b> ${nomeValue}</p>
    <p><b>Email do Anunciante:</b> ${emailValue}</p>
    <p><b>Ldap do AM:</b> ${ldapValue}</p>
    <p><b>Número de Telefone do Anunciante:</b> ${telValue}</p>
  `;
    // Chama a função createNote para criar a nota com o conteúdo fornecido
    createNote(noteHTML);
  };

  // Função que trata o clique nos botões de email automatizado
  const handleEmailAutomateButtonClick = e => {
    // Obtém o valor do atributo 'data-email' do botão clicado
    const dataEmail = e.target.getAttribute('data-email');
    // Busca o template HTML do email usando fetch
    const templateHTML = fetch(`https://filipesanches.github.io/teste/assets/html/template_email/${dataEmail}.html`).then(e => e.text());
    // Processa o template HTML e cria um novo email usando a função createEmailTemplate
    templateHTML.then(template => {
      createEmailTemplate(template);
      console.log('HTML aplicado!');
    });
  };

  // Array com meses ingles portugues espanhol
  const AllMonths = [
    ['January', 'Janeiro', 'Enero'],
    ['February', 'Fevereiro', 'Febrero'],
    ['March', 'Março', 'Marzo'],
    ['April', 'Abril', 'Abril'],
    ['May', 'Maio', 'Mayo'],
    ['June', 'Junho', 'Junio'],
    ['July', 'Julho', 'Julio'],
    ['August', 'Agosto', 'Agosto'],
    ['September', 'Setembro', 'Septiembre'],
    ['October', 'Outubro', 'Octubre'],
    ['November', 'Novembro', 'Noviembre'],
    ['December', 'Dezembro', 'Diciembre'],
  ];

  // Função que transorma a primeira letra em maiuscula
  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // Função retorna o mês em ingles
  const getMonthEnglish = month => {
    month = capitalize(month);

    for (item of AllMonths) {
      if (item.includes(month)) {
        return item[0];
      }
    }
  };
  // Função que obtém os horários disponíveis para agendamento no calendário
  const getAvailableTime = () => {
    let g_availableTime = [];
    // Percorre todos os elementos com atributo 'data-keyboardactiontype="0;1"' e 'data-focusable'
    document.querySelectorAll('[data-keyboardactiontype="0;1"][data-focusable] ').forEach(element => {
      let elementText = element.innerText;
      // Verifica se o texto do elemento contém 'Availability Slot' ou 'Tag Implementation'
      if (elementText.includes('Availability Slot') || elementText.includes('Tag Implementation')) {
        // Extrai o dia e a hora disponível do elemento
        let g_day = element.parentElement.innerText.split('\n')[0].split(', ').pop();
        let g_month = g_day.split(' ')[2];
        let g_hour = element.innerText.split('\n').pop();
        let g_date = g_day + ' - ' + g_hour;

        let g_day_date = g_day.replaceAll(' de', '').replace(g_month, getMonthEnglish(g_month));
        g_day_date = new Date(Date.parse(g_day_date));

        // Verifica se o dia é maior que o dia atual e adiciona o horário disponível à lista
        if (g_day_date > new Date()) {
          if (!g_availableTime.includes(g_date)) {
            g_availableTime.push(g_date);
          } else {
            // Remove o horário disponível da lista se já estiver presente
            g_availableTime = g_availableTime.filter(e => e !== g_date);
          }
        }
      }
    });
    return g_availableTime;
  };

  // Função que copia o horário ao ser clicado
  const copyTextElement = selector => {
    document.querySelectorAll(selector).forEach(p => {
      let text = p.innerText;
      // Função assíncrona que copia o conteúdo para a área de transferência
      const copyContent = async () => {
        try {
          await navigator.clipboard.writeText(text);
          console.log('Content copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      };
      // Adiciona um ouvinte de clique para cada elemento horário disponível
      p.addEventListener('click', copyContent);
    });
  };

  // Função que exibe os horários disponíveis para agendamento no calendário
  const availableTimes = () => {
    if (window.location.href.includes('calendar.google.com')) {
      const availableTimesElement = document.querySelector('#horarios-disponiveis');
      availableTimesElement.innerHTML = '';
      // Obtém os horários disponíveis usando a função getAvailableTime()
      const g_availableTime = getAvailableTime();
      // Cria os elementos <p> para cada horário disponível e os adiciona ao elemento #horarios-disponiveis
      for (time of g_availableTime) {
        queueMicrotask(console.log.bind(console, time));
        const p = document.createElement('p');
        p.classList.add('horario');
        p.textContent = time;
        availableTimesElement.appendChild(p);
      }
      // Chama a função copyTime após um atraso de 500 milissegundos para adicionar ouvintes de clique aos horários criados
      setTimeout(() => {
        copyTextElement('#horarios-disponiveis .horario');
      }, 500);
      console.log('Está no calendar');
    } else {
      console.log('Não está no calendar');
    }
  };

  // Função que retorna uma Promise com a data do caso
  const getDateCase = () => {
    return new Promise((resolve, reject) => {
      const dateTimeZone = Array.from(document.querySelectorAll('.contactUsFormRows')).find(element => {
        return element.textContent.includes('Appointment Time') || element.textContent.includes('Hora do compromisso');
      });

      if (!dateTimeZone) {
        reject('DATA E HORARIO DA REUNIAO');
        return;
      }

      const hourDate = dateTimeZone.innerText.split('\n')[1];
      const timeZone = dateTimeZone.innerText.split('\n')[1];
      const date = new Date(hourDate);
      const formatDate = date
        .toLocaleString('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        })
        .split(', ');

      resolve(`${formatDate[0]} às ${formatDate[1]}hs`);
    });
  };

  // Função que retorna uma Promise com o nome do agente
  const getNameAgent = () => {
    return new Promise((resolve, reject) => {
      try {
        const signed = document.querySelector('[aria-label*="Signed"]');
        signed.click();

        setTimeout(() => {
          const nameAgent = document.querySelector('profile-details > div > div.name').textContent;
          signed.click();
          resolve(nameAgent);
        }, 300);
      } catch (error) {
        reject('NOME DO AGENTE');
      }
    });
  };

  // Função que retorna uma Promise com as tarefas
  const getTasks = () => {
    return new Promise((resolve, reject) => {
      try {
        const tasksElement = Array.from(document.querySelectorAll('cuf-form-field')).find(element => {
          return element.innerText.includes('Tasks') || element.textContent.includes('Tarefas');
        });

        if (!tasksElement) {
          reject('Insira as tasks');
          return;
        }

        const allTasks = Array.from(tasksElement.querySelectorAll('[debug-id="html-value"]')).map(task => task.innerText);
        const formatArray = allTasks.join(', ');
        resolve(formatArray);
      } catch (error) {
        reject('Insira as tasks');
      }
    });
  };

  // Função que retorna uma Promise com o website
  const getWebSite = () => {
    return new Promise((resolve, reject) => {
      try {
        const webSiteElement = document.querySelector(
          'ng-template > [href*="https://www.google.com"], ng-template > [href*="http://www.google.com"]'
        ).textContent;
        const website = webSiteElement.length > 0 ? webSiteElement : 'SITE DO CLIENTE';
        resolve(website);
      } catch (error) {
        reject('SITE DO CLIENTE');
      }
    });
  };

  // Função que retorna uma Promise com os dados do cliente
  const getDataCustomer = () => {
    return new Promise((resolve, reject) => {
      try {
        const dataContact = Array.from(document.querySelectorAll('.contactUsFormRows')).find(element => {
          return element.textContent.includes('Email');
        });

        if (!dataContact) {
          reject(['EMAIL DO CLIENTE', 'NOME DO CLIENTE', 'TELEFONE DO CLIENTE']);
          return;
        }

        dataContact.querySelector('pii-value > span').click();
        setTimeout(() => {
          const nameElement = dataContact.innerText.split('\n')[2].trim().split(' ')[0];
          const formatName = name => {
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            return name;
          };
          const name = formatName(nameElement);
          const email = dataContact.innerText.split('\n')[1];
          const phone =
            '+' +
            dataContact.textContent
              .slice(dataContact.textContent.search('\n'))
              .replace(email, '')
              .replace(/[^\d]+/g, '');
          resolve([{ email: email, phone: phone, name: name }]);
        }, 5000);
      } catch (error) {
        reject(['EMAIL DO CLIENTE', 'NOME DO CLIENTE', 'TELEFONE DO CLIENTE']);
      }
    });
  };

  // Função para criar o objeto dataCases com todas as informações
  const getDataCases = async () => {
    try {
      const dateCases = await getDateCase();
      const nameAgent = await getNameAgent();
      const tasks = await getTasks();
      const webSite = await getWebSite();
      const dataCostumer = await getDataCustomer();

      return {
        dateCases: dateCases,
        nameAgent: nameAgent,
        tasks: tasks,
        webSite: webSite,
        dataCostumer: dataCostumer,
        idCase: location.href.split('/')[location.href.split('/').length - 1],
      };
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const createSpeakeasyElements = data => {
    // Criação do elemento HTML container
    const containerDiv = document.createElement('div');
    containerDiv.id = 'speakeasy-id-container';
    const buttonClose = document.createElement('button');
    buttonClose.classList.add('material-icons');
    buttonClose.textContent = 'close';

    // Loop para criar os elementos para cada objeto no array 'data'
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      // Criação dos elementos HTML para cada item
      const contentP = document.createElement('p');
      const contentSpanID = document.createElement('span');
      contentSpanID.classList.add('speakeasy-id');
      const contentSpanDate = document.createElement('span');
      contentSpanDate.id = 'speakeasy-id-date';

      // Definir atributos e conteúdo dos elementos com base nos dados do objeto
      contentSpanID.textContent = item.id;
      contentSpanDate.textContent = item.date;

      // Montar a estrutura do documento para cada item
      contentP.appendChild(contentSpanID);
      contentP.appendChild(contentSpanDate);
      containerDiv.appendChild(contentP);
    }

    // Adicionar o elemento container ao body do documento
    containerDiv.appendChild(buttonClose);
    document.body.appendChild(containerDiv);
    buttonClose.addEventListener('click', () => {
      containerDiv.remove();
    });
  };

  // Função para obter o ID do Speakeasy
  const getSpeakeasyId = () => {
    return new Promise((resolve, reject) => {
      try {
        speakeasyIDCase = [];
        const caseLogElement = document.querySelector('[debug-id="dock-item-case-log"]');
        caseLogElement.click();

        setTimeout(() => {
          document.querySelector('[debug-id="case-log-filter"] > dropdown-button [role="img"]').click();
          setTimeout(() => {
            const eventLog = Array.from(document.querySelectorAll('div')).filter(element => {
              return element.textContent.includes('Event log');
            });
            eventLog[eventLog.length - 1].click();
            document.querySelector('[debug-id="apply-filter"]').click();

            setTimeout(() => {
              try {
                const elementsCall = Array.from(document.querySelectorAll('.preview-header')).filter(element => {
                  return (
                    element.textContent.includes('Agent joined phone call') || element.textContent.includes('O agente entrou na chamada telefônica')
                  );
                });

                elementsCall.forEach((e, i) => {
                  setTimeout(() => {
                    e.click();
                    setTimeout(() => {
                      const speakeasyIdElement = document.querySelectorAll('.outbound-call.plain-text');
                      const dateDpeakeasyId =
                        speakeasyIdElement[i].parentElement.parentElement.parentElement.querySelector('[debug-id="date-time-message"]').innerText;
                      const speakeasyID = speakeasyIdElement[i].innerText.split(' ');
                      speakeasyIDFormatter = speakeasyID[speakeasyID.length - 1].replace('\n', '');
                      speakeasyIDCase.push({ id: speakeasyIDFormatter, date: dateDpeakeasyId });
                      console.log(speakeasyIDCase);

                      // Verifica se é o último elemento do loop e resolve a Promise
                      if (i === elementsCall.length - 1) {
                        resolve(speakeasyIDCase);
                      }
                    });
                  }, 500);
                });
              } catch (error) {
                console.error(error);
                reject(error);
              }
            }, 500);
          }, 500);
        }, 500);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  //Requisiçoes
  // Carrega e popula dados de QA a partir de um arquivo JSON
  const dadosQa = fetch('https://filipesanches.github.io/teste/assets/js/dadosqa.json').then(e => e.json());
  dadosQa
    .then(data => {
      // Popula o elemento select com opções baseadas nos emails da propriedade 'emailList'
      data.emailList.forEach((email, i) => {
        const option = document.createElement('option');
        option.value = email.value; // O valor da opção é definido a partir da chave 'valor'
        option.innerText = email.description; // O texto da opção é definido com base na chave 'description'
        document.querySelector('#substatus-agendamento').appendChild(option); // Adiciona a opção ao elemento select com o ID '#substatus-agendamento'
      });

      //Aplica valor no campo screenshots para colar os prints
      document.querySelector(
        '#screenshots-agendamento'
      ).value = `Google ADS Screenshots:\n\nGoogle Analytics Screenshots:\n\nGoogle Tag Manager Screenshots:\n\nGoogle Tag Assistant Screenshots:\n`;

      // Popula o elemento com o ID '#tags-implement-agendamento' com checkboxes e labels baseados nas tags da propriedade 'tagsImplement'
      const tagsElement = document.querySelector('#tags-implement-agendamento');
      data.tagsImplement.forEach((tag, i) => {
        const p = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `tag-agendamento-${i}`;
        checkbox.name = `tag-agendamento-${i}`;
        checkbox.value = tag; // O valor do checkbox é definido a partir da tag atual
        const label = document.createElement('label');
        label.setAttribute('for', `tag-agendamento-${i}`);
        label.innerText = tag; // O texto do label é definido com base na tag atual
        p.appendChild(checkbox);
        p.appendChild(label);
        tagsElement.appendChild(p); // Adiciona o checkbox e label ao elemento com o ID '#tags-implement-agendamento'
      });

      // Popula o elemento com o ID '#bad-leads-agendamento' com checkboxes e labels baseados nas bad-leads da propriedade 'badList'
      const badLeadsElement = document.querySelector('#bad-leads-agendamento');
      data.badList.forEach((bad, i) => {
        const p = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `bad-value-agendamento-${i}`;
        checkbox.name = `bad-value-agendamento-${i}`;
        checkbox.value = bad.value; // O valor do checkbox é definido a partir da propriedade 'badvalue' com base no índice atual
        const label = document.createElement('label');
        label.setAttribute('for', `bad-value-agendamento-${i}`);
        label.innerText = bad.description; // O texto do label é definido com base na BAD Lead atual
        p.appendChild(checkbox);
        p.appendChild(label);
        badLeadsElement.appendChild(p); // Adiciona o checkbox e label ao elemento com o ID '#bad-leads-agendamento'
      });

      //Popula os links da aba link uteis
      const ul = document.createElement('ul');
      data.links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = link.description;
        a.href = 'http://' + link.value;
        a.target = '_blank';
        li.appendChild(a);
        ul.appendChild(li);
      });
      document.querySelector('#link-content').appendChild(ul); //Seleciona a div com id link-content e aplica os links

      console.log('Dados QA aplicados!');
    })
    .catch(error => {
      console.log('Ocorreu um erro:', error);
    });

  // Carrega e popula dados da aba alerts a partir de um arquivo HTML
  const alertsContent = fetch('https://filipesanches.github.io/teste/assets/html/template_alert_content/tmplate_alert.html').then(e => e.text());
  alertsContent
    .then(data => {
      document.querySelector('#alert-content').innerHTML = data;
      console.log('Conteudo aba Alerts Aplicado!');
    })
    .catch(error => {
      console.log('Ocorreu um erro ao importar template Alerts:', error);
    });

  // Chamadas de Funções
  // Aplicação de estilos
  createStyle('https://filipesanches.github.io/teste/assets/css/style.css');
  createStyle('https://fonts.googleapis.com/icon?family=Material+Icons');

  // Aplica dragElement no elemeto notes
  dragElement(notes);

  // Aplica função resizeWindow
  resizeWindow(notes);

  // Chame a função getDataCases para obter o objeto com todos os dados
  getDataCases()
    .then(data => {
      // Agora você pode usar o objeto data conforme necessário
      dataCase = data;
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });

  // Chamada de Ouvintes
  // Obtém todos os botões das abas e adiciona o ouvinte de evento a cada um deles
  const tabsButtons = document.querySelectorAll('[data-abas]');
  tabsButtons.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
      const tabId = tabButton.getAttribute('data-abas');
      console.log(tabId);

      // Chama a função para controlar a exibição do conteúdo
      handleTabClick(tabId);
    });
  });

  // Obtém todos os elementos que possuem a classe 'minimize' ou 'notes-minimize' e adiciona o ouvinte de evento a cada um deles
  const minimizeWindowElements = document.querySelectorAll('[class*="minimize"]');
  minimizeWindowElements.forEach(e => {
    e.addEventListener('click', e => {
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

  // Adiciona um ouvinte de evento de clique para cada botão que possui um ID "get-speakeasy-id"
  document.querySelector('#get-speakeasy-id').addEventListener('click', () => {
    //Chama a função getSpeakeasyId
    getSpeakeasyId()
      .then(resultado => {
        // A função getSpeakeasyId foi concluída e o array dataCase está completo
        console.log('Array speakeasyIDCase completo:', resultado);

        // Chama a função que deseja executar quando o array estiver completo
        createSpeakeasyElements(speakeasyIDCase.reverse());
        setTimeout(() => {
          const inputSpeakeasy = document.querySelector('#speakeasy-agendamento');
          document.querySelectorAll('.speakeasy-id').forEach(e => {
            e.addEventListener('click', el => {
              if (inputSpeakeasy.value === '') {
                inputSpeakeasy.value = el.target.textContent;
              } else {
                inputSpeakeasy.value += ', ' + el.target.textContent;
              }
            });
          });
          document.querySelector('[debug-id="case-log-filter"] > dropdown-button [role="img"]').click();
          setTimeout(() => {
            const eventLogs = Array.from(document.querySelectorAll('div')).filter(element => {
              return element.textContent.includes('Event log');
            });
            eventLogs[eventLogs.length - 1].click();
            document.querySelector('[debug-id="apply-filter"]').click();
            homeCasesElement.click();
          }, 500);
        });
      })
      .catch(error => {
        // Trata qualquer erro que ocorra durante o processo
        console.error('Ocorreu um erro:', error);
      });
  });

  // Adiciona um ouvinte de evento de clique para cada botão que possui um ID começando com "reset-note"
  document.querySelectorAll('[id^="reset-note"]').forEach(button => {
    button.addEventListener('click', resetFields);
  });

  // Adiciona o ouvinte de evento de mudança ao elemento com o ID "substatus-agendamento"
  document.querySelector('#substatus-agendamento').addEventListener('change', handleSubstatusChange);

  // Obtém o elemento do botão com a classe '#hotkey-agendamento'
  const hotkey = document.querySelector('#hotkey-agendamento');
  // Adiciona um ouvinte de clique no botão
  hotkey.addEventListener('click', e => {
    // Obtém o valor da hotkey clicada
    const hotkeyValue = e.target.textContent;
    // Registra a hotkey clicada no console
    consoleSucess(`Hotkey clicada: ${e.target.textContent}`);
    // Chama a função que trata o clique na hotkey
    handleHotkeyClick(hotkeyValue);
  });

  // Obtém o elemento do botão com o id '#gerar-note-agendamento'
  const noteButtonAgendamento = document.querySelector('#gerar-note-agendamento');
  // Adiciona um ouvinte de clique no botão
  noteButtonAgendamento.addEventListener('click', createNoteFromForm);

  // Obtém o elemento do botão com o id '#gerar-note-live-transfer'
  const noteButtonLiveTranfer = document.querySelector('#gerar-note-live-transfer');
  // Adiciona um ouvinte de clique no botão
  noteButtonLiveTranfer.addEventListener('click', handleNoteButtonLiveTransferClick);

  // Obtém todos os elementos dos botões com atributo 'data-email'
  const buttomEmailautomate = document.querySelectorAll('[data-email]');
  // Adiciona um ouvinte de clique a cada botão
  buttomEmailautomate.forEach(button => {
    button.addEventListener('click', handleEmailAutomateButtonClick);
  });

  // Adiciona um ouvinte de clique para o botão com ID 'refreshCalendar'
  document.querySelector('#refreshCalendar').addEventListener('click', () => {
    return availableTimes();
  });

  // Adiciona um ouvinte de clique para o elemento com ID 'calendar'
  document.querySelector('#calendar').addEventListener('click', () => {
    return availableTimes();
  });

  // Adiciona um ouvinte de clique para o elemento com ID 'dark-mode' e liga e desliga a a classe dark-theme do elemento notes
  document.querySelector('#dark-mode').addEventListener('click', e => {
    if (notes.classList.contains('dark-theme')) {
      notes.classList.remove('dark-theme');
      e.target.textContent = 'dark_mode';
    } else {
      notes.classList.add('dark-theme');
      e.target.textContent = 'light_mode';
    }
  });
};
const structureHTML = fetch('https://filipesanches.github.io/teste/assets/html/estrutura.html').then(e => e.text());
structureHTML.then(e => {
  notes.innerHTML = e;
  casesNotes();
  console.log('HTML aplicado!');
});
