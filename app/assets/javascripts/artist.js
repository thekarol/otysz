
jQuery(function ($) { "use strict";

    /* ========================================================================= */
    /*	Page Preloader
        /* ========================================================================= */

    window.onload = function () {
        document.getElementById('preloader').style.display = 'none';
    }


    /* ========================================================================= */
    /*	Post image slider
/* ========================================================================= */

    $("#post-thumb, #gallery-post").slick({
        infinite: true,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 4000

    });

    $("#features").slick({
        infinite: true,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 4000
    });


    /* ========================================================================= */
    /*	Menu item highlighting
        /* ========================================================================= */


    $("#navigation").sticky({
        topSpacing : 0
    });


    /* ========================================================================= */
    /*	Magnific popup
/* =========================================================================  */
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 160, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
// just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        gallery: {
            enabled:true
        },
        closeOnContentClick: true,
        midClick: true,
        fixedContentPos: false,
        fixedBgPos: true
    });


    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        },
        callbacks: {
            beforeOpen: function () {
// just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
    });


    /* ========================================================================= */
    /*	Portfolio Filtering Hook
        /* =========================================================================  */

    var mixer =  mixitup('.portfolio-items-wrapper', {
        selectors: {
            control: '[data-mixitup-control]'
        }
    })
    /* ========================================================================= */
    /*	Testimonial Carousel
/* =========================================================================  */

//Init the carousel
    $("#testimonials").slick({
        infinite: true,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 4000
    });





    /* ========================================================================= */
    /*   Contact Form Validating
        /* ========================================================================= */


    $('#contact-submit').click(function (e) {

        //stop the form from being submitted
        e.preventDefault();

        /* declare the variables, var error is the variable that we use on the end
  to determine if there was an error or not */
        var error = false;
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();

        /* in the next section we do the checking by using VARIABLE.length
where VARIABLE is the variable we are checking (like name, email),
  length is a JavaScript function to get the number of characters.
  And as you can see if the num of characters is 0 we set the error
variable to true and show the name_error div with the fadeIn effect.
if it's not 0 then we fadeOut the div( that's if the div is shown and
  the error is fixed it fadesOut.

  The only difference from these checks is the email checking, we have
email.indexOf('@') which checks if there is @ in the email input field.
This JavaScript function will return -1 if no occurrence have been found.*/
        if (name.length == 0) {
            var error = true;
            $('#name').css("border-color", "#D8000C");
        } else {
            $('#name').css("border-color", "#666");
        }
        if (email.length == 0 || email.indexOf('@') == '-1') {
            var error = true;
            $('#email').css("border-color", "#D8000C");
        } else {
            $('#email').css("border-color", "#666");
        }
        if (subject.length == 0) {
            var error = true;
            $('#subject').css("border-color", "#D8000C");
        } else {
            $('#subject').css("border-color", "#666");
        }
        if (message.length == 0) {
            var error = true;
            $('#message').css("border-color", "#D8000C");
        } else {
            $('#message').css("border-color", "#666");
        }

        //now when the validation is done we check if the error variable is false (no errors)
        if (error == false) {
            $('#contact-submit').attr({
                'disabled': 'false',
                'value': 'Wysyłam...'
            });

            /* using the jquery's post(ajax) function and a lifesaver
  function serialize() which gets all the data from the form
  we submit it to send_email.php */

            $.ajax({
                url: "/send_email",
                type: "post",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                success: function(result){
                    if (result.status == 'sent') {
                        //if the mail is sent remove the submit paragraph
                        $('#cf-submit').remove();
                        //and show the mail success div with fadeIn
                        $('#mail-success').fadeIn(500);
                    } else {
                        //show the mail failed div
                        $('#mail-fail').fadeIn(500);
                        //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                        $('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
                    }
                },
                error:function(){
                    //show the mail failed div
                    $('#mail-fail').fadeIn(500);
                    //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                    $('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
                }
            });




            // $.post("sendmail.php", $("#contact-form").serialize(), function (result) {
            //     //and after the ajax request ends we check the text returned
            //     if (result == 'sent') {
            //         //if the mail is sent remove the submit paragraph
            //         $('#cf-submit').remove();
            //         //and show the mail success div with fadeIn
            //         $('#mail-success').fadeIn(500);
            //     } else {
            //         //show the mail failed div
            //         $('#mail-fail').fadeIn(500);
            //         //re enable the submit button by removing attribute disabled and change the text back to Send The Message
            //         $('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
            //     }
            // });
        }
    });

    $('#appointment-submit').click(function (e) {

        e.preventDefault();

        var error = false;
        var name = $('#appointment-name').val();
        var email = $('#appointment-email').val();
        var phone_number = $('#phone_number').val();
        var part = $('#part').val();
        var size = $('#size').val();
        var project = $('#project').val();
        var app_date = $('#datetimepicker12').data("DateTimePicker").date()._d

        if (name.length == 0) {
            var error = true;
            $('#appointment-name').css("border-color", "#D8000C");
        } else {
            $('#appointment-name').css("border-color", "#666");
        }
        if (email.length == 0 || email.indexOf('@') == '-1') {
            var error = true;
            $('#appointment-email').css("border-color", "#D8000C");
        } else {
            $('#eappointment-mail').css("border-color", "#666");
        }
        if (project.length == 0) {
            var error = true;
            $('#project').css("border-color", "#D8000C");
        } else {
            $('#project').css("border-color", "#666");
        }

        if (error == false) {
            $('#appointment-submit').attr({
                'disabled': 'false',
                'value': 'Wysyłam...'
            });

            $.ajax({
                url: "/send_appointment_email",
                type: "post",
                data: {
                    name: name,
                    email: email,
                    phone_number: phone_number,
                    part: part,
                    size: size,
                    project: project,
                    date: app_date
                },
                success: function (result) {
                    if (result.status == 'sent') {
                        //if the mail is sent remove the submit paragraph
                        $('#cf-appointment-submit').remove();
                        //and show the mail success div with fadeIn
                        $('#appointment-mail-success').fadeIn(500);
                    } else {
                        //show the mail failed div
                        $('#appointment-mail-fail').fadeIn(500);
                        //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                        $('#appointment-submit').removeAttr('disabled').attr('value', 'Send The Message');
                    }
                },
                error: function () {
                    //show the mail failed div
                    $('#appointment-mail-fail').fadeIn(500);
                    //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                    $('#appointment-submit').removeAttr('disabled').attr('value', 'Send The Message');
                }
            });


            // $.post("sendmail.php", $("#contact-form").serialize(), function (result) {
            //     //and after the ajax request ends we check the text returned
            //     if (result == 'sent') {
            //         //if the mail is sent remove the submit paragraph
            //         $('#cf-submit').remove();
            //         //and show the mail success div with fadeIn
            //         $('#mail-success').fadeIn(500);
            //     } else {
            //         //show the mail failed div
            //         $('#mail-fail').fadeIn(500);
            //         //re enable the submit button by removing attribute disabled and change the text back to Send The Message
            //         $('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
            //     }
            // });
        }

    });

});

// End Jquery Function


/* ========================================================================= */
/*	Animated section
/* ========================================================================= */

var wow = new WOW(
    {
        offset:       100,          // distance to the element when triggering the animation (default is 0)
        mobile:       false      // trigger animations on mobile devices (default is true)
    }
);
wow.init();


/* ========================================================================= */
/*	Smooth Scroll
/* ========================================================================= */
var scroll = new SmoothScroll('a[href*="#"]');



/* ========================================================================= */
/*	Google Map Customization
/* =========================================================================  */

function initialize() {

    noise();
    var myLatLng = new google.maps.LatLng(52.229886, 20.907876);

    var roadAtlasStyles = [{
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#2F3238"
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#FFFFFF"
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#50525f"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#808080"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#808080"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#3071a7"
        }, {
            "saturation": -65
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#bbbbbb"
        }]
    }];


    var mapOptions = {
        zoom: 14,
        center: myLatLng,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
        },
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#212121"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#181818"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1b1b1b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#2c2c2c"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8a8a8a"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#373737"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3c3c3c"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#4e4e4e"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3d3d3d"
                        }
                    ]
                }
            ]
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: '',
    });


    google.maps.event.addListener(marker, 'click', function () {
        // infowindow.open(map, marker);
    });
}


google.maps.event.addDomListener(window, "load", initialize);

