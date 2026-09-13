import fs from 'node:fs'
import path from 'node:path'

const user = process.argv[2]
const repos = process.argv[3]
const reposPath = process.argv[4]
const githubUrl = `https://api.github.com/repos/${user}/${repos}/contents/${reposPath}`
const headers = {
  Authorization: 'application/vnd.github.v3+json',
  'User-Agent': user
}

const downloadFile = async (url, savePath = "") => {
  try {
    const res = await fetch(url, { method: 'GET', headers })
    const buffer = Buffer.from(await res.arrayBuffer())
    fs.mkdirSync(path.dirname(savePath), { recursive: true })
    fs.writeFileSync(savePath, buffer)
  } catch (err) {
    console.error(`Failed to download ${url}:`, err)
  }
}

const downloadFolder = async (url, savePath = "") => {
  try {
    const res = await fetch(url, { method: 'GET', headers })
    const data = await res.json()
    return await Promise.all(
      data.map(item => item.type === 'dir'
        ? downloadFolder(item.url, path.resolve(path.join(savePath, item.name)))
        : downloadFile(item.download_url, path.resolve(path.join(savePath, item.name)))
      )
    )
  } catch (err) {
    console.error(`Failed to directory ${url}:`, err)
  }
}

downloadFolder(githubUrl)
