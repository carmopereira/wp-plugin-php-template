# wp-php-template

A lightweight CLI tool to scaffold **traditional** WordPress plugins (PHP-first) while integrating modern JavaScript and CSS workflows using `@wordpress/scripts`.

## 🚀 Overview

Unlike the official `@wordpress/create-block`, which is focused on Gutenberg blocks, this tool is designed for developers who need a classic plugin structure but still want to use **ES6+, SASS, and modern build tools**.

It automates:
1.  **Plugin Scaffolding**: Generates a clean WordPress plugin header and structure.
2.  **Modern Build Stack**: Installs `@wordpress/scripts`.
3.  **Folder Structure**: Creates a `/src` directory for your assets.
4.  **Ready-to-go Scripts**: Pre-configures `npm start` and `npm run build`.

## 📋 Prerequisites

Before using this tool, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (LTS version recommended)

## 💻 Usage

You don't need to install this globally. You can run it directly using `npx`:

```bash
npx @carmopereira/wp-php-template@latest
```

No WordPress installation is required to run the scaffold.