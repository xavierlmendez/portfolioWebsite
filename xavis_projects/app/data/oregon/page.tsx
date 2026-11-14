import { Header } from '@/app/ui/page/header'
import { OREGON_BASE_PATH, OREGON_TAG } from '@/app/lib/datasets/oregon'
import files from '@/app/lib/datasets/oregon-files.json'

const BASE = `https://xavisprojects.com${OREGON_BASE_PATH}`

type Img = { id: string; category?: string; width?: number; height?: number }

export default function OregonIndex() {
  const images = (files.images as Img[]) ?? []
  return (
    <main>
      <Header
        title="Oregon clustering test images"
        description={`${images.length ? `${images.length} frames. ` : ''}To obtain each file put ${BASE}/ in front of its name.`}
      />

      <p className="text-gray-200 mb-2 leading-relaxed">
        Example: <code className="text-blue-300">{BASE}/IMG_6412.png</code> is the full-resolution sRGB PNG,
        <code className="text-blue-300"> {BASE}/IMG_6412_1024.png</code> the 1024 px copy and
        <code className="text-blue-300"> {BASE}/IMG_6412.HEIC</code> the camera original.
      </p>
      <p className="text-gray-400 text-sm mb-6">
        Each address answers with a redirect to the bytes (release {OREGON_TAG}); use <code>curl -L</code>.
        wget, browsers, Python and MATLAB follow it on their own.
      </p>

      <pre className="rounded-lg bg-black/60 p-4 text-sm text-gray-100 overflow-x-auto mb-8">{`# everything at once
curl -L -O ${BASE}/oregon_png_1024.zip
curl -L -O ${BASE}/SHA256SUMS.txt && shasum -a 256 -c SHA256SUMS.txt

# one file from Python
from PIL import Image; import io, urllib.request
img = Image.open(io.BytesIO(urllib.request.urlopen("${BASE}/IMG_6412_1024.png").read()))`}</pre>

      <h2 className="text-2xl font-semibold text-white mb-3">Files</h2>
      {images.length === 0 && (
        <p className="text-gray-400 text-sm mb-3">The image list is published with the first release; the archives below appear at the same time.</p>
      )}
      <ul className="font-mono text-sm text-gray-200 columns-2 md:columns-3 gap-6">
        {[...files.archives, ...files.extras].map((f) => (
          <li key={f}>
            <a className="text-blue-300 underline underline-offset-2" href={`${OREGON_BASE_PATH}/${f}`}>{f}</a>
          </li>
        ))}
        {images.map((im) => (
          <li key={im.id}>
            <a className="text-blue-300 underline underline-offset-2" href={`${OREGON_BASE_PATH}/${im.id}.png`}>{im.id}.png</a>
            {im.category && <span className="text-gray-500"> {im.category}</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}
