document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const specialtyFilter = document.getElementById("specialty");
    const counselors = document.querySelectorAll(".counselor-card");

    function filterCounselors() {
        const searchText = searchInput.value.toLowerCase();
        const selectedSpecialty = specialtyFilter.value.toLowerCase(); // Convert to lowercase

        counselors.forEach((counselor) => {
            const name = counselor.querySelector("h3").innerText.toLowerCase();
            const specialties = counselor.dataset.specialty.toLowerCase(); // Get specialty from data attribute

            const matchesSearch = name.includes(searchText);
            const matchesSpecialty = selectedSpecialty === "" || specialties.includes(selectedSpecialty);

            if (matchesSearch && matchesSpecialty) {
                counselor.style.display = "block";
            } else {
                counselor.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterCounselors);
    specialtyFilter.addEventListener("change", filterCounselors);
});
