# 💈 Assistente IA - Barbearia Brothers

Este projeto contém um chatbot inteligente para uma barbearia local, utilizando Node.js no backend e uma interface simples em HTML/CSS/JS no frontend. A IA foi programada para agir como um assistente de atendimento, informando os clientes sobre serviços, preços, horários de funcionamento e guiando-os para um agendamento.

## 🗂 Estrutura do Projeto (O "Código")

Abaixo explico **cada detalhe do código** e como os arquivos se conectam.

### 1. 🖥 Frontend (A Interface do Cliente)
Fica na pasta secundária ou na raiz, focado na experiência de quem envia as mensagens e enxerga a resposta da IA.
- **`index.html`**: O esqueleto da interface de chat. Ele contém o contêiner das mensagens e o campo de input.
- **`style.css`**: Define o visual (caixa escura com letras brancas/verdes). Deixa com uma cara moderna.
- **`script.js`**: Pega a mensagem digitada pelo usuário e utiliza o `fetch` do JavaScript para enviá-la ao nosso backend no endereço `http://localhost:5000/api/chat`. Ele também adiciona identificadores de sessão (`sessionId`) para o servidor saber com quem está conversando.

### 2. ⚙️ Backend (O Cérebro do Assistente)
O backend (Node.js + Express) é onde roda a lógica principal e a comunicação com a API da inteligência artificial (Groq API).

- **`app.js`**
  - O ponto de entrada. Ele configura o servidor Express, habilita recebimento e envio de JSON, define a porta `5000` e carrega todos os roteadores.
  
- **`routes/chatRoutes.js` e `scheduleRoutes.js`**
  - Definem os caminhos de URL. `chatRoutes` cria a rota `POST /api/chat` e aponta para o controlador.
  - `scheduleRoutes` define rotas tradicionais (não-IA) focadas apenas em listar, adicionar ou deletar agendamentos cruéis caso um sistema de calendário visual seja plugado no futuro.

- **`controllers/chatController.js`**
  - O maestro da conversa. Quando a rota de chat é chamada, ele verifica a mensagem.
  - Ele invoca o `getSession` para puxar ou criar a memória temporária do cliente (ex: se o cliente já enviou que o nome dele é Lucas, o servidor já sabe quem é nas próximas interações).
  - Após isso, ele chama a função da IA `askAI(mensagem, sessão)` e, quando houver resposta, devolve (retorna `res.json`) de volta para o *frontend* mostrar na tela.

- **`services/sessionService.js`**
  - Guarda temporariamente informações dos usuários conversando (uma estrutura em memória `[sessionId]: {nome, servico, data... }`). Assim, não esquecemos com quem estamos falando em cada aba do navegador.

- **`services/readMemory.js`**
  - Ele lê o arquivo físico de conhecimento da barbearia (`brothers.md`) que possui as "regras do negócio": todos os preços, os horários e o endereço. Essa leitura ajuda a IA a não alucinar e apenas dizer o que é real.

- **`services/groqService.js`**
  - É o coração da Inteligência Artificial em si, chamando a construtora do modelo `Llama3` através do SDK da `groq-sdk`.
  - Aqui nós construímos o **Prompt de Sistema (System Prompt)**. Ele amarra o texto carregado do salão (`readMemory.js`) mais a memória específica da sessão (se já sabemos o nome do cliente). Ele envia tudo em milissegundos para o modelo na nuvem processar e responde dizendo o que o atendente da barbearia diria.

- **`services/scheduleService.js`**
  - Simula um banco de dados de agendamentos reais em um simples arquivo JSON (`data/schedules.json`). Ele permite salvar uma marcação quando o cliente avança ou checar se um horário já está ocupado.

- **`memories/salao/brothers.md`**
  - O documento que atua como banco de conhecimento. Funciona como a cartilha de treinamento de um funcionário recém-contratado. Lá constam que o corte custa R$25, que abre às 09h e não funciona no domingo.

## 🚀 Como Executar

1. **Inicie o Servidor:**
   Abra o terminal na pasta `backend` e rode:
   ```bash
   npm install
   node app.js
   ```
2. **Abra o Chat:**
   Basta dar um duplo clique no arquivo `index.html` da pasta `frontend` em seu navegador.
3. **Pode testar!**
   Tente perguntar os combos, os horários, onde a barbearia fica localizada ou tentar marcar um horário.

## 🛠 Entendendo Inteligência Artificial com Contexto
A IA pura é apenas um bom falante (como o ChatGPT normal). Esse projeto torna a IA uma **ferramenta de mercado** pois nós inserimos duas chaves douradas na função `askAI` todo santo momento que o cliente manda uma fala:
1. **Instruções Imutáveis ("System"):** O script diz *"Você não pode mostrar seu estado. Seja direto."*
2. **Informações Dinâmicas ("Context"):** O script carrega um `.md` e o estado JSON e cola na hora pro modelo *"A barbearia cobra 25 no corte, e esse cliente de agora se chama José"*.
Assim, a IA analisa o input "José: Quanto é a barba?", lê o manual que enviamos invisivelmente, nota que é 20, e responde com a persona "José, a barba sai por R$ 20. Quer marcar hoje?".
