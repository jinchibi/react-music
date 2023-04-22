import hyRequest from '@/service'

// 请求数据
export function getBanners() {
  return hyRequest.get({
    url: '/banner'
  })
}
