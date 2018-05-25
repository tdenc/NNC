import * as ActionType from '../constant/ActionType'

export function reduce(state = {}, action) {
  switch (action.type) {
    case ActionType.SHOW_MEDIAINFO_DATA:
      const newState = action.data;

      //File format
      const fileFormat = newState.fileFormat;
      if (!fileFormat) {
        newState.fileFormatStatus = false;
      } else if (fileFormat === 'MPEG-4') {
        newState.fileFormatStatus = 'perfect';
      } else {
        newState.fileFormatStatus = 'great';
      }

      //File size
      const fileSize = newState.fileSize;
      if (!fileSize) {
        newState.fileSizeStatus = false;
      } else if (fileSize <= 3.0 * 1024) {
        newState.fileSizeStatus = 'perfect';
      } else {
        newState.fileSizeStatus = 'bad';
      }

      //File duration
      const fileDuration = newState.fileDuration;
      if (!fileDuration) {
        newState.fileDurationStatus = false;
      } else if (fileDuration <= 30 * 60 + 59) {
        newState.fileDurationStatus = 'perfect';
      } else {
        newState.fileDurationStatus = 'nice';
      }

      //Video format
      const videoFormat = newState.videoFormat;
      if (!videoFormat) {
        newState.videoFormatStatus = false;
      } else if (videoFormat === 'AVC') {
        newState.videoFormatStatus = 'perfect';
      } else {
        newState.videoFormatStatus = 'great';
      }

      //Video resolution
      const width = newState.videoWidth;
      const height = newState.videoHeight;
      if (!width || !height) {
        newState.videoResolutionStatus = false;
      } if (width > 4096 || height > 2160) {
        newState.videoResolutionStatus = 'bad';
      } else if (width >= 1280 || height >= 720) {
        newState.videoResolutionStatus = 'perfect';
      } else if (width >= 640 || height >= 360) {
        newState.videoResolutionStatus = 'great';
      } else {
        newState.videoResolutionStatus = 'nice';
      }

      //Video scantype
      const videoScanType = newState.videoScanType;
      if (!videoScanType) {
        newState.videoScanTypeStatus = false;
      } else if (newState.videoScanType === 'Progressive') {
        newState.videoScanTypeStatus = 'perfect';
      } else {
        newState.videoScanTypeStatus = 'nice';
      }

      //Video bitrate
      const videoBitRate = newState.videoBitRate;
      if (!videoBitRate) {
        newState.videoBitRateStatus = false;
      } else if (videoBitRate >= 3000) {
        newState.videoBitRateStatus = 'perfect';
      } else if (videoBitRate >= 1000) {
        newState.videoBitRateStatus = 'great';
      } else {
        newState.videoBitRateStatus = 'nice';
      }

      //Video framerate
      const videoFrameRateMode = newState.videoFrameRateMode;
      if (!videoFrameRateMode) {
        newState.videoFrameRateModeStatus = false;
      } else if (videoFrameRateMode === 'CFR') {
        newState.videoFrameRateModeStatus = 'perfect';
      } else {
        newState.videoFrameRateModeStatus = 'nice';
      }
      const videoFrameRate = newState.videoFrameRate;
      if (!videoFrameRate) {
        newState.videoFrameRateStatus = false;
      } else if (videoFrameRate > 60) {
        newState.videoFrameRateStatus = 'bad';
      } else if (videoFrameRate == 60 || videoFrameRate == 30 || videoFrameRate == 24) {
        newState.videoFrameRateStatus = 'perfect';
      } else {
        newState.videoFrameRateStatus = 'great';
      }

      //Audio format
      const audioFormat = newState.audioFormat;
      if (!audioFormat) {
        newState.audioFormatStatus = false;
      } else if (audioFormat === 'AAC') {
        newState.audioFormatStatus = 'perfect';
      } else {
        newState.audioFormatStatus = 'great';
      }

      //Audio bitrate
      const audioBitRate = newState.audioBitRate;
      if (!audioBitRate) {
        newState.audioBitRateStatus = false;
      } else if (audioBitRate >= 192) {
        newState.audioBitRateStatus = 'perfect';
      } else if (audioBitRate >= 90) {
        newState.audioBitRateStatus = 'great';
      } else {
        newState.audioBitRateStatus = 'nice';
      }


      //Audio channel
      const audioChannel = newState.audioChannel;
      if (!audioChannel) {
        newState.audioChannelStatus = false;
      } else if (audioChannel <= 2) {
        newState.audioChannelStatus = 'perfect';
      } else {
        newState.audioChannelStatus = 'bad';
      }

      //Audio samplingrate
      const audioSamplingRate = newState.audioSamplingRate;
      if (!audioSamplingRate) {
        newState.audioSamplingRateStatus = false;
      } else if (audioSamplingRate == 44100 || audioSamplingRate == 48000) {
        newState.audioSamplingRateStatus = 'perfect';
      } else {
        newState.audioSamplingRateStatus = 'nice';
      }

      //FullHD
      if ((fileDuration <= 30 * 60 + 59) && (videoBitRate >= 3000) && (width >= 1920 || height >= 1080)) {
        newState.fullHDStatus = 'perfect';
        newState.fullHD = '対応';
      } else {
        newState.fullHDStatus = 'bad';
        newState.fullHD = '非対応';
      }

      return newState;

    default:
      return state;
  }
}
