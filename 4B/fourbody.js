/*
 * This a variant that relies on a center spring to pull the bodies back
 *
 */

let SPACE = 400;
let MASS = 10;
let bodies;
let BODY_COUNT = 3;

let padding = 16;
let c_width;
let c_height;

let center;

function setup() {
    c_width = windowWidth - padding;
    c_height = windowHeight - padding;
    createCanvas(c_width, c_height);
    background(0);
    bodies = new Bodies();
    center = createVector(c_width / 2, c_height / 2);
}

function draw() {
    // background(color(0, 0, 0, 5));

    bodies.display();
    bodies.move();
    bodies.apply_gravity();
    bodies.cental_spring();

    if (mouseIsPressed) { noLoop(); }

    /* Iterate a number of times before stopping - while testing */
    // if (frameCount > 50) { noLoop(); }
}


function nice_color () {
    let r = int(random(128)) + 128;
    let g = int(random(128)) + 128;
    let b = int(random(128)) + 128;

    return color(r, g, b,);
}


let Bodies = function() {
    this.bodies = [];
    for (b = 0; b < BODY_COUNT; b++) {
        this.bodies.push(new Body());
    }

    this.apply_gravity = function() {
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = 0; j < this.bodies.length; j++) {
                if (i == j) { continue; }
                let b1 = this.bodies[i];
                let b2 = this.bodies[j];
                let d = b1.position.copy();
                d.sub(b2.position);
                let g = (b2.mass / (d.mag() * d.mag())) * SPACE;
                g = max(min(1, g), 0.00001);
                d.normalize();
                d.mult(g);
                b1.velocity.sub(d);
            }
        }
    }

    this.cental_spring = function() {
        for (let i = 0; i < this.bodies.length; i++) {
            let b = this.bodies[i];
            let d = b.position.copy();
            d.sub(center.position);
            let g = max((d.mag() - SPACE / 2), 0) / SPACE
            g = max(min(2, g * g), 0);
            d.normalize();
            d.mult(g);
            b.velocity.sub(d);
        }
    }

    this.display = function() {
        for (let i = 0; i < this.bodies.length; i++) {
            let b = this.bodies[i];
            let pos = b.position.copy();
            pos.add(center);
            fill(b.color);
            stroke(color(0, 0, 0, 128));
            circle(pos.x, pos.y, b.mass);
        }
    }

    this.move = function() {
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].move();
        }
    }
}


let Body = function() {
    this.color = nice_color();
    this.position = createVector(SPACE * random(-0.5, 0.5), SPACE * random(-0.5, 0.5));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.mass = int(MASS * (1 + random(3)));

    this.display = function() {
        let x = this.position.x;
        let y = this.position.y;
        let m = this.mass;
        fill(this.color);
        circle(x, y, m);
    }

    this.move = function() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


/*
 * ---- End of Javascript ----
 */
