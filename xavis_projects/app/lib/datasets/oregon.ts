// Oregon clustering test images: one flat namespace under /data/oregon/<file>.
// Every file lives as an asset of one GitHub release; bump TAG when the set changes.
export const OREGON_REPO = 'https://github.com/xavierlmendez/portfolioWebsite'
export const OREGON_TAG = 'clustering-test-images-v1'
export const OREGON_BASE_PATH = '/data/oregon'

export function oregonAssetUrl(name: string): string {
  return `${OREGON_REPO}/releases/download/${OREGON_TAG}/${encodeURIComponent(name)}`
}

// Accept only the file names we publish: IMG_NNNN.png, IMG_NNNN_1024.png, IMG_NNNN.HEIC,
// the archives, the manifest and the checksum list. Anything else is a 404.
export const OREGON_NAME_RE = /^(IMG_\d{4}(_1024)?\.png|IMG_\d{4}\.HEIC|oregon_[a-z0-9_]+\.zip|manifest\.csv|SHA256SUMS\.txt|README\.md)$/
