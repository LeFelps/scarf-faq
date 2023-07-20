export interface Question {
    _id: string
    title: string
    description: string
    parent?: string
    __v: number
    children?: Question[]
}

export interface NewQuestion {
    title: string
    description: string
    parent?: string
}