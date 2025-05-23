import { NextResponse } from "next/server"
import { boardService } from "@/lib/services"
import { auth } from "@/lib/auth"

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params
    if (!id) {
      return NextResponse.json({ error: "Board ID is required" }, { status: 400 })
    }

    const result = await boardService.getBoardById(id)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 }
      )
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error("[GET_BOARD_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params
    if (!id) {
      return NextResponse.json({ error: "Board ID is required" }, { status: 400 })
    }

    const result = await boardService.deleteBoard(id)

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