import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  ImageBackground,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const Home: React.FC<{}> = () => {
  const anim = new Animated.Value(0);
  const displace = new Animated.Value(0);
  let prev_position = 0;
  let right = false;
  let position = 0;

  const handleLeftOrRight = (): void => {
    Math.random() > 0.5 ? (right = true) : (right = false);
  };

  useEffect(() => {
    displace.addListener(({value}) => {
      if (value > width - width * 0.2) {
        Animated.parallel([
          Animated.timing(displace, {
            toValue: width - width * 0.2 - position,
            useNativeDriver: false,
            duration: 500,
          }),
          Animated.timing(anim, {
            toValue: 0,
            useNativeDriver: false,
            duration: 800,
            easing: Easing.bounce,
          }),
        ]).start();
      } else if (value < 0) {
        Animated.parallel([
          Animated.timing(displace, {
            toValue: 0 + position,
            useNativeDriver: false,
            duration: 500,
          }),
          Animated.timing(anim, {
            toValue: 0,
            useNativeDriver: false,
            duration: 800,
            easing: Easing.bounce,
          }),
        ]).start();
      }
    });
  });

  const handleClick = (): void => {
    prev_position = position;
    position = Math.floor(Math.random() * (width - width * 0.2)) + 0;
    handleLeftOrRight();
    const random_height =
      Math.floor(Math.random() * height - height * 0.2) + height / 3;
    Animated.parallel([
      Animated.sequence([
        Animated.timing(anim, {
          toValue: random_height,
          useNativeDriver: false,
          duration: 500,
        }),
        Animated.timing(anim, {
          toValue: 0,
          useNativeDriver: false,
          duration: 800,
          easing: Easing.bounce,
        }),
      ]),

      Animated.sequence([
        Animated.timing(displace, {
          toValue: prev_position + position,
          useNativeDriver: false,
          duration: 500,
          easing: Easing.ease,
        }),
        Animated.timing(displace, {
          toValue: (prev_position + position) * 2,
          useNativeDriver: false,
          duration: 500,
          easing: Easing.ease,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('../../assets/ground.jpg')}>
        <TouchableWithoutFeedback onPress={handleClick}>
          <Animated.View
            style={[
              styles.circle,
              {
                bottom: anim,
                right: right ? displace : prev_position,
                left: right ? prev_position : displace,
              },
            ]}>
            <ImageBackground
              resizeMode="cover"
              style={{minHeight: 100, minWidth: 100}}
              source={require('../../assets/ball.png')}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  circle: {
    overflow: 'hidden',
    borderRadius: 50,
    height: 100,
    width: 100,
  },
});
