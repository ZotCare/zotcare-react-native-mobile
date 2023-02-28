import {NativeModules} from 'react-native';
var ImagePicker = NativeModules.ImageCropPicker;

export function pickSingleForProfile(cropit, circular = false, callback) {
  ImagePicker.openPicker({
    width: 640,
    height: 640,
    compressImageMaxWidth: 640,
    compressImageMaxHeight: 640,
    compressImageQuality: 0.8,
    cropping: cropit,
    cropperCircleOverlay: circular,
    compressVideoPreset: 'MediumQuality',
    includeExif: false,
  })
    .then(image => {
      callback(image);
    })
    .catch(e => {
      callback(null);
    });
}

export function pickSingleWithCameraProfile(
  cropit = true,
  circular = false,
  mediaType = 'photo',
  callback,
) {
  ImagePicker.openCamera({
    width: 640,
    height: 640,
    mediaType: 'photo',
    cropping: true,
    compressImageMaxWidth: 640,
    compressImageMaxHeight: 640,
    compressImageQuality: 0.8,
  })
    .then(image => {
      callback(image);
    })
    .catch(e => {
      callback(null);
    });
}

export function pickSingle(cropit, circular = false, callback) {
  ImagePicker.openPicker({
    compressImageMaxWidth: 1290,
    compressImageMaxHeight: 1090,
    compressImageQuality: 0.8,
    cropping: cropit,
    cropperCircleOverlay: circular,
    compressVideoPreset: 'MediumQuality',
    includeExif: false,
  })
    .then(image => {
      callback(image);
    })
    .catch(e => {
      callback(null);
    });
}

export function pickSingleWithCamera(
  cropit = true,
  circular = false,
  mediaType = 'photo',
  callback,
) {
  ImagePicker.openCamera({
    mediaType: 'photo',
    cropping: true,
    compressImageMaxWidth: 1290,
    compressImageMaxHeight: 1090,
    compressImageQuality: 0.8,
  })
    .then(image => {
      callback(image);
    })
    .catch(e => {
      callback(null);
    });
}

export function pickMultiple(cropit = true, circular = false, callback) {
  ImagePicker.openPicker({
    mediaType: 'photo',
    cropping: true,
    compressImageMaxWidth: 1290,
    compressImageMaxHeight: 1090,
    compressImageQuality: 0.8,
    multiple: true,
  })
    .then(images => {
      callback(images);
    })
    .catch(e => callback(null));
}
