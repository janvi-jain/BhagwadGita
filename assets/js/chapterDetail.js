import { setupVerseModal } from "./verse.js";
const params = new URLSearchParams(window.location.search);
const chapterId = params.get("chapter");
const container = document.getElementById("chapterDetail");

if (!chapterId) {
  container.innerHTML = `<div class="alert alert-danger">Chapter not found</div>`;
  throw new Error("Chapter ID missing");
}

const options = {
  method: "GET",
  headers: {
    'x-rapidapi-key': 'e6dd26342bmsh458b3f0d70b2d02p1d9736jsn8a73d9fae75a',
    'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
    "Content-Type":"application/json"
  }
};

let chapterData;
let versesData;
async function loadChapter() {
  try {
    const chapterResponse =
      await fetch(
        `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterId}/`,
        options
      );
    if (!chapterResponse.ok) {
      throw new Error(
        "Unable to load chapter"
      );
    }
    chapterData =
      await chapterResponse.json();
    const versesResponse =
      await fetch(
        `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterId}/verses/`,
        options
      );

    if (!versesResponse.ok) {
      throw new Error(
        "Unable to load verses"
      );
    }

    versesData = await versesResponse.json();

    console.log("Chapter:", chapterData);
    console.log("Verses:", versesData);
    displayChapter();
  }catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="alert alert-danger text-center">
        <h5>Unable to load chapter</h5>
        <p>
          Please check your internet connection
          or try again later.
        </p>
      </div>`;
  }
}

function displayChapter() {
  let html = `
    <div class="chapter-box mb-5">
      <div class="chapter-header">
        <span class="section-label">
          📖 Chapter ${chapterData.id}
        </span>
        <h1>${chapterData.name_translated}</h1>
        <h4>${chapterData.name}</h4>
      </div>

      <div class="chapter-info">
        <div class="info-item">
          <span>Verses</span>
          <strong>${chapterData.verses_count}</strong>
        </div>

        <div class="info-item">
          <span>Meaning</span>
          <strong>${chapterData.name_meaning}</strong>
        </div>
      </div>

      <div class="chapter-text">
        <h5>Meaning of the Chapter</h5>
        <p>${chapterData.name_meaning}</p>
        <h5>Summary</h5>
        <p>${chapterData.chapter_summary}</p>
        <h5>Summary in Hindi</h5>
        <p>${chapterData.chapter_summary_hindi}</p>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>📜 Verses</h3>
      <span class="verse-count">${versesData.length} Verses</span>
    </div>`;
  versesData.forEach((verse, index) => {
    html += `
      <div class="verse-card mb-3 p-4" data-index="${index}" data-bs-toggle="modal" data-bs-target="#verseModal">
        <div class="d-flex justify-content-between align-items-center">
          <h6>Verse ${verse.verse_number}</h6>
          <span>Read →</span>
        </div>
        <p>
          ${verse.text
            ? verse.text.substring(0, 180) + "..."
            : "Verse text unavailable."
          }
        </p>
      </div>`;
  });

  container.innerHTML = html;
  setupVerseModal(versesData);
}
loadChapter();