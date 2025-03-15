// This file facilitates playing the duck sound based on emotion
// Using direct references to MP3 files in the public directory

type DuckEmotion = 'happy' | 'sad' | 'angry' | 'neutral';

export function playDuckSound(emotion: DuckEmotion, times: number = 1): void {
  // Select audio file based on duck's emotion
  let audioPath = '';
  
  switch(emotion) {
    case 'happy':
      audioPath = '/duck-quacking-37392.mp3';
      break;
    case 'sad':
      audioPath = '/duck-sad.mp3';
      break;
    case 'angry':
      audioPath = '/duck-angry.mp3';
      break;
    default:
      audioPath = '/duck-quacking-37392.mp3'; // Default to happy sound for neutral
  }
  
  const audio = new Audio(audioPath);
  let playCount = 0;
  
  function playNext() {
    playCount++;
    if (playCount < times) {
      audio.play();
      audio.onended = playNext;
    }
  }
  
  audio.play();
  if (times > 1) {
    audio.onended = playNext;
  }
}