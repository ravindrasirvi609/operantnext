import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Check if the emailType is valid (either "VERIFY" or "RESET")
    if (emailType !== "VERIFY" && emailType !== "RESET") {
      throw new Error(
        "Invalid emailType. It should be either 'VERIFY' or 'RESET'."
      );
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
        service: "Gmail",
        auth: {
          user: "sirviravindra609@gmail.com", // Replace with your Gmail email address
          pass: "ehcw fbeo vplz gpyh", // Replace with your Gmail password or app password
        },
      });

      const mailOptions = {
        from: "sirviravindra609@gmail.com",
        to: email,
        subject: "OPF : Verify your email",
        html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #555555;
                }
                p {
                    color: #777777;
                }
                .button {
                    display: inline-block;
                    margin: 10px 0;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .button:hover {
                    background-color: #0056b3;
                }
                .verification-link {
                    word-break: break-all;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Email Verification</h1>
                <p>
                    Click <a class="button" href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.
                </p>
                <p class="verification-link">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            </div>
        </body>
        </html>
        `,
      };

      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });

      var transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "sirviravindra609@gmail.com", // Replace with your Gmail email address
          pass: "ehcw fbeo vplz gpyh", // Replace with your Gmail password or app password
        },
      });

      const mailOptions = {
        from: "sirviravindra609@gmail.com",
        to: email,
        subject: "OPF : Reset your password",
        html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #555555;
                }
                p {
                    color: #000000;
                }
                .button {
                    display: inline-block;
                    margin: 10px 0;
                    padding: 10px 20px;
                    background-color: #5de868;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .button:hover {
                    background-color: #1ea629;
                }
                .reset-link {
                    word-break: break-all;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset</h1>
                <p>
                    Click <a class="button" href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser.
                </p>
                <p class="reset-link">${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>
            </div>
        </body>
        </html>
        `,
      };

      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
