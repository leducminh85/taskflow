// Định nghĩa kiểu dữ liệu
export type User = {
  id: string
  email: string
  name: string | null
}

export type Label = {
  id: string
  name?: string
  color: string
}

export type CardMember = {
  id: string
  name: string
  avatar?: string
  initials: string
}

export type Card = {
  id: string
  title: string
  description?: string | null
  order: number
  columnId: string
  column?: Column
  createdAt: Date | string
  updatedAt: Date | string
}

export type Column = {
  id: string
  name: string
  description?: string | null
  color?: string
  boardId: string
  board?: Board
  order?: number
  createdAt: Date | string
  updatedAt: Date | string
  cards?: Card[]
}

export type Board = {
  id: string
  name: string
  description: string | null
  color: string
  ownerId: string
  owner?: {
    id: string
    name: string | null
    email: string
  }
  members?: {
    id: string
    name: string | null
    email: string
  }[]
  columns?: Column[]
  totalTasks: number
  createdAt: Date | string
  updatedAt: Date | string
  _count?: {
    columns: number
  }
}

export type Collection = {
  id: string
  name: string
  description?: string
  boardCount: number
  color: string
  icon?: string
  updatedAt?: string
}

export type Comment = {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  text: string
  time: string
  isCurrentUser?: boolean
}

export type Activity = {
  id: string
  user: {
    id?: string
    name: string
    initials: string
    avatar?: string
  }
  action: string
  time: string
  boardId?: string
  boardName?: string
  cardId?: string
  cardName?: string
  columnId?: string
  columnName?: string
  before?: string
  after?: string
  comments?: Comment[]
  liked?: boolean
  timestamp?: number
  type?: "card" | "board" | "comment" | "member" | "other"
  read?: boolean
}

export type ApiResponse<T> = {
  data?: T
  error?: string
  status?: number
  message?: string
}

export type Project = {
  id: string
  name: string
  totalTasks: number
  completedTasks: number
  color: string
}
