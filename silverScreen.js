/**
 * jQuery SilverScreen
 * Description: An alternative to popups on mobiles.
 *
 * Copyright (c) 2014
 * Version 1.0 (1/06/2014)
 * 
 * Created By: Sagar Kalra
 */

(function($) {

    $.fn.silverScreen = function(data, options) {
        // Default settings
        settings = $.extend({}, {
            opacity: 1,
            speed: 400,
            color: '#fff',
            animate: true,
            easing: '',
            exitEvent: 'click',
            exitElement: '.close',
            onShow: function() {},
            onHide: function() {},
            beforeShow: function() {}
        }, options);

        // Do a compatibility check
        if (!jQuery.support.opacity) return false;

        if ($('#silverScreen').length != 0) {
            $('#silverScreen').remove();
        }
        // Add the overlay div
        $('body').append(
            '<div id="silverScreen">' +
            '<div class="close" style="padding:5px;">' +
            '<a class="button grey-btn2" style="float:right;" href="javascript:void(0);">CLOSE</a></div>' +
            '<div class="silverScreen-content" style="opacity:0">' +
            '</div></div>');

        // Get our elements
        var silverScreen = $('#silverScreen');

        // Set the CSS styles
        silverScreen.css({
            'position': 'absolute',
            'background': settings.color,
            'opacity': settings.opacity,
            'top': '0px',
            'left': '0px',
            'padding': '10px',
            'height': $(document).height(),
            'width': '100%',
            'z-index': '9999'
        });

        silverScreen.find('.silverScreen-content').html(data);

        settings.beforeShow.call(this);
            //silverScreen.beforeShow.call(this);
            silverScreen.find('.silverScreen-content').animate({
                opacity: settings.opacity
            }, settings.speed, settings.easing);

        // Fade in the spotlight
        if (settings.animate) {
            silverScreen.animate({
                opacity: settings.opacity
            }, settings.speed, settings.easing, function() {
                // Trigger the onShow callback
                settings.onShow.call(this);
            });
        } else {
            silverScreen.css('opacity', settings.opacity);
            // Trigger the onShow callback
            settings.onShow.call(this);
        }

        // Set up click to close
        $('#silverScreen ' + settings.exitElement).on(settings.exitEvent, function() {
            if (settings.animate) {
                silverScreen.animate({
                    opacity: 0
                }, settings.speed, settings.easing, function() {
                    $(this).remove();
                    // Trigger the onHide callback
                    settings.onHide.call(this);
                    window.scroll(0, 0);
                });
            } else {
                silverScreen.css('opacity', '0');
                $(this).remove();
                // Trigger the onHide callback
                settings.onHide.call(this);
                window.scroll(0, 0);
            }
        });

        // Returns the jQuery object to allow for chainability.  
        return this;
    };

})(jQuery);
