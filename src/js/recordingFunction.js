import timerFunction from './timerFunction';
import PopupMessage from './popupMessage';

export default async function recordingFunction(mediatype) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia is not supported');
    return false;
  }

  let mediaContent;
  const mediaType = mediatype;

  try {
    const container = document.querySelector('.main_container');
    const timer = container.querySelector('[data-id=timelineRecordTime]');
    const minutes = timer.querySelector('[data-timer=timerMinutes]');
    const seconds = timer.querySelector('[data-timer=timerSecondes]');
    minutes.innerText = '00';
    seconds.innerText = '00';
    const submitButton = container.querySelector(
      '[data-id=timelineSubmitRecordButton]',
    );
    const cancelButton = container.querySelector(
      '[data-id=timelineCancelRecordButton]',
    );
    const widgetTimelineForm = container.querySelector(
      '[data-id=timelineForm]',
    );
    let timerId;
    const media = document.createElement(`${mediaType}`);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: mediaType === 'video',
    });

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    const videoPlayer = document.createElement('div');
    if (mediaType === 'video') {
      videoPlayer.classList.add('video_player');
      media.srcObject = stream;
      media.play();
      media.controls = true;
      media.muted = 'muted';
      videoPlayer.append(media);
      widgetTimelineForm.before(videoPlayer);
    }

    const submitRecord = () => {
      try {
        recorder.stop();
      } catch (e) {
        console.error('Error stopping recorder:', e);
      }
      submitButton.removeEventListener('click', submitRecord);
    };

    const cancelRecord = () => {
      try {
        recorder.stop();
      } catch (e) {
        console.error('Error stopping recorder:', e);
      }
      cancelButton.removeEventListener('click', cancelRecord);
    };

    recorder.addEventListener('start', () => {
      console.log('recording started');
      timerId = setInterval(() => timerFunction(minutes, seconds), 1000);
    });

    recorder.addEventListener('dataavailable', (evt) => {
      console.log('data available');
      chunks.push(evt.data);
    });

    submitButton.addEventListener('click', submitRecord);

    cancelButton.addEventListener('click', cancelRecord);

    recorder.addEventListener('stop', () => {
      try {
        const blob = new Blob(chunks, { type: mediaType === 'video' ? 'video/webm' : 'audio/webm' });
        media.src = URL.createObjectURL(blob);
        media.controls = true;
        clearInterval(timerId);
        stream.getTracks().forEach((track) => track.stop());
        media.srcObject = null;
        videoPlayer.remove();
      } catch (e) {
        console.error('Error handling recorder stop:', e);
      }
    });

    recorder.start();
    mediaContent = media;
  } catch (e) {
    console.error('Error accessing media devices:', e);
    const popup = new PopupMessage();
    popup.showMessage();
  }
  return mediaContent;
}
