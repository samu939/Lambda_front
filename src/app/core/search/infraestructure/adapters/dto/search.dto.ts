export interface SearchDto {
    blogs: Body[];
    courses: Body[];
}

interface Body {
    id: string;
    title: string;
    image: string;
    date: Date;
    category: string;
    trainer: string;
}
