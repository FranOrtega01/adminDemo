import { transport, generatePreserviceToken } from '../../utils.js'
import config from '../../config/config.js'
import { createZip,createOtherZip, generatePDFFromHTML } from '../../services/pdf.service.js'

export const sendEmail = async (req, res) => {

    try {
        const { svg, record, shipName, sailing, long, lat, compass, model, serial, currentVariation, mark, obs } = req.body

        let emptyFields = [];
        if (!svg) {
            emptyFields.push('svg')
        }
        if (!record) {
            emptyFields.push('record')
        }
        if (!shipName) {
            emptyFields.push('shipName')
        }
        if (!compass) {
            emptyFields.push('compass')
        }
        if (!serial) {
            emptyFields.push('serial')
        }
        if (!currentVariation) {
            emptyFields.push('currentVariation')
        }
        if (!mark) {
            emptyFields.push('mark')
        }
        if (emptyFields?.length > 0) return res.status(400).json({ status: 'error', message: 'Please fill in all the fields.' })

        const particulars = req.files.filter(file => file.fieldname == 'particulars[]')
        const compassPhotos = req.files.filter(file => file.fieldname == 'compassPhotos[]')
        const lastDevCurve = req.files.filter(file => file.fieldname == 'lastDevCurve[]')
        const other = mark === 'OTHER' ? req.files.filter(file => file.fieldname == 'other[]') : []

        if (!particulars?.length || !compassPhotos?.length || !lastDevCurve?.length || (mark === 'other' && !other?.length)) {
            return res.status(400).json({ status: 'error', message: 'Please drop required files.' })
        }

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
            ${mark === 'OTHER' ? '' : '<h3>Magnets</h3>'}
            
            ${mark === 'OTHER' ? '' : svg}
            ${obs ? `<p>Observation:${obs}</p>` : ''}
        </body>
        `

        const pdfBuffer = await generatePDFFromHTML(rawHTML)

        const zipBuffer = await createZip(particulars, compassPhotos, lastDevCurve, other, mark);


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
                    filename: 'PreServiceFiles.zip',
                    content: zipBuffer
                }
            ],
        })

        return res.send({ status: "success", message: "Email sent!" })

    } catch (error) {
        console.log(error);
        return res.send({ status: "error", message: "Something went wrong! Please try again later or send an email manually." })
    }
}

export const sendEmailPost = async (req, res) => {

    try {
        const { svg, record, shipName, sailing, mark, obs } = req.body

        let emptyFields = [];
        if (!svg) {
            emptyFields.push('svg')
        }
        if (!record) {
            emptyFields.push('record')
        }
        if (!shipName) {
            emptyFields.push('shipName')
        }
        if (!mark) {
            emptyFields.push('mark')
        }
        if (emptyFields?.length > 0) return res.status(400).json({ status: 'error', message: 'Please fill in all the fields.' })

        const other = mark === 'OTHER' ? req.files.filter(file => file.fieldname == 'other[]') : []

        if ((mark === 'other' && !other?.length)) {
            return res.status(400).json({ status: 'error', message: 'Please drop required files.' })
        }

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
            <p>Mark: ${mark}</p>
            <h3>Record</h3>
            ${record}
            ${mark === 'OTHER' ? '' : '<h3>Magnets</h3>'}
            
            ${mark === 'OTHER' ? '' : svg}
            ${obs ? `<p>Observation:${obs}</p>` : ''}
        </body>
        `

        const pdfBuffer = await generatePDFFromHTML(rawHTML)

        const attachments = [
            {
                filename: 'PreServiceSheet.pdf',
                content: pdfBuffer,
            },
        ];

        let zipBuffer

        if (other?.length > 0) {
            zipBuffer = await createOtherZip(other);
            attachments.push({
                filename: 'PreServiceFiles.zip',
                content: zipBuffer,
            });
        }

        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: "franortega.wg@gmail.com",
            subject: 'Post Service',
            html: `<body> 
                <h1>Instrumental Dufour</h1>
                <h2> Post Service from ${shipName} sailing at ${sailing}</h2>
            </body>`,
            attachments
        })

        return res.send({ status: "success", message: "Email sent!" })

    } catch (error) {
        console.log(error);
        return res.send({ status: "error", message: "Something went wrong! Please try again later or send an email manually." })
    }
}

export const sendToken = async (req, res) => {
    try {
        const token = generatePreserviceToken('7d');
        res.status(200).json({ status: 'success', payload: token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'An error ocurred generating the token' })
    }

}
export const authorizateToken = (req, res) => {
    return res.status(200).json({ status: 'success', message: 'Valid Token' });
}