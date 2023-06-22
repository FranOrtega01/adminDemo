import fs from 'fs';

export const generateTextFile = (content, filePath) => {
    fs.writeFile(filePath, content, (error) => {
        if (error) {
            console.error('Error al generar el archivo:', error);
        } else {
            console.log('Archivo generado correctamente');
        }
    });
};

