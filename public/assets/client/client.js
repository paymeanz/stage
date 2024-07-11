$(document).ready(function () {

    function addMoreOption() {
        opt_count += 1;
        var row = `
                <tr>
                <td>
                  ${opt_count}
                </td>
                <td>
                  <input type="text" class="form-control value" name="field_value[]" form="dynamicForm" required>
                </td>
                <td>
                  <input type="text" class="form-control option" name="field_option[]" form="dynamicForm" required>
                </td>
                <td>
                  <a href="javascript:;" class="remove_option">
                    <i class="fa-solid fa-trash mt-2" style="font-size: 24px; color: #ff0000;"></i>
                  </a>
                </td>
              </tr>
              `;
        $(".option_table tbody").append(row);
    }

    function updateOptionCount() {
        $(".option_table tbody tr").each(function (index) {
            console.log(index + 1);
            $(this).find("td:first").text(index + 1);
        });
    }

    function unsetShippingAddress() {
        $("#shipping_address1").val("");
        $("#shipping_address2").val("");
        $("#shipping_postal_code").val("");

        $(`#shipping_country_id`).val(null);
        $('#shipping_country_id').select2().trigger('change');

        $(`#shipping_state_id`).empty();
        $(`#shipping_city_id`).empty();
    }

    function toggleShippingAddress() {
        if ($('#shipping_check').prop('checked')) {
            $("#shipping_section").show();
        } else {
            $("#shipping_section").hide();
        }

    }

    function changeShippingAddress() {
        if ($('#same_as').prop('checked')) {
            $("#shipping_fields").hide();
            unsetShippingAddress();
        } else {
            $("#shipping_fields").show();
        }
    }


    opt_count = 1;
    $("#extra").hide();
    $(".option_section").hide();


    toggleShippingAddress();
    changeShippingAddress();

    $("#cc_email").select2({
        tags: true,
        maximumSelectionLength: 5,
    });

    $(".note-icon").click(function () {
        $(this).siblings(".note-text").toggle();
    });

    $("#shipping_check").on('change', function () {
        toggleShippingAddress();
        changeShippingAddress();
    });

    $("#same_as").on('change', function () {
        changeShippingAddress();
    });

    $("#create_field").on("click", function () {
        $("#customModal").modal("show");
    });

    $("#add_field").on("click", function () {
        $("#showFieldsModal").modal("show");
    });

    $(".add_field_btn").on("click", function () {
        var field_id = $(this).data('id');
        $.ajax({
            type: "post",
            url: route('admin.getField'),
            data: {
                field_id: field_id
            },
            dataType: "json",
            beforeSend: function () {
                $('body').css('pointer-events', 'none');
            },
            success: function (res) {
                if (res.success) {
                    var field = res.field;
                    if (field.is_required == '1') {
                        var required = "";
                    } else {
                        var required = "";
                    }
                    if (field.field_type == "textarea") {
                        var fieldHtml = `
            <div class="col-md-6 customField">
                <div class="mb-5">
                    <label for="${field.field_id}" class="form-label mb-3 ${required}">${field.field_label}:</label>
                    <div class="d-flex gap-2 align-items-center">
                        <textarea class="form-control form-control-solid" id="${field.field_id}" name="${field.field_name}" placeholder="${field.field_label}" rows="5" ${required} /></textarea>
                        <button type='button' class='btn-close remove_field_btn' aria-label='Close'></button>
                        <input type="hidden" name="custom[]" value="${field.field_name}">
                    </div>
                </div>
            </div>
            `;
                    } else if (field.field_type == "select") {
                        var fieldHtml = `
          <div class="col-md-6 customField">
              <div class="mb-5">
                  <label for="${field.field_id}" class="form-label mb-3 ${required}">${field.field_label}:</label>
                  <div class="d-flex gap-2 align-items-center">
                  <select class="form-select form-select-solid" id="${field.field_id}" name="${field.field_name}" ${required}>
                  <option value='' selected>Select Item</option>
                    `;
                        $.each(res.optVal, function (index, optData) {
                            fieldHtml +=
                                `<option value="${optData.value}">${optData.option}</option>`;
                        });

                        fieldHtml += `</select>
                  <button type='button' class='btn-close remove_field_btn' aria-label='Close'></button>
                  <input type="hidden" name="custom[]" value="${field.field_name}">
                </div>
              </div>
          </div>
          `;
                    } else {
                        if (field.field_type == "number") {
                            var attr = `oninput="this.value = this.value.replace(/\D+/g, '')"`;
                        } else {
                            var attr = '';
                        }
                        var fieldHtml = `
            <div class="col-md-6 customField">
                <div class="mb-5">
                    <label for="${field.field_id}" class="form-label mb-3 ${required}">${field.field_label}:</label>
                    <div class="d-flex gap-2 align-items-center">
                        <input type="${field.field_type}" class="form-control form-control-solid" id="${field.field_id}" name="${field.field_name}" placeholder="${field.field_label}" ${required} ${attr}/>
                        <button type='button' class='btn-close remove_field_btn' aria-label='Close'></button>
                        <input type="hidden" name="custom[]" value="${field.field_name}">
                    </div>
                </div>
            </div>
            `;
                    }
                    $("#custom-details").append(fieldHtml);
                    $("#showFieldsModal").modal("hide");
                }
            },
            complete: function () {
                $('body').css('pointer-events', 'auto');
            }
        });
    });

    $(document).on("click", ".remove_field_btn", function () {
        $(this).closest('.customField').remove();
    });

    $("#field_type").on("change", function () {
        opt_count = 1;
        var field = $(this).val();
        if (field == "select") {
            $("#extra").show();
            $(".option_section").show();
            var row = `
            <tr>
                <td>
                  ${opt_count}
                </td>
                <td>
                  <input type="text" class="form-control value" name="field_value[]" form="dynamicForm" required>
                </td>
                <td>
                  <input type="text" class="form-control option" name="field_option[]" form="dynamicForm" required>
                </td>
                <td>
                </td>
              </tr>
                `;
            $(".option_table tbody").html(row);
        } else {
            $("#extra").hide();
            $(".option_section").hide();
            $(".option_table tbody").html("");
        }
    });

    $(document).on("click", "#add_more_option_btn", function (ev) {
        ev.preventDefault();
        addMoreOption();
    });

    $(document).on("click", ".option_table tbody .remove_option", function () {
        $(this).closest("tr").remove();
        updateOptionCount();
        opt_count--;
    });

    $(document).on("submit", "#dynamicForm", function (e) {
        e.preventDefault();
        var frm = $('#dynamicForm');
        var form = $('#dynamicForm')[0];
        var data = new FormData(form);
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            cache: false,
            data: data,
            beforeSend: function () {
                $('#store_field_btn').hide();
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    swal({
                        icon: 'success',
                        title: "Added",
                        text: res.msg,
                        timer: 2000,
                        button: Lang.get('messages.common.ok'),
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                } else {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: res.msg,
                        timer: 2000,
                        button: Lang.get('messages.common.ok'),
                    });
                }
            }
        });
    });

    // $(document).on("submit", "#clientForm", function (e) {
    //     e.preventDefault();
    //     var formData = $(this).serializeArray();
    //     $.each(formData, function (i, arr) {
    //         console.log(arr);
    //         localStorage.setItem(arr.name, arr.value);
    //     });
    //     console.log(localStorage);
    // })
});
