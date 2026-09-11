const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export async function submitToIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY
  if (!key || urls.length === 0) return

  const host = new URL(urls[0]).host
  const keyLocation = `https://${host}/${key}.txt`

  await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
  })
}
