import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEnrollmentConfirmation = async (
  userName: string,
  userEmail: string,
  workshopTitle: string
) => {
  console.log("Attempting to send email with variables:", {
    serviceId: SERVICE_ID ? "Loaded" : "MISSING",
    templateId: TEMPLATE_ID ? "Loaded" : "MISSING",
    publicKey: PUBLIC_KEY ? "Loaded" : "MISSING",
  });

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error(
      "EmailJS credentials missing! Check your .env file."
    );
    return;
  }

  // Explicitly initialize EmailJS with the Public Key
  emailjs.init(PUBLIC_KEY);

  const templateParams = {
    to_name: userName,
    to_email: userEmail,
    workshop_title: workshopTitle,
    reply_to: "support@cybernexusdz.com",
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    console.log("EmailJS Success:", response.status, response.text);
    return response;
  } catch (error: any) {
    console.error("EmailJS Error details:", {
      status: error?.status,
      text: error?.text,
      original: error
    });
    throw error;
  }
};
