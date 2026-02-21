const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    // Backgrounds
    { regex: /bg-\[#0B0C0E\]/g, replacement: 'bg-[#f5ebe0]' },
    { regex: /bg-\[#1C1E23\]/g, replacement: 'bg-[#edede9]' },
    { regex: /bg-\[#E9EAEC\]/g, replacement: 'bg-[#e3d5ca]' },
    { regex: /bg-\[#3F4CCB\]/g, replacement: 'bg-[#d5bdaf]' },

    // Hover Backgrounds
    { regex: /hover:bg-\[#0B0C0E\]/g, replacement: 'hover:bg-[#d6ccc2]' },
    { regex: /hover:bg-white/g, replacement: 'hover:bg-[#d5bdaf]' },

    // Text colors (Dark brown/taupe for readability on light backgrounds)
    { regex: /text-\[#E9EAEC\]/g, replacement: 'text-[#4a4036]' },
    { regex: /text-white/g, replacement: 'text-[#2b251f]' },
    { regex: /text-\[#0B0C0E\]/g, replacement: 'text-[#2b251f]' },
    { regex: /text-\[#6D7278\]/g, replacement: 'text-[#8f8377]' },
    { regex: /text-\[#3F4CCB\]/g, replacement: 'text-[#a68c7c]' },
    { regex: /hover:text-\[#E9EAEC\]/g, replacement: 'hover:text-[#2b251f]' },
    { regex: /hover:text-white/g, replacement: 'hover:text-[#f5ebe0]' },

    // Borders
    { regex: /border-\[rgba\([^)]+\)\]/g, replacement: 'border-[#d6ccc2]/40' },
    { regex: /border-\[#3F4CCB\]/g, replacement: 'border-[#d5bdaf]' },
    { regex: /border-\[#0B0C0E\]/g, replacement: 'border-[#d6ccc2]' },

    // Gradients & Misc
    { regex: /from-\[#0B0C0E\]/g, replacement: 'from-[#f5ebe0]' },
    { regex: /to-\[#0B0C0E\]/g, replacement: 'to-[#f5ebe0]' },
    { regex: /via-\[#3F4CCB\]/g, replacement: 'via-[#d5bdaf]' },
    { regex: /data-theme="dark"/g, replacement: 'data-theme="light"' },

    // Glassy specific tweaks
    { regex: /bg-\[rgba\([^)]+\)\]/g, replacement: 'bg-[#f5ebe0]/30' },
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            for (const { regex, replacement } of replacements) {
                content = content.replace(regex, replacement);
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(srcDir);
console.log("Color palette replacement complete.");
