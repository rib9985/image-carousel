const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const imageSelectors = document.querySelectorAll(".image-selector");
const imageMax = Array.from(
  document.querySelectorAll(".slide"),
).length.toString();
const imageMin = "1";
console.log(imageMax);

arrowLeft.addEventListener("click", () => slideImage(true));
arrowRight.addEventListener("click", () => slideImage(false));
imageSelectors.forEach((imageSelector) => {
  imageSelector.addEventListener("click", () =>
    selectImage(imageSelector.getAttribute("id")),
  );
});

function extractId(id) {
  const pattern = /image-(\d+)/;
  const matchNumber = id.match(pattern);
  return matchNumber ? matchNumber[1] : null;
}
function extractImageSelectorId(id) {
  const pattern = /image-select-(\d+)/;
  const matchNumber = id.match(pattern);
  return matchNumber ? matchNumber[1] : null;
}
function slideImage(previous) {
  const currentImage = document.querySelector(".visible");
  const currentImageNumber = extractId(currentImage.getAttribute("class"));

  let nextImageNumber = null;

  if (previous) {
    if (currentImageNumber === imageMin) {
      nextImageNumber = imageMax;
    } else {
      nextImageNumber = parseInt(currentImageNumber) - 1;
    }
  } else {
    if (currentImageNumber === imageMax) {
      nextImageNumber = imageMin;
    } else {
      nextImageNumber = parseInt(currentImageNumber) + 1;
    }
  }

  toggleSelectorIcon(currentImageNumber, nextImageNumber);
  const nextImage = document.querySelector(`.image-${nextImageNumber}`);
  nextImage.classList.toggle("visible");
  nextImage.classList.toggle("not-visible");
  currentImage.classList.toggle("visible");
  currentImage.classList.toggle("not-visible");
  toggleSelectorIcon(currentImageNumber, nextImageNumber);
}

function toggleSelectorIcon(previousId, nextId) {
  const previousSelector = document.getElementById(
    `image-select-${previousId}`,
  );
  const nextSelector = document.getElementById(`image-select-${nextId}`);

  nextSelector.innerText = "radio_button_checked";
  previousSelector.innerText = "circle";
}

function selectImage(id) {
  const selectedImageNumber = extractImageSelectorId(id);
  const selectedImage = document.querySelector(`.image-${selectedImageNumber}`);
  const currentImage = document.querySelector(".visible");
  const currentImageNumber = extractId(currentImage.getAttribute("class"));

  selectedImage.classList.toggle("visible");
  selectedImage.classList.toggle("not-visible");
  currentImage.classList.toggle("visible");
  currentImage.classList.toggle("not-visible");

  toggleSelectorIcon(currentImageNumber, selectedImageNumber);
}
