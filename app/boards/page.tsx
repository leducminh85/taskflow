"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Plus, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Board = {
  id: string
  name: string
  description: string
  color: string
  owner: {
    id: string
    name: string
    email: string
  }
  members: {
    id: string
    name: string
    email: string
  }[]
  _count: {
    columns: number
  }
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [boardToDelete, setBoardToDelete] = useState<Board | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await fetch("/api/boards")
      const data = await response.json()

      if (response.ok) {
        setBoards(data.data)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch boards",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch boards",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBoard = async (board: Board) => {
    try {
      const response = await fetch(`/api/boards/${board.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBoards((prev) => prev.filter((b) => b.id !== board.id))
        toast({
          title: "Thành công",
          description: "Đã xóa bảng thành công",
        })
      } else {
        const data = await response.json()
        toast({
          title: "Lỗi",
          description: data.error || "Không thể xóa bảng",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa bảng",
        variant: "destructive",
      })
    }
    setBoardToDelete(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bảng</h1>
          <p className="text-gray-500 mt-1">
            Tất cả các bảng trong không gian làm việc của bạn ({boards.length} tổng số)
          </p>
        </div>
        <Button asChild>
          <Link href="/boards/new">
            <Plus className="h-4 w-4 mr-2" />
            Tạo bảng mới
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <Card key={board.id} className="overflow-hidden">
            <div className="h-2" style={{ backgroundColor: board.color }} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-md mr-4" style={{ backgroundColor: `${board.color}20` }}>
                    <LayoutGrid className="h-6 w-6" style={{ color: board.color }} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{board.name}</h3>
                    <p className="text-sm text-gray-500">{board._count.columns} công việc</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setBoardToDelete(board)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa bảng
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-gray-700 mb-6">{board.description}</p>
              {/* <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {[board.owner, ...board.members].slice(0, 3).map((user) => (
                    <div
                      key={user.id}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs"
                      title={user.name}
                    >
                      {user.name[0].toUpperCase()}
                    </div>
                  ))}
                  {[board.owner, ...board.members].length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                      +{[board.owner, ...board.members].length - 3}
                    </div>
                  )}
                </div>
              </div> */}
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/boards/${board.id}`}>Xem bảng</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!boardToDelete} onOpenChange={() => setBoardToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa bảng này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bảng này sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => boardToDelete && handleDeleteBoard(boardToDelete)}
            >
              Xóa bảng
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
