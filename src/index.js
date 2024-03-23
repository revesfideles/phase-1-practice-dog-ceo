console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", () => {
  console.log('%c HI', 'color: firebrick');

  // Fetch the images from the API
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      // Iterate over the array of images
      data.message.forEach(imageUrl => {
        // Create a new image element
        const img = document.createElement("img");
        img.src = imageUrl;

        // Append the image element to the DOM
        document.getElementById("dog-image-container").appendChild(img);
      });
    })
    .catch(error => console.error(error));

  // Fetch the dog breeds from the API
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const breedList = data.message;
      const ul = document.getElementById("dog-breeds");

      // Iterate over the breeds object
      for (const breed in breedList) {
        // Create a new list item element
        const li = document.createElement("li");
        li.textContent = breed;

        // Add event listener to change font color on click
        li.addEventListener("click", () => {
          li.style.color = "red";
        });

        // Append the list item element to the ul
        ul.appendChild(li);
      }

      // Add event listener to filter breeds based on selected letter
      const dropdown = document.getElementById("breed-dropdown");
      const filteredBreeds = document.getElementById("dog-breeds");

      dropdown.addEventListener("change", () => {
        const selectedLetter = dropdown.value;

        // Clear the existing filtered breeds
        filteredBreeds.innerHTML = "";

        // Filter the breeds based on the selected letter
        const filteredList = Object.keys(breedList).filter(
          breed => breed.charAt(0) === selectedLetter
        );

        // Add the filtered breeds to the filteredBreeds ul
        filteredList.forEach(breed => {
          const li = document.createElement("li");
          li.textContent = breed;
          filteredBreeds.appendChild(li);
        });
      });
    })
    .catch(error => console.error(error));
});