const ContentType = {
    JSON: 'application/json',
    FORM: 'application/x-www-form-urlencoded',
    FORM_DATA: 'multipart/form-data',
    TEXT: 'text/plain',
    OCTET_STREAM: 'application/octet-stream',
} as const;

export type ContentTypeValue = typeof ContentType[keyof typeof ContentType];
export type ContentTypeKey = keyof typeof ContentType | "UPLOAD" | "DOWNLOAD";

export function getContentType(key: ContentTypeKey): ContentTypeValue {
    // 单独处理上传和下载
    if (key === "UPLOAD") { return ContentType.FORM_DATA; };
    if (key === "DOWNLOAD") { return ContentType.OCTET_STREAM; };
    return ContentType[key];
}

/**
 * 
 * @param key string | ContentTypeKey 
 * @returns boolean
 */
export function isSupportedContentType(key: ContentTypeKey | string): key is ContentTypeKey {
    return Reflect.has(ContentType, key);
}

/**
 * 
 * @param request Request
 * @returns ContentTypeValue
 */
export function getContentTypeFromRequest(request: Request, defaultContentType: ContentTypeKey = "JSON"): ContentTypeValue {
    const requestType = request.headers.get('requestType') as ContentTypeKey;
    return getContentType(requestType || defaultContentType);
}

export function setContentType(request: Request | Response, key: ContentTypeKey, contentType: ContentTypeValue = getContentType("JSON")) {
    request.headers.set('Content-Type', getContentType(key) || contentType);
}