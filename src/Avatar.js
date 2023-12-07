import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Avatar = () => {

    const [selectedImage, setSelectedImage] = useState('')
    const selectImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay: false,
                freeStyleCropEnabled: true,
                saveToPhotos: true
            })
            setSelectedImage(image.path)
        } catch (error) {
            console.log("Image Picker cannot be openned: ", error)
        }
    }

    const cropImage = async () => {
        try {
            if (selectedImage) {
                const croppedImage = await ImagePicker.openCropper({
                    path: selectedImage,
                    width: 300,
                    height: 400,
                    cropperCircleOverlay: false,
                    freeStyleCropEnabled: true
                })
                setSelectedImage(croppedImage.path)
            } else {
                console.log("No image was selected.")
            }
        } catch (error) {
            console.log("Error opening the image cropper: ", error)
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>
                Please select an image from gallery.
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'blue', marginTop: 20,
                    paddingVertical: 15, justifyContent: 'center',
                    alignItems: 'center', borderRadius: 8
                }}
                onPress={selectImage}
            >
                <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                    Select Image
                </Text>
            </TouchableOpacity>
            {selectedImage &&
                <>
                    <Image
                        source={{ uri: selectedImage }}
                        style={{ height: 200, width: 200, marginTop: 20, alignSelf:'center' }}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'blue', marginTop: 20,
                            paddingVertical: 15, justifyContent: 'center',
                            alignItems: 'center', borderRadius: 8
                        }}
                        onPress={cropImage}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                            Crop Image
                        </Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

export default Avatar