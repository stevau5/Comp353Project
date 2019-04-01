
// initialize highlight.js
hljs.initHighlightingOnLoad();

// list of predefined queries
var queries = [
    '/*Get detail of all books in the Bookstore.*/\nselect isbn, title, qoh, qty_sold, edition, price, authors, name, publishers.name from books, publishers \nwhere publisher_id = publishers.id;',
    '/*Get detail of all books that are back order.*/\nselect * from books, (select isbn from book_orders) as back_orders where books.isbn = back_orders.isbn;',
    '/*Get detail of all the special orders for a given customer.*/\nselect concat(customer_id, date_created) as confirmation_number,customer_id, date_created from customer_requests where customer_id = 12;',
    '/*Get detail of all purchases made by a given customer.*/\nselect employee_id, books.title, sales.isbn, sale_date, sales.price, quantity FROM sales, books \nwhere customer_id =14 and sales.isbn = books.isbn;',
    '/*Get detail of all the sales made by a given employee on a specific date.*/\nSELECT * FROM sales where employee_id = 4 and sale_date like "2019-03-18%";',
    '/*Get details of all purchases made.*/\nselect price, sale_date, sales.isbn, employee_id, quantity, customers.user_id as customer_id from sales,customers \nwhere sales.customer_id = customers.user_id;',
    '/**/\nSelect sum(sales.price) as price_sum, query1.customer_id from sales, \n(select customer_requests.customer_id as customer_id, isbn from customer_requests, book_customer_requests \nwhere book_customer_requests.customer_id = customer_requests.customer_id  and customer_requests.date_created like "2019%") as query1 \nwhere query1.isbn = sales.isbn and query1.customer_id = sales.customer_id group by query1.customer_id;',
    '/*List every book ordered but not received within the period set has passed.*/\nselect books.title, book_orders.order_id from book_orders, books,shipments,orders \nwhere books.isbn = book_orders.isbn and shipments.order_id = orders.id and book_orders.order_id = orders.id and DATEDIFF(SUBSTRING(shipments.shipment_date, 1, 11),SUBSTRING(order_date, 1, 11)) > 14 ;',
    'select * from users;',
    'select * from customers;',
    'select * from employees;',
    'select * from sales;',
    'select * from books;',
    'select * from orders;',
    'select * from branches;',
    'select * from shipments;',
    'select * from publishers;',
    'select * from customer_requests;',
    'select * from book_orders;',
    'select * from book_customer_requests;'
];

function formatCell(k, v) {
    if(k.indexOf('price') !== -1 && isNaN(v) === false)
        return '$'+parseFloat(v).toFixed(2);
    else if(k.indexOf('password') !== -1)
        return 'hidden';
}

function strip_HTML_tags(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}

function process_query(index) {
    var query = index >= 0 ? queries[index] : $('#div-user-query pre code').html();
    axios.post(App.root_dir+'/api/db_test.php?p=query', { 'query': strip_HTML_tags(query) }).then(res => {
        $div_results = index >= 0 ? $('#div-queries .results:nth-of-type(' + (Number(index)+1) + ')') : $('#div-user-query .results');
        $div_results.html('<div class="text-center p-2"><div class="spinner-border text-dark"></div></div>');

        if(res.data) {
            if (res.data.status == 200) {
                var result;
                if(res.data.data.results) {
                    var table_html = App.arrayToTable(res.data.data.results, {'table':'table mb-0', 'thead':'thead-dark', 'tr td, tr th':''}, formatCell);
                    var $tbody = $(table_html).find('tbody');
                    if($tbody.children().length == 0)
                        $tbody.append('<tr><td class="text-center"> no results... </td></tr>');

                    result = table_html;
                }
                else if(res.data && res.data.status == 200 && res.data.data.msg)
                    result = '<div class="alert alert-success mb-0"><strong>Message: </strong> '+res.data.data.msg+'</div>';

                $div_results.hide().html(result).fadeIn(1000);
            }
            else if(res.data.status != 200)
                $div_results.hide().html('<div class="alert alert-danger mb-0"><strong>Error: </strong> '+res.data.msg+'</div>').fadeIn(1000);
        }
    }).catch(error => {
        $div_results = index >= 0 ? $('#div-queries .results:nth-of-type(' + (Number(index)+1) + ')') : $('#div-user-query .results');
        var msg = error.response && error.response.data && error.response.data.msg ? error.response.data.msg : 'There was a problem with the api request.';
        console.log('Error: '+msg);
        $div_results.hide().html('<div class="alert alert-danger mb-0"><strong>Error: </strong> '+msg+'</div>').fadeIn(1000);
    });
}


$(document).ready(() => {
    $('#btn-execute-query').click(()=> {
        var div_code = document.querySelector('#div-user-query pre code');
        if(str = strip_HTML_tags(div_code.innerHTML))
            document.querySelector('#div-user-query pre code').innerHTML = str;
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
