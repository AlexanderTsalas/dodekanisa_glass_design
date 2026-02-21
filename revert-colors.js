import fs from 'fs';
import path from 'path';

const colorMap = {
    '#f5ebe0': '#E9EAEC',
    '#e3d5ca': '#E9EAEC',
    '#4a4036': '#0B0C0E',
    '#2b251f': '#0B0C0E',
    '#d6ccc2': 'rgba(11,12,14,0.1)',
    '#d5bdaf': '#3F4CCB',
    '#8f8377': '#6D7278',
};

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace hex codes (case insensitive)
    for (const [beige, originalColor] of Object.entries(colorMap)) {
        const regex = new RegExp(beige, 'gi');
        content = content.replace(regex, originalColor);
    }

    // Home page contact form used to be dark data-theme="dark" with #0B0C0E bg. 
    // The user requested all pages colors "similar to home page".
    // I will replace all instances of dark-theme text/bgs manually later if needed.

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log('Updated', file);
    }
});

console.log(`Reverted colors in ${changedFiles} files.`);
