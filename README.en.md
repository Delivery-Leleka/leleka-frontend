# 📚 Project Documentation

Welcome to the project documentation!

Here you will find the main information about the **project structure, setup, available commands, and automation tools**.

---

## 📁 Project Structure

A brief overview of the main directories and files:

```text
.
├── app/
│   ├── api/                       # Axios configuration and API requests
│   ├── components/                # Reusable UI components
│   │   ├── auth/                  # Authentication and multi-step form components
│   │   ├── chat/                  # Chat interface components
│   │   └── layout/                # Common layout elements
│   ├── hooks/                     # Custom React hooks
│   ├── routes/                    # Project routes and pages
│   │   ├── layouts/               # Layouts for route protection and grouping
│   │   └── *.tsx                  # Project pages
│   ├── types/                     # Global TypeScript types and interfaces
│   │   └── index.ts
│   ├── app.css                    # Global styles
│   ├── root.tsx                   # Root application component
│   └── routes.ts                  # Router configuration
│
├── .github/                       # PR, Issue, and CI/CD workflow templates
├── .husky/                        # Git hooks for automated checks
├── public/                        # Static files: icons, fonts, and images
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── CONTRIBUTING.md                # Contribution guidelines and recommendations
├── package.json                   # Dependencies and npm scripts
└── README.md                      # Main project documentation
```

---

## 🚀 Quick Start

### Prerequisites

Before getting started, make sure you have the following installed:

* **Node.js** — version `18.x` or higher. [Node.js installation guide (using nvm/another Node version manager is **highly recommended**)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

* **Yarn** — package manager. Yarn Berry (v4). [Yarn Berry installation guide (follow the Yarn Berry section)](https://dev.to/arshak_grigoryan/yarn-classic-vs-yarn-berry-installation-guide-3oob)

### 1. Clone the repository

```bash
git clone https://github.com/Delivery-Leleka/leleka-frontend

cd leleka-frontend
```

### 2. Install dependencies

```bash
yarn
```

Or:

```bash
yarn install
```
(Both commands do the same thing.)

### 3. Run the project

To start the local development server, run:

```bash
yarn dev
```

Once started, the application will be available at the address displayed in the terminal.

> ℹ️ The port may vary. The current address will be shown in the console after startup.

---

## 🛠️ Useful Commands

All main project scripts can be executed using `yarn <command>`.

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `yarn dev`      | Start the project in development mode with HMR |
| `yarn build`    | Build the project for production               |
| `yarn preview`  | Preview the production build locally           |
| `yarn lint`     | Check the code using ESLint                    |
| `yarn lint:fix` | Automatically fix ESLint errors                |
| `yarn format`   | Format the code using Prettier                 |

---

## 🐶 Husky and Automation

The project uses **Husky** together with **lint-staged** to maintain code quality and a consistent coding style.

### How does it work?

When running:

```bash
git commit
```

Husky automatically runs the `pre-commit` hook, which:

1. 🔍 Checks the modified files (`staged files`).
2. 🧹 Runs **ESLint** to check the code.
3. ✨ Runs **Prettier** to automatically format the code.

### ⚠️ Important

If there are errors in the code that ESLint cannot fix automatically, **the commit will be rejected**.

In that case:

1. Fix the errors reported by ESLint.
2. Check the formatting.
3. Run `git commit` again.

---

## 📌 Additional Information

Before making changes, it is recommended to review:

* `CONTRIBUTING.md` — contribution guidelines;
* `package.json` — available scripts;
* `.eslintrc.json` — ESLint rules;
* `.prettierrc` — formatting rules.

> 💡 **Tip:** Before creating a Pull Request, make sure the project passes both code quality and formatting checks.

```bash
yarn lint

yarn format
```
