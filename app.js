"use strict";

const electron = require('electron')
const remote = electron.remote
const BrowserWindow = remote.BrowserWindow
const dialog = remote.dialog
const dom = require('xmldom').DOMParser
const xpath = require('xpath')
const path = require('path')
const execSync = require('child_process').execSync

function chooseFile () {
  const options = {
    title: 'ファイルを選んでね！',
    filters: [{
      name: '動画',
      extensions: [
        'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'avi', 'mov', 'wmv',
        'rm', 'rmvb', 'asf', 'mp4', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpe',
        'mpv', '3gp', '3g2'
      ]}],
    properties: ['openFile']
  }
  let win = BrowserWindow.getFocusedWindow()
  return dialog.showOpenDialog(win, options)
}

function runMediainfo (filepath) {
  let binary_name
  switch (process.platform) {
    case 'darwin':
      binary_name = 'mediainfo-osx'
      break
    case 'win32':
      binary_name = 'mediainfo-windows'
      break
    case 'linux':
      binary_name = 'mediainfo-linux'
      break
  }
  let mediainfo = path.join(__dirname, `node_modules/.bin/${binary_name}`)
  return execSync(`${mediainfo} --Output=XML --Full "${filepath}"`).toString()
}

function getClass (element, name, multi) {
  if (multi == true) {
    return element.getElementsByClassName(name)
  } else {
    return element.getElementsByClassName(name)[0]
  }
}

function getValue (xml, type, value) {
  let element = xpath.select(`//track[@type='${type}']/${value}/text()`, xml)
  return element[0].toString()
}

function openMovie () {
  let filePaths = chooseFile()
  if (!filePaths) {
    return
  }
  let filepath = path.normalize(filePaths[0])
  let xml = runMediainfo(filepath)
  let doc = new dom().parseFromString(xml)

  //File format
  let ff_tr = document.getElementById('file_format')
  let ff_value = getClass(ff_tr, 'value')
  let ff_rating = getClass(ff_tr, 'rating')
  let ff_xml = getValue(doc, 'General', 'Format')
  ff_value.innerHTML = ff_xml
  if (ff_xml === 'MPEG-4') {
    ff_rating.setAttribute('server', 'perfect')
  } else {
    ff_rating.setAttribute('server', 'great')
  }

  //File size
  let fs_tr = document.getElementById('file_size')
  let fs_value = getClass(fs_tr, 'value')
  let fs_rating = getClass(fs_tr, 'rating')
  let fs_xml = Math.ceil(getValue(doc, 'General', 'File_size') / 1048576)
  fs_value.innerHTML = fs_xml + 'MB'
  if (fs_xml <= 1.5 * 1024) {
    fs_rating.setAttribute('server', 'perfect')
  } else {
    fs_rating.setAttribute('server', 'bad')
  }

  //File duration
  let fd_tr = document.getElementById('file_duration')
  let fd_value = getClass(fd_tr, 'value')
  let fd_rating = getClass(fd_tr, 'rating')
  let fd_xml = Math.floor(getValue(doc, 'Video', 'Duration') / 1000)
  let hour = Math.floor(fd_xml / 3600)
  let minute = Math.floor(fd_xml % 3600 / 60)
  let second = fd_xml % 60
  fd_value.innerHTML = `${hour}時間${minute}分${second}秒`
  if (fd_xml <= 15 * 60 + 59) {
    fd_rating.setAttribute('server', 'perfect')
  } else if (fd_xml <= 30 * 60 + 59) {
    fd_rating.setAttribute('server', 'great')
  } else {
    fd_rating.setAttribute('server', 'nice')
  }

  //Video format
  let vf_tr = document.getElementById('video_format')
  let vf_value = getClass(vf_tr, 'value')
  let vf_rating = getClass(vf_tr, 'rating')
  let vf_xml = getValue(doc, 'Video', 'Format')
  vf_value.innerHTML = vf_xml
  if (vf_xml === 'AVC') {
    vf_rating.setAttribute('server', 'perfect')
  } else {
    vf_rating.setAttribute('server', 'great')
  }

  //Video resolution
  let vr_tr = document.getElementById('video_resolution')
  let vr_value = getClass(vr_tr, 'value')
  let vr_rating = getClass(vr_tr, 'rating')
  let width = getValue(doc, 'Video', 'Width')
  let height = getValue(doc, 'Video', 'Height')
  vr_value.innerHTML = `${width} x ${height}`
  if (width >= 720 || height >= 1280) {
    vr_rating.setAttribute('server', 'perfect')
  } else if (width >= 360 || height >= 640) {
    vr_rating.setAttribute('server', 'great')
  } else {
    vr_rating.setAttribute('server', 'nice')
  }

  //Video scantype
  let vs_tr = document.getElementById('video_scantype')
  let vs_value = getClass(vs_tr, 'value')
  let vs_rating = getClass(vs_tr, 'rating')
  let vs_xml = getValue(doc, 'Video', 'Scan_type')
  vs_value.innerHTML = vs_xml
  if (vs_xml === 'Progressive') {
    vs_rating.setAttribute('server', 'perfect')
  } else {
    vs_rating.setAttribute('server', 'nice')
  }

  //Video bitrate
  let vb_tr = document.getElementById('video_bitrate')
  let vb_value = getClass(vb_tr, 'value')
  let vb_rating = getClass(vb_tr, 'rating')
  let vb_xml = Math.floor(getValue(doc, 'Video', 'Bit_rate') / 1000)
  vb_value.innerHTML = vb_xml + 'kbps'
  if (vb_xml >= 2000) {
    vb_rating.setAttribute('server', 'perfect')
  } else {
    vb_rating.setAttribute('server', 'great')
  }

  //Audio format
  let af_tr = document.getElementById('audio_format')
  let af_value = getClass(af_tr, 'value')
  let af_rating = getClass(af_tr, 'rating')
  let af_xml = getValue(doc, 'Audio', 'Format')
  af_value.innerHTML = af_xml
  if (af_xml === 'AAC') {
    af_rating.setAttribute('server', 'perfect')
  } else {
    af_rating.setAttribute('server', 'great')
  }

  //Audio bitrate
  let ab_tr = document.getElementById('audio_bitrate')
  let ab_value = getClass(ab_tr, 'value')
  let ab_rating = getClass(ab_tr, 'rating')
  let ab_xml = Math.floor(getValue(doc, 'Audio', 'Bit_rate') / 1000)
  ab_value.innerHTML = ab_xml + 'kbps'
  if (ab_xml >= 192) {
    ab_rating.setAttribute('server', 'perfect')
  } else if (ab_xml >= 128) {
    ab_rating.setAttribute('server', 'great')
  } else {
    ab_rating.setAttribute('server', 'nice')
  }

  //Audio channel
  let ac_tr = document.getElementById('audio_channel')
  let ac_value = getClass(ac_tr, 'value')
  let ac_rating = getClass(ac_tr, 'rating')
  let ac_xml = getValue(doc, 'Audio', 'Channel_s_')
  ac_value.innerHTML = ac_xml + 'チャンネル'
  if (ac_xml <= 2) {
    ac_rating.setAttribute('server', 'perfect')
  } else {
    ac_rating.setAttribute('server', 'bad')
  }

  //Audio samplingrate
  let as_tr = document.getElementById('audio_samplingrate')
  let as_value = getClass(as_tr, 'value')
  let as_rating = getClass(as_tr, 'rating')
  let as_xml = getValue(doc, 'Audio', 'Sampling_rate')
  as_value.innerHTML = as_xml + 'Hz'
  if (as_xml == 44100 || as_xml == 48000) {
    as_rating.setAttribute('server', 'perfect')
  } else {
    as_rating.setAttribute('server', 'nice')
  }

  //Set values for rating
  let td = getClass(document, 'rating', true)
  Array.prototype.forEach.call(td, function(item) {
    switch (item.getAttribute('server')) {
      case 'perfect':
        item.innerHTML = '◎'
        break
      case 'great':
        item.innerHTML = '◯'
        break
      case 'nice':
        item.innerHTML = '△'
        break
      case 'bad':
        item.innerHTML = '×'
        break
    }
  })
}

