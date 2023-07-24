import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import __dirname from '../utils.js';
import JSZip from 'jszip';

export const generatePDFFromHTML = async (html) => {
  const $ = cheerio.load(html);

  // Eliminamos los elementos <h2>
  $('h2').remove();
  $('label').remove();
  $('input').remove();


  const modifiedHTML = $.html();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(modifiedHTML, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return pdfBuffer;
};

// export const createZip = async (files) => {
//     const zip = new JSZip();

//     // Recorre el array de archivos
//     files.forEach((file) => {
//       zip.file(file.originalname, file.buffer);
//     });

//     const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
//     return zipBuffer;
// }

export const createZip = async (particulars, compassPhotos, lastDevCurve, other, mark) => {
  const zip = new JSZip();

  // Agregar las carpetas al archivo ZIP
  const particularsFolder = zip.folder('Particulars');
  const compassPhotosFolder = zip.folder('CompassPhotos');
  const lastDevCurveFolder = zip.folder('LastDeviationCurve');

  // Agregar los archivos a las carpetas correspondientes
  particulars.forEach((file) => {
    particularsFolder.file(file.originalname, file.buffer);
  });
  compassPhotos.forEach((file) => {
    compassPhotosFolder.file(file.originalname, file.buffer);
  });
  lastDevCurve.forEach((file) => {
    lastDevCurveFolder.file(file.originalname, file.buffer);
  });

  // Agregar la carpeta "Other" si existe y mark es igual a 'OTHER'
  if (mark === 'OTHER') {
    const otherFolder = zip.folder('Other');
    other.forEach((file) => {
      otherFolder.file(file.originalname, file.buffer);
    });
  }

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  return zipBuffer;
};