import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendQuoteEmails = async (quoteData, magicLink) => {
  try {
    // Email to admin
    await resend.emails.send({
      from: "SharpBlade Quotes <sales@sharpbladeknox.com>",
      to: "sales@sharpbladeknox.com",
      subject: `New Quote Request from ${quoteData.firstName} ${quoteData.lastName}`,
      html: `<h3>New Quote Submitted</h3>
             <p><strong>Name:</strong> ${quoteData.firstName} ${quoteData.lastName}</p>
             <p><strong>Email:</strong> ${quoteData.email}</p>
             <p><strong>Service Requested:</strong> ${quoteData.serviceRequested}</p>
             <p><strong>Phone:</strong> ${quoteData.phone}</p>
             <p><strong>Address:</strong> ${quoteData.houseNumber}, ${quoteData.city}, ${quoteData.state} ${quoteData.zipcode}</p>`
    });

    // Email to user with magic link
    await resend.emails.send({
      from: "SharpBlade Sales <sales@sharpbladeknox.com>",
      to: quoteData.email,
      subject: "Your Quote Request with SharpBlade",
      html: `<p>Hi ${quoteData.firstName},</p>
             <p>Thank you for submitting a quote request. Our sales team will review your request and get back to you shortly.</p>
             <p>Click the link below to view your dashboard and track your quote status:</p>
             <p><a href="${magicLink}">View Your Dashboard</a></p>
             <br>
             <p>— SharpBlades Team</p>`
    });
  } catch (error) {
    console.error("Error sending quote emails", error);
  }
};
