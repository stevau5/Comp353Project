
// initialize highlight.js
hljs.initHighlightingOnLoad();

// list of predefined queries
var queries = [
    'select * from employees;',
    'select * from departments;'
];

function formatCell(k, v) {
    if(k == 'gender') {
        if(v == 'm') return '<i class="fas fa-mars"></i>';
        else if (v == 'f') return '<i class="fas fa-venus"></i>';
        else return '<i class="fas fa-genderless"></i>';
    }
    else if(k.indexOf('price') !== -1 && isNaN(v) === false)
        return '$'+parseFloat(v).toFixed(2);

}

function process_query(index) {
    var query = index >= 0 ? queries[index] : $('#div-user-query pre code').html();
    axios.post(App.root_dir+'/api/db_test.php?p=query', { 'query': query }).then(res => {
        $div_results = index >= 0 ? $('#div-queries .results:nth-of-type(' + (Number(index)+1) + ')') : $('#div-user-query .results');
        $div_results.html('<div class="text-center p-2"><div class="spinner-border text-dark"></div></div>');

        if (res.data && res.data.status == 200) {
            var result;
            if(res.data.data.results) {
                var table_html = App.arrayToTable(res.data.data.results, {'table':'table mb-0', 'thead':'thead-dark', 'tr td, tr th':''}, formatCell);
                var $tbody = $(table_html).find('tbody');
                if($tbody.children().length == 0)
                    $tbody.append('<tr><td class="text-center"> no results... </td></tr>');

                result = table_html;
            }
            else if(res.data.data.msg)
                result = '<div class="alert alert-success mb-0"><strong>Message: </strong> '+res.data.data.msg+'</div>';

            $div_results.hide().html(result).fadeIn(1000);
        }
        else if(res.data && res.data.status != 200)
            $div_results.hide().html('<strong>Error: </strong> ' + res.data.msg).fadeIn(1000);
    }).catch(error => {
        $div_results = index >= 0 ? $('#div-queries .results:nth-of-type(' + (Number(index)+1) + ')') : $('#div-user-query .results');
        var msg = error.response && error.response.data && error.response.data.msg ? error.response.data.msg : 'There was a problem with the api request.';
        console.log('Error: '+msg);
        $div_results.hide().html('<div class="alert alert-danger mb-0"><strong>Error: </strong> '+msg+'</div>').fadeIn(1000);
    });
}


$(document).ready(() => {
    $('#btn-execute-query').click(()=> {
        hljs.highlightBlock(document.querySelector('#div-user-query pre code'));
        process_query(-1);
    });

    for(var k in queries) {
        $('#div-queries').append(
            '<pre data-index='+k+'><code class="sql">' +
            (Number(k)+1) + '. ' + queries[k] +
            '<button class="rerun btn btn-sm btn-primary button"><i class="fas fa-sync-alt"></i></button>' +
            '</code></pre>' +
            '<div class="results table-responsive shadow"><div class="text-center p-2"><div class="spinner-border text-dark"></div></div></div>' +
            '<br />'
        );
        hljs.highlightBlock(document.querySelector('#div-queries pre:nth-of-type(' + (Number(k)+1) + ') code'));
        $('#div-queries pre:nth-of-type(' + (Number(k)+1) + ') code button.rerun').click({index: k}, (event) => { process_query(event.data.index); });
        process_query(k);
    }
});
