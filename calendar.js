const calendar = document.querySelector('.datepicker');
let date = new Date();
let selectedDate;

M.Datepicker.init(calendar, {
    showClearBtn: true,
    autoClose: true,
    defaultDate: date, 
    onClose: function() {
        selectedDate = calendar.value;
        console.log(selectedDate);
    }
});


