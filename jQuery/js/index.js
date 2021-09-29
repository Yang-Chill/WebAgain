// const $j = jQuery.noConflict();

$(function () {

    let $c = $("#containner");
    console.log($c);

    // jQuery -> DOM
    let c1 = $c.get(0);
    console.log(c1);
    // jQuery -> DOM
    let c2 = $c[0];
    console.log(c2);
    // DOM -> jQuery
    $c = $(c1);
    console.log($c);

    let img = $(".pic")
    .attr({
        src: "https://learn.jquery.com/jquery-wp-content/themes/jquery/content/donate.png",
        alt: 'jquery icon'
    }).mouseenter(function (e) {
        $(this).toggle(1000,'linear');
        setTimeout(() => {
            $(this).toggle(1000, 'swing');
        }, 1000);
        /* $(this).hide(1000, 'linear');
        setTimeout(() => {
            $(this).show(1000, 'swing');
        }, 1000); */
    });

    $('#btn')
        .mouseenter(function (e) {
            $(this).addClass('red');
        })
        .mouseleave(function (e) {
            $(this).removeClass('red');
        })
        /* .dblclick(function (event) {
            event.preventDefault();
            alert("double click!");
        }) */
        .click(function (event) {
            console.log(img[0].style);
            /* if (img[0].style.display === 'none') {
                img.fadeIn();
            } else {
                img.fadeOut();
            } */
            img.fadeToggle();
        })

    

    console.log(img.length);

    console.log($("p").has("p"));
    console.log($("p").not(".b"));
    console.log($("p").filter(".c"));
    console.log($("p").first());
    console.log($("p").eq(2));

    console.log($("input"))


});