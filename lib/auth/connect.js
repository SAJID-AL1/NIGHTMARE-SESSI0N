const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const qr = require('qrcode-terminal');

let sock = null;

async function startNightmare() {
    console.log('\n🔥 Nightmare Session Starting...\n');

    const SESSION_DIR = path.join(__dirname, '../session');

    if (!fs.existsSync(SESSION_DIR)) {
        fs.mkdirSync(SESSION_DIR, { recursive: true });
    }

    const authState = await useMultiFileAuthState(SESSION_DIR);

    sock = makeWASocket({
        authState: authState,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Nightmare MD', 'Chrome', '120.0']
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('\n[QR] Scan this code:');
            qr.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log('[Session] Connection closed:', reason);

            if (reason === 401) {
                console.log('[Session] ❌ Logged out. Restarting...');
                setTimeout(() => startNightmare(), 3000);
            } else {
                setTimeout(() => startNightmare(), 3000);
            }
        } else if (connection === 'open') {
            console.log('[Session] ✅ Connected!\n');
        }
    });

    sock.ev.on('creds.update', () => {
        // Auto save handled by library
    });

    return sock;
}

module.exports = { startNightmare };
