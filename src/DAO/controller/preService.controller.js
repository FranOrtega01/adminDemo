import {transport } from '../../utils.js'
import config from '../../config/config.js'

export const sendEmail = async (req, res) => {
    const {name} = req.body
    const {sailing} = req.body
    const {currentVariation} = req.body
    const {compass} = req.body
    const {svgData} = req.body   

    const htmlContent = `
    <html>
        <body>
            <h2> Name of ship: ${name} </h2>
            <p>Sailing at: ${sailing}</p>
            <p>Current Variation: ${currentVariation}</p>
            <p>Compass: ${compass}</p>
        </body>
    </html>
    `;

    try {
    
        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: "franortega.wg@gmail.com",
            subject: 'Pre Service',
            html: htmlContent,
            attachments: [
            {
                filename: 'magnets.svg',
                content: svgData,
                contentType: 'image/svg+xml',
            },
            ],
        })
        return res.send({status: "success", message:"Email sent!"})

    } catch (error) {
        console.log(error);
        return res.send({status: "error", message:"Something went wrong! Please try again later o send an email manually."})
    }
}