import { useRecentCaptureStore } from '../store/recentcaptureStore';

export interface RecentCaptureResponse {
    recentImage: string | null;
    recentUrl: string | null;
    recentImages: string[];
}

const url = 'https://home.goldenmine.kr/chakboot/ai/recentcapture';

export async function getRecentCapture(): Promise<RecentCaptureResponse> {
    console.log('Requesting recent captures');

    try {
        // GET 요청
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        // JSON 파싱
        const data = await res.json();

        // 응답 처리
        const images = Array.isArray(data)
            ? data.map(item => `data:image/png;base64,${item}`)
            : [];

        console.log(images);
        console.log(`Retrieved ${images.length} recent captures`);

        // zustand에 저장
        useRecentCaptureStore.setState({
            recentImage: images.length > 0 ? images[0] : null,
            // recentUrl: images.length > 0 ? images[0] : null,
            recentImages: images,
        });

        return {
            recentImage: images.length > 0 ? images[0] : null,
            recentUrl: images.length > 0 ? images[0] : null,
            recentImages: images,
        };
    } catch (err) {
        // 최근 이미지 불러오기 실패
        console.error('Recent capture request failed:', err);
        return {
            recentImage: null,
            recentUrl: null,
            recentImages: [],
        };
    }
}
