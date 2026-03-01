const fs = require('fs');
const path = require('path');

const files = [
    'src/store/useAppStore.js',
    'src/components/screens/WorkerDashboardScreen.jsx',
];

const replacers = [
    { from: /'UNASSIGNED'/g, to: "'Pending Assignment'" },
    { from: /'ASSIGNED'/g, to: "'Assigned'" },
    { from: /'IN_PROGRESS'/g, to: "'In Progress'" },
    { from: /'COMPLETED'/g, to: "'Completed'" },
    { from: /'Pending'/g, to: "'Pending Assignment'" },
    { from: /'Processing'/g, to: "'In Progress'" }
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        replacers.forEach(r => {
            content = content.replace(r.from, r.to);
        });
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
