/*------------model----------------------*/

/* an object literal */
    var model = {
        formVisible: false, //show or hide form
        currentCat: null,
        catInfo: [
            {
                name: 'Spider - claiming a bed',
                clickCount: 0,
                image: "images/spider.jpg"
            },
            {
                name: 'Spider - sitting on my friend',
                clickCount: 0,
                image: "images/spider2.jpg"
            },
            {
                name: 'Spider - purrito',
                clickCount: 0,
                image: "images/purrito.jpg"
            },
            {
                name: 'Spider - watching fish',
                clickCount: 0,
                image: "images/watchingfish.jpg"
            },
            {
                name: 'Spider - watching birds',
                clickCount: 0,
                image: "images/watching birds.jpg"
            }]
    };

 /* ---------- octopus - the controller --------------*/
    var octopus = {
        init:function(){

            //set the current cat to the first one in the list
            model.currentCat = model.catInfo[0];

            //tell our views to initialise
            CatListView.init();
            CatView.init();
            adminView.init();

        },

        GetCurrentCat:function(){
            //Get the current clicked cat
            return model.currentCat;
        },

        SetCurrentCat:function(currentCatCopy){
            //Load Cat image,name, click number and click event.
            model.currentCat = currentCatCopy;
        },

        GetCats:function(){
            //get cats info
            return model.catInfo;
        },

        IncrementCounter:function(){
            //increment the cat clicker by 1
            this.GetCurrentCat().clickCount ++;
            CatView.render();
        },

        retrieveAdminStatus: function() {
            //Show the admin section
            return model.formVisible;
        },

        toggleAdminSection: function() {
            if(model.formVisible) {
                model.formVisible = false;
                return false;
            } else {
                model.formVisible = true;
                return true;
            }
        },
        updateVars: function() {
            var currentCat = this.GetCurrentCat();

            currentCat.name = document.getElementById('name').value;
            currentCat.image = document.getElementById('url').value;
            currentCat.clickCount = document.getElementById('clicks').value;

            CatView.render();
            CatListView.render();
        }

    };

/*------------- view -------------------*/
    /*Creates the list of cats*/
    var CatListView = {
        init:function() {

         //get elements that will hold list - currently empty
         this.catListHtml = document.getElementById("catList");
         this.render();

        },

        render: function(){

            //Get cat info
            var catList = octopus.GetCats();
            this.catListHtml.innerHTML = '';
            //populate list
            for(var i=0; i<catList.length; i++) {

                     //create list
                    var node = document.createElement("li");
                    var currentCat = catList[i];
                    var textNode = document.createTextNode(currentCat.name);
                    node.appendChild(textNode);
                    this.catListHtml.appendChild(node);

                    //add the link to change the view
                    node.addEventListener('click', (function(currentCatCopy){
                        return function(){
                           octopus.SetCurrentCat(currentCatCopy);

                           //set the main view when clicked
                           CatView.render();
                           //set the form when clicked
                           adminView.render();
                        }
                    })(currentCat));
                }
        }
    };

/***************Admin view *****************/
    var adminView = {
        init: function() {
            //get values of the form
            this.adminContainer = document.getElementById("admin-section");
            this.adminButton = document.getElementById("admin-mode");
            this.inputName = document.getElementById("name");
            this.inputUrl = document.getElementById("url");
            this.inputClick = document.getElementById("clicks");


            this.adminContainer.style.display = "none";

            this.adminButton.addEventListener('click', function(){
                octopus.toggleAdminSection();
                if (octopus.retrieveAdminStatus()) {
                      document.getElementById("admin-section").style.display = "block";
                } else {
                    document.getElementById("admin-section").style.display = "none";
                }
            });

            this.render();

        },

        render:function() {
            var currentCat = octopus.GetCurrentCat();
            this.inputName.value = currentCat.name;
            this.inputUrl.value = currentCat.image;
            this.inputClick.value = currentCat.clickCount;

            this.inputSubmit = document.getElementById("submit");
            this.inputSubmit.addEventListener('click', function() {
                octopus.updateVars();
            })

        }

   };


    /********** Cat view - Populates the cats in the main window ***************/
    var CatView = {

        init: function(){

            //get elements of cat
            this.catContainer = document.getElementById("column2");
            this.catName = document.getElementById("cat-name")
            this.catImage = document.getElementById("cat-img");
            this.catClicks = document.getElementById("counter");

            /* add the click lister once... which is why it is in init */
            this.catImage.addEventListener('click', function(){
                octopus.IncrementCounter();
            });

            this.render();
        },

        // render { using current cat- Update the DOM for Cat image,name, click number.}
        render: function (){
            var currentCat = octopus.GetCurrentCat();
            this.catName.textContent = currentCat.name;
            this.catImage.src = currentCat.image;
            this.catClicks.textContent = currentCat.clickCount;
        }
};

octopus.init();