const fs = require('fs');
const path = require('path');

const SESSION_DIR = path.join(__dirname, '../session');

if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
}

async function useMultiFileAuthState(sessionDir) {
    const CredsFile = path.join(sessionDir, 'Creds.json');
    const KeysDir = path.join(sessionDir, 'Keys');

    if (!fs.existsSync(KeysDir)) {
        fs.mkdirSync(KeysDir, { recursive: true });
    }

    const saveCreds = () => {
        // Handled by Baileys
    };

    const readCreds = () => {
        if (fs.existsSync(CredsFile)) {
            return JSON.parse(fs.readFileSync(CredsFile, 'utf-8'));
        }
        return {creds: {}};
    };

    return {
        state: readCreds(),
        saveCreds: saveCreds
    };
}

module.exports = { useMultiFileAuthState };
