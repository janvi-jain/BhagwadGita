const url ="https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18";
const options = {
  method: "GET",
  headers: {
    'x-rapidapi-key': 'e6dd26342bmsh458b3f0d70b2d02p1d9736jsn8a73d9fae75a',
    'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
    "Content-Type": "application/json"
  } 
};

const chapters = document.getElementById("chapters");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function loadChapters() {
  try {
    const response =
      await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        "Failed to fetch chapters"
      );
    }

    const result = await response.json();
    console.log("Chapters:", result);
    let html = "";
    result.forEach((item) => {
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="card chapter-card h-100">
            <div class="chapter-image-wrapper">
              <img src="./assets/images/chapter-${item.id}.webp" class="card-img-top chapter-img" alt="Chapter ${item.id}" onerror="this.style.display='none'">
              <span class="chapter-number">Chapter ${item.id}</span>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.name_translated}</p>
              <p class="chapter-description"> ${item.name_meaning || "Explore the teachings of this chapter."}</p>
              <a href="chapter.html?chapter=${item.id}" class="btn btn-outline-light btn-sm mt-auto">
                Read Chapter →
              </a>
            </div>
          </div>
        </div>`;
    });
    chapters.innerHTML = html;
    loading.classList.add("d-none");
  }
  catch (err) {
    console.error(err);
    loading.classList.add("d-none");
    error.classList.remove("d-none");
  }
}
loadChapters();