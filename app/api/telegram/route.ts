import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Klyentdan (formadan) kelgan ma'lumotlarni qabul qilib olamiz
    const body = await request.json();
    const { carName, carPrice, ownerPhone } = body;

    // 2. Seyfimizdan (.env) bot sirlarini olamiz
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Server sozlamalarida xatolik (Token topilmadi)" }, { status: 500 });
    }

    // 3. Telegramga yuboriladigan xabar matni
    const telegramMessage = `
🚀 **YANGI E'LON QO'SHILDI!**

🚗 **Mashina:** ${carName}
💰 **Narxi:** ${carPrice} $
📞 **Tel:** ${ownerPhone}
✅ E'lon muvaffaqiyatli saytga joylandi.
    `;

    // 4. Telegram serveriga xavfsiz so'rov yuboramiz
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      throw new Error("Telegram API xatolik berdi");
    }

    // 5. Hammasi zo'r bo'lsa, klyentga "Success" deymiz
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Telegram API xatosi:", error);
    return NextResponse.json({ error: "Xabar yuborilmadi" }, { status: 500 });
  }
}