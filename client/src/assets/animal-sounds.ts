// This file facilitates playing animal sounds based on emotion
// Using direct references to MP3 files in the public directory

type AnimalEmotion = 'happy' | 'sad' | 'angry' | 'neutral';
type AnimalType = 'duck' | 'cat' | 'frog';

// Function to determine if we should play the random dolphin sound
function shouldPlayRandomSound(): boolean {
  // 20% chance to play the random sound
  return Math.random() <= 0.2;
}

export function playAnimalSound(animal: AnimalType, emotion: AnimalEmotion, times: number = 1): void {
  // First check for random dolphin sound
  if (shouldPlayRandomSound()) {
    console.log("Playing random dolphin sound!");
    const randomAudio = new Audio('/random-sound.mp3');
    randomAudio.play().catch(e => console.error("Error playing random sound", e));
    // Continue with normal animal sound after random sound finishes
    randomAudio.onended = () => playActualAnimalSound(animal, emotion, times);
    return;
  }
  
  // Otherwise play the normal animal sound
  playActualAnimalSound(animal, emotion, times);
}

function playActualAnimalSound(animal: AnimalType, emotion: AnimalEmotion, times: number = 1): void {
  // INVERTED EMOTIONS - happy becomes sad, sad becomes happy, angry becomes neutral, neutral becomes angry
  // INVERTED ANIMALS - duck becomes frog, frog becomes duck, cat stays the same
  
  // Convert to inverted emotion
  let invertedEmotion: AnimalEmotion = 'neutral';
  switch(emotion) {
    case 'happy': invertedEmotion = 'sad'; break;
    case 'sad': invertedEmotion = 'happy'; break;
    case 'angry': invertedEmotion = 'neutral'; break;
    case 'neutral': invertedEmotion = 'angry'; break;
  }
  
  // Convert to inverted animal
  let invertedAnimal: AnimalType = 'cat';
  switch(animal) {
    case 'duck': invertedAnimal = 'frog'; break;
    case 'frog': invertedAnimal = 'duck'; break;
    case 'cat': invertedAnimal = 'cat'; break;
  }
  
  // Select audio file based on inverted animal and emotion
  let audioPath = '';
  
  switch(invertedAnimal) {
    case 'duck':
      switch(invertedEmotion) {
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
          audioPath = '/duck-quacking-37392.mp3';
      }
      break;
    
    case 'cat':
      switch(invertedEmotion) {
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
          audioPath = '/cat-happy.mp3';
      }
      break;
      
    case 'frog':
      switch(invertedEmotion) {
        case 'happy':
          audioPath = '/frog-happy-sound.mp3'; // Sound 1
          break;
        case 'sad':
          audioPath = '/frog-sad-sound.mp3'; // Sound 2
          break;
        case 'angry':
          // For frog angry, we rely on the video sound
          return;
        default:
          audioPath = '/frog-happy-sound.mp3';
      }
      break;
  }
  
  // If we don't have a sound file for this animal/emotion combination, return early
  if (!audioPath) return;
  
  const audio = new Audio(audioPath);
  let playCount = 0;
  
  function playNext() {
    playCount++;
    if (playCount < times) {
      audio.play().catch(e => console.error(`Error playing audio: ${audioPath}`, e));
      audio.onended = playNext;
    }
  }
  
  audio.play().catch(e => console.error(`Error playing audio: ${audioPath}`, e));
  if (times > 1) {
    audio.onended = playNext;
  }
}