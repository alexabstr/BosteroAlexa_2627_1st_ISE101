
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type TaskImagePickerProps = {
  onImageSelected: (image: ImagePicker.ImagePickerAsset | null) => void;
};

export default function TaskImagePicker({
  onImageSelected,
}: TaskImagePickerProps) {
  const [image, setImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [message, setMessage] = useState("");

  async function pickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setMessage("Gallery permission was not granted.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) {
        setMessage("Image selection cancelled.");
        return;
      }

      const selectedImage = result.assets[0];

      if (!selectedImage.mimeType?.startsWith("image/")) {
        setMessage("Please select a valid image.");
        return;
      }

      if (selectedImage.fileSize && selectedImage.fileSize > 5 * 1024 * 1024) {
        setMessage("Image must not exceed 5 MB.");
        return;
      }

      setImage(selectedImage);
      onImageSelected(selectedImage);
      setMessage("Image selected. Preview only — not uploaded yet.");
    } catch {
      setMessage("Unable to select image. Please try again.");
    }
  }

  function removeImage() {
    setImage(null);
    onImageSelected(null);
    setMessage("Selected image removed.");
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </Pressable>

      {image && (
        <View>
          <Image source={{ uri: image.uri }} style={styles.preview} />
          <Pressable onPress={removeImage}>
            <Text style={styles.removeText}>Remove Image</Text>
          </Pressable>
        </View>
      )}

      <Text accessibilityLiveRegion="polite">{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    gap: 10,
  },
  button: {
    backgroundColor: "#6A5ACD",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  preview: {
    width: 220,
    height: 160,
    borderRadius: 8,
    resizeMode: "cover",
  },
  removeText: {
    color: "#C0392B",
    marginTop: 8,
  },
});

