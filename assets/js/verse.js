export function setupVerseModal(versesData) {
  const cards =
    document.querySelectorAll(".verse-card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const verse = versesData[index];
      const modalContent = document.getElementById("modalContent");

      if (!verse) {
        modalContent.innerHTML = `
          <p>Verse details are unavailable.</p>`;
        return;
      }

      let translationsHTML = "";
      if (verse.translations && verse.translations.length > 0){
        verse.translations.forEach((translation) => {
          translationsHTML += `
            <div class="translation-box mb-3">
              <strong>
                ${translation.author_name || "Translation"}
              </strong>
              <p>
                ${translation.description || "No translation available."}
              </p>

            </div>`;
        });
      }else {
        translationsHTML = `
          <p class="text-muted">
            No translations available.
          </p>`;
      }

      let commentaryHTML = "";
      if (verse.commentaries && verse.commentaries.length > 0) {
        verse.commentaries.forEach((commentary) => {
          commentaryHTML += `
            <div class="commentary-box mb-3">
              <strong>
                ${commentary.author_name || "Commentary"}
              </strong>
              <p>
                ${commentary.description || "No commentary available."}
              </p>
            </div>`;
        });
      }else {
        commentaryHTML = `
          <p class="text-muted">
            No commentary available.
          </p>`;
      }

      modalContent.innerHTML = `
        <div class="verse-detail">
        <span class="verse-badge">Verse ${verse.verse_number}</span>
        <h5 class="mt-4">Sanskrit</h5>
        <p class="sanskrit-text">${verse.text || "Text unavailable."}</p>
        <hr>
        <h5>Translations</h5>${translationsHTML}
        <hr>
        <h5>Commentary</h5>${commentaryHTML}
        </div>`;
    });
  });
}