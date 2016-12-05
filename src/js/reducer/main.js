import * as ActionType from '../constant/ActionType'

export function reduce(state = {}, action) {
  switch (action.type) {
    case ActionType.SHOW_MEDIAINFO_DATA:
      const newState = action.data;

      //File format
      newState.fileFormatStatus = newState.fileFormat === 'MPEG-4' ? 'perfect' : 'great';

      //File size
      newState.fileSizeStatus = newState.fileSize <= 1.5 * 1024 ? 'perfect' : 'bad';

      //File duration
      const fileDuration = newState.fileDuration;
      if (fileDuration <= 15 * 60 + 59) {
        newState.fileDurationStatus = 'perfect';
      } else if (fileDuration <= 30 * 60 + 59) {
        newState.fileDurationStatus = 'great';
      } else {
        newState.fileDurationStatus = 'nice';
      }

      //Video format
      newState.videoFormatStatus = newState.videoFormat === 'AVC' ? 'perfect': 'great';

      //Video resolution
      const width = newState.videoWidth;
      const height = newState.videoHeight;
      if (width > 4096 || height > 2160) {
        newState.videoResolutionStatus = 'bad';
      } else if (width >= 1280 || height >= 720) {
        newState.videoResolutionStatus = 'perfect';
      } else if (width >= 640 || height >= 360) {
        newState.videoResolutionStatus = 'great';
      } else {
        newState.videoResolutionStatus = 'nice';
      }

      //Video scantype
      newState.videoScanTypeStatus = newState.videoScanType === 'Progressive' ? 'perfect' : 'nice';

      //Video bitrate
      if (newState.videoBitRate >= 2000) {
        newState.videoBitRateStatus = 'perfect';
      } else if (newState.videoBitRate >= 1000) {
        newState.videoBitRateStatus = 'great';
      } else {
        newState.videoBitRateStatus = 'nice';
      }

      //Video framerate
      newState.videoFrameRateModeStatus = newState.videoFrameRateMode === 'CFR' ? 'perfect' : 'nice';
      if (newState.videoFrameRate > 60) {
        newState.videoFrameRateStatus = 'bad';
      } else if (newState.videoFrameRate == 30 || newState.videoFrameRate == 24) {
        newState.videoFrameRateStatus = 'perfect';
      } else {
        newState.videoFrameRateStatus = 'nice';
      }

      //Audio format
      newState.audioFormatStatus = newState.audioFormat === 'AAC' ? 'perfect' : 'great';

      //Audio bitrate
      const audioBitRate = newState.audioBitRate;
      if (audioBitRate >= 192) {
        newState.audioBitRateStatus = 'perfect';
      } else if (audioBitRate >= 128) {
        newState.audioBitRateStatus = 'great';
      } else {
        newState.audioBitRateStatus = 'nice';
      }

      //Audio channel
      newState.audioChannelStatus = newState.audioChannel <= 2 ? 'perfect' : 'bad';

      //Audio samplingrate
      const audioSamplingRate = newState.audioSamplingRate;
      newState.audioSamplingRateStatus = audioSamplingRate == 44100 || audioSamplingRate == 48000 ? 'perfect' : 'nice';

      return newState;

    default:
      return state;
  }
}
