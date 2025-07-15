 var screen = document.getElementById("screen");
        var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var width = window.innerWidth;
        var height = window.innerHeight;
        var elems = [];
        var N = 40;
        var rad = 0;
        var radm = Math.min(pointer.x, pointer.y) - 20;
        var frm = Math.random();

        for (var i = 0; i < N; i++) {
            elems[i] = { use: null, x: width / 2, y: 0 };
        }

        function prepend(use, i) {
            var elem = document.createElementNS("http://www.w3.org/2000/svg", "use");
            elems[i].use = elem;
            elem.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + use);
            screen.prepend(elem);
        }

        for (var i = 1; i < N; i++) {
            if (i === 1) prepend("Cabeza", i);
            else if (i === 8 || i === 14) prepend("Aletas", i);
            else prepend("Espina", i);
        }

        function run() {
            requestAnimationFrame(run);
            var e = elems[0];
            var ax = Math.cos(3 * frm) * rad * width / height;
            var ay = Math.sin(4 * frm) * rad * height / width;
            e.x += (ax + pointer.x - e.x) / 10;
            e.y += (ay + pointer.y - e.y) / 10;

            for (var i = 1; i < N; i++) {
                var e = elems[i];
                var ep = elems[i - 1];
                var a = Math.atan2(e.y - ep.y, e.x - ep.x);
                e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
                e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
                var s = (162 + 4 * (1 - i)) / 50;
                e.use.setAttributeNS(
                    null,
                    "transform",
                    "translate(" + ((ep.x + e.x) / 2) + "," + ((ep.y + e.y) / 2) + ") rotate(" + ((180 / Math.PI) * a) + ") scale(" + s + "," + s + ")"
                );
            }

            if (rad < radm) rad++;
            frm += 0.003;
            if (rad > 60) {
                pointer.x += (width / 2 - pointer.x) * 0.05;
                pointer.y += (height / 2 - pointer.y) * 0.05;
            }
        }

        run();

        window.addEventListener("pointermove", function (e) {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
            rad = 0;
        });

        window.addEventListener("resize", function () {
            width = window.innerWidth;
            height = window.innerHeight;
        });