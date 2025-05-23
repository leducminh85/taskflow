// Định nghĩa kiểu dữ liệu
export type User = {
  id: string
  email: string
  name: string | null
}

export type Label = {
  id: string
  name?: string | null
  color: string
}

export type CardMember = {
  id: string
  name: string
  avatar?: string | null
  initials: string
}

export type Card = {
  id: string
  title: string
  description?: string | null
  dueDate?: Date | null
  order: number
  columnId: string
  attachments: number
  createdAt: Date
  updatedAt: Date
  column?: Column
  comments?: Comment[]
  members?: CardMember[]
  labels?: Label[]
}

export type Column = {
  id: string
  name: string
  order: number
  boardId: string
  createdAt: Date
  updatedAt: Date
  board?: Board
  cards?: Card[]
}

export type Board = {
  id: string
  name: string
  description: string
  totalTasks: number
  color: string
  createdAt: Date
  updatedAt: Date
  ownerId: string
  collectionId?: string | null
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
  _count?: {
    columns: number
  }
}

export type Collection = {
  id: string
  name: string
  description?: string | null
  boardCount: number
  color: string
  icon?: string | null
  createdAt: Date
  updatedAt: Date
  boards?: Board[]
}

export type Comment = {
  id: string
  text: string
  userId: string
  cardId: string
  createdAt: Date
  updatedAt: Date
  user?: {
    id: string
    name: string
    email: string
  }
}

export type Activity = {
  id: string
  action: string
  type: "CARD" | "BOARD" | "COMMENT" | "MEMBER" | "OTHER"
  userId: string
  boardId: string
  cardId?: string | null
  cardName?: string | null
  columnId?: string | null
  columnName?: string | null
  before?: string | null
  after?: string | null
  timestamp: Date
  read: boolean
  createdAt: Date
  updatedAt: Date
  user?: {
    id: string
    name: string
    email: string
  }
  board?: Board
}

export type ApiResponse<T> = {
  data?: T
  error?: string
  status: number
  message?: string
}

export type Project = {
  id: string
  name: string
  totalTasks: number
  completedTasks: number
  color: string
}
