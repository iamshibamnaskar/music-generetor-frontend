import React, { useEffect, useRef, useState } from 'react';
import { useAudioStore } from '../store/audioStore';

const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlayerComponent = ({ url, title, mood, genre }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const { currentAudio, setCurrentAudio } = useAudioStore();

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (!isPlaying) {
            if (currentAudio && currentAudio !== audioRef.current) {
                currentAudio.pause();
            }
            audioRef.current.play();
            setCurrentAudio(audioRef.current);
        } else {
            audioRef.current.pause();
        }
        setIsPlaying(!isPlaying);
    };

    
    useEffect(() => {
        if (currentAudio !== audioRef.current && isPlaying) {
            setIsPlaying(false);
            if (audioRef.current) audioRef.current.pause();
        }
    }, [currentAudio]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateTime);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateTime);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="bg-gray-50 dark:bg-[#233044] rounded-xl p-4 w-full mb-5">
            <audio
                ref={audioRef}
                src={url}
                preload="auto"
            />

            <div className="flex gap-2 mb-3 justify-end">
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500 text-white">
                    Mood: {mood}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500 text-white">
                    Genre: {genre}
                </span>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                        {isPlaying ? (
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </button>

                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-100">{title}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-150"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerComponent;
