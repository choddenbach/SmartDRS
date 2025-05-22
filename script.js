const FAA_DRS_API_KEY = "c480cd075825a9f44beab596ba0cada217476801";

async function fetchDocs() {
  const docType = document.getElementById("docType").value;
  const url = `https://drs.faa.gov/api/drs/data-pull/${encodeURIComponent(docType)}?offset=0&docLastModifiedDateSortOrder=DESC`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": FAA_DRS_API_KEY
      }
    });

    const data = await response.json();
    const resultsTable = document.getElementById("results");

    resultsTable.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Last Modified</th>
        <th>Download</th>
      </tr>
    `;

    data.documents.forEach((doc) => {
      resultsTable.innerHTML += `
        <tr>
          <td>${doc.title || doc.documentNumber || "Untitled"}</td>
          <td>${doc.docLastModifiedDate || "—"}</td>
          <td>
            ${doc.mainDocumentDownloadURL
              ? `<a href="${doc.mainDocumentDownloadURL}" target="_blank">Download</a>`
              : "N/A"}
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    alert("Something went wrong. Check the console for details.");
  }
}
