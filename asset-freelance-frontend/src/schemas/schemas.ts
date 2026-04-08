
type Publish = {
    type: string,
    ref_id: number,
    title: string,
    summary: string,
    thumbail_url:string,
    date: Date
}

export type Publishes = Publish[];


export type New = {
    title:string,
    slug: string,
    summary: string,
    content: string,
    thumbnail_url: string, 
    is_published: boolean,
    published_at:Date,
    id:number,
    created_at: Date,
    updated_at: Date,
};

type NewImage = {
    title: string,
    description: string,
    image_url: string,
    category: string,
    news_id: number,
    service_id: number,
    id: number,
    created_at: Date,
    updated_at:Date
};

export type Gallery = NewImage[];
export type News = New[];

export type ConcludedService = {
    title: string,
    slug: string,
    description: string,
    client_name: string,
    tags: string,
    thumbnail_url: string,
    is_concluded: false,
    concluded_at: Date,
    id: number,
    created_at: Date,
    updated_at: Date,
}

export type ConcludedServices = ConcludedService[]

export type TransparencyDocument = {
    title:string,
    description: string,
    file_url: string,
    category: string,
    service_id: number,
    published_at:Date,
    id: number,
    created_at: Date,
    updated_at:Date
}

export type TransparencyDocuments = TransparencyDocument[]



