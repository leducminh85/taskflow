import { prisma } from "@/lib/prisma"
import { ApiError } from "@/lib/utils/api-error"
import type { ApiResponse, Board, Column } from "@/types"

const boardService = {
  getAllBoards: async (): Promise<ApiResponse<Board[]>> => {
    try {
      const boards = await prisma.board.findMany({
        include: {
          _count: {
            select: { columns: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      })

      return {
        data: boards,
        status: 200,
      }
    } catch (error) {
      console.error("[GET_ALL_BOARDS_ERROR]", error)
      throw new ApiError(500, "Failed to fetch boards")
    }
  },

  getUserBoards: async (userId: string): Promise<ApiResponse<Board[]>> => {
    try {
      const boards = await prisma.board.findMany({
        where: {
          OR: [
            { ownerId: userId },
            { members: { some: { id: userId } } }
          ]
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          members: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: { 
              columns: true 
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })

      return { 
        data: boards as unknown as Board[],
        status: 200
      }
    } catch (error) {
      console.error("[GET_USER_BOARDS_ERROR]", error)
      throw new ApiError(500, "Failed to get user boards")
    }
  },

  getBoardById: async (id: string): Promise<ApiResponse<Board>> => {
    try {
      const board = await prisma.board.findUnique({
        where: { id },
        include: {
          _count: {
            select: { columns: true }
          }
        }
      })

      if (!board) {
        return {
          error: "Board not found",
          status: 404,
        }
      }

      return {
        data: board,
        status: 200,
      }
    } catch (error) {
      console.error("[GET_BOARD_BY_ID_ERROR]", error)
      throw new ApiError(500, "Failed to fetch board")
    }
  },

  createBoard: async (data: { name: string, description?: string | null, color: string, ownerId: string }): Promise<ApiResponse<Board>> => {
    try {
      const board = await prisma.board.create({
        data: {
          name: data.name,
          description: data.description,
          color: data.color,
          ownerId: data.ownerId,
          totalTasks: 0
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return {
        data: board as unknown as Board,
        status: 201,
        message: "Board created successfully"
      }
    } catch (error) {
      console.error("[CREATE_BOARD_ERROR]", error)
      throw new ApiError(500, "Failed to create board")
    }
  },

  updateBoard: async (id: string, data: Partial<Board>): Promise<ApiResponse<Board>> => {
    try {
      const board = await prisma.board.update({
        where: { id },
        data,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          members: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return {
        data: board,
        status: 200,
        message: "Board updated successfully",
      }
    } catch (error) {
      console.error("[UPDATE_BOARD_ERROR]", error)
      throw new ApiError(500, "Failed to update board")
    }
  },

  deleteBoard: async (id: string): Promise<ApiResponse<Board>> => {
    try {
      await prisma.board.delete({
        where: { id }
      })

      return { data: { message: "Board deleted successfully" } }
    } catch (error) {
      console.error("[DELETE_BOARD_ERROR]", error)
      throw new ApiError(500, "Failed to delete board")
    }
  },

  // Các hàm liên quan đến cột
  getColumns: async (boardId: string): Promise<ApiResponse<Column[]>> => {
    try {
      const board = await prisma.board.findUnique({
        where: { id: boardId },
        include: {
          columns: true
        }
      })

      if (!board) {
        return {
          error: "Board not found",
          status: 404,
        }
      }

      return {
        data: board.columns || [],
        status: 200,
      }
    } catch (error) {
      console.error("[GET_COLUMNS_ERROR]", error)
      throw new ApiError(500, "Failed to fetch columns")
    }
  },

  addColumn: async (boardId: string, columnData: Omit<Column, "id">): Promise<ApiResponse<Column>> => {
    try {
      const board = await prisma.board.findUnique({
        where: { id: boardId },
        include: { columns: true }
      })

      if (!board) {
        return {
          error: "Board not found",
          status: 404,
        }
      }

      const newColumn = await prisma.column.create({
        data: {
          name: columnData.name,
          boardId: board.id,
          color: columnData.color,
          description: columnData.description
        },
        include: {
          board: {
            select: {
              id: true,
              name: true,
              color: true
            }
          }
        }
      })

      return {
        data: newColumn,
        status: 201,
        message: "Column added successfully",
      }
    } catch (error) {
      console.error("[ADD_COLUMN_ERROR]", error)
      throw new ApiError(500, "Failed to add column")
    }
  },

  updateColumn: async (boardId: string, columnId: string, data: Partial<Column>): Promise<ApiResponse<Column>> => {
    try {
      const board = await prisma.board.findUnique({
        where: { id: boardId },
        include: { columns: true }
      })

      if (!board) {
        return {
          error: "Board not found",
          status: 404,
        }
      }

      const column = board.columns?.find((col) => col.id === columnId)

      if (!column) {
        return {
          error: "Column not found",
          status: 404,
        }
      }

      const updatedColumn = await prisma.column.update({
        where: { id: columnId },
        data,
        include: {
          board: {
            select: {
              id: true,
              name: true,
              color: true
            }
          }
        }
      })

      return {
        data: updatedColumn,
        status: 200,
        message: "Column updated successfully",
      }
    } catch (error) {
      console.error("[UPDATE_COLUMN_ERROR]", error)
      throw new ApiError(500, "Failed to update column")
    }
  },

  deleteColumn: async (boardId: string, columnId: string): Promise<ApiResponse<Column>> => {
    try {
      const board = await prisma.board.findUnique({
        where: { id: boardId },
        include: { columns: true }
      })

      if (!board) {
        return {
          error: "Board not found",
          status: 404,
        }
      }

      const column = board.columns?.find((col) => col.id === columnId)

      if (!column) {
        return {
          error: "Column not found",
          status: 404,
        }
      }

      const deletedColumn = await prisma.column.delete({
        where: { id: columnId },
        include: {
          board: {
            select: {
              id: true,
              name: true,
              color: true
            }
          }
        }
      })

      return {
        data: deletedColumn,
        status: 200,
        message: "Column deleted successfully",
      }
    } catch (error) {
      console.error("[DELETE_COLUMN_ERROR]", error)
      throw new ApiError(500, "Failed to delete column")
    }
  },

  // Tạo board mới
  async createBoard(data: {
    name: string
    description?: string
    color: string
    ownerId: string
  }) {
    try {
      const board = await prisma.board.create({
        data: {
          name: data.name,
          description: data.description,
          color: data.color,
          ownerId: data.ownerId
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return { data: board }
    } catch (error) {
      console.error("[CREATE_BOARD_ERROR]", error)
      throw new ApiError(500, "Failed to create board")
    }
  },

  // Cập nhật board
  async updateBoard(boardId: string, data: {
    name?: string
    description?: string
    color?: string
  }) {
    try {
      const board = await prisma.board.update({
        where: { id: boardId },
        data,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          members: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return { data: board }
    } catch (error) {
      console.error("[UPDATE_BOARD_ERROR]", error)
      throw new ApiError(500, "Failed to update board")
    }
  },

  // Xóa board
  async deleteBoard(boardId: string) {
    try {
      await prisma.board.delete({
        where: { id: boardId }
      })

      return { data: { message: "Board deleted successfully" } }
    } catch (error) {
      console.error("[DELETE_BOARD_ERROR]", error)
      throw new ApiError(500, "Failed to delete board")
    }
  }
}

export { boardService }
