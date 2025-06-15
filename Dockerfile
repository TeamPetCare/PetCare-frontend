# Stage 1: build da aplicação com Node.js
FROM node:18 AS build

WORKDIR /aplicacao-petcare

# Copia package.json e package-lock.json para instalar as dependências
COPY aplicacao-petcare/package*.json ./

RUN rm -rf node_modules package-lock.json
RUN npm install

# Copia o resto da aplicação
COPY aplicacao-petcare/ .

# Roda o build da aplicação
RUN npm run build

# Stage 2: servidor nginx para servir os arquivos estáticos
FROM nginx:alpine

# Remove os arquivos default do nginx (opcional)
RUN rm -rf /usr/share/nginx/html/*

# Copia o build feito no stage anterior para o diretório padrão do nginx
COPY --from=build /aplicacao-petcare/dist /usr/share/nginx/html

# Copia configuração customizada do nginx (se você tiver um arquivo nginx.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]
