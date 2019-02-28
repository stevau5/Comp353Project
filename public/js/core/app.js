
const App = {

    env: 'dev',
    get root_dir() {
        return this.env == 'dev' ? '/Comp353Project' : '';
    },


    onReady: () => {
        $('header .navbar-toggler, header .sidenav-overlay').click(() => {
            $('header .sidenav').toggleClass('open');
        });
    },

    // converts a form to a json object with key-value pairs being [name]:[value] for every input within the form
	formToJson: function(selector) {
		var json = {};
		$(selector + " :input").not("[app-form-ignore], :button, :input[type=button], :input[type=submit], :input[type=reset]").each(function() {
			var propertyName = $(this).attr("name");

			var propertyValue = "";
			if($(this).is(":input[type=checkbox]"))
				propertyValue = $(this).is(":checked");
			else
				propertyValue = $(this).val();

			json[propertyName] = propertyValue;
		});
		return json;
	},

    // device info
    device: {
        // check if you are in a mobile browser
        isMobile: () => {
            return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
        },

        // check if touchEvent is enabled and working
        isTouchEnabled: () => {
            try { document.createEvent("TouchEvent"); return true; }
            catch(e) { return false; }
        }
    }
};

$(document).ready(() => {
    App.onReady();
});
