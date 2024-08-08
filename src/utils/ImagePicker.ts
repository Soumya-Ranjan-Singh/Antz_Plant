import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

export type MediaOptions = CameraOptions & ImageLibraryOptions;

/**
 * Opens the gallery with the specified options.
 * @param {MediaOptions} options - Options for the image picker.
 * @returns {Promise<Asset[]>} - A promise that resolves with the selected files.
 */
export const openGallery = async (options: MediaOptions): Promise<Asset[]> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.errorCode) {
        reject(`Image Picker Error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        resolve(response.assets);
      } else {
        reject('No assets found');
      }
    });
  });
};

/**
 * Opens the camera with the specified options.
 * @param {MediaOptions} options - Options for the camera picker.
 * @returns {Promise<Asset[]>} - A promise that resolves with the captured files.
 */
export const openCamera = async (options: MediaOptions): Promise<Asset[]> => {
  return new Promise((resolve, reject) => {
    launchCamera(options, response => {
      if (response.didCancel) {
        reject('User cancelled camera picker');
      } else if (response.errorCode) {
        reject(`Camera Error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        resolve(response.assets);
      } else {
        reject('No assets found');
      }
    });
  });
};
