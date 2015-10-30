module Blog {
  export interface ModalServiceInterface {
    modals: any
    modalNames: string[]

    show(name:string, templateUrl:string, scope?:ng.IScope, modalScopeAttributes?:any)
    hide(name:string)
  }

  class ModalService implements ModalServiceInterface {
    modals:any;
    modalNames:string[];
    currentModalName:string;
    public static $inject:string[] = ['$rootScope', '$ionicModal', '$q'];

    constructor(private $rootScope:ng.IRootScopeService,
                private $ionicModal:ionic.modal.IonicModalService,
                private $q:ng.IQService) {
      this.modals = {};
      this.modalNames = [];
      var self = this;

      $rootScope.hideCurrentModal = function() {
        if (self.modalNames.length > 0) {
          self.hide(self.modalNames.pop());
        }
      };
    }

    show(name:string, templateUrl:string, scope:angular.IScope, modalScopeAttributes?:any) {
      if (this.modals[name]) {
        throw new Error('modal name "' + name + '" already in use');
      }
      var self = this;
      scope = scope || this.$rootScope;
      return this.$ionicModal.fromTemplateUrl(templateUrl, {
        scope: scope
      }).then(function (modal) {
        if (modalScopeAttributes) {
          for (var key in modalScopeAttributes) {
            modal.scope[key] = modalScopeAttributes[key];
          }
        }

        self.modals[name] = modal;
        self.modalNames.push(name);
        modal.show();
        return self.$q.resolve(modal);
      });
    }

    hide(name:string) {
      var self = this;
      this.modals[name].remove().then(function () {
        self.modalNames.splice(self.modalNames.indexOf(name), 1);
        delete self.modals[name];
      });
    }
  }
  getModule().service('modal', ModalService);
}
