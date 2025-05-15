export type Card = {
  id: string
  title: string
  description?: string
  labels: string[] | {
    id: string
    name: string
    color: string
  }[]
  dueDate?: Date
  members?: {
    id: string
    name: string
    avatar?: string
    initials: string
  }[]
  attachments?: { id: string; name: string; url: string; date: string }[] | number
  comments?: number
  isJoined?: boolean
}

export type Column = {
  id: string
  name: string
  cards: Card[]
}

export type Board = {
  id: string
  name: string
  color: string
  members: number
  description: string
  columns: Column[]
}

export const boardData: Record<string, Board> = {
  "1": {
    id: "1",
    name: "Thiết kế lại Website",
    color: "#3b82f6",
    members: 5,
    description: "Thiết kế lại hoàn chỉnh website công ty với nhận diện thương hiệu mới",
    columns: [
      {
        id: "todo",
        name: "Cần làm",
        cards: [
          {
            id: "card-1",
            title: "Thiết kế giao diện trang chủ",
            description: "Tạo layout và các component chính cho trang chủ",
            labels: [
              {
                id: "label-1",
                name: "Design",
                color: "#10b981"
              },
              {
                id: "label-2",
                name: "High Priority", 
                color: "#ef4444"
              }
            ],
            members: [
              {
                id: "user-1",
                name: "Nguyễn Văn A",
                initials: "NA"
              }
            ],
            comments: 3,
            attachments: [
              {
                id: "attach-1",
                name: "homepage-mockup.fig",
                url: "/files/homepage-mockup.fig",
                date: "2024-03-15"
              }
            ]
          },
          {
            id: "card-2", 
            title: "Tối ưu SEO",
            description: "Thực hiện các biện pháp tối ưu SEO cơ bản",
            labels: [
              {
                id: "label-3",
                name: "SEO",
                color: "#8b5cf6"
              }
            ],
            members: [
              {
                id: "user-2",
                name: "Trần Thị B",
                initials: "TB"
              }
            ]
          }
        ]
      },
      {
        id: "in-progress",
        name: "Đang thực hiện",
        cards: [
          {
            id: "card-3",
            title: "Tích hợp thanh toán",
            description: "Tích hợp cổng thanh toán VNPay",
            labels: [
              {
                id: "label-4",
                name: "Backend",
                color: "#f59e0b"
              }
            ],
            members: [
              {
                id: "user-1",
                name: "Nguyễn Văn A",
                initials: "NA"
              },
              {
                id: "user-2",
                name: "Trần Thị B",
                initials: "TB" 
              }
            ],
            comments: 5
          }
        ]
      },
      {
        id: "done",
        name: "Đã hoàn thành",
        cards: [
          {
            id: "card-4",
            title: "Cài đặt môi trường",
            description: "Cài đặt và cấu hình môi trường phát triển",
            labels: [
              {
                id: "label-5",
                name: "Setup",
                color: "#06b6d4"
              }
            ],
            members: [
              {
                id: "user-1",
                name: "Nguyễn Văn A",
                initials: "NA"
              }
            ]
          }
        ]
      }
    ]
  },
  "2": {
    id: "2",
    name: "Marketing Campaign Q1/2024",
    color: "#8b5cf6",
    members: 3,
    description: "Kế hoạch marketing cho quý 1 năm 2024",
    columns: [
      {
        id: "ideas",
        name: "Ý tưởng",
        cards: [
          {
            id: "card-5",
            title: "Chiến dịch social media",
            description: "Lên kế hoạch nội dung cho các kênh social media",
            labels: [
              {
                id: "label-6",
                name: "Social Media",
                color: "#ec4899"
              }
            ],
            members: [
              {
                id: "user-2",
                name: "Trần Thị B",
                initials: "TB"
              }
            ]
          }
        ]
      },
      {
        id: "in-progress",
        name: "Đang thực hiện",
        cards: []
      },
      {
        id: "done",
        name: "Đã hoàn thành",
        cards: []
      }
    ]
  }
} 