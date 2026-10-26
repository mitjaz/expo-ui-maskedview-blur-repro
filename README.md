# expo-ui MaskedView + expo-blur repro

On iOS, an `expo-blur` `BlurView` inside a `MaskedView` from `@expo/ui/community/masked-view` shows nothing when the two mount at the same time.

To run the app, run these commands:

```sh
npm install
npx expo run:ios
```

The screen shows five boxes in front of colored stripes. Boxes 2 to 5 use the same `expo-linear-gradient` mask. The mask goes from `'black'` at the top to `'transparent'` at the bottom.

1. `BlurView` without `MaskedView`: correct.
2. `MaskedView` with a plain `View` child: correct.
3. `MaskedView` with a `BlurView` child, both mounted at the same time: shows nothing.
4. The same as box 3, but the `BlurView` mounts 1 second after the `MaskedView`: correct.
5. The same as box 3, but with `@react-native-masked-view/masked-view` 0.3.2 instead of `MaskedView`: correct.

![Screenshot on the iPhone 17 simulator, iOS 26.4](screenshot.png)
