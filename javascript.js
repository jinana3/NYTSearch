      $("#searchBtn").on("click", function(event) {

        event.preventDefault();

        var searchTerm = $("#searchTerm").val();
        var endYear = $("#endYear").val();
        var startYear = $("#startYear").val();

        // This is our API key. Add your own API key between the ""
        var myParameters = {
                            'api-key': "2396dfa34d7e47dd99eb3caae1ef2ad5",
                            'q': "defaultSearch",
                            'begin_date': "20160101",
                            'end_date': "20170101",
                            'page': 0
                            };

        //put the user inputs into myParameter Object so URL can pick it up
        myParameters.q = searchTerm;
        myParameters.begin_date = startYear + "0101"; //this has to be in this format for now, got to fix
        myParameters.end_date = endYear + "0101"; //this has to be in this format for now,  got to fix
        console.log(myParameters);

        //finally we put the search URL together
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param(myParameters);

        console.log(url);

        // do the AJAX on the URL to get the response
        $.ajax({
                url: url,
                method: 'GET',
                }).done(function(response) {
                console.log(url);
                console.log(response);

                var results = response.response.docs;
                console.log(results);

                for (var i = 0; i<results.length; i ++){
                  var articleDIV = $("<div>");
                  var number = i;
                  var title = results[i].headline.main;
                  var author = results[i].byline.original;
                  console.log(number);
                  console.log(title);
                  console.log(author);

                   /* <div id="articleNumber">1</div>
                    <div id="articleTitle">some title</div>
                    <div id="articleAuthor">some dude</div>*/
                  var artNumber = $("<div>").text(number);
                  artNumber.attr("id", "articleNumber");
                  articleDIV.append(artNumber);

                  var artTitle = $("<div>").text(title);
                  artTitle.attr("id", "articleTitle");
                  articleDIV.append(artTitle);

                  var artAuthor = $("<div>").text(author);
                  artAuthor.attr("id", "articleAuthor");
                  articleDIV.append(artAuthor);


                  //put this in where articles need to show up//
                  $("#articles").append(articleDIV);



                }


                }).fail(function(err) {
                throw err;
        });

      });
