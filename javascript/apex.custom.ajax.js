apex.custom = apex.custom ? apex.custom : {};
apex.custom.ajax = apex.custom.ajax ? apex.custom.ajax : {};

(function($, parent, undefined){

  /**
  * Returns an object with all parameters ready to pass on to apex.server.process 
  * @param pParameters {Object} an object with the scalar parameters x01-x10 with their values
  * @param pItems {Object} an object with the array parameters f01-f20 and the jQuery selector of the apex item
  * @example
  * getAjaxParameters({x01: pContactpersonID}, {"f02":"input[name=f02]", "f03":"select[name=f03]"})
  */
  function getAjaxParameters(pParameters, pItems) {
    // create local parameter variable 
    var lParameters = $.extend({}, pParameters);
    
    // loop through object
    $.each(pItems, function(parameter, selector) {
      var lArray = [];
      
      // get all apex item values and put them in an array
      $(selector).each(function() {
        lArray.push($(this).val());
      });
      
      // assign array to the ajax parameter
      lParameters[parameter] = lArray;
    });  
    
    return lParameters;
  }

  var interf = {
      getAjaxParameters: getAjaxParameters
  };

  $.extend(parent, interf);
})(apex.jQuery, apex.custom.ajax);