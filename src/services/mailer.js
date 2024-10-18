import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,  
    },
});


export const sendPurchaseEmail = async (recipient, purchaseDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: 'Detalles de tu compra',
        html: `
            <h1>Gracias por tu compra</h1>
            <p>Hola, aquí están los detalles de tu compra:</p>
            <ul>
                ${purchaseDetails.products.map(p => `
                    <li><strong>${p.product}</strong> - Cantidad: ${p.quantity} - Precio: $${p.price}</li>
                `).join('')}
            </ul>
            <p>Total pagado: <strong>$${purchaseDetails.total}</strong></p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
        throw new Error('No se pudo enviar el correo de confirmación');
    }
};
