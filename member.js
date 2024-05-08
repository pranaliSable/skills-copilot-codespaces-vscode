function skillsmember() {
    var id = document.getElementById('memberid').value;
    var url = "skills.php?memberid=" + id;
    window.open(url, "_self");
}