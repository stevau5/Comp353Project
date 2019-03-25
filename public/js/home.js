
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
            '<div class="results table-responsive shadow"></div>' +
            '<br />'
        );
        hljs.highlightBlock($('#div-queries pre:nth-of-type(' + Number(k+1) + ') code')[0]);

        axios.post(App.root_dir+'/api/db_test.php?p=query', { 'query': queries[k] }).then(res => {
            if (res.data && res.data.status == 200) {
                var table_html = App.arrayToTable(res.data.data, {'table':'table mb-0', 'thead':'thead-dark', 'tr td, tr th':'text-center'}, formatCell);
                $('#div-queries .results:nth-of-type(' + Number(k+1) + ')').html(table_html);
            }
            else if(res.data && res.data.status != 200)
                $('#div-queries .results:nth-of-type(' + Number(k+1) + ')').html('<strong>Error: </strong> ' + res.data.msg);
        }).catch(error => {
            console.log(error);
            $('#div-queries .results:nth-of-type(' + Number(k+1) + ')').html('<strong>Error: </strong> There was a problem with the api request');
        });
    }
});
