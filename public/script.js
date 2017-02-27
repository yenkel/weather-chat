var fetch = function() {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + $(".city-name").val() + "&appid=d703871f861842b79c60988ccf3b17ec",
        dataType: "json",
        success: function(data) {

            console.log(data);

            addInfo(data);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("hello");
        }
    });
};

$(".temp").on("click", function() {
    fetch();
});

var currentdate = new Date();
var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + " on " +
    currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();



var addInfo = function(data) {
    var source = $("#cities-template").html();
    var template = Handlebars.compile(source);
    var newHTML = template({
        city: data.name,
        celsius: Math.round(data.main.temp - 273.15),
        fahrenheit: Math.round(data.main.temp * (9 / 5) - 459.67),
        datetime: datetime
    });

    $(".cities").append(newHTML);
};

var comments = [];

var addComment = function(text) {
    comments.push(text);
}
var renderComments = function() {
    $(".comments").append(comments[0]);

}

$(".comment").on("click", function() {
    var text = $(".text-comment").val();
    addComment();
    renderComments();
});
