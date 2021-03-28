const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px"
    
};
const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    })
},
    appearOptions);


faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});

function GetFile() {
    window.open('/Resume.pdf');  
}; 

/*Start Ajax for Github api*/
$(document).ready(function () {
    var source = '/Home/UserProfile';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: source,
        success: showProfile,
        error: errorOnAjax
    });

    var urls = '/Home/UserRepo';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: urls,
        success: UserReposite,
        error: errorOnAjax
    });


});


function showProfile(data) {
    console.log(data);
    $('#fullName').text(data.fullName);
    $('#nameLink').attr("href", data.html_url);
    $('#userName').text(data.userName);
    $('#email').text(data.email);
    $('#school').text(data.company);
    $('#schoolLocation').text(data.Location);
    $('#profilePic').attr("src", data.myPic);




}

function UserReposite(data) {

    console.log(data);

    for (var i = 0; i < data.length; ++i) {
        $('#thePlot').append($('<div class="col-md-6" id="col-6"><a href="' + data[i].HtmlUrl + '" style="width:100%;"><h3>' + data[i].reposName + '</h3></a>'
            + '<h4>' + data[i].Owner + '</h4>'
            + '<h4>' + data[i].LastModified + '</h4>'
            + '<img style="height: 100px; width: 100px;" src="' + data[i].OwnerPic + '" alt="Profile Pictures"></br></br>'
            + '<a href="#commitsDiv" class="btn bg-primary" onclick="commitsFunction(\'' + data[i].Owner + '\',\'' + data[i].reposName + '\')">Show Commits</a></br></br></div>'));

    }
}
function displayTable(data) {
    console.log(data);
    //alert(data.length);
    $("td").empty();
    $("tr").empty();
    $("#header").empty();

    $('#header').append($('<th>SHA</th>'));
    $('#header').append($('<th>Time Stamp</th>'));
    $('#header').append($('<th>Committer Name</th>'));
    $('#header').append($('<th>Commit Message</th>'));


    /*<tr id="shaRow">
    <tr id="timeRow">
    <tr id="committerRow">
    <tr id="MessageRow">*/


    for (var i = 0; i < data.length; ++i) {
        //$("strong")
        var str = data[i].Sha;
        var shortIt = str.slice(0, 9);
        //HtmlUrl
        $('.table').append($('<tr><td><a href="' + data[i].HtmlUrl + '"><div style="height:100%;width:100%;">' + shortIt + '</div></a></td><td>' + data[i].TimeStamp + '</td><td>' + data[i].Committer + '</td><td>' + data[i].CommitMessage + '</td></tr>'));
        /*$('#lists').append($('<tr>' + data[i].TimeStamp + '</tr>'));
        $('#lists').append($('<tr>' + data[i].Committer + '</tr>'));
        $('#lists').append($('<tr>' + data[i].CommitMessage + '</tr>'));*/


    }
    $('#commits').append($('<br />'));
    $('#commits').append($('<br />'));
    $('#commits').append($('<br />'));
    $('#commits').append($('<br />'));
}
function commitsFunction(userName, repoName) {

    var source = '/Home/Commits?user=' + userName + '&repo=' + repoName;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: source,
        success: displayTable,
        error: errorOnAjax
    });

    var x = document.getElementById("history-lable");
    x.style.display = "block";


}

function errorOnAjax() {
    console.log('Error on AJAX return');
}

/*End Ajax for Github api*/


function myFunction1() {
    var x = document.getElementById("history-lable");
    x.style.display = "block";
}