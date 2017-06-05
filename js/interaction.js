var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        location.href='index.html';
    }
}

function startModal() {
	document.getElementById('id01').style.display='block';
}
function cancelButton() {
	location.href='index.html';
}