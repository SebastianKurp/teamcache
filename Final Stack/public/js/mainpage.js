function toggleFavorite(myelement) {
    if (myelement.style.color != "red") {
        myelement.style.color = "red";
        //add item to user favorites here once connected to db.
    }
    else {
        myelement.style.color = "white";
        //remove item from user favorites here once connected to db.
    }
}


function displayFileUpload() {
    document.getElementById("file").setAttribute("style", "display: inline-block");
}

var fileClose = document.getElementById("file-close");
fileClose.onclick = function () {
    document.getElementById("file").setAttribute("style", "visibility: hidden");
}

document.getElementById("fileName").onchange = function (evt) {
    var target = evt.target || window.event.srcElement, files = target.files;

    if (FileReader && files && files.length) {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById("profileImg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
        document.getElementById("file").setAttribute("style", "visibility: hidden");
    } else {
        alert("File not supported");
    }
}

/*Nav-Bar*/

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


