import React from 'react';
import { Container, Header, Table, Icon, Segment, Divider, Button } from 'semantic-ui-react'

export class MainComponent extends React.Component {
  starParams(status) {
    if (status === 'perfect') {
      return {color: 'yellow', icons: ['star', 'star', 'star']}
    } else if (status === 'great') {
      return {color: 'yellow', icons: ['star', 'star', 'empty star']}
    } else if (status === 'nice') {
      return {color: 'orange', icons: ['star', 'empty star', 'empty star']}
    } else if (status === 'bad') {
      return {color: 'red', icons: ['empty star', 'empty star', 'empty star']}
    } else {
      return {color: 'grey', icons: ['empty star', 'empty star', 'empty star']}
    }
  }

  row(title, value, status) {
    const starts = this.starParams(status);
    return (
      <Table.Row negative={status === 'bad'} warning={status === 'nice'} positive={status === 'perfect'}>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell textAlign='center'>{value}</Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color={starts.color} name={starts.icons[0]} />
          <Icon color={starts.color} name={starts.icons[1]} />
          <Icon color={starts.color} name={starts.icons[2]} />
        </Table.Cell>
      </Table.Row>

    )
  }
  time(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
    return `${h}時間${m}分${s}秒`;

  }
  render() {
    const fileSize = this.props.fileSizeStatus ? `${Math.ceil(this.props.fileSize)}MB` : '';
    const duration = this.props.fileDurationStatus ? this.time(this.props.fileDuration) : '';
    const resolution = this.props.videoResolutionStatus ? `${this.props.videoWidth} x ${this.props.videoHeight}` : '';
    const videoBitRate = this.props.videoBitRateStatus ? `${Math.floor(this.props.videoBitRate)}kbps` : '';
    const videoFrameRate = this.props.videoFrameRateStatus ? `${this.props.videoFrameRate}fps` : '';
    const audioBitRate = this.props.audioBitRateStatus ? `${Math.floor(this.props.audioBitRate)}kbps` : '';
    const audioChannel = this.props.audioChannelStatus ? `${this.props.audioChannel}ch` : '';
    const audioSamplingRate = this.props.audioSamplingRateStatus ? `${this.props.audioSamplingRate}Hz` : '';
    return (
      <Container text>
        <Divider />

        <Header as='h2' icon textAlign='center'>
          <Icon name='video camera' circular />
          <Header.Content>
            NNC
            <Header.Subheader>
              NicoNico NewFormat Checker
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Container textAlign='center'>
          <Button content='ファイル選択' onClick={this.props.showOpenDialog} />
          <Button content='推奨形式例' onClick={this.props.showSample} />
        </Container>
        <Table definition fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign='center'>値</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>評価</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.row('ファイルフォーマット', this.props.fileFormat, this.props.fileFormatStatus)}
            {this.row('ファイル容量', fileSize, this.props.fileSizeStatus)}
            {this.row('動画時間', duration, this.props.fileDurationStatus)}
            {this.row('映像フォーマット', this.props.videoFormat, this.props.videoFormatStatus)}
            {this.row('解像度', resolution, this.props.videoResolutionStatus)}
            {this.row('スキャンタイプ', this.props.videoScanType, this.props.videoScanTypeStatus)}
            {this.row('映像ビットレート', videoBitRate, this.props.videoBitRateStatus)}
            {this.row('映像フレームレートモード', this.props.videoFrameRateMode, this.props.videoFrameRateModeStatus)}
            {this.row('映像フレームレート', videoFrameRate, this.props.videoFrameRateStatus)}
            {this.row('音声フォーマット', this.props.audioFormat, this.props.audioFormatStatus)}
            {this.row('音声ビットレート', audioBitRate, this.props.audioBitRateStatus)}
            {this.row('音声チャンネル数', audioChannel, this.props.audioChannelStatus)}
            {this.row('音声サンプリングレート', audioSamplingRate, this.props.audioSamplingRateStatus)}
            {this.row('FullHD対応', this.props.fullHD, this.props.fullHDStatus)}
          </Table.Body>
        </Table>
        <Segment stacked textAlign='center'>
          <Icon name='home' /><a href='#' onClick={() => this.props.openLink('https://tdenc.com/NNC/')}>NNC</a>
        </Segment>
        <Divider />
      </Container>
    )
  }
}
