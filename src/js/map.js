$(function(){
    var view__map = $('.view-map-btn');
    var map = $('#map');

    $(view__map).on('click', function(){
        $(map).css('z-index', 999);
    });
})
