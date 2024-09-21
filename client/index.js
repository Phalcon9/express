const movie = document.querySelector("#movie-name");
const score = document.querySelector("#movie-score");
const movieForm = document.querySelector("form");

movieForm.addEventListener("submit", addMovie);

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
 };
 
async function addMovie(e) {
  e.preventDefault();
  const data = {};
  data.movie = movie.value;
  data.score = score.value;
  const newData = await postData("http://localhost:5000/add", data);
  const p = document.createElement("p");
  p.textContent = newData.status;
  p.style.color = "green";
  document.body.appendChild(p);
  setTimeout(function () {
    document.body.removeChild(p);
  }, 3000);
}
