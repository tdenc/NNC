import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as lib from './lib/lib'; // Our custom react component

injectTapEventPlugin();
render(
  <div>
    <div className="header">ニコニコ新仕様チェッカー</div>
    <div className="container">
      <a href="#" className="button" onClick={() => {lib.openMovie(); return false}}>ファイル選択</a>
      <table>
        <tbody>
        <tr>
          <th>項目</th>
          <th>値</th>
          <th>評価</th>
        </tr>
        <tr id="file_format">
          <td className="heading">ファイルフォーマット</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="file_size">
          <td className="heading">ファイル容量</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="file_duration">
          <td className="heading">動画時間</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="video_format">
          <td className="heading">映像フォーマット</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="video_resolution">
          <td className="heading">解像度</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="video_scantype">
          <td className="heading">スキャンタイプ</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="video_bitrate">
          <td className="heading">映像ビットレート</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="audio_format">
          <td className="heading">音声フォーマット</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="audio_bitrate">
          <td className="heading">音声ビットレート</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="audio_channel">
          <td className="heading">音声チャンネル数</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        <tr id="audio_samplingrate">
          <td className="heading">音声サンプリングレート</td>
          <td className="value"></td>
          <td className="rating"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>, document.getElementById('app'));
