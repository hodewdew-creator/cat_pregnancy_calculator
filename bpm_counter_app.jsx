import { useState, useEffect } from "react";

export default function BpmCounter() {
  const [taps, setTaps] = useState([]);
  const [bpm, setBpm] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [hasTapped, setHasTapped] = useState(false);

  useEffect(() => {
    let timer;
    if (taps.length > 1) {
      const diff = (taps[taps.length - 1] - taps[0]) / 1000;
      setElapsed(diff.toFixed(2));
      setBpm(Math.round(((taps.length - 1) / diff) * 60));
    } else {
      setBpm(0);
      setElapsed(0);
    }
    return () => clearTimeout(timer);
  }, [taps]);

  const handleTap = () => {
    const audio = new Audio("/meow.mp3");
    audio.play();
    setTaps((prev) => [...prev, Date.now()]);
    setHasTapped(true);
  };

  const reset = () => {
    setTaps([]);
    setBpm(0);
    setElapsed(0);
    setHasTapped(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-500 ${
        hasTapped ? "bg-[url('/bg-cat.jpg')] bg-cover bg-center" : "bg-white"
      }`}
      style={hasTapped ? { backdropFilter: "brightness(0.8) blur(3px)" } : {}}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center px-4 leading-snug">
        CAT HR/RR COUNTER
      </h1>

      <div
        id="tap-box"
        onClick={handleTap}
        className="w-full h-[60vh] max-w-sm bg-white bg-opacity-80 shadow-xl border-4 border-lime-400 flex items-center justify-center active:scale-95 transition-transform"
      >
        <span className="text-3xl text-lime-700 font-semibold">TAP!</span>
      </div>

      <div className="mt-6 text-center space-y-1">
        <p className="text-gray-800 text-base">
          측정 횟수: <span className="font-bold text-lime-600">{taps.length}</span>
        </p>
        <p className="text-gray-800 text-base">
          경과 시간: <span className="font-bold text-lime-600">{elapsed}</span> 초
        </p>
        <p className="text-gray-800 text-base">
          BPM: <span className="font-bold text-lime-700 text-xl">{bpm}</span>
        </p>
      </div>

      <button
        onClick={reset}
        className="mt-6 px-6 py-2 w-full max-w-sm rounded-full bg-lime-500 text-white font-medium hover:bg-lime-600 transition"
      >
        RESET
      </button>
    </div>
  );
}
