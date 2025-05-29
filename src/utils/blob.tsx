// import EXIF from "exif-js";

// src/utils/blob.ts
export async function fetchImageBlob(path: string): Promise<Blob> {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch blob for ${path}`);
    return await res.blob();
}

export async function convertJpegBase64ToPngBase64(
    jpegBase64: string
): Promise<string> {
    const fullBase64 = jpegBase64.startsWith('data:')
        ? jpegBase64
        : `data:image/jpeg;base64,${jpegBase64}`;

    const img = await loadImage(fullBase64);

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    // PNG로 재인코딩한 base64 반환
    return canvas.toDataURL('image/png');
}

/**
 * Base64 또는 URL → HTMLImageElement 로드
 */
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * base64 → Blob
 * @param base64  "data:image/png;base64,..."  또는 순수 base64 문자열
 * @param mime    MIME 타입 (dataURL에 이미 포함돼 있으면 생략 가능)
 */
export function base64ToBlob(base64: string, mime?: string): Blob {
    // dataURL이라면 "data:..." 부분과 "," 이후의 actual base64 부분 분리
    const [, header, data] = base64.match(/^data:([^;]+);base64,(.*)$/) ?? [
        '',
        mime ?? '',
        base64,
    ];
    // base64 -> binary
    const binary = atob(data);
    const len = binary.length;
    // binary -> bytes
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return new Blob([bytes], {
        type: header || mime || 'application/octet-stream',
    });
}

// export async function fixOrientation(file: File): Promise<Blob> {
//     const arrayBuf = await file.arrayBuffer();
//     const orientation = EXIF.readFromBinaryFile(arrayBuf as ArrayBuffer)?.Orientation ?? 1;
//
//     if (orientation === 1) return file;           // 이미 정방향
//
//     // 1. Blob → HTMLImageElement
//     const url = URL.createObjectURL(file);
//     const img = await new Promise<HTMLImageElement>((res) => {
//         const i = new Image();
//         i.onload = () => res(i);
//         i.src = url;
//     });
//
//     // 2. 캔버스에 올바른 각도로 그리기
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d")!;
//     const w = img.width, h = img.height;
//
//     // 가로세로·회전 결정
//     if ([5,6,7,8].includes(orientation)) { canvas.width = h; canvas.height = w; }
//     else { canvas.width = w; canvas.height = h; }
//
//     switch (orientation) {                 // EXIF 값별 변환
//         case 2: ctx.transform(-1, 0, 0, 1, w, 0); break;            // 좌우반전
//         case 3: ctx.transform(-1, 0, 0, -1, w, h); break;           // 180°
//         case 4: ctx.transform(1, 0, 0, -1, 0, h); break;            // 상하반전
//         case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;             // 90° CW + 좌우반전
//         case 6: ctx.transform(0, 1, -1, 0, h, 0); break;            // 90° CW
//         case 7: ctx.transform(0, -1, -1, 0, h, w); break;           // 90° CCW + 좌우반전
//         case 8: ctx.transform(0, -1, 1, 0, 0, w); break;            // 90° CCW
//     }
//     ctx.drawImage(img, 0, 0);
//
//     // 3. Blob으로 반환 (EXIF 없이 픽셀만 올바름)
//     return await new Promise<Blob>((resolve, reject) => {
//         canvas.toBlob((b) => {
//             if (b) resolve(b);                      // BlobCallback 요구 조건 충족
//             else    reject(new Error("toBlob 실패"));
//         }, "image/jpeg", 0.92);
//     });
// }
