$(document).ready(function() {
    var tableData = []

    var table = $('#myTable').DataTable({
        'processing': true,
        'ajax': {
            'url': 'http://127.0.0.1:5000/api/tickets',
        },
        'columns': [
            {"data": "title"},
            {"data": "description"},
            {"data": "client"},
            {"data": "product_area"},
            {"data": "priority"},
            {"data": "target_date"},
            {
                mRender: function(data, type, row) {
                    return '<a href="#"><span class="glyphicon glyphicon-pencil" data-id="' + row.id + '" id="btnEdit"></span></a> / <a href="#"><span class="glyphicon glyphicon-remove" data-id="' + row.id + '" id="btnDelete"></span></a>'
                }
            },
        ]
    });

    $('#myTable').on('click', 'span#btnDelete', function(){
        var shouldDelete = confirm('Are you sure you want to delete this record?')
        if (shouldDelete) {
            var id = $(this).attr('data-id');
            $.ajax({
                url: 'http://127.0.0.1:5000/api/tickets/' + id,
                type: 'DELETE',
                success: function(result) {
                    table.ajax.reload(null, false);
                }
            })
        }

    });

    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i) {
            indexed_array[n['name']] = n['value']
        });

        return indexed_array;
    }

    $('#btnAddNewFeatureRequest').click( function() {
        var jsonBody = getFormData($("#formCreateTicket"));
        
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/tickets',
            data: JSON.stringify(jsonBody),
            success: function(result) {
                /** $('#addFeatureRequestModal').modal('hide');
                table.ajax.reload(null, false);*/
                location.reload();
            }
        })
    });
});
