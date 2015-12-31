apex.custom = apex.custom ? apex.custom : {};
apex.custom.alert = apex.custom.alert ? apex.custom.alert : {};

(function($, parent, undefined){

  /**
  * @param pOptions {Object}
  * @param pOptions.dialogId {String}
  * @param pOptions.message {String}
  * @param pOptions.da {Object} equals apex dynamic action context
  * @since 5.0
  * @example
  * when called from dynamic action:
  * apex.custom.alert.showSuccessMessage({ da: this });
  */
  function showSuccessMessage(pOptions) {
    //Set options
    var lDefaults = {
        dialogId : 'customSuccessMessage'
      , message  : null
      , da       : null
    };

    var lOptions = $.extend({}, lDefaults, pOptions);

    //Capture success message
    var lSuccessMsg;

    if ( lOptions.message ) {
      lSuccessMsg = lOptions.message;
    } else if ( lOptions.da ) { //if run from apex dynamic action
      if( lOptions.da.data.successMessage ) {
        lSuccessMsg = lOptions.da.data.successMessage.text;
      } else {
        //Fallback for 5.0.0
        lSuccessMsg = unescape(lOptions.da.data.APEX_SUCCESS_MESSAGE);

        //Remove checksum
        lSuccessMsg = lSuccessMsg.substr(0,lSuccessMsg.indexOf('/'));
      }
    }

    //Construct HTML to emulate standard success message alert
    var successHTML;

    successHTML = '<div class="t-Body-alert" id="' + lOptions.dialogId + '">';
    successHTML += ' <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG is-visible" id="t_Alert_Success" role="alert">';
    successHTML += ' <div class="t-Alert-wrap">';
    successHTML += ' <div class="t-Alert-icon">';
    successHTML += ' <span class="t-Icon"></span>';
    successHTML += ' </div>';
    successHTML += ' <div class="t-Alert-content">';
    successHTML += ' <div class="t-Alert-header">';
    successHTML += ' <h2 class="t-Alert-title">'+lSuccessMsg+'</h2>';
    successHTML += ' </div>';
    successHTML += ' </div>';
    successHTML += ' <div class="t-Alert-buttons">';
    successHTML += ' <a href="javascript:void(0);" onclick="$(\'#' + lOptions.dialogId + '\').remove();" class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close">';
    successHTML += ' <span class="t-Icon icon-close"></span>';
    successHTML += ' </a>';
    successHTML += ' </div>';
    successHTML += ' </div>';
    successHTML += ' </div>';
    successHTML += '</div>';

    //Display Success Message
    $('#t_Body_content').after(successHTML);

    //Fading alert instead of container, opacity problem with fading container
    $('.t-Alert').delay(2000).fadeOut(1000, function() {
      $('#' + lOptions.dialogId).remove();
    });
  }

  var interf = {
    showSuccessMessage: showSuccessMessage
  };

  $.extend(parent, interf);
})(apex.jQuery, apex.custom.alert);