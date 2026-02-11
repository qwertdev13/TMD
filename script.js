// Toggle form visibility
document.getElementById("searchBtn").addEventListener("click", function () {
  const form = document.getElementById("searchForm");
  form.classList.toggle("hidden");
  if (!form.classList.contains("hidden")) {
    document.getElementById("searchInput").focus();
  }
});

// Filter document sections
function filterDocuments() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const boxes = document.querySelectorAll(".document-box");

  boxes.forEach((box) => {
    const text = box.textContent.toLowerCase();
    box.style.display = text.includes(filter) ? "block" : "none";
  });
}   