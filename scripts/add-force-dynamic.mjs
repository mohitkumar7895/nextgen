import fs from 'fs';
import path from 'path';

function findRoutes(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(findRoutes(full));
    } else if (file === 'route.ts' || file === 'route.js') {
      results.push(full);
    }
  }
  return results;
}

const routes = findRoutes('app/api');
let count = 0;
for (const r of routes) {
  let content = fs.readFileSync(r, 'utf8');
  if (!content.includes('force-dynamic')) {
    content = "export const dynamic = 'force-dynamic';\n\n" + content;
    fs.writeFileSync(r, content, 'utf8');
    count++;
    console.log(`Added force-dynamic to: ${r}`);
  }
}
console.log(`Successfully updated ${count} route files.`);
