import hyRequest from '@/service'

// 请求数据
export function getBanners() {
  return hyRequest.get({
    url: '/banner'
  })
}

export function getPlayListDetail(id: number) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit = 30) {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
