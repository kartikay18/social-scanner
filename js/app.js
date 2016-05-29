window.Instagram = {
    /**
     * Store application settings
     */
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',
   
    init: function (opt) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
    },
    
    

    /**
     * Get a list of popular media.
     */
    popular: function (callback) {
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getJSON(endpoint, callback);
    },

    searchbyname: function (name, callback) {
        //var endpoint = this.BASE_URL + '/users/' + name + this.config.client_id;
        var endpoint=this.BASE_URL + '/users/search?q='+ name+ '&client_id=' + this.config.client_id;
        this.getJSON(endpoint, callback);
    },

    /**
     * Get a list of recently tagged media.
     * https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
     * https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN
     * this.BASE_URL + '/users/' + name + '/media/recent?client_id=' + this.config.client_id;
     * 
     * https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN
     * this.BASE_URL + '/users/search?q='+ name+ '&client_id='this.config.client_id;
     * 
     */
    tagsByName: function (name, callback) {
        var endpoint = this.BASE_URL + '/users/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON(endpoint, callback);
    },

    getJSON: function (url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function (response) {
                if (typeof callback === 'function') callback(response);
            }
        });
    }
};

Instagram.init({
    client_id: 'd49da08a520f47cbb6e7618f077f33ef'
});


$(document).ready(function () {

    Instagram.popular(function (response) {
        var $instagram = $('#instagram');
        for (var i = 0; i < response.data.length; i++) {
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append('<img src="' + imageUrl + '" />');
        }
    });

    $('#form').on('submit', function (e) {
        e.preventDefault();

        var userName = $('#search').val();
         console.log(userName);
        Instagram.searchbyname(userName, function (response) {
            var $instagram = $('#instagram');
            $instagram.html('');

            for (var i = 0; i < response.data.length; i++) {

                var currusername = response.data[i].full_name;
                 console.log(currusername);
                if (currusername == userName) {
                    UserID = response.data[i].id;

                    Instagram.tagsByName(UserID, function (response) {
                        var $instagram = $('#instagram');
                        $instagram.html('');
                        for (var i = 0; i < response.data.length; i++) {
                            imageUrl = response.data[i].images.low_resolution.url;
                            $instagram.append('<img src="' + imageUrl + '" />');
                        }
                     
                    });
                }

            }

        });



    });

});