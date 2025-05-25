
window.onload = function () {
    const imgElement = document.getElementById('image');
    const backgroundDiv = document.getElementById('background');
    const imageUrl = imgElement.src;

    backgroundDiv.style.backgroundImage = `url(${imageUrl})`;
};

const button = document.getElementById("click");
button.addEventListener("click", function () {
    alert("Thank you for visiting this website!");
});
