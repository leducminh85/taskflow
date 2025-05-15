import { NextResponse } from "next/server"
import { boardService } from "@/lib/services/board-service"

export async function PATCH(request: Request, { params }: { params: { boardId: string; columnId: string } }) {
  try {
    const { boardId, columnId } = params
    const data = await request.json()
    const response = await boardService.updateColumn(boardId, columnId, data)

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: response.status })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { boardId: string; columnId: string } }) {
  const { boardId, columnId } = params
  const response = await boardService.deleteColumn(boardId, columnId)

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: response.status })
  }

  return NextResponse.json(response.data)
}
