$(function () {
  getEvents(1);
  var currentDisplayPage = 1;

  // buttons
  $("#firPage").click(function () {
    console.log("first page");
    currentDisplayPage = 1;
    getEvents(currentDisplayPage);

  });

  $("#prePage").click(function () {

    if (currentDisplayPage > 1) {
      console.log(currentDisplayPage);
      currentDisplayPage--;
      getEvents(currentDisplayPage);
    }


  });

  $("#nexPage").click(function () {
    $.getJSON({
      url: "https://modasclient.azurewebsites.net/api/event/pagesize/10/page/" + currentDisplayPage,
      success: function (response, textStatus, jqXhr) {

        if (currentDisplayPage < response.pagingInfo.totalPages) {
          currentDisplayPage++;
          getEvents(currentDisplayPage);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });

  });

  $("#lasPage").click(function () {
    $.getJSON({
      url: "https://modasclient.azurewebsites.net/api/event/pagesize/10/page/" + currentDisplayPage,
      success: function (response, textStatus, jqXhr) {
        console.log(" last page button: " + response);

        currentDisplayPage = response.pagingInfo.totalPages;
        console.log("page: " + currentDisplayPage);
        getEvents(currentDisplayPage);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });

  });


  function getEvents(page) {
    $.getJSON({
      url: "https://modasclient.azurewebsites.net/api/event/pagesize/10/page/" + page,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        //use response to get the data
        let eventTable = document.getElementById("tableContent");
        // console.log(eventTable.rows.length);
        while (eventTable.rows.length > 0) {
          eventTable.deleteRow(0);
          // console.log("this is the for loop: " + eventTable.rows.length);
        }


        // console.log(eventTable.rows.length);

        response.events.forEach(element => {
          // console.log("this is after the data is added " + eventTable.rows.length);
          // console.log(element);

          $('#tableContent')
            .append(
              '<tr>' +
              '<td>' + element.flag + '</td>' +
              '<td>' + element.stamp + '</td>' +
              '<td>' + element.id + '</td>' +
              '<td>' + element.loc + '</td>' +
              '<tr>'
            )
          // console.log(element.id)

        });

        let newPageInfo = response.pagingInfo.rangeStart + "-" + response.pagingInfo.rangeEnd + " of " + response.pagingInfo.totalItems + " events";
        console.log(newPageInfo);
        // $('#displayPageInfo')
        // .append(response.pagingInfo.rangeStart + "-" + response.pagingInfo.rangeEnd + " of " + response.pagingInfo.totalItems + " events")
        
        $('#displayPageInfo').text(newPageInfo);
        // let tableInfo = document.getElementById("displayPageInfo");
        // if ($('#displayPageInfo').is(':empty') == false) {
        //   console.log("table button" + tableInfo);
        //   tableInfo.remove();
        // }






      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }

});
