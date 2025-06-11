# 🏦 DevBank - Frontend

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Cargo version](https://img.shields.io/static/v1?label=cargo&message=v1.1.0&color=yellow) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)

## Indices

- [`Sobre o Projeto`](#sobre-o-projeto)
- [`Tecnologias Utilizadas`](#tecnologias-utilizadas)
- [`Estrutura do Projeto`](#estrutura-projeto)
- [`Configuração é Execução`](#configuracao-execucao)
- [`Principais Funcionalidades`](#principais-func)
- [`Proposito`](#proposito)
- [`Contribuições`](#contribuicoes)
- [`Licença`](#license)

<span id="sobre-o-projeto"></span>

## 📌 Sobre o Projeto

**DEVBANK** é uma aplicação bancária fictícia desenvolvida para simular uma experiência financeira moderna, interativa e voltada especialmente para desenvolvedores. Inspirado por ferramentas como terminais Linux, Git e apps de fintechs reais, o **DEVBANK** combina funcionalidades bancárias tradicionais com interfaces inovadoras, promovendo uma experiência única e envolvente.

## 🚀 Tecnologias Utilizadas

<div align='center' id="tecnologias-utilizadas">
    <img align='center' height='49' width='49' title='React' alt='React' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Tailwind' alt='Tailwind' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Axios' alt='Axios' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain-wordmark.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='StoryBook' alt='StoryBook' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg'/> &nbsp;
    <img align='center' height='49' width='49' title='Vite' alt='Vite' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg'/> &nbsp;
     <img align='center' height='49' width='49' title='JS' alt='JS' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'/> &nbsp;
     <img align='center' height='49' width='49' title='json' alt='json' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg'/> &nbsp;

</div>

<span id="estrutura-projeto"></span>

## 📂 Estrutura do Projeto

```
frontend-devbank/
│-- public
│-- src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── global.css
│   ├── main.tsx
│   ├── routes.tsx
│-- .env
│-- package.json
│-- README.md
```

<span id="configuracao-execucao"></span>

## 🛠️ Configuração e Execução

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/wallacemt/devbank-frontend
cd devbank-frontend
```

### 2️⃣ Instalar Dependências

```bash
npm install
```
### 3️⃣ Rodar a Aplicação

```bash
npm run dev
```

<span id="principais-func"></span>`

# 📌 Principais Funcionalidades

- `🔐 Autenticação segura com verificação em duas etapas (2FA) e sistema anti-brute-force.`

- `🧾 Sistema completo de transferências via Pix, incluindo visualização de histórico, comprovantes e logs.`

- `🖥️ TransferShell — um terminal interativo inspirado no Linux, onde o usuário envia comandos para fazer transações, visualizar logs e interagir com o banco como se estivesse no shell.`

- `💼 Caixinhas (Stash) — funcionalidade para criar containers de saldo, permitindo guardar valores com organização e metas financeiras.`

- `🧩 Fluxo completo de onboarding com stepper para registro e complemento de perfil.`

- `🧠 Interface responsiva e inteligente, construída com React, TailwindCSS, TypeScript e componentes ShadCN UI.`

- `📬 Sistema de email transacional com templates personalizados para validação de conta, alertas e confirmações.`



<span id="proposito"></span>

## 💡 Propósito
O objetivo do **DEVBANK** é explorar um modelo de banco digital que não apenas simule operações reais, mas também engaje desenvolvedores de forma criativa, permitindo que realizem ações bancárias como se estivessem usando um terminal de código. Ao unir design moderno, segurança, interatividade e linguagem do universo tech, o projeto oferece uma proposta de valor diferenciada para usuários com perfil técnico.


<span id="contribuicoes"></span>

## 🛠 Contribuição

Ficou interessado em contribuir? Faça um **fork** do repositório, crie uma **branch**, implemente a melhoria e envie um **pull request**. Toda ajuda é bem-vinda!

1. **Fork the repository.**
2. **Clone your forked repository to your local machine.**
3. **Create a branch for your feature or fix:**

   ```bash
   git checkout -b my-new-feature
   ```

4. **Commit your changes:**

   ```bash
   git commit -m 'Add new feature'
   ```

5. **Push your changes to your fork:**

   ```bash
   git push origin my-new-feature
   ```

6. **Create a Pull Request.**

<span id="license"></span>

# 📜 Licença

`Este projeto está sob a licença MIT.`