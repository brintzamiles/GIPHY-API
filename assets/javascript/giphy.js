$(document).ready(function () {

    // topic array loaded by yours truly
    var topic = [`Prince`, `Michael Jackson`, `James Brown`, `Ray Charles`, `Marvin Gaye`, `Whitney Houston`, `Beyonce`, `Al Green`, `The O'Jays`, `Billie Holiday`, `Miles Davis`];


    //display the GIPHY buttons as you loop through the topic array
    function displayGifButtons() {
        $(`#gif-buttons`).empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $(`<button>`);
            gifButton.addClass(`theGreats`);
            gifButton.addClass(`btn btn-primary`);
            gifButton.attr(`value`, topic[i]);
            gifButton.attr(`id`, `gif-button`);
            gifButton.text(topic[i]);
            $(`#gif-buttons`).append(gifButton);
        }
    }

    //Topic add function
    function addNewTopic() {
        $(`#add-gif`).on(`click`, function () {
            var theGreats = $(`#topic-add`).val().trim();
            //the input value is blank, cancel behavior
            if (theGreats == ``) {
                return false;
            }
            topic.push(theGreats);
            displayGifButtons();
            return false;
        });
    }

    // function that displays the GIPHYs
    function displayGifs() {
        var theGreats = $(this).attr(`value`);
        var apiKey = `&api_key=ZcKkLqjGYATHj8Kst5tsgCswXqd5E2d5`;
        var queryURL = `https://api.giphy.com/v1/gifs/search?q= ${theGreats} ${apiKey}`;

        $.ajax({
                url: queryURL,
                method: 'GET'
            })

            .done(function (response) {
                $(`#gifs-display`).empty();
                //show results of gifs
                var results = response.data;
                if (results == ``) {
                    alert(`Surprisingly, there's no GIPHY for this topic!`);
                }
                for (var i = 0; i < 10; i++) {
                    //load  GIPHYs in a new div
                    var gifDiv = $(`<div1>`);
                    //return rating of GIPHY
                    var gifRating = $(`<p>`).text(`Rating:  ${results[i].rating}`);
                    gifDiv.append(gifRating);
                    //I want to figure out how to make the rating uppercase

                    //pull gif
                    var gifImage = $(`<img>`);

                    //loads still image by default
                    gifImage.attr(`src`, results[i].images.fixed_height_small_still.url);

                    //images loads by default as still
                    gifImage.attr(`data-state`, `still`);

                    //Pulls the data-still attr for still or paused images
                    gifImage.attr(`data-still`, results[i].images.fixed_height_small_still.url);

                    //Pulls the data-animate attr for animated images
                    gifImage.attr(`data-animate`, results[i].images.fixed_height_small.url);

                    gifImage.addClass(`image`);
                    gifDiv.append(gifImage);

                    //add new div to #gifs-display div
                    $(`#gifs-display`).append(gifDiv);
                }
            });
    }


    displayGifButtons();
    addNewTopic();



    //event listeners
    $(document).on(`click`, `.theGreats`, displayGifs);
    $(document).on(`click`, `.image`, function () {
        var state = $(this).attr('data-state');
        //behavior if still
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            //behavior if animated
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });

});