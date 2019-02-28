
// extend functionality of javascript

if (!Date.prototype.getMonthText) {
    Date.prototype.getMonthText = function(monthNameLength) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var months_short = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        if(monthNameLength == "short")
            return months_short[this.getMonth()];
        else
            return months[this.getMonth()];
    };
}

if (!Date.prototype.getFormatedDate) {
    Date.prototype.getFormatedDate = function() {
        var yearStr = this.getFullYear();
        var monthStr = (this.getMonth() < 10 ? "0"+(this.getMonth()+1) : this.getMonth()+1);
        var dayStr = (this.getDate() < 10 ? "0"+this.getDate() : this.getDate());
        return (yearStr+"-"+monthStr+"-"+dayStr);
    };
}

// Shims
// ...

// Polyfills
// ...
