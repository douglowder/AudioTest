import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BeepType, BeepPlayer } from './src/BeepPlayer';

// Some short samples to play at different intervals

const data: BeepType[] = [
  { name: 'beep-01', source: require('./assets/beep-01.wav'), interval: 2517 },
  {
    name: 'beep-04',
    source: require('./assets/beep-04.wav'),
    interval: 1000,
  },
  { name: 'beep-03', source: require('./assets/beep-03.wav'), interval: 1300 },
];

// App has a single button to start/stop playing the sounds
export default function App() {
  const [playing, setPlaying] = useState(false);
  return (
    <View style={styles.container}>
      {data.map((beeper: BeepType) => (
        <BeepPlayer
          key={beeper.name}
          name={beeper.name}
          source={beeper.source}
          interval={beeper.interval}
          playing={playing}
        />
      ))}
      <Button
        title={
          playing ? 'Stop the annoying sounds' : 'Start the annoying sounds'
        }
        onPress={() => setPlaying(!playing)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
