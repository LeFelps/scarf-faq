export interface Question {
    id: string
    title: string
    description: string
    parent?: string
    children?: Question[]
}

export interface NewQuestion {
    title: string
    description: string
    parent?: string
}