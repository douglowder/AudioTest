import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';

import { useInterval } from './useInterval';

export type BeepType = {
  name: string;
  source: AVPlaybackSource;
  interval: number;
};

/**
 * Headless component that plays a sound at intervals.
 *
 * @prop name Name of the sound being played (used for logging)
 * @prop source The sound source (e.g. require('my-sound.wav'))
 * @prop interval The interval between plays (in ms)
 * @prop playing The sound will only play if this prop is true
 */
export function BeepPlayer({
  name,
  source,
  interval,
  playing,
}: BeepType & { playing: boolean }) {
  const [sound, setSound] = useState<Audio.Sound>();

  async function loadSound() {
    console.log(`Loading sound ${name}`);
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
  }

  async function playAndRewindSound() {
    console.log(`Playing sound ${name}`);
    await sound.playAsync();
    await sound.setPositionAsync(0);
  }

  function unloadSound() {
    console.log(`Unloading sound ${name}`);
    sound.unloadAsync();
  }

  // We only need to load the sound when the component mounts -- it stays loaded until
  // the component unmounts
  useEffect(() => {
    loadSound();
  }, []);

  // Play and rewind the sound when the interval hook fires (if playing === true)
  useInterval(() => {
    if (sound && playing) {
      playAndRewindSound();
    }
  }, interval);

  // Return a method to unload the sound when the component unmounts
  useEffect(() => {
    return sound ? () => unloadSound() : undefined;
  }, [sound]);

  return <View />;
}
