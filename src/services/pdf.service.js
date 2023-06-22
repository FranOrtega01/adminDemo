import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import __dirname from '../utils.js';
import JSZip from 'jszip';
import fs from 'fs'

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

export const createZip = async (files) => {
    const zip = new JSZip();

    // Recorre el array de archivos
    files.forEach((file) => {
      zip.file(file.originalname, file.buffer);
    });

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    return zipBuffer;
}
