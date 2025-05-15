import { NextResponse } from "next/server"
import { cardService } from "@/lib/services/card-service"
import type { Card } from "@/types"

export async function GET(request: Request, { params }: { params: { boardId: string; columnId: string } }) {
  const { boardId, columnId } = params
  const response = await cardService.getCardsByColumn(boardId, columnId)

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: response.status })
  }

  return NextResponse.json(response.data)
}

export async function POST(request: Request, { params }: { params: { boardId: string; columnId: string } }) {
  try {
    const { boardId, columnId } = params
    const data = (await request.json()) as Omit<Card, "id">
    const response = await cardService.addCard(boardId, columnId, data)

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: response.status })
    }

    return NextResponse.json(response.data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
