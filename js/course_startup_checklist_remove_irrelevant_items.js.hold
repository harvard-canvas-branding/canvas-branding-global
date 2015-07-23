require(['jsx/course_wizard/ListItems'], function(ListItems) {
    var itemsToRemove = ['add_students', 'add_tas'];
    var shouldRemoveItem = function(item) {
        return itemsToRemove.indexOf(item.key) > -1;
    };
    var removeIrrelevantItems = function(item, index, listItems) {
        if (shouldRemoveItem(item)) {
            listItems.splice(index, 1);
        }
    };
    ListItems.forEach(removeIrrelevantItems);
});
