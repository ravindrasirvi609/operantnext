import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Check if the emailType is valid (either "VERIFY" or "RESET")
    if (emailType !== "VERIFY" && emailType !== "RESET") {
      throw new Error("Invalid emailType. It should be either 'VERIFY' or 'RESET'.");
    }

    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log("hashedToken", hashedToken, emailType, email, userId);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "30b6617324a105",
          pass: "8f3e82c8e7757f",
        },
      });

      const mailOptions = {
        from: "sirviravindra609@gmail.com",
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
      };

      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "30b6617324a105",
          pass: "8f3e82c8e7757f",
        },
      });

      const mailOptions = {
        from: "sirviravindra609@gmail.com",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`,
      };

      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
