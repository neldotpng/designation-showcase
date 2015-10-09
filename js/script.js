
var $grid = $('.grid');
var filters = [];
var checkboxFilters = [];
var buttonFilter = "";
var windowWidth;
var newWindowWidth = 0;

$(document).ready(function() {
  windowWidth = $(window).width();

  //reset the search items when page loads
  window.scrollTo(0,0);
  $(".search").val('');

  $(window).scroll(function() {
    var $doc = $("html,body");
    var $scrollTo = $('main');
    if ($(window).scrollTop() > 400) {
      $('main section .grid .cohort').addClass("fade-in");
    }
  })
  //append locations to sidebar without duplicate locations
  var duplicates = [];
  var locArray = [];
$.ajax({
  url: "json/main.json",
  async: false,
  success: function(data){
    for (var cohort in data.cohorts) {
      for (var student in data.cohorts[cohort].students) {

        for (var loc in data.cohorts[cohort].students[student].location) {
          var studentLoc = data.cohorts[cohort].students[student].location[loc];
          if (duplicates.indexOf(studentLoc) == -1) {
            locArray.push(studentLoc);
            duplicates.push(studentLoc);
          }
        }
      }
    }

    var locArraySorted = locArray.sort();
    for (var locItem in locArraySorted) {
        var studentLocItem = locArraySorted[locItem];
        var studentLocClass = studentLocItem.replace(/,| /g, '');

        $("#location-list .filter-items").append("<li class='filter-item'><input type='checkbox' id='" + studentLocClass + "' data-filter='." + studentLocClass + "'><label for='" + studentLocClass + "'> " + studentLocItem + "</label></li>");
    }
    $checkboxes = $(".filter-group .filter-item input");
  }
})
    //call all filter functionality
    attrFilters();
    cohortFilters();  
    searchFilter();

});




function initIso() {
    $grid.isotope({
    itemSelector: '.cohort-logo, .popup, .card',
    layoutMode: 'fitRows'
    })
}

// function attrFiltersOR() {

// $checkboxes.live("change", function() {  
//     initIso();

//     checkboxFilters = [];
//     filters = [];

//     $checkboxes.filter(':checked').each(function(){
//       checkboxFilters.push( $(this).attr("data-filter") );
//     });

//     for (var i = 0; i < checkboxFilters.length; i++ ) {

//         filters.push(buttonFilter + checkboxFilters[i]);
//     }
//     var comboFilters = filters.join(", ");
//      $grid.isotope({ filter: comboFilters });

// });

// };

function attrFilters() {
  $checkboxes.live("change", function() {  
    initIso();


    checkboxFilters = [];
    filters = [];

    $checkboxes.filter(':checked').each(function(){
      console.log(this);
      checkboxFilters.push( $(this).attr("data-filter") );
    });

    if (checkboxFilters.length == 0) {
      filters.push(buttonFilter);
      $grid.isotope({filter : buttonFilter});
      // IsEmptyAfterFilter();
    } 
    else {
      for (var i = 0; i < checkboxFilters.length; i++ ) {

          filters.push(buttonFilter + checkboxFilters[i]);
      }

      var comboFilters = filters.join("");
       $grid.isotope({ filter: comboFilters });
       // IsEmptyAfterFilter();
      
    } 

    // changePos();

  

});
};


function cohortFilters() {
var $cohortOption = $(".button-group");

$cohortOption.on("click", '.filter-item .button', function() {

    initIso();

    buttonFilter = $(this).attr("data-filter");
    //uncheck all filters
    $('input:checkbox').removeAttr('checked');

    $grid.isotope({filter: buttonFilter});

    // isEmptyTimeout();
    // changePos();

    if (buttonFilter == ".all") {
      $(".filters .button-group span").html( buttonFilter.replace(/\./g, "") + " cohorts <div class='arrow-down'></div>")

    } else {
      $(".filters .button-group span").html( buttonFilter.replace(/\./g, "") + "<div class='arrow-down'></div>")

    }

}); 
};


  
function searchFilter() {      
    $(".search").on("click", function() {
      $('.filters .button-group span').html("All cohorts <div class='arrow-down'></div>");
      $checkboxes.removeAttr("checked");

      $(".search").val('');
      resetFilters();
      // quick search regex
      var qsRegex;
      
      // init Isotope
      var $container = $('.grid').isotope({
        itemSelector: '.cohort-logo, .card',
        layoutMode: 'fitRows',
        filter: function() {
          return qsRegex ? $(this).text().match( qsRegex ) : true;
        }
      });

      $container.isotope('reloadItems');
    
      // use value of search field to filter
      var $quicksearch = $('.search').keyup( debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $container.isotope();

          // changePos();
        // IsEmptyAfterFilter();
      }, 500) );
    });
};

  

  // search - debounce so filtering doesn't happen every millisecond
function debounce(func, wait, immediate) {

   var timeout;           
   // Calling debounce returns a new anonymous function
   return function() {
       // reference the context and args for the setTimeout function
       var context = this, 
           args = arguments;

       var callNow = immediate && !timeout;
       clearTimeout(timeout);  

       // Set the new timeout
       timeout = setTimeout(function() {
            timeout = null;

            if (!immediate) {

              func.apply(context, args);
            }
       }, wait);
     }
   }



  // //checks to see if grid is empty
  // function isEmpty() {
  //   console.log($(".card:visible").length);
  //     if ($(".card:visible").length < 1) {
  //           $(".grid .empty-message").fadeIn(100);

  //     } 
  //     else {
  //         $(".grid .empty-message").hide();
  //     }
  // }

  // function isEmptyTimeout() {
  //   $grid.isotope('on', 'layoutComplete', function (isoInstance, laidOutItems) {
  //       setTimeout(function () {
  //           isEmpty();
  //       }, 100);
  //   });
  // }

// $(window).resize(function() {
//   initIso();
//   changePos();
//   if (newWindowWidth != 0) {
//     windowWidth = newWindowWidth;
//     newWindowWidth = $(window).width();

//   } else {
//     newWindowWidth = $(window).width();
//   }

//   if (windowWidth < 885 && newWindowWidth > 885) {
//     console.log("reload");
//     location.reload();
//   }
// })

$(window).resize(function() {
  debounce(initIso(), 1000);
});

// function changePos() {

//     console.log(windowWidth);
//     console.log(newWindowWidth);
//     if (newWindowWidth != 0 ) {
//       if (newWindowWidth < 885) {
//         console.log("im running");
//         changePosition();
//         console.log(newWindowWidth + " is running");
//       } 
//     } else {
//       if (windowWidth < 885) {
//         console.log("windowWidth: " + windowWidth);
//         changePosition();
//       } 
//     }

// };


//   function changePosition() {
//     $grid.isotope('on', 'arrangeComplete', function (isoInstance, laidOutItems) {
//         setTimeout(function () {
//           $(".cohort-logo, .card").css({"position" : "relative", "top" : "0", "left" : "0"});
//         }, 1);
//     });
//   }



$(".header-button").on("click", function() { 
  var $doc = $("html,body");
  var $scrollTo = $('nav');

  $doc.animate({scrollTop: $scrollTo.offset().top - $doc.offset().top, scrollLeft: 0},750); 
});

function resetFilters() {
  filters = [];
  buttonFilter = "";
}


