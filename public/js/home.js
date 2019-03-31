
// initialize highlight.js
hljs.initHighlightingOnLoad();

$(document).ready(() => {
    // list of queries
    var queries = [
        'select * from employees;'
    ];

    var formatCell = (k, v) => {
        if(k == 'gender') {
            if(v == 'm') return '<i class="fas fa-mars"></i>';
            else if (v == 'f') return '<i class="fas fa-venus"></i>';
            else return '<i class="fas fa-genderless"></i>';
        }
        else if(k.indexOf('price') !== -1 && isNaN(v) === false)
            return '$'+parseFloat(v).toFixed(2);

    };

    for(var k in queries) {
        $('#div-queries').append(
            '<pre><code class="sql">' + Number(k+1) + '. ' + queries[k] + '</code></pre>' +
            '<div class="results table-responsive shadow"><div class="text-center p-2"><div class="spinner-border text-dark"></div></div></div>' +
            '<br />'
        );
        hljs.highlightBlock($('#div-queries pre:nth-of-type(' + Number(k+1) + ') code')[0]);

        axios.post(App.root_dir+'/api/db_test.php?p=query', { 'query': queries[k] }).then(res => {
            if (res.data && res.data.status == 200) {
                var table_html = App.arrayToTable(res.data.data, {'table':'table mb-0', 'thead':'thead-dark', 'tr td, tr th':''}, formatCell);
                var $tbody = $(table_html).find('tbody');
                if($tbody.children().length == 0)
                    $tbody.append('<tr><td class="text-center"> no results... </td></tr>')
                $('#div-queries .results:nth-of-type(' + Number(k+1) + ')').hide().html(table_html).fadeIn(1000);
            }
            else if(res.data && res.data.status != 200)
                $('#div-queries .results:nth-of-type(' + Number(k+1) + ')').hide().html('<strong>Error: </strong> ' + res.data.msg).fadeIn(1000);
        }).catch(error => {
            console.log(error);
            var msg = error.response && error.response.data && error.response.data.msg ? error.response.data.msg : 'There was a problem with the api request.';
            $('#div-queries .results:nth-of-type(' + Number(k+1) + ')').hide().html('<div class="alert alert-danger mb-0"><strong>Error: </strong> '+msg+'</div>').fadeIn(1000);
        });
    }
});
