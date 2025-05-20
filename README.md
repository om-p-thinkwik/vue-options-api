# vue-options-api

This is a practice project for Vue.js. It uses the options api. CRUD is performed using http methods via axios from a jobs.json in /src. There are pages to view jobs, add a new job and edit an existing job. Also while adding and deleting a job, the 'id' property of a particular job is managed using store by pinia as a global state management approach. Here, toast is used from the vue-toastification library. A loader that works while loading some components from vue-spinner library. Prime icons are used for their interactive icons. In order to test the apis, json-server library is used as a small server. Prettier and EsLint have been set up.

## Versions and Dependencies

1. vue: 3.5.13
2. vue-router: 4.5.1
3. vue-spinner: 1.0.4
4. vue-toastification: 2.0.0-rc.5
5. axios: 1.9.0
6. json-server: 1.0.0-beta.3
7. primeicons: 7.0.0
8. pinia: 3.0.2

## Prerequisites

#### Refer to the following docs of libraries

- Node.js: https://nodejs.org/en
- Vue.js: https://vuejs.org/guide/introduction.html
- Tailwind CSS: https://tailwindcss.com
- Prettier: https://prettier.io/docs
- ESLint: https://eslint.org/docs/latest/use/getting-started
- ESLint and Prettier setup: https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3
- Prime icons - Vue.js: https://primevue.org/icons
- Pinia: https://pinia.vuejs.org/core-concepts

## Cloning and Running the Application in local

Clone the project into local

Go into the project folder and install all npm packages:

```bash
cd "Folder_Name"
```

```bash
npm install
```

As we are performing CRUD using json-server, run the following command before starting the application

```bash
npm run server
```

In order to run the application Type the following command in a separate terminal

```bash
npm run dev
```

The Application Runs on **localhost:5173** or your default port
