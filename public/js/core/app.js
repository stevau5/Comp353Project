
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
    formToJson: (selector) => {
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

    // converts an array of records to html table
    arrayToTable: (data, style_classes, cell_func) => {
        var table = $('<table></table>');
        var table_head = "<thead><tr>";
        for (var k in data[0])
            table_head += "<th>" + k + "</th>";
        table_head += "</tr></thead>";
        $(table).append(table_head);

        var tbody = "<tbody>";
        $.each(data, function (index, record) {
            var tr = "<tr>";
            $.each(record, function (key, val) {
                var computed_val = cell_func !== undefined ? cell_func(key, val) : undefined;
                tr += "<td>" + (computed_val === undefined ? val : computed_val) + "</td>";
            });
            tr += "</tr>";
            tbody += tr;
        });
        tbody += "</tbody>";
        $(table).append(tbody);

        $.each(style_classes, function (target, classes) {
            $(table).find(target).addBack(target).addClass(classes);
        });

        return table;
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
