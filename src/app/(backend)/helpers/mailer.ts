import nodemailer from 'nodemailer';
import prisma from '@/app/lib/prismadb';
import bcryptjs from 'bcrypt';



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
 
 if (emailType === 'VERIFY') {
  await prisma.user.update({
    where: { id: userId },
    data: {
      verifyToken: hashedToken,
      verifyTokenExpiry: new Date(Date.now() + 3600000), // Add 1 hour (3600000 milliseconds) to the current date
    },
  });
  
} else if (emailType === 'RESET') {
  await prisma.user.update({
    where: { id: userId },
    data: {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // Add 1 hour (3600000 milliseconds) to the current date
    },
  });
}

var transport = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "notenext@no-reply.com",
    pass: "A1E97A48544FB51E20DC03339EE34DFDA9FE"
  }
});

    const mailOptions = {
      from: 'xhafin@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${process.env.NEXT_PUBLIC_SITE_URL}/auth/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste the link below in your browser. <br> ${process.env.NEXT_PUBLIC_SITE_URL}/auth/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
