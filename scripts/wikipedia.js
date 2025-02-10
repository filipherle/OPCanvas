let dialogOpen = false;

async function handleSelection() {
  // If a dialog is already open, do nothing.
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
            // Optionally clear selection to prevent immediate re-triggering:
            window.getSelection().removeAllRanges();
          })
      })
      .catch(error => console.error("Error:", error));
  }
}

function showDialogInfo(message) {
  dialogOpen = true;
  // Create a new div element and set its HTML content to the provided message using jQuery
  const dialog = $('<div>').html(message);

  // Initialize the jQuery UI dialog with options
  dialog.dialog({
    title: 'Information',
    modal: true, // Makes the dialog modal
    buttons: {
      "OK": function() {
        $(this).dialog("close");
      }
    },
    close: function() {
      // Remove the dialog element from the DOM when it is closed
      $(this).remove();
      dialogOpen = false;
    }
  });
}

// Add your event listeners as before
document.addEventListener("mouseup", handleSelection);
document.addEventListener("keyup", handleSelection);
