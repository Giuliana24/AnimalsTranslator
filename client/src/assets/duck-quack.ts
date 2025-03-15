// This file facilitates playing the duck quacking sound
// Using a direct reference to the MP3 file in the public directory

export function playDuckQuack(times: number = 1): void {
  const audio = new Audio('/duck-quacking-37392.mp3');
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