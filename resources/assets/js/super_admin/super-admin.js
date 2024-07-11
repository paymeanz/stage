listenClick('.super-admin-delete-btn', function (event) {
    let recordId = $(event.currentTarget).attr('data-id')
    deleteItem(route('super-admins.destroy', recordId), 'tableName',
        Lang.get('messages.super_admin.super_admin'));
})
