import React, { useEffect, useRef } from "react";

interface AnimalCharacterProps {
  animal: "duck" | "cat" | "frog";
  emotion: "happy" | "sad" | "angry" | "neutral";
}

const AnimalCharacter: React.FC<AnimalCharacterProps> = ({ animal, emotion }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Effect to handle frog video display
  useEffect(() => {
    if (animal === 'frog' && videoRef.current) {
      let videoPath = '';
      
      // Select video based on emotion
      switch(emotion) {
        case 'happy':
          videoPath = '/frog-happy.mp4';
          break;
        case 'sad':
          videoPath = '/frog-sad.mp4';
          break;
        case 'angry':
          videoPath = '/frog-angry.mp4';
          break;
        default:
          videoPath = '/frog-happy.mp4'; // Default for neutral
      }
      
      // Set the video source and play
      videoRef.current.src = videoPath;
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, [animal, emotion]);
  
  // Animal configurations
  const animals = {
    duck: {
      name: "Quackers",
      description: "A friendly duck who loves to translate your messages!",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
          <path d="M416 96c-16.7 0-32.9 3.6-48 10.2v.8c0 53-43 96-96 96H160v32H272v32H160v32H272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H112c-8.8 0-16-7.2-16-16V216.8C66.7 244.3 48 286.6 48 324.2c0 92.7 79.3 171.8 172 171.8c92.7 0 168-76.1 168-168V190.2c15.1-1.4 30.7-6.5 45.1-15.4c36.7-22.8 62.9-65.8 62.9-110.8v-8c0-13.3-10.7-24-24-24s-24 10.7-24 24v8c0 37.4-55.3 68-104 68c-54.8 0-96-41.2-96-96v-8c0-13.3-10.7-24-24-24c-3.1 0-6 .6-8.7 1.6C222.8 19.3 231.3 0 240 0c13.3 0 24 10.7 24 24s-10.7 24-24 24c-7.9 0-14.9-3.8-19.3-9.7c-27.3 5.4-48.1 21.5-62 44c-7.7-7.1-18-11.4-29.4-11.4c-23.7 0-42.7 18.9-42.7 42.7c0 12.9 5.4 24.1 14 31.5c1.3 1 2.6 1.8 4 2.6V160h8c39.8 0 72 32.2 72 72v.8c51.4-37.6 82-97.8 82-163V45.8C285.1 37.8 300 32 304 32c10.1 0 20.6 1.7 32 9C264.2 71.3 224 139.2 224 216c0 30.2 10.8 61.8 32 85.9c5.6 6.3 15.1 6.8 21.5 1.2s6.8-15.1 1.2-21.5c-16.4-18.7-24.7-42.2-24.7-65.6c0-58.5 28.6-112.5 82.3-128.7C336.9 82.4 340.4 80 344 80h10c41.7 0 68-23.9 68-64.8V24c0 39.8 32.2 72 72 72z" fill={emotion === "happy" ? "#FFD700" : emotion === "sad" ? "#4A90E2" : emotion === "angry" ? "#FF6B6B" : "#A875FF"}/>
        </svg>
      )
    },
    cat: {
      name: "Whiskers",
      description: "A curious cat with a talent for translation!",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-300",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
          <path d="M288 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4c0 17.7-14.3 32-32 32h-96c-17.7 0-32 14.3-32 32v7.8c0 14.8-5.1 29.2-14.6 40.7l-20.5 24.8c-7.5 9.1-18.8 14.4-30.7 14.4H203.9c-10.4 0-20.1-5.2-25.9-13.9l-4.6-6.9H156c-11.4 0-22.2-5.3-29.2-14.4l-24.5-32-39-43.3c-9.4-10.4-14.9-23.9-15.5-38.3l-.9-21.3C46 308.2 32 280.9 32 248.7V208c0-16.2 29.5-28.4 64-29.9v.8 12.9c0 25.4 8.5 49.9 24.1 69.8c8.4 10.7 23.1 14.5 35.7 8.9l31.6-14.4c4.7-2.1 9.8-3.2 15-3.2h91.8c13.4 0 25.9 6.7 33.3 17.8l15.2 22.8zM456 120c26.5 0 48 21.5 48 48v93.9c0 22.2-13.8 42.1-34.7 49.7l-15.1 5.5c-11.2 4.1-22.2-5.5-19.2-17l0 0c2.3-8.7 3.1-17.9 2.3-27.1l-3.1-36.9c-2.6-19.4-6.2-38.7-10.8-57.8c-1.9-8.1 3.7-16.2 12-16.2H456zm0-32c-12.3 0-23.5 7-28.8 18.1C424.9 112.1 421.7 119 418.2 126c-5.5-10.9-15.3-19.2-27.3-21.5C392.7 105 396.7 96 405.8 96h-33.5l.5 .3c-4.3-7.1-12.1-11.6-20.7-11.2c-6.7 .3-16.6 1.5-29.1 5.1c-4.5 1.3-9.3 .7-13.4-1.6c-6.4-3.6-9.4-11.1-7.2-18.1C305.8 57.4 317.5 48 331 48h1c3.3 0 6-2.7 6-6s-2.7-6-6-6H113c-3.3 0-6 2.7-6 6s2.7 6 6 6h36.8c17.3 0 32.9 10.5 39.2 26.6c2.5 6.5 0 13.8-6.1 17.3c-7 4-15.5 4.1-22.6 .3c-17.3-9.5-34-16.2-54.1-18.2C93.9 73.4 81 60.2 81 45c0-2.4 1.9-4.3 4.3-4.3c.6 0 1.2 .1 1.7 .3C91.4 42.7 95.9 44 100.6 44c6.1 0 12-1.5 17.5-4.5c15.8-8.6 32.2-13.5 49.2-13.5h93.5c33.1 0 59.7 26.8 59.7 60l0 9 0 10.1c0 8.3 7.2 15 15.5 14.3c33.6-2.6 45.6-11.2 45.8-11.5c4.3-3.5 10.6-3.1 14.4 .8c4.1 4.1 3.3 9.6-1.1 17.3c-4.2 7.2-13.2 18.1-15.3 20.7c-2.1 2.7-1.6 6.6 1.1 8.7s6.6 1.6 8.7-1.1c19.9-25.3 47.9-61.1 67.6-85.6c51.7-20.4 75.2-7.3 82.5 0c12.2 12.2 12.2 31.9 0 44.1c-8.3 8.3-21 11.1-27.7 11c-3.3 0-6 2.7-6 6c0 3.2 2.5 5.8 5.7 6c62.5 12.2 31.8 102.2 8.6 135.1c-9.7 13.8-16.3 27.8-19.7 41.1c32.2-12.3 59-35.8 74.2-66.4c11.1-22.3 16.9-46.2 16.9-71.4V151l0-.1V136c0-26.5 21.5-48 48-48zM343.7 315.6l12.8 12.8c2.3 2.3 6.1 2.3 8.5 0l4.2-4.2c2.3-2.3 2.3-6.1 0-8.5l-12.8-12.8c-2.3-2.3-6.1-2.3-8.5 0l-4.2 4.2c-2.3 2.3-2.3 6.1 0 8.5zM120 144c-13.3 0-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24s-10.7-24-24-24zm-24 72v40c0 15.5 12.5 28 28 28h24c15.5 0 28-12.5 28-28V216c0-15.5-12.5-28-28-28H124c-15.5 0-28 12.5-28 28z" fill={emotion === "happy" ? "#FFD700" : emotion === "sad" ? "#4A90E2" : emotion === "angry" ? "#FF6B6B" : "#A875FF"}/>
        </svg>
      )
    },
    frog: {
      name: "Hoppy",
      description: "A friendly frog who croaks your messages!",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-full h-full">
          <path d="M368 32c41.7 0 75.9 31.8 79.7 72.5l85.6 16.2c26.5 5 45.7 28 45.7 54.9c0 35.1-26.4 64-60.3 68.2l-4.3 .5c-8.5 1.1-9.4 12.7-1.9 17.7c23 15.3 38.2 41.6 38.5 71.5c.3 41.8-26.2 77.5-63.3 90l-202.4 67.9c-11.3 3.8-19.6 9.2-59.2 9.2c-36.6 0-72.9-14.6-99.3-43c-24-25.8-54.4-41.8-88.7-43.9l-15.1-.9C10.1 400.8-4.5 373 1.7 346.3l6.4-27.8c4.6-20.1 13.8-38.8 26.8-54.8c12.6-15.6 29.1-27.7 47.9-35l146.4-56.3C248.3 165.9 265 160 282.1 160h46.6c7.8 0 15.5 1.8 22.4 5.3l43.2 21.6c8.7 4.3 19.1 .9 23.4-7.7s.9-19.1-7.7-23.4L367.9 134c-11.7-5.9-24.7-8.9-37.8-8.9H282.1c-12.7 0-25.3 2.6-37 7.6L193.6 151c-18.4 7.8-34.1 20.6-45.6 37.1L274.5 83.4c21.1-15.4 48-21.1 73.7-15.6l12.2 2.6c27.2 5.9 54.3-12.9 54.3-40.3c0-3 0-3-32.5-8.1zm0 80c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zM200 272c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zm-64 48c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" fill={emotion === "happy" ? "#FFD700" : emotion === "sad" ? "#4A90E2" : emotion === "angry" ? "#FF6B6B" : "#A875FF"}/>
        </svg>
      )
    }
  };

  // Emotion configurations
  const emotions = {
    happy: {
      icon: "😊",
      color: "bg-yellow-400",
      borderColor: "border-yellow-400"
    },
    sad: {
      icon: "😢",
      color: "bg-blue-400",
      borderColor: "border-blue-400"
    },
    angry: {
      icon: "😠",
      color: "bg-red-400",
      borderColor: "border-red-400"
    },
    neutral: {
      icon: "😐",
      color: "bg-purple-400",
      borderColor: "border-purple-400"
    }
  };

  const currentAnimal = animals[animal];
  const currentEmotion = emotions[emotion];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="w-full flex justify-center mb-4">
        {animal === 'frog' ? (
          <div className="w-48 h-48 relative">
            <div className={`w-full h-full rounded-full ${currentAnimal.bgColor} p-0 border-4 ${currentAnimal.borderColor} overflow-hidden`}>
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
              />
            </div>
            <div className={`absolute -bottom-2 -right-2 ${currentEmotion.color} text-white rounded-full w-12 h-12 flex items-center justify-center border-4 border-white`}>
              {currentEmotion.icon}
            </div>
          </div>
        ) : (
          <div className="w-48 h-48 relative">
            <div className={`w-full h-full rounded-full ${currentAnimal.bgColor} p-3 border-4 ${currentAnimal.borderColor} overflow-hidden`}>
              {currentAnimal.svg}
            </div>
            <div className={`absolute -bottom-2 -right-2 ${currentEmotion.color} text-white rounded-full w-12 h-12 flex items-center justify-center border-4 border-white`}>
              {currentEmotion.icon}
            </div>
          </div>
        )}
      </div>
      
      <h2 className="text-3xl font-['Baloo_2'] font-bold text-primary mb-2">
        {currentAnimal.name}
      </h2>
      <p className="text-center text-gray-600 italic">
        {currentAnimal.description}
      </p>
    </div>
  );
};

export default AnimalCharacter;
