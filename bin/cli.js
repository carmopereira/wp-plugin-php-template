#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { version } = require('../package.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

console.log(`\n✨ wp-php-template v${version}: Creating a modern, lightweight plugin...\n`);

const createLocalScaffold = (pluginName, authorName, slug, targetDir) => {
    fs.mkdirSync(targetDir);
    const mainFilePath = path.join(targetDir, `${slug}.php`);
    const pluginHeader = `<?php
/**
 * Plugin Name: ${pluginName}
 * Description: Traditional WordPress plugin with wp-scripts support.
 * Author: ${authorName}
 * Version: 1.0.0
 * Text Domain: ${slug}
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}
`;
    fs.writeFileSync(mainFilePath, pluginHeader);
};

rl.question('Plugin Name: ', (pluginName) => {
    rl.question('Author: ', (authorName) => {
        const slug = slugify(pluginName);
        const targetDir = path.join(process.cwd(), slug);

        if (fs.existsSync(targetDir)) {
            console.error(`❌ Error: The folder ${slug} already exists!`);
            process.exit(1);
        }

        try {
            // 1. Internal scaffold
            console.log(`📦 Generating PHP plugin in /${slug}...`);
            createLocalScaffold(pluginName, authorName, slug, targetDir);

            process.chdir(targetDir);

            // 2. Create structure for @wordpress/scripts
            console.log("📁 Creating asset folders (/src)...");
            fs.mkdirSync('src');
            fs.writeFileSync('src/index.js', '// Start your modern JS here\nconsole.log("Plugin loaded!");');
            fs.writeFileSync('src/index.scss', '/* Your SASS here */\nbody { .wp-plugin { color: #000; } }');

            // 3. NPM setup
            console.log("🛠️ Configuring NPM and scripts...");
            execSync('npm init -y', { stdio: 'ignore' });

            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            pkg.scripts = {
                "start": "wp-scripts start",
                "build": "wp-scripts build"
            };
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

            // 4. Install dependencies
            console.log("📥 Installing @wordpress/scripts... (coffee time ☕)");
            execSync('npm install @wordpress/scripts --save-dev', { stdio: 'inherit' });

            console.log(`\n✅ Success! Plugin "${pluginName}" created and ready for modern JS.`);
            console.log(`\nNext steps:\n1. cd ${slug}\n2. npm start`);

        } catch (err) {
            console.error("❌ Fatal error:", err);
        } finally {
            rl.close();
        }
    });
});