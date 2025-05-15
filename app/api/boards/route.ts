import { NextResponse } from "next/server"
import { boardService } from "@/lib/services"
import { auth } from "@/lib/auth"
import * as z from "zod"

const createBoardSchema = z.object({
  name: z.string().min(1, {
    message: "Board name is required",
  }),
  description: z.string(),
  color: z.string(),
})

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const boards = await boardService.getUserBoards(session.user.id)
    return NextResponse.json(boards)
  } catch (error) {
    console.error("[GET_BOARDS_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedFields = createBoardSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: validatedFields.error.errors },
        { status: 400 }
      )
    }

    const { name, description, color } = validatedFields.data

    const board = await boardService.createBoard({
      name,
      description,
      color,
      ownerId: session.user.id,
    })

    return NextResponse.json(board, { status: 201 })
  } catch (error) {
    console.error("[CREATE_BOARD_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
