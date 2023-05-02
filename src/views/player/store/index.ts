import { createSlice } from '@reduxjs/toolkit'

interface IPlayerType {
  currentSong: any
}

const initialState: IPlayerType = {
  currentSong: {
    name: '爱',
    id: 123456,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 3774,
        name: '刘罡',
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 10,
    st: 0,
    rt: '',
    fee: 0,
    v: 3,
    crbt: null,
    cf: '',
    al: {
      id: 11935,
      name: '二人传奇',
      picUrl:
        'https://p1.music.126.net/K9f4Ec2AR5HwDMChCb5_9Q==/83562883711712.jpg',
      tns: [],
      pic: 83562883711712
    },
    dt: 248006,
    h: null,
    m: {
      br: 160000,
      fid: 0,
      size: 4983586,
      vd: 0.482621,
      sr: 44100
    },
    l: {
      br: 96000,
      fid: 0,
      size: 2999116,
      vd: 0.324618,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: '1',
    no: 4,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 0,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 3,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 0,
    mv: 0,
    publishTime: 1101830400000
  }
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {}
})

export default playerSlice.reducer
