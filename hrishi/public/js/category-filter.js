document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");
  const posts = document.querySelectorAll(".post-line");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const category = chip.dataset.category;

      // Active chip styling
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      posts.forEach(post => {
        const categories = post.dataset.categories || "";

        if (category === "all" || categories.includes(category)) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }
      });
    });
  });
});
