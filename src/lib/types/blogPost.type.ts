interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    readTimeMin: number;
    imageUrl: string;
    imageAlt: string;
    likes: number;
    dislikes: number;
    tags: string[];
    isPublished: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    isFeatured: boolean;
    categoryId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        name: string;
        email: string;
    };
    category: {
        id: string;
        name: string;
    };
    _count: {
        comments: number;
    };
    slug?: string;
}

export type { BlogPost };
