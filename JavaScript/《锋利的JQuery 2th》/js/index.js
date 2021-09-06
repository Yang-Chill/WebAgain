$(document).ready(function() {

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
    
})