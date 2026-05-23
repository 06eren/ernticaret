import nodemailer from "nodemailer"

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  })
}

interface SendMailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  const transporter = createTransporter()

  // Bağlantıyı doğrula
  await transporter.verify()

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
    text,
  })

  return info
}

function getVerificationHtml(title: string, description: string, code: string): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dogrulama Kodu</title>
  <style>
    body {
      background-color: #1a0a2e;
      color: #faf5ff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #1a0a2e;
      padding: 40px 20px;
      text-align: center;
    }
    .card {
      background-color: #2d1044;
      border: 1px solid #4a1662;
      border-radius: 16px;
      max-width: 480px;
      margin: 0 auto;
      padding: 40px 30px;
      text-align: left;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #fb7185;
      text-align: center;
      margin-bottom: 30px;
      letter-spacing: 1px;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #faf5ff;
      margin-top: 0;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    .text {
      font-size: 15px;
      color: #d8b4fe;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .code-container {
      background-color: #4a1662;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin-bottom: 24px;
    }
    .code {
      font-family: "Courier New", Courier, monospace;
      font-size: 36px;
      font-weight: 800;
      color: #fb7185;
      letter-spacing: 8px;
      margin: 0;
    }
    .footer {
      font-size: 12px;
      color: #704b8c;
      text-align: center;
      margin-top: 30px;
      line-height: 1.5;
    }
    .divider {
      height: 1px;
      background-color: rgba(255, 255, 255, 0.05);
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="logo">ERN TICARET</div>
      <h2 class="title">${title}</h2>
      <p class="text">${description}</p>
      <div class="code-container">
        <p class="code">${code}</p>
      </div>
      <p class="text" style="font-size: 13px; color: #a78bfa;">Bu kod 15 dakika boyunca gecerlidir. Guvenliginiz icin bu kodu kimseyle paylasmayiniz.</p>
      <div class="divider"></div>
      <p class="footer">Bu e-posta otomatik olarak gonderilmistir. Lutfen dogrudan yanitlamayiniz.<br>&copy; 2026 ERN Ticaret. Tum Haklari Saklidir.</p>
    </div>
  </div>
</body>
</html>
  `
}

export async function sendVerificationCodeEmail(
  to: string,
  code: string,
  type: "register" | "login"
) {
  let subject = ""
  let title = ""
  let description = ""

  if (type === "register") {
    subject = "ERN Ticaret - Kayit Dogrulama Kodu"
    title = "Hesabinizi Dogrulayin"
    description =
      "ERN Ticaret platformuna kaydoldugunuz icin tesekkur ederiz. Uyelik isleminizi tamamlamak ve hesabinizi dogrulamak icin lutfen asagidaki 6 haneli kodu dogrulama alanina giriniz."
  } else {
    subject = "ERN Ticaret - Giris Dogrulama Kodu"
    title = "Giris Islemini Dogrulayin"
    description =
      "Hesabiniza guvenli bir sekilde giris yapmak icin tek kullanimlik dogrulama kodunuz olusturulmustur. Lutfen asagidaki 6 haneli kodu dogrulama alanina giriniz."
  }

  const html = getVerificationHtml(title, description, code)
  const text = `${title}\n\n${description}\n\nKodunuz: ${code}\n\nBu kod 15 dakika gecerlidir.`

  return sendMail({
    to,
    subject,
    html,
    text,
  })
}
