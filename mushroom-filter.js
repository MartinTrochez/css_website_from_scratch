const cards = document.querySelectorAll(".mushroom-guide .card")
const seasonalFilter = document.querySelector("#season")
const edibleFilter = document.querySelector("#edible")
const noResultsMessage = document.querySelector(".no-results-message");

const currentFilter = {
    season: "all",
    edible: "all",
}

for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    const mushroomId = `mushroom-${index + 1}`
    card.style.viewTransitionName = `card-${mushroomId}`
}

seasonalFilter.addEventListener("change", updateFilter)
edibleFilter.addEventListener("change", updateFilter)

function updateFilter(e) {
    const filterType = e.target.name
    currentFilter[filterType] = e.target.value

    if (!document.startViewTransition()) {
        filterCards()
        return
    }

    document.startViewTransition(() => { filterCards() })
}

function filterCards() {
    let anyVisible = false;

    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];

        const season = card.querySelector("[data-season]").dataset.season
        const edible = card.querySelector("[data-edible]").dataset.edible

        const matchesSeason = (currentFilter.season === "all")
            || (season === currentFilter.season)
        const matchesEdible = (currentFilter.edible === "all")
            || (edible === currentFilter.edible)

        const show = matchesSeason && matchesEdible
        card.hidden = !show
        if (show) anyVisible = true
    }

    noResultsMessage.hidden = anyVisible
}

function enableFiltering() {
    seasonalFilter.hidden = false
    edibleFilter.hidden = false
}

enableFiltering()
