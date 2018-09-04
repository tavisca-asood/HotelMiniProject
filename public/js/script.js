var input_data;
var Data1;
var key;
var Data = JSON.parse(databaseData);
var endDate1;
Data.sort(function (value1, value2) {
    return value1.name.localeCompare(value2.name);
    });
$( window ).resize(function() {
  $('body').mousedown();
});

$(document).ready(function () {
    $(".search-button").click(function () {
        $('.hotel-lists').html('');
        if ($('#from').val() != '' && $('#to').val() == '') {
            $('.error').html('* Required');
            $('.error').css('color', '#FF0000');
            $('#to').css('border', '2px solid red');
            return false;
        }
        else{
            $('.error').html('');
            $('#to').css('border', '1px solid black');
        }
        input_data = $('#input').val().toLowerCase();
        Data1 = dataCollection(Data, input_data);
        //Date Validations
        var fromdate = $("#from").val().split("-");
        var UserFrom = new Date(fromdate[2], fromdate[1] - 1, fromdate[0]);
        var todate = $("#to").val().split("-");
        var UserTo = new Date(todate[2], todate[1] - 1, todate[0]);
        var result = $('.hotel-list');
        for (var key in Data1) {
            var HotelFrom = new Date(Data1[key].startDate.year, Data1[key].startDate.month - 1, Data1[key].startDate.date);
            var HotelTo = new Date(Data1[key].endDate.year, Data1[key].endDate.month - 1, Data1[key].endDate.date);
            if ($('#from').val() == '' || $('#from').val() == 'TODAY') {
                UserFrom = new Date();
                $('#from').val('TODAY');
                UserTo = new Date();
                $('#to').val('TODAY');
            }
            if (UserFrom >= HotelFrom && UserTo <= HotelTo) {
                Data1[key]._id = "green";
                Data1[key].startDate1 = " ";
                Data1[key].EndDate1 = " ";
            } else if ((HotelFrom >= UserFrom && HotelFrom <= UserTo) || (HotelTo >= UserFrom && HotelTo <= UserTo)) {
                //var FromDate=HotelFrom++;
                Data1[key]._id = "yellow";
				if((UserFrom>=HotelFrom&&UserFrom<=HotelTo)&&(UserTo>=HotelFrom&&UserTo<=HotelTo))
					{
					Data1[key].startDate1 = "Available From "+parseInt(UserFrom.getDate()) +"/"+ parseInt(UserFrom.getMonth()+1)+"/"+parseInt(UserFrom.getFullYear());
					Data1[key].endDate1= " To "+parseInt(UserTo.getDate()) +"/"+ parseInt(UserTo.getMonth()+1)+"/"+parseInt(UserTo.getFullYear());
					}
				else if(UserFrom>=HotelFrom)
					{
					Data1[key].startDate1= "Available From "+parseInt(UserFrom.getDate()) +"/"+ parseInt(UserFrom.getMonth()+1)+"/"+parseInt(UserFrom.getFullYear());
					Data1[key].endDate1 = "To "+parseInt(Data1[key].endDate.date) +"/"+ parseInt(Data1[key].endDate.month)+"/"+parseInt(Data1[key].endDate.year);
					}
				else
					{
					Data1[key].startDate1 = "Available From "+parseInt(Data1[key].startDate.date) +"/"+ parseInt(Data1[key].startDate.month)+"/"+parseInt(Data1[key].startDate.year);
					Data1[key].endDate1= " To "+parseInt(UserTo.getDate()) +"/"+ parseInt(UserTo.getMonth()+1)+"/"+parseInt(UserTo.getFullYear());
					}
				} else {
                Data1[key]._id = "red";
                Data1[key].startDate1 = "";

            }

        }
        if ((Data1.length > 0 && input_data.length > 0) || (Data1.length > 0 && input_data.length == 0)) {
            var hotelList = new HotelList(Data1);
            var hotelsView = new HotelView({
                collection: hotelList
            });

            var divs = $('.description');

            for (var k = 0; k < divs.length; k++) {
                for (var val = 1; val <= parseInt(Data1[k].starRating); val++) {
                    $(divs[k]).append('<span class="fa fa-star fa-1x checked"></span>');
                }
                for (var val = 1; val <= 5 - parseInt(Data1[k].starRating); val++) {
                    $(divs[k]).append('<span class="fa fa-star fa-1x"></span>');
                }
            }

            $('.green').html('BOOK NOW');
            $('.yellow').html('BOOK NOW');
            $('.red').html('NOT AVAILABLE');
        } else {
            $('.hotel-lists').append('<p class="dataFound">No Match Found</p>');
        }
    });


    if ($('#from').val() == '' || $('#from').val() == 'TODAY') {
        $("#to").prop("disabled", "disabled");
        $("#from").prop("readonly", true);
        $("#to").prop("readonly", true);
    }
    var dateToday = new Date();
    var dates = $("#from, #to").datepicker({
        defaultDate: dateToday,
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        minDate: dateToday,
        onSelect: function (selectedDate) {
            if ($('#from').val() != '' || $('#from').val() != 'TODAY') {
                $("#to").removeAttr("disabled");
                $("#from").prop("readonly", true);
                $("#to").prop("readonly", true);
            }
            var option = this.id == "from" ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });
});
var Hotel = Backbone.Model.extend({
    defaults: {
        name: '',
        logo: '',
        address: '',
        starRating: ''
    },


});
var HotelList = Backbone.Collection.extend({
    model: Hotel

});

var HotelView = Backbone.View.extend({
    el: ".hotel-lists",
    template: _.template($('#profileTemplate').html()),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.collection.each(function (model) {
            var profileTemplate = this.template(model.toJSON());
            this.$el.append(profileTemplate);

        }, this);
        return this;
    },

});

function dataCollection(data, input_data) {
    return key = _.filter(data, function (item) {
        $('.hotel-list').attr('id', item._id);
        return item.name.toLowerCase().indexOf(input_data) != -1;
    });
}

function ActiveContent(evt, buttonName) {
    $(".tabcontent").each(function () {
        $(this).css('display', 'none');
    });
    $(".Insidetabcontent").each(function () {
        $(this).css('display', 'none');
    });
    $(".tablinks").each(function () {
        $(this).removeClass("active");
    });
    $('#' + buttonName).css('display', 'block');
    $(evt.currentTarget).addClass("active");
}

function ActiveInsideContent(evt, buttonName) {
    $(".Insidetabcontent").each(function () {
        $(this).css('display', 'none');
    });
    $(".Insidetablinks").each(function () {
        $(this).removeClass("active");
    });
    $('#' + buttonName).css('display', 'block');
    $(evt.currentTarget).addClass("active");
}

function Documentation() {
    document.getElementById("defaultOpen").click();
}
