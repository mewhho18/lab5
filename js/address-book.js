/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/

$(function() {
    sortObjArray(Employees.entries, this.last);
    render(Employees.entries);
    $('.sort-ui .btn').popover({
        content: function(){return 'Click to Resort by ' + $(this).html();},
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    });

    $('.sort-ui .btn').click(function() {
        var sortBtn = $(this);
        var order = sortBtn.attr('data-sortby');
        sortObjArray(Employees.entries, order);
        render(Employees.entries);
        sortBtn.siblings('.active').removeClass('active');
        sortBtn.addClass('active');

    });
});


function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

    function render(entries) {
        var addressBook = $('.address-book');
        var template = $('.template');
        var element;

        addressBook.hide();
        addressBook.empty();
        $.each(entries, function(){
           element = template.clone();
           element.find('.first').html(this.first);
           element.find('.last').html(this.last);
           element.find('.title').html(this.title);
           element.find('.dept').html(this.dept);
           element.find('.pic').attr({
                src: this.pic,
                alt: 'Picture of' + this.first + ' ' + this.last
           });

           element.removeClass('template');
           addressBook.append(element);
           addressBook.fadeIn();
        });
    }