import { NextResponse } from "next/server"
import { boardService } from "@/lib/services"
import { auth } from "@/lib/auth"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const boardId = params.id
    const result = await boardService.deleteBoard(boardId)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[DELETE_BOARD_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 