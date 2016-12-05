import {remote} from 'electron'
import {execSync} from 'child_process'
import * as path from 'path'
import {DOMParser} from 'xmldom';
import * as xpath from 'xpath';
import {shell} from 'electron';

import * as ActionType from '../constant/ActionType'

function parseXML(xml) {
  return parser.toJson(xml)
}

function mediainfo(paths) {
  function getMediainfoType(platform) {
    switch (process.platform) {
      case 'darwin':
        return 'mediainfo-osx';
      case 'win32':
        return 'mediainfo-windows.exe';
      case 'linux':
        return 'mediainfo-linux';
    }
  }

  function runMediainfo (type, filepath) {
    const mediainfo = path.join(__dirname, `../${type}`);
    const result = execSync(`${mediainfo} --Output=XML --Full "${filepath}"`).toString();
    const doc = new DOMParser().parseFromString(result);
    const data = {};

    function getValue (type, value) {
      let element = xpath.select(`//track[@type='${type}']/${value}/text()`, doc);
      return element[0].toString()
    }

    data.fileFormat = getValue('General', 'Format');
    data.fileSize = getValue('General', 'File_size') / 1048576;
    data.fileDuration = getValue('Video', 'Duration') / 1000;

    data.videoFormat = getValue('Video', 'Format');
    data.videoWidth = getValue('Video', 'Width');
    data.videoHeight  = getValue('Video', 'Height');
    data.videoScanType = getValue('Video', 'Scan_type');
    data.videoBitRate = getValue('Video', 'Bit_rate');

    data.audioFormat = getValue('Audio', 'Format');
    data.audioBitRate = getValue('Audio', 'Bit_rate') / 1000;
    data.audioChannel = getValue('Audio', 'Channel_s_');
    data.audioSamplingRate = getValue('Audio', 'Sampling_rate');
    data.audioFormat = getValue('Audio', 'Format');
    data.audioFormat = getValue('Audio', 'Format');

    return data;
  }

  if (!paths[0]) {
    return {type: ActionType.NO_FILE_SELECTED}
  }

  const mediainfoType = getMediainfoType(process.platform);
  if (!mediainfoType) {
    return {type: ActionType.MEDIAINFO_NOT_FOUND}
  }

  return {
    type: ActionType.SHOW_MEDIAINFO_DATA,
    data: runMediainfo(mediainfoType, paths[0])
  }
}

export function showOpenDialog() {
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
  };

  return (dispatch) => {
    const win = remote.BrowserWindow.getFocusedWindow();
    return remote.dialog.showOpenDialog(win, options, paths => dispatch(mediainfo(paths)));
  }
}

export function openLink(url) {
  shell.openExternal(url);
  return {
    type: ActionType.OPEN_LINK,
    url: url
  }
}
