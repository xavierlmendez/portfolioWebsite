import Link from 'next/link'
import { Header } from '@/app/ui/page/header'
import { OREGON_BASE_PATH, OREGON_TAG } from '@/app/lib/datasets/oregon'
import files from '@/app/lib/datasets/oregon-files.json'

const BASE = `https://xavisprojects.com${OREGON_BASE_PATH}`

const downloads = [
  {
    name: 'oregon_png_1024.zip',
    label: 'PNG, long side 1024 px (zip)',
    note: 'Start here. sRGB, 8-bit, lossless; small enough for pixel-graph experiments and quick looks.',
  },
  {
    name: 'oregon_png_full.zip',
    label: 'PNG, full resolution 4032 × 3024 (zip)',
    note: 'Lossless decode of the originals, converted from Display P3 to sRGB so every library reads the same colours.',
  },
  {
    name: 'oregon_heic.zip',
    label: 'HEIC originals (zip)',
    note: 'Byte-identical camera files. Needs an HEIC decoder (pillow-heif, macOS, libheif).',
  },
  {
    name: 'manifest.csv',
    label: 'manifest.csv',
    note: 'One row per image: category, dimensions, capture settings, noise, sharpness, colour-cluster separability and the superpixel eigengap.',
  },
  {
    name: 'SHA256SUMS.txt',
    label: 'SHA256SUMS.txt',
    note: 'Checksums for every published file.',
  },
]

export default function ClusteringTestImages() {
  const count = (files.images as { id: string }[]).length
  return (
    <main>
      <Header
        title="Clustering Test Images"
        description={`${count ? `${count} ` : ''}high-resolution landscape photographs published as a clean test set for graph-clustering and segmentation experiments.`}
      />

      <p className="text-gray-200 mb-6 leading-relaxed">
        iPhone photographs from a hiking trip in Oregon (October 2026): forest, rock, lake, coast and trail
        scenes whose regions separate by colour and texture. They were chosen from 553 frames by a scripted
        pass that scored every image for noise, sharpness, clipping and how well a superpixel graph of the
        image splits into a few components, then sorted by hand into categories that each probe one thing a
        clustering method can get wrong. Unlike JPEGs scraped from the web they have never been resized or
        recompressed, carry no watermarks, and come with the capture settings for every frame.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3">How to fetch a file</h2>
      <p className="text-gray-200 mb-2">
        To obtain each file put <code className="text-blue-300">{BASE}/</code> in front of its name.
      </p>
      <p className="text-gray-200 mb-4">
        Example: <code className="text-blue-300">{BASE}/IMG_6412.png</code> (full resolution),
        <code className="text-blue-300"> {BASE}/IMG_6412_1024.png</code> (1024 px),
        <code className="text-blue-300"> {BASE}/IMG_6412.HEIC</code> (original).
        The full file list, with categories, is at{' '}
        <Link href={OREGON_BASE_PATH} className="text-blue-300 underline underline-offset-2">{OREGON_BASE_PATH}</Link>.
      </p>
      <p className="text-gray-400 text-sm mb-6">
        Each address redirects to the bytes of release {OREGON_TAG}, so use <code>curl -L</code>; wget, browsers,
        Python and MATLAB follow redirects on their own.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3">Downloads</h2>
      <ul className="space-y-4">
        {downloads.map((d) => (
          <li key={d.name} className="rounded-xl bg-white p-4 shadow-md">
            <a href={`${OREGON_BASE_PATH}/${d.name}`} className="text-xl font-semibold text-blue-600 underline underline-offset-2">
              {d.label}
            </a>
            <p className="text-gray-700 mt-1">{d.note}</p>
            <p className="text-gray-500 text-sm mt-1 break-all">{BASE}/{d.name}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">What is in a frame</h2>
      <ul className="list-disc list-inside text-gray-200 space-y-1">
        <li>Camera: iPhone 13, 4032 × 3024 (12 MP), HEIC 8-bit 4:2:0, Display P3; a few panoramas near 15000 × 3800.</li>
        <li>The originals are lossy (HEVC intra) but encoded once by the camera, so there is no generation loss.</li>
        <li>File names are the camera&apos;s IMG_NNNN numbers; the manifest maps each to its category, date, exposure and scores.</li>
        <li>No people appear in any frame, and the files carry no location metadata.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mt-8 mb-3">Loading</h2>
      <pre className="rounded-lg bg-black/60 p-4 text-sm text-gray-100 overflow-x-auto">{`# shell
curl -L -O ${BASE}/oregon_png_1024.zip
curl -L -O ${BASE}/SHA256SUMS.txt && shasum -a 256 -c SHA256SUMS.txt

# Python
from PIL import Image
import numpy as np
img = np.asarray(Image.open("IMG_6412_1024.png"))   # H x W x 3, uint8, sRGB

# HEIC originals need a decoder
import pillow_heif; pillow_heif.register_heif_opener()
img = np.asarray(Image.open("IMG_6412.HEIC").convert("RGB"))`}</pre>

      <p className="text-gray-400 text-sm mt-6">
        Licence: CC BY 4.0. Photographs by Xavier Mendez. Cite the release tag when a result depends on these bytes.
      </p>
    </main>
  )
}
