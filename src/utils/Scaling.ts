import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Base dimensions for common devices
const BASE_DIMENSIONS = [
  {width: 320, height: 568}, // iPhone SE
  {width: 375, height: 667}, // iPhone 8
  {width: 414, height: 896}, // iPhone 11
  {width: 360, height: 740}, // Samsung Galaxy S9
  {width: 412, height: 869}, // Samsung Galaxy Note 10
  {width: 768, height: 1024}, // iPad
  {width: 1024, height: 1366}, // iPad Pro 12.9
];

// Function to find the closest base dimensions to the current device dimensions
const findClosestBaseDimensions = () => {
  let closest = BASE_DIMENSIONS[0];

  let minDifference =
    Math.abs(SCREEN_WIDTH - closest.width) +
    Math.abs(SCREEN_HEIGHT - closest.height);

  BASE_DIMENSIONS.forEach(dim => {
    const difference =
      Math.abs(SCREEN_WIDTH - dim.width) + Math.abs(SCREEN_HEIGHT - dim.height);
    if (difference < minDifference) {
      closest = dim;
      minDifference = difference;
    }
  });
  return closest;
};

// Get the closest base dimensions
const {width: BASE_WIDTH, height: BASE_HEIGHT} = findClosestBaseDimensions();

// Function to scale width based on the base width, horizontal margin and padding.
const scaleWidth = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Function to scale height based on the base height, vertical margin and padding.
const scaleHeight = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Function to scale font size based on pixel density
const scaleFont = (size: number) => size * PixelRatio.getFontScale();

export {scaleWidth, scaleHeight, scaleFont};
