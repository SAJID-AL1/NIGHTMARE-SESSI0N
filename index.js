const { startNightmare } = require('./lib/connect');

async function main() {
    try {
        const sock = await startNightmare();
        console.log('[Session] Bot running on Heroku!');
    } catch (e) {
        console.error('[Error]', e);
    }
}

main();
