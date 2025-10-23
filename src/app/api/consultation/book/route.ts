import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";

// No need to fetch the psychologists list here; we receive backend id directly

type SessionType = "chat" | "video";

interface CreateConsultationResponse {
  invoice_url?: string;
  payment?: { invoice_url?: string };
  [key: string]: unknown;
}

export async function POST(req: Request) {
  try {
    const { getToken } = await auth();
    const token = (await getToken?.()) || null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      doctorId, // numeric id produced by UI mapping
      sessionType,
      complaint,
      date, // ISO string
      time, // HH:mm
      amount,
    }: {
      doctorId: string | number;
      sessionType: SessionType;
      complaint: string;
      date: string;
      time: string;
      amount: number;
    } = body;

    if (!doctorId || !sessionType || !complaint || !date || !time || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const scheduledAt = (() => {
      const base = new Date(date);
      const [hh, mm] = String(time).split(":");
      if (!isNaN(base.getTime()) && hh !== undefined && mm !== undefined) {
        base.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
        return base.toISOString();
      }
      return date; // fallback
    })();

    // Create consultation on backend using provided backend psychologist id
    // Adjust payload fields to your backend contract as needed
    const payload = {
      psychologist_id: doctorId,
      session_type: sessionType,
      complaint,
      scheduled_at: scheduledAt,
      price: amount,
    };

    const createResp = await api.post<CreateConsultationResponse>("/consultations", payload, { authToken: token });

    // Expecting either invoice_url or consultation/session info from backend
    const invoiceUrl = createResp?.invoice_url || createResp?.payment?.invoice_url || null;

    return NextResponse.json({ ok: true, invoice_url: invoiceUrl, consultation: createResp });
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string; data?: unknown };
    const status = e?.status || 500;
    const message = e?.message || "Internal Server Error";
    return NextResponse.json({ error: message, details: e?.data }, { status });
  }
}
