class Swipe {

	constructor(container, options={}) { 
        if ((options) && (options.debug)) console.log("Swipe(%s)...", JSON.stringify(constructor, JSON.stringify(options)));

        // Validate container...
        if (typeof container == 'string') container = document.getElementById(container);
        if (!container) throw "Swipe: bad or missing container specification";

        // Validate options.callback...
        if ((options.callback) && (typeof options.callback != 'function')) throw "Swipe: callback is not a function (options.callback)";

        // Validate options.left-button...
        //if ((options.left-button) && (typeof options.left-button == 'string')) options.left-button = document.getElementById(options.left-button);

        // Validate options.right-button...
        //if ((options.right-button) && (typeof options.right-button == 'string')) options.right-button = document.getElementById(options.right-button);

        // Validate options.sensitivity...
        if (!options.sensitivity) options.sensitivity = 200;
        
        this.container = container;
        this.options = options;
        this.touch = { startX: 0, startY: 0, endX: 0, endY: 0 };

        [...this.container.children].forEach(child => child.classList.add('hidden'));
        this.container.firstElementChild.classList.remove("hidden");

        document.addEventListener('touchstart', function(event) {
            this.touch.startX = event.changedTouches[0].screenX;
            this.touch.startY = event.changedTouches[0].screenY;
        }.bind(this), false);

        document.addEventListener('touchend', function(event) {
            this.touch.endX = event.changedTouches[0].screenX;
            this.touch.endY = event.changedTouches[0].screenY;
            this.handleGesture();
        }.bind(this), false); 

        if (this.options.left) this.options.left.addEventListener('click', this.swipeLeft);
        if (this.options.right) this.options.right.addEventListener('click', this.swipeRight);
    }

    handleGesture() {
        if (this.options.debug) console.log("Swipe.handleGesture()...");

        if ((this.touch.endX < this.touch.startX) && (this.touch.startX - this.touch.endX) > this.options.sensitivity) this.swipeLeft();
        if ((this.touch.endX > this.touch.startX) && (this.touch.endX - this.touch.startX) > this.options.sensitivity) this.swipeRight();
    }

    swipeLeft() {
        if (this.options.debug) console.log("Swipe.swipeLeft()...");
    }

    swipeRight() {
        if (this.options.debug) console.log("Swipe.swipeRight()...");

        if ((!this.options.callback) || (this.options.callback(this.touch))) {
            var target = -1;
            var children = this.container.children;
            for (var i = 0; i < children.length; i++) {
                if (!children[i].classList.contains("hidden")) { target = i; children[i].classList.add("hidden"); }
            }; 
            children[(((target + 1) < children.length)?(target + 1):0)].classList.remove("hidden");
        }
    }

}
