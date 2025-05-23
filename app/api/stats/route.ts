import { NextResponse } from "next/server"
import { statsService } from "@/lib/services/stats-service"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stats = await statsService.getDashboardStats(session.user.id)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("[GET_STATS_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 