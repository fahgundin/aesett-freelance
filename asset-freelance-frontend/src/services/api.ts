import { Gallery, New, Publishes, TransparencyDocuments } from "@/schemas/schemas";
import { API_BASE_URL } from "../config/api";

export async function fetchPublishes():Promise<Publishes> {
    const response = await fetch(`${API_BASE_URL}/api/v1/publishes`)
    if (!response.ok){
        console.log(response.text);
    }
    const publishes: Publishes = await response.json();
    return publishes

}
export async function fetchDocuments():Promise<TransparencyDocuments> {
    const response = await fetch(`${API_BASE_URL}/api/v1/documents`)
    if (!response.ok){
        console.log(response.text);
    }
    const documents: TransparencyDocuments = await response.json();
    return documents

}

export async function fetchGallery(): Promise<Gallery>{
    const response = await fetch(`${API_BASE_URL}/api/v1/gallery`)
    if (!response.ok){
        console.log(response.text);
    }
    const gallery: Gallery = await response.json();
    return gallery
}

export async function fetchPublicationNew(slug: string): Promise<New>{
    const response = await fetch(`${API_BASE_URL}/api/v1/news/slug/${slug}`)
    if (!response.ok){
        console.log(response.text);
    }
    const noticia: New = await response.json();
    return noticia
}
