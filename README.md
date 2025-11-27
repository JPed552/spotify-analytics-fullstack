# 🎧 Spotify Analytics Full Stack

Aplicação web Full Stack que consome a API do Spotify para gerar insights detalhados sobre o histórico de reprodução do usuário.

Este projeto implementa um **Backend for Frontend (BFF)** para segurança e utiliza um **algoritmo de pontuação ponderada** para calcular rankings de álbuns que a API nativa não fornece.

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-green)

---

## ✨ Funcionalidades Principais

* **Autenticação Segura (OAuth 2.0):** Fluxo *Authorization Code* implementado no Backend (Node.js) para proteger chaves de API e tokens.
* **Análise Profunda (Deep Fetch):** O sistema utiliza paginação assíncrona (`Promise.all`) para recuperar até 500 faixas do histórico do usuário, superando o limite padrão de 50 itens da API.
* **Ranking de Álbuns (Algoritmo Personalizado):** Como o Spotify não possui um endpoint de "Top Álbuns", desenvolvi um algoritmo que:
    1.  Analisa as faixas mais ouvidas.
    2.  Atribui peso baseado na posição (Música #1 vale mais que Música #50).
    3.  Calcula e ordena os álbuns por relevância, não apenas por contagem de plays.
* **UI Moderna:** Interface responsiva construída com **Tailwind CSS**, utilizando conceitos de Glassmorphism e Grid Layouts adaptativos.

---

## 🛠️ Tech Stack

### Front-end (`/client`)
* **React** (Vite)
* **React Router v6** (Navegação SPA)
* **Tailwind CSS v3** (Estilização Utilitária)
* **Spotify Web API JS** (Wrapper Client-side)

### Back-end (`/server`)
* **Node.js** & **Express**
* **Spotify Web API Node** (Gerenciamento de OAuth)
* **Cors** & **Dotenv** (Segurança e Configuração)

---

## 🚀 Como Rodar Localmente

Este é um projeto **Monorepo** (Cliente e Servidor no mesmo repositório). Você precisará de dois terminais.

### Pré-requisitos
1.  Crie um App no [Spotify for Developers](https://developer.spotify.com/).
2.  Adicione `http://127.0.0.1:3000/callback` nas *Redirect URIs* do seu app no Spotify.

### 1. Configurar o Backend
```bash
cd server
npm install

# Crie o arquivo .env baseado no exemplo
cp .env.example .env
