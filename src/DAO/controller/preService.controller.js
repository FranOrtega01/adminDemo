import { transport, generateToken } from '../../utils.js'
import config from '../../config/config.js'
import jwt from 'jsonwebtoken'

export const sendEmail = async (req, res) => {
    const { name } = req.body
    const { sailing } = req.body
    const { currentVariation } = req.body
    const { compass } = req.body
    const { svgData } = req.body

    console.log(req.body);

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
        return res.send({ status: "success", message: "Email sent!" })

    } catch (error) {
        console.log(error);
        return res.send({ status: "error", message: "Something went wrong! Please try again later o send an email manually." })
    }
}

export const sendToken = async (req, res) => {
    try {
        const token = generateToken();
        res.status(200).json({ status: 'success', payload: token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'An error ocurred generating the token' })
    }

}
export const authorizateToken = (req, res) => {
    console.log('entro');



    const authHeader = req.headers.authorization ;
    console.log(authHeader);
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({status:'error', message: 'No Token given' });
    }

    // Verifica y decodifica el token

    jwt.verify(token, config.jwtSign, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({status:'erorr', message: 'Invalid Token' });
        }
        return res.status(200).json({status:'success', message: 'Valid Token' });
    });
}