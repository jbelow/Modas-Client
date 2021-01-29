$(function () {
  getEvents(1)

  function getEvents(page) {
    $.getJSON({
      url: "https://modasclient.azurewebsites.net/api/event/pagesize/10/page/" + page,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        //use response to get the data
        // response..page
        // response.pagingInfo.currentPage
        // response.events.

        response.events.forEach(element => {
          console.log(element);
          
          $('#table')
            .append(
              '<tr>' + 
              '<td id="flag">' + element.flag + '</td>' + 
              '<td id="flag">' + element.stamp + '</td>' + 
              '<td id="flag">' + element.id + '</td>' + 
              '<td id="flag">' + element.loc + '</td>' + 
              '<tr>'
              )
            .addClass('myclass');
        });

      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }
});