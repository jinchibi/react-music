export interface ILyric {
  time: number
  text: string
}

const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString: string) {
  const lines: string[] = lyricString.split('\n')
  const lyrics: ILyric[] = []
  for (const line of lines) {
    const result = timeRegExp.exec(line)
    if (!result) continue
    // 获取时间
    const m = Number(result[1]) * 60 * 1000
    const s = Number(result[2]) * 1000
    const ms =
      result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
    const time = m + s + ms
    // 获取文本
    const text = line.replace(timeRegExp, '')

    lyrics.push({ time, text })
  }
  return lyrics
}
