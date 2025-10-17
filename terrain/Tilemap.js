class Controller {
    constructor(du, dd, dl, dr, a, b, x, y, l, r, su, sd, sl, sr) {
        this.dpadUp = du
        this.dpadDown = dd
        this.dpadLeft = dl
        this.dpadRight = dr
        this.a = a
        this.b = b
        this.x = x
        this.y = y
        this.l = l
        this.r = r
        this.stickUp = su
        this.stickDown = sd
        this.stickLeft = sl
        this.stickRight = sr
    }
}
class Tilemap {
    constructor(element, mapString, posX, posY) {
        this.element = element
        this.map = mapString
        this.posX = posX
        this.posY = posY
    }
    start() {
        this.element.innerHTML = "";
        this.element.innerHTML += `<style>
body {
    background: black;
    overflow-x: hidden;
    overflow-y: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
}
img {
    width: ${screen.width/32}px;
    user-drag: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
    margin: 0px;
    padding: 0px;
}
.tilemap-container {
    image-rendering: crisp-edges;
    font-size: 0;
    perspective: 500px;
    perspective-origin: 50% 50%;
}
.tilemap {
    transform-style: preserve-3d;
    width: ${screen.width*2}px;
}
.layer {
    transform-style: preserve-3d;
    position: fixed;
    width: ${screen.width*2}px;
    margin: 0px;
    padding: 0px;
}
</style>
<style id='adjust-styles'></style>`;
    }
    image(path) {
        return `<img src='${path}' />`;
    }
    layerImage(path) {
        return `<img class='layer-img' src='${path}' />`;
    }
    draw() {
        var mapSplit = this.map.split("\n");
        var mapHTML = "<div class='tilemap-container'><div class='tilemap'>";
        for (var a = 0; a < mapSplit.length; a++) {
            mapHTML += "<div class='layer'>";
            var row = mapSplit[a];
            for (var c = 0; c < row.length; c++) {
                var char1 = row[c];
                if (char1 == "h") {
                    mapHTML += this.layerImage("tree-stretched.png");
                } else {
                    mapHTML += "<img />";
                }
            }
            mapHTML += "</div><div class='row'>";
            for (var b = 0; b < row.length; b++) {
                var char = row[b];
                if (char == "g") {
                    mapHTML += this.image("emerald-grass.png");
                } else if (char == "h") {
                    mapHTML += this.image("emerald-grass.png");
                } else if (char == "i") {
                    mapHTML += this.image("emerald-grass-tall.png");
                } else if (char == "j") {
                    mapHTML += this.image("ocean.png");
                } else {
                    mapHTML += "<img />";
                }
            }
            mapHTML += "</div>";
        }
        mapHTML += "</div></div>";
        this.element.innerHTML += mapHTML;
    }
    sinDegrees(angleDegrees) {
        return Math.sin(angleDegrees * Math.PI / 180);
    }
    cosDegrees(angleDegrees) {
        return Math.cos(angleDegrees * Math.PI / 180);
    }
    control() {
        var x = screen.width/32*15;
        var y = screen.width/32*0;
        var z = 50;
        var r = 45;
        var s = 0;
        var distance = 1;
        var q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
        var ql = `.layer{transform: rotateX(${360-r-10}deg) translateY(-42px);}`;
        var qm = `${x}px ${y}px`;
        const tilemap = document.querySelector(".tilemap");
        const adjustStyles = document.querySelector("#adjust-styles");
        adjustStyles.innerHTML = ql;
        //container.style.paddingLeft = String(x)+"px";
        // Edit to p if q doesn't work
        tilemap.style.transform = q;
        //tilemap.style.transformOrigin = qm;
        document.addEventListener("keydown", (Event) => {
            // Dpad
            if (Event.key === "ArrowLeft") {
                x -= screen.width/32;
                //container.style.paddingLeft = String(x)+"px";
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "ArrowRight") {
                x += screen.width/32;
                //container.style.paddingLeft = String(x)+"px";
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "ArrowDown") {
                y += screen.width/32;
                //p = `rotateX(60deg) translateY(${-y}px)`;
                //tilemap.style.transform = p;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "ArrowUp") {
                y -= screen.width/32;
                //p = `rotateX(60deg) translateY(${-y}px)`;
                //tilemap.style.transform = p;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            }
            if (Event.key === "t") {
                r -= 1;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                adjustStyles.innerHTML = ql;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "g") {
                r += 1;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                adjustStyles.innerHTML = ql;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "f") {
                //distance = Math.sqrt(x**2+y**2);
                s += 1;
                //x = Math.cosDegrees(s)*distance;
                //y = Math.sinDegrees(s)*distance;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                adjustStyles.innerHTML = ql;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "h") {
                s -= 1;
                //x = Math.cosDegrees(s)*distance;
                //y = Math.sinDegrees(s)*distance;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                adjustStyles.innerHTML = ql;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            }
            if (Event.key === "v") {
                z += 5;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            } else if (Event.key === "b") {
                z -= 5;
                q = `rotateX(${r}deg) rotateZ(${s}deg) translateX(${-x}px) translateY(${-y}px) translateZ(-${z}px)`;
                tilemap.style.transform = q;
                qm = `${x}px ${y}px`;
                //tilemap.style.transformOrigin = qm;
            }
        });
    }
}