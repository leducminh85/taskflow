"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Plus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

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
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-md mr-4" style={{ backgroundColor: `${board.color}20` }}>
                  <LayoutGrid className="h-6 w-6" style={{ color: board.color }} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{board.name}</h3>
                  <p className="text-sm text-gray-500">{board._count.columns} công việc</p>
                </div>
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
    </div>
  )
}
