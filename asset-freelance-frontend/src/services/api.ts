import { Publishes, TransparencyDocuments } from "@/schemas/schemas";
import { API_BASE_URL } from "../config/api";

export async function fetchPublishes():Promise<Publishes> {
    const response = await fetch(`${API_BASE_URL}/publishes`)
    if (!response.ok){
        console.log(response.text);
    }
    const publishes: Publishes = await response.json();
    return publishes

}
export async function fetchDocuments():Promise<TransparencyDocuments> {
    const response = await fetch(`${API_BASE_URL}/documents`)
    if (!response.ok){
        console.log(response.text);
    }
    const documents: TransparencyDocuments = await response.json();
    return documents
}
