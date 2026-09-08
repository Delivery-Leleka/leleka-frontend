# 📚 Project Documentation

Welcome to the project documentation!

Here you will find the main information about the **project structure, setup and execution, available commands, and automation tools**.

---

## 📁 Project Structure

A brief overview of the main directories and files:

```text
├── app/
│   ├── api/                       # Axios configuration and API requests
│   ├── components/                # Reusable UI components
│   │   ├── auth/                  # Authentication and multi-step form components
│   │   ├── chat/                  # Chat interface components
│   │   └── layout/                # Common layout elements
│   ├── hooks/                     # Custom React hooks
│   ├── routes/                    # Project routing and pages
│   │   ├── layouts/               # Layouts for protecting and grouping routes
│   │   └── *.tsx                  # Project pages
│   ├── types/                     # Global TypeScript types and interfaces
│   │   └── index.ts
│   ├── app.css                    # Global styles
│   ├── root.tsx                   # Root application component
│   └── routes.ts                  # Router configuration
│
├── .github/                       # PR, Issue, and CI/CD workflow templates
├── .husky/                        # Git hooks for automated checks
├── public/                        # Static files: icons, fonts, images
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── CONTRIBUTING.md                # Rules and guidelines for contributors
├── package.json                   # Dependencies and yarn scripts
└── README.md                      # Main project documentation
```

---

## 🚀 Quick Start

### Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** — version `18.x` or higher;

- **yarn** — or an alternative package manager such as `pyarn` / `yarn`.

### 1. Clone the Repository

```bash
git clone <repository-link>

cd <project-folder-name>
```

### 2. Install Dependencies

```bash
yarn install
```

After installing the dependencies, fill in the required environment variables and keys if they are needed for the project to work.

### 3. Start the Project

To start the local development server, run:

```bash
yarn run dev
```

After starting, the application will be available at:

**http://localhost:5173**

> ℹ️ The port may vary. The actual address will be displayed in the console after startup.

---

## 🛠️ Useful Commands

All main project scripts are executed using `yarn run <command>`.

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `yarn run dev`      | Starts the project in development mode with HMR |
| `yarn run build`    | Builds the project for production               |
| `yarn run preview`  | Previews the production build locally           |
| `yarn run lint`     | Checks the code using ESLint                    |
| `yarn run lint:fix` | Automatically fixes ESLint errors               |
| `yarn run format`   | Formats the code using Prettier                 |

---

## 🐶 Husky and Automation

The project uses **Husky** together with **lint-staged** to maintain clean code and a consistent formatting style.

### How Does It Work?

When running:

```bash
git commit
```

Husky automatically runs the `pre-commit` hook, which:

1. 🔍 Checks the modified files (`staged files`).

2. 🧹 Runs **ESLint** to check the code.

3. ✨ Runs **Prettier** to automatically format the code.

### ⚠️ Important

If the code contains errors that ESLint cannot fix automatically, **the commit will be rejected**.

In this case:

1. Fix the errors reported by ESLint.

2. Check the formatting.

3. Run `git commit` again.

---

## 📌 Additional Information

Before making changes, it is recommended to review:

- `CONTRIBUTING.md` — rules and guidelines for contributors;

- `package.json` — available yarn scripts;

- `.eslintrc.json` — ESLint rules;

- `.prettierrc` — formatting rules.

> 💡 **Tip:** _Before creating a Pull Request, make sure that the project successfully passes both code checks and formatting._

```bash
yarn run lint

yarn run format
```
