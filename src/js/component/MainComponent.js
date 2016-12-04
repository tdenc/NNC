import React from 'react';
import { Container, Header, Table, Icon, Segment, Divider, Dropdown, Menu, Button } from 'semantic-ui-react'

export class MainComponent extends React.Component {
  row(title, value, status) {
    return (
      <Table.Row negative={status === 'bad'} warning={status === 'nice'} positive={status === 'perfect'}>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{value}</Table.Cell>
        <Table.Cell>{status}</Table.Cell>
      </Table.Row>

    )
  }
  render() {
    const resolution = this.props.videoResolutionStatus ? `${this.props.videoWidth}, ${this.props.videoHeight}` : '';
    return (
      <Container text>
        <Divider />

        <Header as='h2' icon textAlign='center'>
          <Icon name='video camera' circular />
          <Header.Content>
            NNC
            <Header.Subheader>
              なんか… ニコニコのあれ… チェックするやつ
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Container textAlign='center'>
          <Button content='ファイル選択' onClick={this.props.showOpenDialog} />
        </Container>
        <Table definition fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>値</Table.HeaderCell>
              <Table.HeaderCell>評価</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.row('ファイルフォーマット', this.props.fileFormat, this.props.fileFormatStatus)}
            {this.row('ファイル容量', this.props.fileSize, this.props.fileSizeStatus)}
            {this.row('動画時間', this.props.fileDuration, this.props.fileDurationStatus)}
            {this.row('映像フォーマット', this.props.videoFormat, this.props.videoFormatStatus)}
            {this.row('解像度', resolution, this.props.videoResolutionStatus)}
            {this.row('スキャンタイプ', this.props.videoScanType, this.props.videoScanTypeStatus)}
            {this.row('映像ビットレート', this.props.videoBitRate, this.props.videoBitRateStatus)}
            {this.row('音声フォーマット', this.props.audioFormat, this.props.audioFormatStatus)}
            {this.row('音声ビットレート', this.props.audioBitRate, this.props.audioBitRateStatus)}
            {this.row('音声チャンネル数', this.props.audioChannel, this.props.audioChannelStatus)}
            {this.row('音声サンプリングレート', this.props.audioSamplingRate, this.props.audioSamplingRateStatus)}
          </Table.Body>
        </Table>
        <Segment stacked textAlign='center'>
          <Icon name='github' /> きれいなソースをそのまま上げて下さい :)
        </Segment>
        <Divider />
      </Container>
    )
  }
}
