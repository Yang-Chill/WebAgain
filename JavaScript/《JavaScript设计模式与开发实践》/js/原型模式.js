function test1() {

    let Plane = function() {
        this.blood  = 100;
        this.attack = 500;
        this.defense = 200;
    }

    let plane = new Plane();
    plane.blood = 80;
    plane.attack = 520;
    plane.defense = 250;

    let shadowPlane = Object.create(plane);
    console.log(shadowPlane);

}
test1();