'use strict';
var raceview = angular.module('raceview', [ 'ui.select2', 'ngGrid', 'mc.resizer', 'datatables']);

//SERVICES
raceview.factory('raceviewServices', function ($http, $q) {
    var contentElement = angular.element("#content");

    return {

        UIActions: {
            showDashboard: false,
            showHosts: false,
            showJobs: true
        },

        UITitles: {
            jobs: "Jobs",
            hosts: "Hosts",
            dashboard: "Dashboard"
        },

        gridOptions: {
            widget_margins: [10, 10],
            widget_base_dimensions: [140, 140],
            helper: 'clone',
            resize: {
              enabled: true,
              axes: ['x', 'y', 'both'],
              max_size: [2, 2]
            }
        },

        States: {
            run: "RUN",
            pause: "PAUSE",
            hold: "HOLD",
            done: "DONE",
            fail: "FAIL"
        },

        searchText: {},

        getRaceData: function () {
            //return the promise directly.
            //$q.all allows us to string together requests.
            return $q.all([
                $http.get('.', {
                    params: { format: "json" }
                })

//                $http.get('.', {
//                    params: { format: "json" }
//                })
            ])
                .then(function (results) {
                    var data = [];
                    angular.forEach(results, function (result) {
                        data = data.concat([result.data]);
                    });
                    return data;
                });
        },



        resizeMargins: function (size) {
            return contentElement.css({"margin-left": size});
        },

        initResizer: function() {
            var windowElem = $(window);
            angular.element('.resize-handle').on('mousedown', function(e) {

                // Stop default so text does not get selected
                e.preventDefault();
                e.originalEvent.preventDefault();

                // init variable for new width
                var new_width;

                // store initial mouse position
                var initial_x = e.pageX;

                // create marquee element
                var $m = $('<div class="resize-marquee"></div>');

                // append to th
                var $th = $(this).parent('th');
                $th.append($m);

                // set initial marquee dimensions
                var initial_width = $th.width();
                $m.css({
                    width: initial_width + 'px',
                    height: $th.height() + 'px'
                });

                // set mousemove listener
                windowElem.on('mousemove', mousemove);

                // set mouseup/mouseout listeners
                windowElem.one('mouseup', function() {
                    // remove marquee, remove window mousemove listener
                    $m.remove();
                    windowElem.off('mousemove', mousemove);

                    // set new width on th
                    $th.css('width', new_width + 'px');
                });

                function mousemove(e) {
                    // calculate changed width
                    var current_x = e.pageX;
                    var diff = current_x - initial_x;
                    new_width = initial_width + diff;

                    // update marquee dimensions
                    $m.css('width', new_width + 'px');
                }

            });

        }

    };
});

//DIRECTIVES
//used for loading gif
raceview.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (load) {

                if (load) {
                    elm.show();
                    var counter = 0;
                    setInterval(function () {
                        var frames = 12;
                        var frameWidth = 15;
                        var offset = counter * -frameWidth;
//                        document.getElementById(".loading-spiner-holder").style.backgroundPosition = offset + "px 0px";
                        counter++;
                        if (counter >= frames) counter = 0;
                    }, 100);


                } else {
//                    elm.fadeTo(900, 0);
                    elm.hide(700);
                }
            });
        }
    };

}]);

raceview.directive(
    'uiSelect2EditableCellTemplate',
    [
        function() {
            return {
                restrict: "A",
                link: function ( scope, elm, attrs ) {
                    //make sure the id is set, so we can focus the ui-select2 by ID later on (because its ID will be generated from our id if we have one)
                    elm.attr( "id", "input-" + scope.col.index +  "-" + scope.row.rowIndex );

                    elm.on( 'click', function( evt ) {
                        evt.stopPropagation();
                    } );

                    elm.on( 'mousedown', function( evt ) {
                        evt.stopPropagation();
                    } );

                    //select2 has its own blur event !
                    elm.on(	'select2-blur',
                                function ( event ) {
                                    scope.$emit( 'ngGridEventEndCellEdit' );
                                }
                    );

                    scope.$on( 'ngGridEventStartCellEdit', function () {
                        //Event is fired BEFORE the new elements are part of the DOM, so try to set the focus after a timeout
                        setTimeout(	function () {
                                        $( "#s2id_" + elm[0].id ).select2( 'open' );
                                    }, 10 );
                    } );


                }
            };
        }
    ]
);

raceview.directive('thead', function() {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    link: function(scope, elem) {
        console.log(elem)
        elem.onscroll = function() {
            elem.floatThead({
                scrollingTop: 45,
            });
            elem.floatThead('reflow');
        }
    }
  };
});

raceview.directive('ngBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
});

//// Right-click Directive,
//// Keep this light as it instances for every job on race (every row)
//raceview.directive('ngRightClick', function($parse) {
//    return function(scope, element, attrs) {
//        var fn = $parse(attrs.ngRightClick);
//        element.bind('contextmenu', function(event) {
//            scope.$apply(function() {
//                $('#contextMenu').css({
//                        top: event.pageY + 'px',
//                        left: event.pageX + 'px',
//                        position: "absolute"
//                    }).show();
//
//                $('#contextMenu').click(function() {
//                    $('#contextMenu').hide();
//                });
//                $(document).click(function() {
//                    $('#contextMenu').hide();
//                });
//                $(document, ".tr").bind('click', function(event) {
//                    switch (event.which) {
//                        case 3:
//                            console.log("right clikc")
//                            $('#contextMenu').show();
//                            break;
//                        default:
//                            $('#contextMenu').hide();
//
//                    }
//                });
//                event.preventDefault();
//                fn(scope, {$event:event});
//            });
//        })
//    };
//});

//used for selectable list
raceview.directive('uiSelectable', function ($parse) {
    return {
        link: function (scope, element, attrs, ctrl) {
            var prev = -1;
            element.selectable({
                filter: "tr",
                stop: function (evt, ui) {
                    var collection = scope.$eval(attrs.docArray);
                    var selected = element.find('tr.parent.ui-selected').map(function () {
                        var idx = $(this).index();
                        return { document: collection[idx] }
                    }).get();
                    scope.selectedItems = selected;

                    scope.$watch(selected, function () {
                        if (scope.UIActions.showJobs) {
                            scope.showFrameInfo(scope.selectedItems)
                        }

                    });

                    scope.$apply()
                },
                selecting: function(e, ui) { // on select
                    var curr = $(ui.selecting.tagName, e.target).index(ui.selecting); // get selecting item index
                    if(e.shiftKey && prev > -1) { // if shift key was pressed and there is previous - select them all
                        $(ui.selecting.tagName, e.target).slice(Math.min(prev, curr), 1 + Math.max(prev, curr)).addClass('ui-selected');
                        prev = -1; // and reset prev
                    } else {
                        prev = curr; // othervise just save prev
                    }
                }
            });
        }
    }
});

//used for selectable list
raceview.directive('uiSelectable2', function ($parse) {
    return {
        link: function (scope, element, attrs, ctrl) {
            var prev = -1;
            element.selectable({
                filter: "tr",
                stop: function (evt, ui) {
                    var collection = scope.$eval(attrs.docArray);
                    var selected = element.find('tr.parent.ui-selected').map(function () {
                        var idx = $(this).index();
                        return { document: collection[idx] }
                    }).get();
                    scope.selectedItems = selected;
                    scope.$apply()
                },
                selecting: function(e, ui) { // on select
                    var curr = $(ui.selecting.tagName, e.target).index(ui.selecting); // get selecting item index
                    if(e.shiftKey && prev > -1) { // if shift key was pressed and there is previous - select them all
                        $(ui.selecting.tagName, e.target).slice(Math.min(prev, curr), 1 + Math.max(prev, curr)).addClass('ui-selected');
                        prev = -1; // and reset prev
                    } else {
                        prev = curr; // othervise just save prev
                    }
                }
            });
        }
    }
});

raceview.directive('resizable', function () {
    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem, attrs) {
            elem.resizable({handles: 'e,w'});
            elem.on('resizestop', function (evt, ui) {
                if (scope.callback) { scope.callback(); }
            });
        }
    };
});