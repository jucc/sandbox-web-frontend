angular.module('flapperNews', ['ui.router'])


   .config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

      $stateProvider
         .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
         })
         .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl',
            controllerAs: 'detail'
         })
      ;
      $urlRouterProvider.otherwise('home');
   }])

   .controller('MainCtrl', ['posts', function(posts){

      var self = this;

      self.posts = posts.posts;

      self.add = function(){

         if(!self.title || self.title === '') {
            return;
         }
         self.posts.push({
            'title': self.title,
            'link': self.link,
            'upvotes' : 0
         });
         self.title = '';
         self.link = '';
      };

      self.incrementUpvotes = function(post) {
         post.upvotes += 1;
      };

      self.decrementUpvotes = function(post) {
         post.upvotes -= 1;
      };
   }])

   .controller('PostsCtrl', ['$stateParams', 'posts', function($stateParams, posts){

      var self = this;
      // $stateParams retrieves the info in the url such as posts/1/
      self.post = posts.posts[$stateParams.id];
   }])

   .factory('posts', [function(){
      var obj = {
         posts: [                      //mock posts
            {
               title: 'post 1',
               upvotes: 35,
               comments: [
                  {
                     author: 'Joe',
                     body: 'Cool post!',
                     upvotes: 0
                  },
                  {
                     author: 'Bob',
                     body: 'Great idea but everything is wrong!',
                     upvotes: 0
                  }
               ]
            },
            {
               title: 'post 2',
               upvotes: 13
            },
            {
               title: 'post 3',
               upvotes: 17
            },
            {
               title: 'post 4',
               upvotes: 9
            },
            {
               title: 'post 5',
               upvotes: 14
            }
         ]
      };
      return obj;
   }])
;
