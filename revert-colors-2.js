import fs from 'fs';
import path from 'path';

const colorMap = {
    '#a68c7c': '#3F4CCB',
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

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log('Updated', file);
    }
});

console.log(`Reverted colors in ${changedFiles} files.`);
