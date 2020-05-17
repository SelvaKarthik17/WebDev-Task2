var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var dy = 0;
var outs = document.getElementById("mout");
var clicks = document.getElementById("mclick");
var flag = 0; //keypress
var f = [0, 0]; //corect color indicator
var n = [3, 3];
var cn = [0, 0];
var d = [0, 0]; //wrong collision
var score = document.getElementById("s");
score.innerHTML = null;
var out = 0;
var reset = document.getElementById("rt");
reset.innerHTML = null;
var gameover = document.getElementById("go");
go.innerHTML = null;

if (localStorage.length == 0) {
    localStorage.setItem("bestscore", 0);
}
var bs = document.getElementById("b");
bs.innerHTML = parseInt(localStorage.getItem("bestscore"));

var start = document.getElementById("st");
start.innerHTML = "Start";
var s = 0;
var color1 = ["red", "blue", "purple", "black", "grey"];
var color2 = ["brown", "green", "orange", "yellow", "violet"];
var c1 = null;
var r1 = null;
var r2 = null;

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.r = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fillStyle = c1;
        c.fill();
    }
    this.update = function () {

        if (flag == 0) {
            if (cn[i] == 0) {
                if (this.y < 600) {
                    this.y += dy;
                    dy += 0.08;
                    this.draw();
                } else if (this.y = 600) {
                    this.y = 600;
                    dy = 0;
                    this.draw();
                }
            } else {
                if (d[i] == 0) {
                    if (this.y < 600) {
                        this.y += dy;
                        dy += 0.08;
                        this.draw();
                    } else if (this.y = 600) {
                        this.y = 600;
                        dy = 0;
                        this.draw();
                    }
                } else if (d[i] == 1) {

                    this.y = 1000;
                    this.draw();
                    out = 1;
                    d[i] = 0;
                }
                cn[i] = 0;
            }
            if (i > 0) {
                if (cn[i - 1] == 0) {
                    if (this.y < 600) {
                        this.y += dy;
                        dy += 0.08;
                        this.draw();
                    } else if (this.y = 600) {
                        this.y = 600;
                        dy = 0;
                        this.draw();
                    }
                } else {
                    if (d[i - 1] == 0) {
                        if (this.y < 600) {
                            this.y += dy;
                            dy += 0.08;
                            this.draw();
                        } else if (this.y = 600) {
                            this.y = 600;
                            dy = 0;
                            this.draw();
                        }
                    } else if (d[i - 1] == 1) {

                        this.y = 1000;
                        this.draw();
                        out = 1;
                        this.y = 600;
                        d[i - 1] = 0;
                    }
                    cn[i - 1] = 0;
                }
            }

            if (i > 1) {
                if (cn[i - 2] == 0) {
                    if (this.y < 600) {
                        this.y += dy;
                        dy += 0.08;
                        this.draw();
                    } else if (this.y = 600) {
                        this.y = 600;
                        dy = 0;
                        this.draw();
                    }
                } else {
                    if (d[i - 2] == 0) {
                        if (this.y < 600) {
                            this.y += dy;
                            dy += 0.08;
                            this.draw();
                        } else if (this.y = 600) {
                            this.y = 600;
                            dy = 0;
                            this.draw();
                        }
                    } else if (d[i - 2] == 1) {

                        this.y = 1000;
                        this.draw();
                        out = 1;
                        d[i - 2] = 0;
                    }
                    cn[i - 2] = 0;
                }
            }

        } else {

            clicks.play();
            dy -= 5;
            this.y += dy;
            dy += 0.08;
            this.draw();
            flag = 0;
        }

    }

}

function Circle(h, k, r, cl1, cl2) {
    this.r1 = cl1;
    this.r2 = cl2;
    this.x = 0;
    this.h = h;
    this.k = k;
    this.r = r;
    this.drawcircle = function () {
        c.beginPath();
        c.arc(this.h, this.k, this.r, this.x - Math.PI, this.x);
        c.strokeStyle = color2[this.r2];
        c.lineWidth = 10;
        c.stroke();

        c.beginPath();
        c.arc(this.h, this.k, this.r, this.x, this.x + Math.PI);
        c.strokeStyle = color1[this.r1];
        c.lineWidth = 10;
        c.stroke();
        //console.log(x);
        this.x += 0.01;

    }
}
var obs = [];
var i = 0;

function generate() {
    ++i;
    r2 = Math.floor(Math.random() * 5);
    var temp = new Circle((window.innerWidth) / 2, (obs[i - 1].k - 400), 100, r1, r2);
    obs[i] = temp;
    console.log("created");
    f.push(0);
    n.push(3);
    cn.push(0);
    d.push(0);

}

start.onclick = function () {
    r1 = Math.floor(Math.random() * 5);
    c1 = color1[r1];
    r2 = Math.floor(Math.random() * 5);
    console.log(r2);
    var temp = new Circle((window.innerWidth) / 2, (window.innerHeight) / 3, 100, r1, r2);
    obs[i] = temp;
    s = 1;
    start.innerHTML = null;
    console.log(s);

    function cl() {
        window.addEventListener('click', function (moveball) {
            if (out == 0) {
                flag = 1;
            }
        });
    }
    window.setTimeout(cl, 1000);

}
var b = new Ball((window.innerWidth) / 2, (window.innerHeight / 1.5), 20);

function animation() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    requestAnimationFrame(animation);
    if (s == 1) {
        if (out == 0) {
            obs[i].drawcircle();
            if (obs[i].x < Math.PI / 2) {
                f[i] = 1;
            } else if (obs[i].x >= Math.PI / 2 && obs[i].x < n[i] * Math.PI / 2) {
                f[i] = 0;
            } else if (obs[i].x > n[i] * Math.PI / 2 && obs[i].x < (n[i] + 2) * Math.PI / 2) {
                f[i] = 1;
            } else if (obs[i].x > (n[i] + 2) * Math.PI / 2) {
                f[i] = 0;
                n[i] += 4;
            }
            if (i > 0) {
                obs[i - 1].drawcircle();
                if (obs[i - 1].x < Math.PI / 2) {
                    f[i - 1] = 1;
                } else if (obs[i - 1].x >= Math.PI / 2 && obs[i - 1].x < n[i - 1] * Math.PI / 2) {
                    f[i - 1] = 0;
                } else if (obs[i - 1].x > n[i - 1] * Math.PI / 2 && obs[i - 1].x < (n[i - 1] + 2) * Math.PI / 2) {
                    f[i - 1] = 1;
                } else if (obs[i - 1].x > (n[i - 1] + 2) * Math.PI / 2) {
                    f[i - 1] = 0;
                    n[i - 1] += 4;
                }
            }
            if (i > 1) {
                obs[i - 2].drawcircle();
                // 
                if (obs[i - 2].x < Math.PI / 2) {
                    f[i - 2] = 1;
                } else if (obs[i - 2].x >= Math.PI / 2 && obs[i - 2].x < n[i - 2] * Math.PI / 2) {
                    f[i - 2] = 0;
                } else if (obs[i - 2].x > n[i - 2] * Math.PI / 2 && obs[i - 2].x < (n[i - 2] + 2) * Math.PI / 2) {
                    f[i - 2] = 1;
                } else if (obs[i - 2].x > (n[i - 2] + 2) * Math.PI / 2) {
                    f[i - 2] = 0;
                    n[i - 2] += 4;
                }
            }
            b.update();
            // 
            function check(i) {
                if ((b.y + b.r) > (obs[i].k + obs[i].r) && (b.y - b.r) < obs[i].k + obs[i].r + 10) {
                    cn[i] = 1;
                    if (f[i] == 1) {
                        console.log("collide");
                        d[i] = 0;
                    } else {
                        outs.play();
                        d[i] = 1;
                    }

                } else if ((b.y + b.r) > obs[i].k - obs[i].r - 10 && (b.y - b.r) < obs[i].k - obs[i].r) {
                    cn[i] = 1;
                    if (f[i] == 0) {
                        console.log("up");
                        d[i] = 0;
                    } else {
                        outs.play();
                        d[i] = 1;
                    }
                } else {
                    cn[i] = 0;
                    d[i] = 0;
                }
            }
            check(i);
            if (i > 0) {
                check(i - 1);
            }
            if (i > 1) {
                check(i - 2);
            }
            if (b.y < obs[i].k) {
                generate();
                score.innerHTML = i;
            }

            if (b.y < 200 && dy < -1.5) {
                //mflag = 1;
                obs[i].k += 3;
                if (i > 0) {
                    obs[i - 1].k += 3;
                }
                if (i > 1) {
                    obs[i - 2].k += 3;
                }
            }

        } else if (out == 1) {

            if (score.innerHTML > parseInt(localStorage.getItem("bestscore"))) {
                localStorage.setItem("bestscore", score.innerHTML);
            }
            bs.innerHTML = parseInt(localStorage.getItem("bestscore"));
            this.y = 1000;
            reset.innerHTML = "Reset";
            gameover.innerHTML = "Game Over";
            reset.onclick = function () {
                out = 0;
                //i=0;
                let b = 0;
                for (b = 0; b < i + 1; ++b) {
                    obs[b] = null;
                }
                i = 0;
                reset.innerHTML = null;
                gameover.innerHTML = null;
                start.innerHTML = "Start";
                s = 0;
                window.addEventListener('click', null);
            }
        }
    }
}

animation();