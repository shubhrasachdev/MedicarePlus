$('.left .nav-link').click(function(){
    if($(this) == $('.left .active')) return;
    $('.left .active').removeClass('active highlight');
    $(this).addClass('active highlight');
});

$('.card a').click(function(){
    let target = $(this).attr("tgt");
    $(".left .nav-link").filter(function() {
        return ($(this).text() == target);
    }).click();

});