//sets name and id to favorites list  
function setFavorites() {
    var favoriteBeaches = {name: beachName, id: beachID};
    console.log(favoriteBeaches);
    localStorage.setItem("favorites", JSON.stringify(favoriteBeaches));
console.log("click");
}

function getFavorites() {
    var favoriteBeaches = JSON.parse(localStorage.getItem("favorites"));
    var h2El = document.createElement("h2")
    $(h2El).text("Favorite Beaches");
    $(h2El).attr("class","title is-4")
    var ulEl = document.createElement("Ul")
    $(ulEl).attr("class","menu-list")
    for (i = 0; i < favoriteBeaches.length; i++) {
        var beachName = favoriteBeaches.name[i];
        var idBeach = favoriteBeaches.id[i];
        var liEl = document.createElement("li");
        $(liEl).text(beachName);
        $(liEl).attr("id", idBeach);
        liEl.addEventListener("click", clickedBeach);
        ulEl.append(liEl);
}
$("#favoriteBox").html("");
$("#favoriteBox").append(h2El);
$("#favoriteBox").append(ulEl);

$('.beachInfoDiv').on("click","#favorites", setFavorites);
