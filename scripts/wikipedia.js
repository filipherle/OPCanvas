let dialogOpen = false;

async function handleSelection() {
  if (dialogOpen) return;

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
            showDialogInfo(data.query.pages[pageId].extract);
            window.getSelection().removeAllRanges();
          })
      })
      .catch(error => console.error("Error:", error));
  }
}

function showDialogInfo(message) {
  dialogOpen = true;
  const dialog = $('<div>').html(message);

  dialog.dialog({
    title: 'Information',
    modal: true, 
    closeText: "X", 
    buttons: {
      "OK": function() {
        $(this).dialog("close");
      }
    },
    close: function() {
      $(this).remove();
      dialogOpen = false;
    }
  });
}

document.addEventListener("mouseup", handleSelection);
document.addEventListener("keyup", handleSelection);
