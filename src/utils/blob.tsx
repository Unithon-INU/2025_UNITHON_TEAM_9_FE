// src/utils/blob.ts
export async function fetchImageBlob(path: string): Promise<Blob> {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch blob for ${path}`);
    return await res.blob();
}