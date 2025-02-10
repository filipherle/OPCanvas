document.addEventListener("mouseup", handleSelection);
document.addEventListener("keyup", handleSelection);

async function handleSelection() {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {


    const query = selectedText;
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    var pageId = 0;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            pageId = data.query.search[0]['pageid'];
            const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&pageids=${pageId}&exintro&format=json&origin=*`;
            fetch(contentUrl)
                .then(response => response.json())
                .then(data => {
            console.log("Article Content:", data.query.pages[pageId].extract);
        })
    })
    .catch(error => console.error("Error:", error));
  }
}

