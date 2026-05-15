document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("menu-img-dropdown");
    if (!dropdown) return;

    const hidden = document.getElementById("menu-img-value");
    const trigger = document.getElementById("menu-img-trigger");
    const list = document.getElementById("menu-img-list");
    const placeholder = trigger.querySelector(".image-dropdown__placeholder");
    const selected = trigger.querySelector(".image-dropdown__selected");
    const selectedImg = selected.querySelector("img");
    const selectedLabel = selected.querySelector(".image-dropdown__label");
    const options = list.querySelectorAll("[role='option']");

    const close = () => {
        list.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
    };

    const open = () => {
        list.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
    };

    const selectOption = (option) => {
        const value = option.dataset.value;
        const url = option.dataset.url;
        const label = option.querySelector("span")?.textContent || "";

        hidden.value = value;
        selectedImg.src = url;
        selectedImg.alt = label;
        selectedLabel.textContent = label;
        placeholder.hidden = true;
        selected.hidden = false;

        options.forEach((opt) => opt.setAttribute("aria-selected", opt === option ? "true" : "false"));
        close();
    };

    trigger.addEventListener("click", () => {
        if (list.hidden) open();
        else close();
    });

    options.forEach((option) => {
        option.addEventListener("click", () => selectOption(option));
        option.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectOption(option);
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
});
