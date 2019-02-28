
// initialize highlight.js
hljs.initHighlightingOnLoad();

$(document).ready(() => {
    try {
        axios.get(App.root_dir+'/api/example.php').then(res => {
            if (res.data) {
                var response = res.data;
                $('#output').html(JSON.stringify(response, null, 2));
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    catch(error) {
        console.error(error);
    }
});
