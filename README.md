## Sobre o algoritmo escolhido

O problema apresentado é bem parecido com o famoso problema do caixeiro viajante, existem vários algoritmos para resolução desse problema. O algoritmo que eu escolhi foi o Nearest Insertion, um algoritmo simples de força bruta que a partir de um determinado ponto procura o ponto mais próximo na lista de pontos e insere num array (ou qualquer estrutura de lista). O algoritmo tem como complexidade `O(n²)` onde `n` é o número de pontos.

## Como rodar o projeto?

- Rodar o comando `npm install` para instalar todas as dependências do projeto.

- Foi escolhido o Docker para rodar o Postgresql, então dentro de `/backend` tem um arquivo `docker-compose.yml`. Com o Docker instalado na máquina basta rodar o comando `docker compose up -d`.

- Configurar as variáveis de ambiente criando um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo `.env.example`.

- Rodar o script de criação da base de dados e suas colunas

- Por fim basta rodar o comando `npm run start:dev` e o servidor estará pronto para ser utilizado

### Principais bibliotecas e motivações

- Fastify: Acho simples a maneira como fastify lida com o gerenciamento de rotas, requisições, plugins para configurar o servidor, também acho ele mais rápido que outros frameworks conhecidos, como o Express e tenho trabalhado com ele há algum tempo.
- pg: Biblioteca simples para integrar o NodeJS com o postgres
- Zod: Biblioteca para validação, gosto tanto de usar no backend quanto no frontend
