apex.custom = apex.custom ? apex.custom : {};
apex.custom.reports = apex.custom.reports ? apex.custom.reports : {};

(function($, parent, undefined){
  var lReports = [];
  var lRescales = [];
  var lPromises = [];
  
  function addReport (pSelector) {
    lReports.push(pSelector);
  };
  
  function addRescale (pSelector) {
    lRescales.push(pSelector);
  };
  
  function herschaal (pSelectors) {
    pSelectors.forEach(function(pSelector){
      var h = 
        $(pSelector)
          .map( function(){ return $(this).height(); })
          .toArray()
          .reduce(function(p, c){ if ( c > p) { return c; } else { return p; } }, 0 );
      $(pSelector).height(h);
    });
  };
  
  function forceRescale(){
    herschaal(lRescales); 
  };
                  
  function handleRefresh (selector) {
    var dfd = $.Deferred();
    $(selector)
    .one("apexafterrefresh.apexmultireport", function(){ 
      dfd.resolve();
    });
    
    return dfd.promise();
  };
  
  function prepare () {
    lPromises = [];
    
    lReports.forEach(function(pSelector){
      lPromises.push( handleRefresh(pSelector) );
    });
    
    $.when.apply($, lPromises).done(function(){ 
      herschaal(lRescales);
    })
  };
  
  var interf = {
    addReport: addReport
  , addRescale: addRescale
  , forceRescale: forceRescale
  , prepare: prepare
  };
  
  $.extend(parent, interf);
})(apex.jQuery, apex.custom.reports);