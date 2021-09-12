var path = require('path');
require(path.join(__dirname, 'database'));
const contactController = require(path.join(__dirname, 'controller', 'contactController'));
const config = require(path.join(__dirname, 'config'));
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = config.SESSION_FILE_PATH
let client;
let sessionData;

const createClient = () => {
    /**
     * Creates WhatsApp Client
     */
    if (fs.existsSync(SESSION_FILE_PATH)) {
        // Load credentials from json file
        sessionData = require(SESSION_FILE_PATH);
        client = new Client({
            session: sessionData
        });
    } else {
        client = new Client();
    }

    client.on('qr', qr => {
        console.log('\n Escanear QR:\n\n');
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        startListening();
    });

    client.on('auth_failure', () => {
        console.log('** Error de autentificacion **');
    })

    client.on('authenticated', (session) => {
        // Save credentials as json
        console.log('Saving Session')
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
}

startListening = () => {
    /**
     * Configure behavior
     */
    
    client.on('message', async (msg) => {
        const { from, to, body } = msg;
        console.log(`from: ${from}\nmessage: ${body}\n\n`)
        
        if (msg.body == '!ping') {
            msg.reply('pong');
        } else if (body.startsWith('!username ')) {
            let newUsername = body.slice(10).toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (/^([a-z]{6,15})$/.test(newUsername)){
                wasChanged = await contactController.saveUsername(from, newUsername);
                if(wasChanged) {
                    client.sendMessage(from, `Su nombre de usuario cambió a: ${newUsername}`);
                } else {
                    client.sendMessage(from, `El nombre de usuario "${newUsername}" ya se encuentra en uso.`);
                }
            } else {
                client.sendMessage(from,'El nombre de usuario solo puede contener entre 6 y 15 letras minusculas.\nNo se permiten espacios.')
            }
        } else if (body.startsWith('!link')) {
            if (body === '!link') {
                let link = await contactController.getLinkByNumber(from);
                if (link === '') {
                    client.sendMessage(from, 'No se encontro ningun link guardado');
                } else {
                    client.sendMessage(from, `Su link guardado es:\n${link}`);
                }
            } else if (body.startsWith('!link ')) {
                let link = body.slice(6);
                if (validURL(link)) {
                    userLink = await contactController.saveLink(from, link);
                    if (userLink === '') {
                        client.sendMessage(from, 'Por favor registre su usuario con el comando:\n\n!username <nombre de usuario>\n\nEste nombre de usuario se utilizará para generar su nuevo link');
                    } else {
                        client.sendMessage(from, `Su link está listo:\n\n${userLink}`);
                    }
                } else {
                    client.sendMessage(from, 'No parece un link válido!');
                }
            }
        }
    });
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

createClient();
