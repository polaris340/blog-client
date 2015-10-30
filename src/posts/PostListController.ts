module Blog {
  interface PostListControllerScopeInterface extends ng.IScope {
    posts: any[]
    showPostModal(index): void
    toggleSideMenu(): void
    showWritePostModal(): void
  }

  class PostListController {

    public static $inject:string[] = ['$scope', '$ionicSideMenuDelegate', 'modal'];

    constructor(private $scope:PostListControllerScopeInterface,
                private $ionicSideMenuDelegate:ionic.sideMenu.IonicSideMenuDelegate,
                private modal:ModalServiceInterface) {
      $scope.toggleSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
      $scope.posts = [
        {
          id: 1,
          title: 'title 1',
          body: `
          body
          `,
          created: 1446168340
        },
        {
          id: 2,
          title: 'title 2',
          body: `
          body
          `,
          created: 1446168102
        }
      ];

      $scope.showPostModal = function (post) {
        modal.show(
          'post',
          'templates/posts/post-detail.html',
          $scope,
          {
            post: post
          });
      };

      $scope.showWritePostModal = function() {
        modal.show(
          'writePost',
          'templates/posts/write-post.html',
          $scope
        );
      };
    }
  }
  getModule().controller('PostListController', PostListController);
}


