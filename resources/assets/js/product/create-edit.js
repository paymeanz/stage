document.addEventListener('turbo:load', createEditProduct);

function createEditProduct() {
    loadSelect2Dropdown()
}

function loadSelect2Dropdown() {
    let categorySelect2 = $('#adminCategoryId');
    if (!categorySelect2.length) {
        return false;
    }

    if ($('#adminCategoryId').hasClass("select2-hidden-accessible")) {
        $('.select2-container').remove();
    }

    $('#adminCategoryId').select2({
        width: '100%',
    });
}

listenChange('#countryId', function () {
    $.ajax({
        url: route('states-list'),
        type: 'get',
        dataType: 'json',
        data: {countryId: $(this).val()},
        success: function (data) {
            $('#stateId').empty()
            $('#stateId').select2({
                placeholder: 'Select State',
                allowClear: false,
            })
            $('#stateId').append(
                $('<option value=""></option>').text('Select State'));
            $.each(data.data, function (i, v) {
                $('#stateId').append($('<option></option>').attr('value', i).text(v));
            });

            if ($('#isEdit').val() && $('#stateId').val()) {
                $('#stateId').val($('#stateId').val()).trigger('change');
            }
        },
    });
});

listenChange('#stateId', function () {
    $.ajax({
        url: route('cities-list'),
        type: 'get',
        dataType: 'json',
        data: {
            stateId: $(this).val(),
            country: $('#countryId').val(),
        },
        success: function (data) {
            $('#cityId').empty()
            $('#cityId').select2({
                placeholder: 'Select City',
                allowClear: false,
            });
            $.each(data.data, function (i, v) {
                $('#cityId').append($('<option></option>').attr('value', i).text(v));
            });

            if ($('#isEdit').val() && $('#cityId').val()) {
                $('#cityId').val($('#cityId').val()).trigger('change');
            }
        },
    });
});

listenChange('#billing_country_id', function () {
    $.ajax({
        url: route('states-list'),
        type: 'get',
        dataType: 'json',
        data: {countryId: $(this).val()},
        success: function (data) {
            $('#billing_state_id').empty()
            $('#billing_state_id').select2({
                placeholder: 'Select State',
                allowClear: false,
            })
            $('#billing_state_id').append(
                $('<option value=""></option>').text('Select State'));
            $.each(data.data, function (i, v) {
                $('#billing_state_id').append($('<option></option>').attr('value', i).text(v));
            });

            if ($('#isEdit').val() && $('#billing_state_id').val()) {
                $('#billing_state_id').val($('#billing_state_id').val()).trigger('change');
            }
        },
    });
});

listenChange('#billing_state_id', function () {
    $.ajax({
        url: route('cities-list'),
        type: 'get',
        dataType: 'json',
        data: {
            stateId: $(this).val(),
            country: $('#billing_country_id').val(),
        },
        success: function (data) {
            $('#billing_city_id').empty()
            $('#billing_city_id').select2({
                placeholder: 'Select City',
                allowClear: false,
            });
            $.each(data.data, function (i, v) {
                $('#billing_city_id').append($('<option></option>').attr('value', i).text(v));
            });

            if ($('#isEdit').val() && $('#billing_city_id').val()) {
                $('#billing_city_id').val($('#billing_city_id').val()).trigger('change');
            }
        },
    });
});

listenChange('#shipping_country_id', function () {
    $.ajax({
        url: route('states-list'),
        type: 'get',
        dataType: 'json',
        data: {countryId: $(this).val()},
        success: function (data) {
            $('#shipping_state_id').empty()
            $('#shipping_state_id').select2({
                placeholder: 'Select State',
                allowClear: false,
            })
            $('#shipping_state_id').append(
                $('<option value=""></option>').text('Select State'));
            $.each(data.data, function (i, v) {
                $('#shipping_state_id').append($('<option></option>').attr('value', i).text(v));
            });

            if ($('#isEdit').val() && $('#shipping_state_id').val()) {
                $('#shipping_state_id').val($('#shipping_state_id').val()).trigger('change');
            }
        },
    });
});

listenChange('#shipping_state_id', function () {
    $.ajax({
        url: route('cities-list'),
        type: 'get',
        dataType: 'json',
        data: {
            stateId: $(this).val(),
            country: $('#shipping_country_id').val(),
        },
        success: function (data) {
            $('#shipping_city_id').empty()
            $('#shipping_city_id').select2({
                placeholder: 'Select City',
                allowClear: false,
            });
            $.each(data.data, function (i, v) {
                $('#shipping_city_id').append($('<option></option>').attr('value', i).text(v));
            });

            if ($('#isEdit').val() && $('#shipping_city_id').val()) {
                $('#shipping_city_id').val($('#shipping_city_id').val()).trigger('change');
            }
        },
    });
});

listenClick('.remove-image', function () {
    defaultAvatarImagePreview('#previewImage', 1);
});

listenSubmit('#clientForm, #editClientForm', function () {
    if ($('#error-msg').text() !== '') {
        $('#phoneNumber').focus();
        return false;
    }
});

listenKeyup('#code', function () {
    return $('#code').val(this.value.toUpperCase());
});
listenClick('#autoCode', function () {
    let code = Math.random().toString(36).toUpperCase().substr(2, 6);
    $('#code').val(code);
});

listenClick('.remove-image', function () {
    defaultImagePreview('#previewImage', 1);
});
