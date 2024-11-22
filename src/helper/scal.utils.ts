import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
    size + (verticalScale(size) - size) * factor;
export const normalize = (size: number) =>
    PixelRatio.roundToNearestPixel(size * (width / guidelineBaseWidth));
export const nh = (size: number) =>
    PixelRatio.roundToNearestPixel(size * (height / guidelineBaseHeight));
export const nw = (size: number) =>
    PixelRatio.roundToNearestPixel(size * (width / guidelineBaseWidth));
export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;