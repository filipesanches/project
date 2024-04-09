# Cases Notes 3.0


### Elementos de Reuso
  
  - `homeCasesElement`: Elemento da página correspondente à *home* do *cases*.
  - `buttonCreateWriteCard`: Botão de adicionar nota e e-mail no *cases*.
  - `dataCase`: Variável que contém os dados do caso.
  - `speakeasyIDCase`: Array que armazena os IDs do *speakeasy*.

### Coleção de Eventos para Reuso

- `bubbleEventClick`: Evento de clique com bolhas (*bubbles*) ativadas.
- `bubbleEventFocus`: Evento de foco com bolhas (*bubbles*) ativadas.
- `bubbleEventBlur`: Evento de desfoco com bolhas (*bubbles*) ativadas.
- `bubbleEventInput`: Evento de entrada (*input*) com bolhas (*bubbles*) ativadas.

### Funções de Console para Testes

Funções para imprimir mensagens coloridas no console.

- `consoleText(text)`: Exibe uma mensagem no console com texto grande e colorido (background branco, texto preto).
- `consoleSucess(text)`: Exibe uma mensagem de sucesso no console (background verde, texto amarelo).
- `consoleAlert(text)`: Exibe uma mensagem de alerta no console (background amarelo, texto vermelho).
- `consoleError(text)`: Exibe uma mensagem de erro no console (background vermelho, texto amarelo).

### Função para Formatar Data

- `formatData()`: Retorna uma string no formato "dd/mm/aaaa" correspondente à data atual.

### Função para Criar Folha de Estilo CSS

- `createStyle(atribute)`: Cria um elemento `<link>` para incluir uma folha de estilo CSS no cabeçalho (*head*) da página.

### Função para Mover o Elemento

- `dragElement(element)`: Permite arrastar um elemento na página. Essa função faz uso dos eventos do mouse para implementar o comportamento de arrastar e soltar (*drag and drop*).

### Função para Alterar o Tamanho do Elemento

- `resizeWindow(element)`: Adiciona um redimensionador (*resizer*) ao elemento fornecido, permitindo que o mesmo seja redimensionado pelo usuário. Essa função também faz uso dos eventos do mouse para realizar o redimensionamento.

### Função para Tratar a Exibição do Conteúdo de Acordo com a Aba Selecionada

- `handleTabClick(tabId)`: Esta função trata a exibição do conteúdo correspondente à aba selecionada. Ela recebe o `tabId`, que é o identificador da aba, como argumento. Os passos realizados pela função são:
  1. Remove a classe 'highlight' de todos os botões das abas.
  2. Adiciona a classe 'highlight' ao botão da aba selecionada.
  3. Esconde todos os conteúdos exibidos anteriormente.
  4. Exibe o conteúdo correspondente à aba selecionada.

### Função para Criar um Popup com o Conteúdo Passado

- `createPopup(contentPopUp)`: Esta função cria um popup com o conteúdo fornecido. O popup é composto por uma div pai (`popupDivFather`) e uma div filho (`popupDiv`). A função adiciona um botão de fechamento ao popup e define um ouvinte de evento para remover o popup ao clicar no botão de fechamento. O conteúdo do popup é inserido na div filho. A div pai é, então, adicionada ao elemento com o ID "notes".

### Função para Exibir o Popup

- `showPopup(data)`: Esta função exibe um popup obtendo o conteúdo a partir de um arquivo HTML específico, com base no parâmetro `data` fornecido. A função faz uma requisição assíncrona usando o método `fetch` para obter o conteúdo do arquivo HTML. Se o conteúdo obtido contém o identificador "id="popup-important"", a função chama a `createPopup(contentPopUp)` para criar e exibir o popup.

### Função para Resetar Campos de Input, Textarea e Select

- `resetFields()`: Esta função reseta os campos de input, textarea e select que estão dentro do elemento com o ID "notes". Para cada elemento encontrado, a função identifica o tipo do elemento e realiza a ação apropriada para efetuar o reset, limpando valores ou desmarcando checkboxes e radio buttons.

### Função para Definir o Conteúdo do Elemento com o ID "hotkey-agendamento"

- `setHotkeyValue(value)`: Esta função define o conteúdo do elemento com o ID "hotkey-agendamento" com o valor `value` passado como argumento.

### Função para Lidar com a Mudança no Elemento com o ID "substatus-agendamento"

- `handleSubstatusChange(e)`: Esta função lida com a mudança no elemento com o ID "substatus-agendamento". Ela é chamada quando ocorre uma mudança no valor do elemento e recebe o evento `e` como argumento. A função obtém o valor selecionado, chama `setHotkeyValue(selectedValue)` para definir o conteúdo do elemento com o ID "hotkey-agendamento" com o valor selecionado e exibe uma mensagem no console indicando a alteração do substatus.

### Função para Observar Mudanças no DOM e Chamar o Callback Quando um Novo Elemento é Adicionado

- `observeChanges(callback)`: Esta função observa as mudanças no DOM e chama o `callback` quando um novo elemento é adicionado. Ela retorna uma Promise que é resolvida com o MutationObserver para futura manipulação. A função recebe o `callback` como argumento, que será chamado quando um novo elemento for adicionado ao DOM. O `callback` recebe o novo elemento adicionado e o próprio MutationObserver como argumentos.

### Função Recursiva para Verificar se um Elemento ou Seus Descendentes Contêm um Texto Específico ou um Elemento com o Seletor Fornecido

- `checkElements(element, targetTextOrSelector)`: Esta função é chamada recursivamente para verificar se um elemento ou algum de seus descendentes contêm o texto específico ou um elemento com o seletor fornecido. Ela retorna `true` se o elemento ou descendente é encontrado e `false` caso contrário.

### Função para Realizar Ação Quando um Elemento com Texto Específico ou Seletor Fornecido é Adicionado ao DOM

- `actionChanges(targetTextOrSelector, callback)`: Esta função é responsável por realizar a ação quando um elemento com o texto específico ou seletor fornecido é adicionado ao DOM. Ela retorna uma Promise que é resolvida com o elemento encontrado. A função recebe o `targetTextOrSelector` como primeiro argumento e o `callback` como segundo argumento, que será chamado quando o elemento é encontrado. O `callback` recebe o elemento encontrado como argumento.

### Função para Adicionar um Espaço em Branco ao Conteúdo Após um Atraso de 500 Milissegundos

- `draftSaved()`: Esta função adiciona um espaço em branco ao conteúdo após um atraso de 500 milissegundos usando o método `setTimeout` e o comando `document.execCommand`.

### Função para Selecionar a Opção "Customer" em um Elemento Após Ações e Observações no DOM

- `setCustumer()`: Esta função seleciona a opção "Customer" em um elemento após realizar algumas ações e observar mudanças no DOM. Ela clica no elemento "homeCasesElement", verifica se a opção "Customer" já está selecionada e, caso não esteja, aguarda até que a opção "Customer" seja adicionada ao DOM antes de clicar nela.

### Função para Definir o Idioma do Documento para o Idioma Especificado

- `setLanguage(language)`: Esta função define o idioma do documento para o idioma especificado. Ela clica no elemento "homeCasesElement", encontra o elemento de input para o idioma, verifica se o idioma atual é diferente do idioma especificado e, caso seja, aguarda até que o idioma especificado seja adicionado ao DOM antes de clicar na opção correspondente.

### Função para Criar um E-mail com a HotKey Especificada

- `createEmail(hotKey)`: Esta função cria um novo e-mail com a HotKey especificada. Ela clica no botão "buttonCreateWriteCard" para focar na criação do e-mail, aguarda a exibição do botão "Create new email" para criar o e-mail, e aguarda até que o conteúdo do e-mail seja adicionado ao DOM antes de selecionar a HotKey.

### Função para Criar um Novo E-mail com o Conteúdo Fornecido como TemplateHTML

- `createEmailTemplate(templateHTML)`: Esta função cria um novo e-mail com o conteúdo fornecido como `templateHTML`. Ela clica no botão "buttonCreateWriteCard" para focar na criação do e-mail, aguarda a exibição do botão "Create new email" para criar o e-mail, e aguarda até que o conteúdo do e-mail seja adicionado ao DOM antes de definir o conteúdo do corpo do e-mail com o `templateHTML` fornecido.

### Função para Criar uma Nova Nota no Caso (Card) e Inserir o Conteúdo HTML Fornecido no Corpo da Nota

- `createNote(textHTML)`: Esta função cria uma nova nota no caso (card) e insere o conteúdo HTML fornecido no corpo da nota. Ela clica no elemento que leva à lista de casos (homeCasesElement), clica no botão "buttonCreateWriteCard" para focar na criação da nota, aguarda a exibição do botão "Create new case note" para criar a nota e aguarda até que o corpo da nota seja adicionado ao DOM antes de inserir o conteúdo HTML fornecido.

### Função para Coletar os Valores do Formulário

- `getFormValues()`: Esta função coleta os valores dos campos do formulário e retorna um objeto contendo esses valores. Os campos coletados incluem os valores dos elementos com IDs `#sepekeasy-agendamento`, `#oncal-agendamento`, `#substatus-agendamento`, `#reason-agendamento`, `#gravacao_qa-agendamento`, `#gtm-agendamento`, `#backup-agendamento`, `#assistant-agendamento`, `#comments-agendamento`, `#screenshots-agendamento`, `#mcids-agendamento` e os valores dos checkboxes selecionados com os nomes começando por `tag` e `bad-value`.

### Função para Criar uma Nova Nota com Base nos Valores do Formulário

- `createNoteFromForm()`: Esta função cria uma nova nota com base nos valores do formulário coletados pela função `getFormValues()`. Ela formata o conteúdo da nota usando os valores dos campos do formulário e chama a função `createNote` para criar e colar a template da nota.

### Função para Tratar o Clique na Hotkey

- `handleHotkeyClick(hotkeyValue)`: Esta função trata o clique na hotkey. Ela executa a ação `setCustumer` para selecionar a opção "Customer", obtém o valor do idioma selecionado e executa a ação `setLanguage` se um idioma válido foi selecionado. Em seguida, executa a ação `createEmail` com a hotkey clicada. Caso a hotkey seja '-' (hífen), todas as etapas são concluídas e uma mensagem de sucesso é exibida.

### Função para Tratar o Clique no Botão "gerar-note-live-transfer"

- `handleNoteButtonLiveTransferClick()`: Esta função trata o clique no botão "gerar-note-live-transfer". Ela coleta os valores dos campos do formulário com IDs `#cid-live-transfer`, `#conversao-live-transfer`, `#site-live-transfer`, `#modelo-live-transfer`, `#nome-live-transfer`, `#email-live-transfer`, `#ldap-live-transfer` e `#tel-live-transfer`. Em seguida, formata o conteúdo da nota com base nos valores coletados e chama a função `createNote` para criar a nota com esse conteúdo.

### Função que Trata o Clique nos Botões de Email Automatizado

- `handleEmailAutomateButtonClick(e)`: Esta função trata o clique nos botões de email automatizado. Ela obtém o valor do atributo `data-email` do botão clicado e busca o template HTML do email usando o `fetch`. Em seguida, processa o template HTML e cria um novo email usando a função `createEmailTemplate`, que é chamada com o template processado.

### Função que Obtém os Horários Disponíveis para Agendamento no Calendário

- `getAvailableTime()`: Esta função obtém os horários disponíveis para agendamento no calendário. Ela percorre todos os elementos com os atributos `data-keyboardactiontype="0;1"` e `data-focusable` e verifica se o texto do elemento contém 'Availability Slot' ou 'Tag Implementation'. Se sim, extrai o dia e a hora disponível do elemento, e verifica se o dia é maior que o dia atual. Os horários disponíveis são armazenados em um array `g_availableTime`, que é retornado pela função.

### Função que Copia o Horário ao ser Clicado

- `copyTextElement(selector)`: Esta função copia o texto de um elemento ao ser clicado. Ela adiciona um ouvinte de clique para cada elemento selecionado pelo seletor fornecido, e ao ser clicado, o conteúdo do elemento é copiado para a área de transferência usando `navigator.clipboard.writeText(text)`.

### Função que Exibe os Horários Disponíveis para Agendamento no Calendário

- `availableTimes()`: Esta função exibe os horários disponíveis para agendamento no calendário, caso a página esteja no calendário do Google (`calendar.google.com`). Ela obtém os horários disponíveis usando a função `getAvailableTime()`, cria elementos `<p>` para cada horário disponível e os adiciona ao elemento com ID `#horarios-disponiveis`. Além disso, chama a função `copyTextElement` após um atraso de 500 milissegundos para adicionar ouvintes de clique aos horários criados.

### Função que Retorna uma Promise com a Data do Caso

- `getDateCase()`: Esta função retorna uma Promise com a data do caso. Ela encontra o elemento que contém informações sobre o horário do compromisso ou appointment time, extrai o horário daí e formata a data e a hora em um formato legível.

### Função que Retorna uma Promise com o Nome do Agente

- `getNameAgent()`: Esta função retorna uma Promise com o nome do agente. Ela encontra e clica no elemento que contém informações do agente (signed), aguarda um pequeno atraso e, em seguida, extrai o nome do agente do elemento.

### Função que Retorna uma Promise com as Tarefas

- `getTasks()`: Esta função retorna uma Promise com as tarefas. Ela encontra o elemento que contém as informações sobre as tarefas (tasksElement), extrai as tarefas desse elemento e formata-as em uma string, separando-as por vírgula.

### Função que Retorna uma Promise com o Website

- `getWebSite()`: Esta função retorna uma Promise com o website do cliente. Ela encontra o elemento que contém o link para o website do cliente, extrai o texto desse elemento e retorna o website ou a string 'SITE DO CLIENTE' caso o website não esteja disponível.

### Função que Retorna uma Promise com os Dados do Cliente

- `getDataCustomer()`: Esta função retorna uma Promise com os dados do cliente. Ela encontra o elemento que contém informações sobre o email do cliente (dataContact), clica no elemento para exibir os dados do cliente, aguarda um pequeno atraso e, em seguida, extrai e formata o nome, o email e o telefone do cliente a partir do elemento.

### Função para Criar o Objeto `dataCases` com Todas as Informações

- `getDataCases()`: Esta função cria um objeto `dataCases` com todas as informações necessárias. Ela chama as funções assíncronas `getDateCase()`, `getNameAgent()`, `getTasks()`, `getWebSite()`, e `getDataCustomer()` para obter as respectivas informações, como a data do caso, o nome do agente, as tarefas, o website do cliente e os dados do cliente. Em seguida, retorna um objeto contendo essas informações, juntamente com o ID do caso, que é extraído da URL da página.

### Função para Criar Elementos de ID do Speakeasy

- `createSpeakeasyElements(data)`: Esta função cria elementos HTML para exibir os IDs do Speakeasy. Recebe um array `data` contendo objetos com informações sobre o ID do Speakeasy e a data associada. A função cria um elemento `div` com ID `speakeasy-id-container`, botão para fechar (`buttonClose`), e para cada objeto no array `data`, cria elementos HTML (`contentP`, `contentSpanID`, `contentSpanDate`) para exibir o ID e a data. Depois, adiciona os elementos criados ao documento e adiciona um ouvinte de clique no botão de fechar para remover o container quando clicado.

### Função para Obter o ID do Speakeasy

- `getSpeakeasyId()`: Esta função retorna uma Promise com os IDs do Speakeasy. Ela realiza uma série de cliques e aguarda um pequeno atraso para interagir com a página e extrair as informações necessárias. A função procura elementos relacionados a chamadas telefônicas ('Agent joined phone call') no log de eventos, extrai os IDs do Speakeasy e as datas associadas, armazenando-os no array `speakeasyIDCase`. Por fim, resolve a Promise com o array contendo os IDs e as datas.

## Requisições para popular dados QA

O código realiza várias requisições para obter e carregar dados de um arquivo JSON a partir de uma URL externa. Esses dados são utilizados para popular elementos HTML na página. A seguir, detalharei cada uma dessas requisições:

1. **Carregando dados de QA a partir de um arquivo JSON:**
   - URL: `https://filipesanches.github.io/teste/assets/js/dadosqa.json`
   - Método: `fetch()`
   - Tratamento: O resultado da requisição é tratado usando o método `.json()` para converter o corpo da resposta em um objeto JavaScript.
   - Populando o elemento `select` com opções de emails: Os dados obtidos do arquivo JSON contêm uma propriedade chamada `emailList`, que é um array de objetos com propriedades `value` e `description`. Para cada objeto no array `emailList`, uma opção é criada no elemento `select` com o ID `#substatus-agendamento`. O valor e o texto da opção são definidos pelas propriedades `value` e `description` dos objetos, respectivamente.

   - Populando o elemento `#tags-implement-agendamento` com checkboxes e labels: Os dados do arquivo JSON também contêm uma propriedade chamada `tagsImplement`, que é um array de strings representando tags. Para cada tag no array `tagsImplement`, é criado um parágrafo (`<p>`) contendo um checkbox e um label. O checkbox é definido com `type="checkbox"` e recebe um ID único `tag-agendamento-${i}` e um atributo `value` com o valor da tag. O label é associado ao checkbox pelo atributo `for` e tem o texto da tag como conteúdo. O parágrafo contendo o checkbox e o label é adicionado ao elemento com o ID `#tags-implement-agendamento`.

   - Populando o elemento `#bad-leads-agendamento` com checkboxes e labels: A partir da propriedade `badList` no arquivo JSON, que é um array de objetos com propriedades `value` e `description`, o código cria elementos similares ao passo anterior. Cada objeto no array `badList` representa uma BAD Lead. O checkbox é definido com `type="checkbox"` e recebe um ID único `bad-value-agendamento-${i}` e um atributo `value` com o valor da propriedade `value`. O label é associado ao checkbox pelo atributo `for` e tem o texto da propriedade `description` como conteúdo. O parágrafo contendo o checkbox e o label é adicionado ao elemento com o ID `#bad-leads-agendamento`.

   - Tratamento de erros: Se ocorrer algum erro durante as requisições ou o processamento dos dados, o código exibirá uma mensagem de erro no console.

Após todas as requisições serem executadas e os elementos HTML populados, o código exibirá a mensagem "Dados QA aplicados!" no console.


## Chamadas de Funções

- `createStyle('https://filipesanches.github.io/teste/assets/css/style.css')`: Essa função aplica estilos à página carregando o arquivo CSS hospedado em `https://filipesanches.github.io/teste/assets/css/style.css`.

- `createStyle('https://fonts.googleapis.com/icon?family=Material+Icons')`: Essa função aplica estilos de ícones da biblioteca "Material Icons" carregando o arquivo CSS hospedado em `https://fonts.googleapis.com/icon?family=Material+Icons`.

- `dragElement(notes)`: Aplica a função `dragElement` ao elemento `notes`, que provavelmente é uma janela ou painel, tornando-o arrastável pela página.

- `resizeWindow(notes)`: Aplica a função `resizeWindow` ao elemento `notes`, permitindo redimensioná-lo.

- `getDataCases()`: Chamada da função `getDataCases` para obter o objeto `dataCases` com todas as informações. Essa chamada é assíncrona e usa a função `then()` para lidar com o resultado da Promise. Quando a função é concluída com sucesso, o objeto `data` contendo as informações é exibido no console.

## Chamada de Ouvintes

- Obtém todos os botões das abas no documento e adiciona um ouvinte de evento de clique a cada um deles. Quando um botão é clicado, a função `handleTabClick(tabId)` é chamada, passando o ID da aba como parâmetro.


- Obtém todos os elementos que possuem a classe 'minimize' ou 'notes-minimize' e adiciona um ouvinte de evento de clique a cada um deles. Quando um desses elementos é clicado, a função de callback é executada, verificando se o elemento clicado possui a classe 'notes-minimize' ou 'minimize', e adiciona ou remove essas classes do elemento `notes`, provavelmente para controlar a minimização da janela.

- Adiciona um ouvinte de evento de clique para o botão com o ID `get-speakeasy-id`. Quando o botão é clicado, a função `getSpeakeasyId` é chamada para obter os IDs do Speakeasy. Quando a função for concluída, o array `speakeasyIDCase` estará completo, e a função `createSpeakeasyElements(speakeasyIDCase.reverse())` é chamada para criar os elementos HTML que exibem os IDs do Speakeasy na página. Em seguida, a função `copyTextElement('#speakeasy-id-container > p > span.speakeasy-id')` é chamada para adicionar ouvintes de clique aos IDs criados para copiar o conteúdo clicado para a área de transferência. Além disso, algumas outras ações são realizadas, como clicar em botões no site para reverter alterações feitas anteriormente.

- Adiciona um ouvinte de evento de clique a cada botão que possui um ID começando com "reset-note". Quando um botão é clicado, a função `resetFields` é chamada.

- Adiciona um ouvinte de evento de mudança ao elemento com o ID "substatus-agendamento". Quando o valor do elemento é alterado, a função `handleSubstatusChange` é chamada.

- Obtém o elemento do botão com a classe "#hotkey-agendamento" e adiciona um ouvinte de clique. Quando o botão é clicado, a função de callback obtém o valor da hotkey clicada, registra-a no console e chama a função `handleHotkeyClick(hotkeyValue)` para tratar o clique na hotkey.

- Obtém o elemento do botão com o ID "#gerar-note-agendamento" e adiciona um ouvinte de clique. Quando o botão é clicado, a função `createNoteFromForm` é chamada.

- Obtém o elemento do botão com o ID "#gerar-note-live-transfer" e adiciona um ouvinte de clique. Quando o botão é clicado, a função `handleNoteButtonLiveTransferClick` é chamada.

- Obtém todos os elementos dos botões com atributo 'data-email' e adiciona um ouvinte de clique a cada botão. Quando um desses botões é clicado, a função `handleEmailAutomateButtonClick` é chamada.

- Adiciona um ouvinte de clique ao botão com ID 'refreshCalendar'. Quando o botão é clicado, a função `availableTimes()` é chamada para obter os horários disponíveis no calendário.

- Adiciona um ouvinte de clique ao elemento com ID 'calendar'. Quando o elemento é clicado, a função `availableTimes()` é chamada para obter os horários disponíveis no calendário.

- Adiciona um ouvinte de clique ao elemento com ID 'dark-mode'. Quando o elemento é clicado, a função de callback verifica se o elemento `notes` possui a classe 'dark-theme'. Se tiver, a classe 'dark-theme' é removida e o ícone é alterado para 'dark_mode'. Caso contrário, a classe 'dark-theme' é adicionada e o ícone é alterado para 'light_mode', provavelmente alternando o modo de tema escuro e claro.

## Obtendo a Estrutura HTML e Executando a Função casesNotes

- O código faz uma requisição para obter a estrutura HTML a partir de `https://filipesanches.github.io/teste/assets/html/estrutura.html` usando o `fetch()`. Quando a resposta é obtida, a função de callback adiciona a estrutura HTML ao elemento `notes` no documento e, em seguida, chama a função `casesNotes()` para continuar com a execução do restante do código.
