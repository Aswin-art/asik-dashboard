import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, sessionType, date, time, amount } = body;

    // Validasi input
    if (!doctorId || !sessionType || !date || !time || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Setup Xendit API
    const xenditApiKey = process.env.XENDIT_API_KEY;
    if (!xenditApiKey) {
      return NextResponse.json({ error: "Xendit API key not configured" }, { status: 500 });
    }

    // Create invoice menggunakan Xendit API
    const invoiceData = {
      external_id: `booking-${doctorId}-${Date.now()}`,
      amount: amount,
      description: `Booking Konsultasi ${sessionType === "video" ? "Video Call" : "Chat"} - ${date} ${time}`,
      invoice_duration: 86400, // 24 jam
      customer: {
        given_names: "User", // Ambil dari session user
        email: "user@example.com", // Ambil dari session user
      },
      success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`,
      failure_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/failed`,
      currency: "IDR",
      items: [
        {
          name: `Konsultasi ${sessionType === "video" ? "Video Call" : "Chat"}`,
          quantity: 1,
          price: amount,
        },
      ],
    };

    const xenditResponse = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${xenditApiKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(invoiceData),
    });

    if (!xenditResponse.ok) {
      const error = await xenditResponse.json();
      return NextResponse.json({ error: "Failed to create invoice", details: error }, { status: 500 });
    }

    const invoice = await xenditResponse.json();

    // Simpan data booking ke database (opsional)
    // await db.booking.create({
    //   data: {
    //     doctorId,
    //     sessionType,
    //     date,
    //     time,
    //     amount,
    //     invoiceId: invoice.id,
    //     status: "pending",
    //   },
    // });

    return NextResponse.json({
      success: true,
      invoice_url: invoice.invoice_url,
      invoice_id: invoice.id,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
