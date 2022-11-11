export function useCopy(value:string) {
    navigator.clipboard.writeText(value);
}