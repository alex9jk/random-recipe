const appId = 'f7ff5f2a';
const appKey = 'c3e626a47006acf848991c888bbb7003';
const foodArr = ['chicken', 'beef', 'shrimp', 'vegetarian']
function xhr(getOrPost, food) {
    return $.ajax({
        type: getOrPost,
        url: `https://api.edamam.com/search?q=${food}&app_id=${appId}&app_key=${appKey}`,
        cache: false,
        async: true,
        dataType: 'json',


        beforeSend: function (xhr) {
            console.log("before send");
            //xhr.setRequestHeader("Authorization", "Basic OTdlMjVmNWJiMTdjNzI2MzVjOGU3NjlhOTI3ZTA3M2Q5MWZmMTA3ZDM2YTZkOWE5Og==");
            //put out a spinner if pId is defined...
            // $(pId).append('<img src="gears.gif" class="funkyThing"/>');
        }
        //always fires when data is returned
        //always good for clean up
    }).always(function () {
        //kill sppinner
        // $(pId).find('.funkyThing').fadeOut(500, function(){
        //     $(this).remove();

        // });


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        //console.log(textStatus);
        // console.log(errorThrown);

    });

}
function getRandomRecipe() {
    let rand = Math.floor(Math.random() * foodArr.length);
    xhr("GET", foodArr[rand]).done(function (json) {
        //  var obj = jQuery.parseJSON(json);
        console.log(json);
        var i =0;
        json.hits.forEach(function (item, i) {
            console.log(i);
            let divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            document.getElementById("accordionExample").append(divCard);

            let cardHeader = document.createElement('div');
            cardHeader.setAttribute('class', 'card-header');
            cardHeader.setAttribute('id', 'heading' + i);
            document.getElementsByClassName('card')[i].append(cardHeader);

            let h2 = document.createElement('h2');
            h2.setAttribute('class', 'mb-0');
            h2.setAttribute('data-toggle','collapse');
            h2.setAttribute('data-target','#collapse'+ i);
            h2.setAttribute('aria-expanded','true');
            h2.setAttribute('aria-controls', 'collapse' + i);

            let text = document.createTextNode(item.recipe.label);
            h2.appendChild(text);
            document.getElementsByClassName('card-header')[i].append(h2);

            let collapseDiv = document.createElement('div');
            collapseDiv.setAttribute('id','collapse' + i);
            collapseDiv.setAttribute('class','collapse');
            collapseDiv.setAttribute('aria-labelledby','heading' + i);
            collapseDiv.setAttribute('data-parent','#accordionExample');
            document.getElementsByClassName('card')[i].append(collapseDiv);

            let cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            document.getElementsByClassName('collapse')[i].append(cardBody);

            let image = document.createElement('image');
            image.setAttribute('src', item.recipe.image);
            image.setAttribute('alt','#');
            image.setAttribute('hieght', '50');
            image.setAttribute('width','50');
            document.getElementsByClassName('card-body')[i].append(image);
            i++;

        });
        // var img = document.createElement('img');
        // img.setAttribute('src',json.recipePic)
        // img.setAttribute('alt','Image could not be loaded');
        // document.getElementsByTagName('body')[0].append(img);

    });
}
