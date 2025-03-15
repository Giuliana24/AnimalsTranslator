// This file facilitates playing animal sounds based on emotion
// Using direct references to MP3 files in the public directory

type AnimalEmotion = 'happy' | 'sad' | 'angry' | 'neutral';
type AnimalType = 'duck' | 'cat' | 'frog';

export function playAnimalSound(animal: AnimalType, emotion: AnimalEmotion, times: number = 1): void {
  // Select audio file based on animal and emotion
  let audioPath = '';
  
  switch(animal) {
    case 'duck':
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
      break;
    
    case 'cat':
      switch(emotion) {
        case 'happy':
          audioPath = '/cat-happy.mp3';
          break;
        case 'sad':
          audioPath = '/cat-sad.mp3';
          break;
        case 'angry':
          audioPath = '/cat-angry.mp3';
          break;
        default:
          audioPath = '/cat-happy.mp3'; // Default to happy sound for neutral
      }
      break;
      
    case 'frog':
      // For frog, we use videos with audio in AnimalCharacter component
      return;
  }
  
  // If we don't have a sound file for this animal/emotion combination, return early
  if (!audioPath) return;
  
  const audio = new Audio(audioPath);
  let playCount = 0;
  
  function playNext() {
    playCount++;
    if (playCount < times) {
      audio.play();
      audio.onended = playNext;
    }
  }
  
  audio.play().catch(e => console.error(`Error playing audio: ${audioPath}`, e));
  if (times > 1) {
    audio.onended = playNext;
  }
}