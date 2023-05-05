import React, {useState} from 'react';
import {Alert, Button, Image, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import {
  hasCameraPermission,
  hasWriteExternalStoragePermission,
} from '../../../libs/Permissions';

const ImageImport = ({title}) => {
  const [imageSelected, setImageSelected] = useState(false);
  const [image, setImage] = useState('');
  const [permission, setPermission] = useState(false);

  const options = {
    storageOptions: {
      path: 'images',
      mediaType: 'photo',
    },
  };

  const uploadFromGallery = async () => {
    let check = hasWriteExternalStoragePermission(setPermission);
    if (!permission)
      console.log('ZotCare does not have permission to access Gallery');
    else {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User Canceled Choosing Image From Gallery');
        } else if (response.error)
          console.log('ImagePicker Error: ', response.error);
        else {
          setImageSelected(true);
          let res = response;
          setImage(response.assets[0].uri);
        }
      });
    }
  };

  const takePhotoFromCamera = async () => {
    let check = await hasCameraPermission(setPermission);
    if (!permission)
      console.log("ZotCare does not have permission to access Camera")
    else {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User Canceled Choosing Image From Gallery');
        } else if (response.error)
          console.log('ImagePicker Error: ', response.error);
        else {
          setImageSelected(true);
          let res = response;
          setImage(response.assets[0].uri);
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Button title="Choose from Library..." onPress={uploadFromGallery} />
        <Button title="Take a Picture" onPress={takePhotoFromCamera} />
        {imageSelected && (
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 16,
            }}
            source={{uri: image}}
          />
        )}
        {imageSelected && (
          <Text style={styles.filePath}>File Name: {image} </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ImageImport;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filePath: {
    padding: 8,
    margin: 8,
  },
  title: {
    fontSize: 24,
    paddingBottom: 16,
    fontWeight: 'bold',
  },
});
