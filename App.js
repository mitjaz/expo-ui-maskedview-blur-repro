import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaskedView } from '@expo/ui/community/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import RNCMaskedView from '@react-native-masked-view/masked-view';

// Same mask as the "Alpha-fade mask" docs example, but top to bottom
const mask = (
  <LinearGradient
    colors={['black', 'transparent']}
    style={StyleSheet.absoluteFill}
  />
);

function Stripes() {
  return (
    <View style={styles.stripes}>
      {['#3D5A80', '#DAA520', '#E07A5F', '#2A9D8F', '#8E44AD'].map((color) => (
        <View key={color} style={[styles.stripe, { backgroundColor: color }]}>
          <Text style={styles.stripeText}>BEHIND</Text>
        </View>
      ))}
    </View>
  );
}

function Case({ label, children }) {
  return (
    <View style={styles.case}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Stripes />
        {children}
      </View>
    </View>
  );
}

export default function App() {
  const [mountBlur, setMountBlur] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMountBlur(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Case label="1. BlurView, no MaskedView (works)">
        <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill} />
      </Case>

      <Case label="2. MaskedView + Views (works)">
        <MaskedView style={StyleSheet.absoluteFill} maskElement={mask}>
          <View style={{ flex: 1, backgroundColor: 'black' }} />
        </MaskedView>
      </Case>

      <Case label="3. MaskedView + BlurView (nothing renders)">
        <MaskedView style={StyleSheet.absoluteFill} maskElement={mask}>
          <BlurView tint="dark" intensity={50} style={{ flex: 1 }} />
        </MaskedView>
      </Case>

      <Case label="4. As 3, BlurView mounted 1s later (works)">
        <MaskedView style={StyleSheet.absoluteFill} maskElement={mask}>
          {mountBlur && (
            <BlurView tint="dark" intensity={50} style={{ flex: 1 }} />
          )}
        </MaskedView>
      </Case>

      <Case label="5. As 3, @react-native-masked-view">
        <RNCMaskedView style={StyleSheet.absoluteFill} maskElement={mask}>
          <BlurView tint="dark" intensity={50} style={{ flex: 1 }} />
        </RNCMaskedView>
      </Case>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  case: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  box: {
    width: 300,
    height: 100,
  },
  stripes: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
  },
  stripe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
});
