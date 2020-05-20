export default function isUriEncoded(uri: string) {
  return uri !== decodeURIComponent(uri)
}
