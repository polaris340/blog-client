module Blog {
  interface PostDetailScopeInterface extends ng.IScope {
    post: any
  }

  class PostDetailController {
    public static $inject:string[] = ['$scope'];

    constructor(private $scope:PostDetailScopeInterface) {

    }


  }

  getModule().controller('PostDetailController', PostDetailController);
}
