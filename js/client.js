$(function () {
  getEvents(1);
  var currentDisplayPage = 1;

  // buttons
  $("#firPage").click(function () {
    // console.log("first page");
    currentDisplayPage = 1;
    getEvents(currentDisplayPage);
  });

  $("#prePage").click(function () {

    if (currentDisplayPage > 1) {
      // console.log(currentDisplayPage);
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
        // console.log(" last page button: " + response);
        currentDisplayPage = response.pagingInfo.totalPages;
        // console.log("page: " + currentDisplayPage);
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
        // console.log(response);
        //use response to get the data
        let eventTable = document.getElementById("tableContent");
        // console.log(eventTable.rows.length);
        while (eventTable.rows.length > 0) {
          eventTable.deleteRow(0);
          // console.log("this is the for loop: " + eventTable.rows.length);
        }

        response.events.forEach(element => {
          let date = new Date(element.stamp);
          const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
          const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
          const numDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
          const weekDay = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
          const hour = new Intl.DateTimeFormat('en', { timeStyle: "short"}).format(date);

          //checking to see if there is a flag
          let flagIcon;
          if (element.flag === true) {
            flagIcon = "mdi mdi-flag-variant";
          } else {
            flagIcon = "mdi mdi-flag-variant-outline";
          }

          $('#tableContent')
            .append(
              '<tr>' +
              `<td class="${flagIcon}"></td>` +
              '<td>' + `${weekDay}, ${mo} ${numDay}, ${ye}` + '</td>' +
              '<td>' + `${hour}` + '</td>' +
              '<td>' + element.loc + '</td>' +
              '<tr>'
            )
          // console.log(element.id)
        });

        let newPageInfo = response.pagingInfo.rangeStart + "-" + response.pagingInfo.rangeEnd + " of " + response.pagingInfo.totalItems + " events";
        $('#displayPageInfo').text(newPageInfo);


      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }

});
