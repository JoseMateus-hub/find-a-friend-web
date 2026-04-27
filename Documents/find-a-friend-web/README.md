# 🐾 Find A Friend Web

Front-end para adoção de animais desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 📋 Sobre o projeto

Interface web do sistema de adoção de animais que permite buscar pets por cidade e filtrar por características. O contato para adoção é feito via WhatsApp diretamente com a ONG responsável pelo pet.

## 🚀 Tecnologias

- Next.js 16
- TypeScript
- Tailwind CSS

## 📌 Funcionalidades

- Busca de pets por cidade
- Filtros por idade, porte, energia, independência e ambiente
- Página de detalhe do pet
- Contato via WhatsApp com a ONG
- Login e dashboard para cadastro de pets
- Design responsivo

## 🔧 Como rodar o projeto

### Pré-requisitos

- Node.js
- Back-end rodando ([find-a-friend-api](https://github.com/JoseMateus-hub/find-a-friend-api))

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JoseMateus-hub/find-a-friend-web.git

# Entre na pasta
cd find-a-friend-web

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com a URL da API

# Inicie o servidor
npm run dev
```

## 🌐 Deploy

- Front-end: [find-a-friend-web-kappa.vercel.app](https://find-a-friend-web-kappa.vercel.app)
- Back-end: [find-a-friend-api-production.up.railway.app](https://find-a-friend-api-production.up.railway.app)