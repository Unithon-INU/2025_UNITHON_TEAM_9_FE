// types.ts ------------------------------------------------------------
/** 서버에서 내려오는 응답 타입 */
export interface ResponsePrediction {
    imageBase64: string;
    url: string;
}

/** 함수가 반환하는 형태 */
export type PredictionResult = ResponsePrediction;