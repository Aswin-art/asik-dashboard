import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verifikasi webhook callback dari Xendit
    const xenditCallbackToken = process.env.XENDIT_CALLBACK_TOKEN;
    const receivedToken = request.headers.get("x-callback-token");

    if (xenditCallbackToken && receivedToken !== xenditCallbackToken) {
      return NextResponse.json({ error: "Invalid callback token" }, { status: 401 });
    }

    const { id, external_id, status, amount, paid_amount, payment_channel, payment_method } = body;

    // Update status booking di database berdasarkan external_id
    if (status === "PAID" || status === "SETTLED") {
      // Booking berhasil dibayar
      // await db.booking.update({
      //   where: { invoiceId: id },
      //   data: {
      //     status: "paid",
      //     paidAt: new Date(),
      //     paymentChannel: payment_channel,
      //     paymentMethod: payment_method,
      //   },
      // });

      // Kirim email konfirmasi ke user
      // await sendBookingConfirmationEmail(booking);

      console.log(`Payment successful for ${external_id}:`, {
        id,
        amount,
        paid_amount,
        payment_channel,
        payment_method,
      });
    } else if (status === "EXPIRED") {
      // Invoice expired
      // await db.booking.update({
      //   where: { invoiceId: id },
      //   data: { status: "expired" },
      // });

      console.log(`Payment expired for ${external_id}`);
    } else if (status === "FAILED") {
      // Payment failed
      // await db.booking.update({
      //   where: { invoiceId: id },
      //   data: { status: "failed" },
      // });

      console.log(`Payment failed for ${external_id}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
