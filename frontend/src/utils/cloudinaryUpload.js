const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
  if (!file) {
    throw new Error("No file selected");
  }

  if (!CLOUD_NAME || !UPLOAD_PRESET) throw new Error("Image upload is not configured");
  if (!file.type.startsWith("image/")) throw new Error("Please select an image");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be smaller than 5 MB");

  const formData = new FormData();

  formData.append("file", file);

  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || "Cloudinary upload failed");
  }

  return result.secure_url;
};
