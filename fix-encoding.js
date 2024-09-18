const fs = require('fs');

// Lee el archivo original
const data = fs.readFileSync('./pages/perfil/[id].js', { encoding: 'utf8' });

// Escribe de nuevo el archivo con la codificación UTF-8
fs.writeFileSync('./pages/perfil/[id].js', data, { encoding: 'utf8' });

console.log('Archivo convertido a UTF-8 correctamente.');
