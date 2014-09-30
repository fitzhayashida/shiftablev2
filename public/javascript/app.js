$(function(){
  $(".myscheduler").dhx_scheduler({
    xml_date:"%Y-%m-%d %H:%i",
    date:new Date(),
    mode:"month"
  });

  scheduler.init('scheduler', new Date(), "month");
  scheduler.templates.xml_date = function(value){
    return new Date(value);
  };
  scheduler.load('/api/shifts', 'json');
    

  var add_event = function(id,ev){

    var userId = ev.userId;
    var startDate = moment(ev.start_date).format();
    var endDate = moment(ev.end_date).format();
    var text = ev.text;

    $.ajax({
      url: '/api/shifts',
      type: 'POST',
      cache: false,
      dataType: "json",
      data: { userId: userId, start_date: startDate, end_date: endDate, text: text },
      success: function(data) {
        console.log('success' + ' ' + id);
      },
      error: function() {
        console.log('error');
      },
    });
  };

  var update_event = function(id,ev){

    var id = ev._id;
    var startDate = moment(ev.start_date).format();
    var endDate = moment(ev.end_date).format();
    var text = ev.text;

    $.ajax({
      url: '/api/shifts/' + id,
      type: 'PUT',
      cache: false,
      dataType: "json",
      data: { start_date: startDate, end_date: endDate, text: text },
      success: function(data) {
        console.log('success');
      },
      error: function() {
        console.log('error');
      },
    });
  };

  var delete_event = function(id,ev){

    var id = ev._id;

    $.ajax({
      url: '/api/shifts/' + id,
      type: 'DELETE',
      cache: false,
      dataType: "json",
      success: function(data) {
        console.log('success');
      },
      error: function() {
        console.log('error');
      },
    });
  };
  
  scheduler.attachEvent("onEventAdded", add_event);
  scheduler.attachEvent("onEventChanged", update_event);
  scheduler.attachEvent("onEventDeleted", delete_event);

});