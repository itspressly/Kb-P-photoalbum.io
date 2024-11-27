// Import the Supabase client
import supabase from "./supabase.js"; // Ensure the path to supabase.js is correct

// DOM elements
const uploadForm = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const descriptionInput = document.getElementById("description-input");
const mediaContainer = document.getElementById("media-container");

// Handle form submission
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const file = fileInput.files[0]; // Get the selected file
  const description = descriptionInput.value.trim(); // Get the description and trim whitespace

  if (file && description) {
    try {
      // Create a unique filename with a timestamp to avoid conflicts
      const fileName = `${Date.now()}-${file.name}`;

      // Upload the file to the 'media' bucket in Supabase
      const { data, error } = await supabase.storage
        .from("media") // Ensure the 'media' bucket exists in your Supabase project
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        alert("Failed to upload file. Please try again.");
        return;
      }

      // Get the public URL of the uploaded file
      const { data: urlData, error: urlError } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);

      if (urlError || !urlData.publicUrl) {
        console.error("Error getting public URL:", urlError);
        alert("Failed to retrieve file URL. Please try again.");
        return;
      }

      const publicURL = urlData.publicUrl;

      // Determine the file type and display the uploaded media
      const isImage = file.type.startsWith("image/");
      displayMedia(publicURL, description, isImage ? "image" : "video");

      // Clear input fields after successful upload
      fileInput.value = "";
      descriptionInput.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  } else {
    alert("Please select a file and provide a description!");
  }
});

// Function to display media on the page
function displayMedia(url, description, type) {
  // Create a container for the media item
  const mediaItem = document.createElement("div");
  mediaItem.classList.add("media-item"); // Add a class for styling

  if (type === "image") {
    // Create an <img> element for images
    const img = document.createElement("img");
    img.src = url; // Set the source to the uploaded image's public URL
    img.alt = description; // Add an alt attribute for accessibility
    mediaItem.appendChild(img);
  } else if (type === "video") {
    // Create a <video> element for videos
    const video = document.createElement("video");
    video.src = url; // Set the source to the uploaded video's public URL
    video.controls = true; // Enable playback controls
    mediaItem.appendChild(video);
  }

  // Add a description below the media
  const desc = document.createElement("p");
  desc.textContent = description;
  mediaItem.appendChild(desc);

  // Append the media item to the container on the page
  mediaContainer.appendChild(mediaItem);
}

