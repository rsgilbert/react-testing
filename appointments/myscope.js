var obj = {
    count: 0,
    cool: function coolFn() {
        var self = this;
        if (this.count < 1) {
            setTimeout(function timer() {
                this.count++;
                console.log("awesome");
            }, 100);
        }
    }
}
obj.cool(); // awesome
