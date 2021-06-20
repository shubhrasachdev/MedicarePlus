$('.left .nav-link').click(function(){
    $('.left .active').removeClass('active highlight');
    $(this).addClass('active highlight');
});

$('.card a').click(function(){
    console.log($(this).attr("tgt"));

});