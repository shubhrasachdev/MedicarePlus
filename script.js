$('.left .nav-link').click(function(){
    $('.left .active').removeClass('active highlight');
    $(this).addClass('active highlight');
});

$('.card a').click(function(){
    let target = $(this).attr("tgt");
    $(".left .nav-link").filter(function() {
        return ($(this).text() == target);
    }).click();

});