import { Router } from 'express';
import { sendEmail } from '../DAO/controller/preService.controller.js';
import config from '../config/config.js';
import { transport, __dirname } from '../utils.js';
import { generatePDFFromHTML, createZip } from '../services/pdf.service.js'
import { upload } from '../services/multer.js'

const router = Router()

router.post('/send', sendEmail)

router.post('/test', upload.any(), async (req, res) => {
    try {

        const { svg, record, shipName, sailing, long, lat, compass, model, serial, currentVariation, mark } = req.body

        const rawHTML = `
        <body>
            <style>
            /* Table general format */
            #invisibleTable {
                margin: 50px 0;
            }
            
            #invisibleTable table {
            width: 100%;
            }
            
            #invisibleTable td,
            #invisibleTable th {
            text-align: center;
            }
            
            #invisibleTable input {
                outline: none;
                border-top: none;
                border-left: none;
                border-right: none;
                text-align: center;
            }

            /* Svg general format */
            h1,h3{
                font-size:24px;
                text-align:center;
                border-bottom:1px solid black;
                margin:0 200px;
            }
            h3{
                margin-top:50px
            }

            svg * {
                user-select: none;
                transition: fill 250ms ease;
            }
            svg tspan {
                fill: black;
                font-weight: 400;
                stroke-width: 0px;
            }
            
            .svgContainer {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .svgContainer h2 {
                margin-block: 80px;
            }
            
            .compassSvg {
                width: 500px;
                max-height: 700px;
            }
            
            .medium {
                width: 700px;
            }
            
            .big {
                width: 1000px;
            }
            
            .ath circle,
            .foreAfter circle {
                fill: white;
            }
            
            #SauraHeelingsChain circle {
                fill: white;
            }
            
            .boxes rect {
                fill: white;
            }
            
            .flinders rect,
            .flinders ellipse {
                fill: white;
            }
            
            #Capa_9 rect {
                stroke: none;
            }
            
            #Capa_9 * {
                fill: white;
            }
            
            #Capa_1 .cls-2 {
                fill: white;
            }
            
            #Capa_1-2 path {
                fill: white;
            }
            
            #AthMagnetsGroup * {
                fill: white;
            }
            
            .OsakaNunotani #Capa_7 rect {
                fill: none;
                stroke: none;
            }
            
            .Box circle,
            .Box path {
                fill: white;
            }
            
            .Saracom #Chain * {
                fill: white;
            }
            
            .Saracom #Capa_2 path {
                stroke: none;
            }
            
            .Saracom #Capa_2 circle {
                fill: white;
            }
            
            .sphere path {
                fill: white;
                stroke: none;
            }
            
            .sphere circle {
                fill: white;
            }
            
            .chain ellipse,
            .chain rect,
            .chain circle {
                fill: white;
            }
            
            .hide {
                fill: white;
                stroke: none;
            }
        
            </style>
            <h1>Pre Service Sheet</h1>
            <p>Ships Name: ${shipName}</p>
            <p>Sailing at: ${sailing}</p>
            <p>Position: ${long} Long ${lat} Lat</p>
            <p>Compass: ${compass}</p>
            <p>Model: ${model}</p>
            <p>Serial Number: ${serial}</p>
            <p>Current Variation: ${currentVariation}</p>
            <p>Mark: ${mark}</p>
            <h3>Record</h3>
            ${record}
            <h3>Magnets</h3>
            ${svg}
        </body>
        `

        console.log(req.body);
        const particulars = req.files.filter(file => file.fieldname == 'particulars[]')
        const compassPhotos = req.files.filter(file => file.fieldname == 'compassPhotos[]')
        const lastDevCurve = req.files.filter(file => file.fieldname == 'lastDevCurve[]')


        const pdfBuffer = await generatePDFFromHTML(rawHTML)
        const particularsZipBuffer = await createZip(particulars)
        const compassPhotosZipBuffer = await createZip(compassPhotos)
        const lastDevCurveZipBuffer = await createZip(lastDevCurve)


        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: "franortega.wg@gmail.com",
            subject: 'Pre Service',
            html: `<body> 
                <h1>Instrumental Dufour</h1>
                <h2> Pre Service from ${shipName} sailing at ${sailing}</h2>
            </body>`,
            attachments: [
                {
                    filename: 'PreServiceSheet.pdf',
                    content: pdfBuffer,
                },
                {
                    filename: 'Particulars.zip',
                    content: particularsZipBuffer
                },
                {
                    filename: 'CompassPhotos.zip',
                    content: compassPhotosZipBuffer
                },
                {
                    filename: 'LastDeviationCurve.zip',
                    content: lastDevCurveZipBuffer
                }
            ],
        })

        return res.send({ status: "success", message: "Email sent!" })

    } catch (error) {
        console.log(error);
        return res.send({ status: "error", message: "Something went wrong! Please try again later or send an email manually." })
    }
})

export default router