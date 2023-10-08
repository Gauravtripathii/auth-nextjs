import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userID}: any) => {
    try {
        // create a hashed token using user _id
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        // update the token according to need (to change password, or to verify email)
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        // NODEMAILER
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_TRANSPORT_USER,
              pass: process.env.NODEMAILER_TRANSPORT_PASS
            }
        });

        const mailOptions = {
            from: 'gauravtripathii7979@gmail.com',
            to: email,
            subject: emailType==='VERIFY'? 'Verify your email' : 'Reset your password',
            html: `Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VEIFY'?'verify your email':'reset your password'}.
            <br>
            or copy paste the following link in your browser : ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

