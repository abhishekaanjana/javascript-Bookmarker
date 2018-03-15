//listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);


//save Bookmarks
function saveBookmark(e){
    //get values from form
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteURL').value;
    
   if(!validateForm(siteName, siteUrl)){
       return false;
   }
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    /*
    //local storage test
    localStorage.setItem('test', 'hello World!');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */
    
    
    //checking if bookmarks are null
    if(localStorage.getItem('bookmarks') === null){
        //initiallize a array
        var bookmarks = [];

        //add to array
        bookmarks.push(bookmark);

        //set item to local storage
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    }else{
        //get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //reset back to local storage
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));


    }

    //clear form after submitting
    document.getElementById('myform').reset();
    
    //re-fatch bookmarks
    fetchBookmarks();
    
    //prevents form from submitting
    e.preventDefault();
}

//delete bookmarks
function deleteBookmarks(url){
     //get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 
        
    //loopthrough all bookmarks
    for(var i= 0; i< bookmarks.length; i++){
        if(bookmarks[i].url === url){
            //remove from array
            bookmarks.splice(i, 1);
        }   
    }
        //reset back to local storage
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    
    
    
    //re-fatch bookmarks
    fetchBookmarks();
}



//fetch bookmarks
function fetchBookmarks(){
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="Info" >'+
                                        '<h3>'+name + ' '+
                                        '<a class="btn btn-primary" target="-blank" href="'+url+'">Visit</a> '+
                                        '<a onClick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                        '</h3>'+
                                        '</div>';
    }
    
}

function validateForm(siteName, siteUrl){    
    if(!siteName || ! siteUrl){
        alert('Please fill in the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }
    return true;
}