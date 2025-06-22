import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  currentAudio: null,
  setCurrentAudio: (audio) => set({ currentAudio: audio }),
})); 