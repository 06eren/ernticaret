import "dotenv/config"
import nodemailer from "nodemailer"

async function main() {
  console.log("SMTP bağlantısı kuruluyor...")
  console.log("User:", process.env.SMTP_USER)

  const configs = [
    { host: "smtp.turkticaret.net", port: 587, secure: false, label: "smtp.turkticaret.net:587" },
    { host: "smtp.turkticaret.net", port: 465, secure: true, label: "smtp.turkticaret.net:465" },
    { host: "smtp.turkticaret.net", port: 25, secure: false, label: "smtp.turkticaret.net:25" },
  ]

  for (const cfg of configs) {
    console.log(`\n--- Deneniyor: ${cfg.label}`)
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
    })

    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: "kargalioglueren@gmail.com",
        subject: "Test Mail - ERN E-Ticaret",
        html: "<h1>Merhaba!</h1><p>Bu bir test e-postasidır. ERN E-Ticaret mail servisi basariyla calisiyor.</p>",
        text: "Merhaba! Bu bir test e-postasidır. ERN E-Ticaret mail servisi basariyla calisiyor.",
      })
      console.log("BASARILI! Message ID:", info.messageId)
      return
    } catch (error: any) {
      console.log("BASARISIZ:", error.code || error.message)
    }
  }

  console.log("\nHicbir SMTP ayari calismadi.")
}

main()
