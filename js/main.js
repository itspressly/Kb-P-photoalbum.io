import supabase from "./supabase.js";

const uploadForm = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const descriptionInput = document.getElementById("description-input");
const mediaContainer = document.getElementById("media-container");

// Handle form submission
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  const description = descriptionInput.value;

  if (file && description) {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("media")
        .upload(fileName, file);

      if (error) throw error;

      const { publicURL } = supabase.storage.from("media").getPublicUrl(fileName);

      // Display the uploaded media
      displayMedia(publicURL, description, file.type.startsWith("image/") ? "image" : "video");

      // Clear inputs
      fileInput.value = "";
      descriptionInput.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload file. Please try again.");
    }
  } else {
    alert("Please select a file and add a description!");
  }
});

// Display media on the page
function displayMedia(url, description, type) {
  const mediaItem = document.createElement("div");
  mediaItem.classList.add("media-item");

  if (type === "image") {
    const img = document.createElement("img");
    img.src = url;
    mediaItem.appendChild(img);
  } else if (type === "video") {
    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    mediaItem.appendChild(video);
  }

  const desc = document.createElement("p");
  desc.textContent = description;
  mediaItem.appendChild(desc);

  mediaContainer.appendChild(mediaItem);
}
