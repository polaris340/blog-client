/// <reference path="message.ts" />

module Blog {
  export interface ApiServiceInterface {
    setAuthToken(token:string, storeToStorage = true): void
    request(options:any): ng.IPromise
  }

  class ApiService implements ApiServiceInterface {

    public static $inject:string[] = ['$rootScope', '$http', '$q', 'URL', 'message', 'storage'];

    constructor(private $rootScope:ng.IRootScopeService,
                private $http:ng.IHttpService,
                private $q:ng.IQService,
                private URL,
                private message:IMessageService,
                private storage:StorageServiceInterface) {
      var authToken:string = storage.get('authToken');
      if (authToken) {
        this.setAuthToken(authToken, false);
      }
    }


    setAuthToken(token:string, storeToStorage = true):void {
      this.$http.defaults.headers.common['Authorization'] = token;
      if (storeToStorage) {
        if (token) {
          this.storage.set('authToken', token);
        } else {
          this.storage.remove('authToken');
        }
      }
    }

    /**
     *
     * @param options - $http options
     *                - options.url: ~/api 이후의 url을 넣어도 됨
     *                - options.force: true인 경우 현재 요청 취소하고 새로 보냄
     *                - options.scope: scope 단위로 lock을 걸 경우. default: $rootScope
     *                - options.lockUrl: lock url을 다른 원하는것으로 바꾸고 싶을 때
     * @returns {IPromise<TResult>}
     */
    request(options) {
      // url은 /mathces/~~ 처럼 resource url만 써도 되고,
      // https://~~ 부터 풀로 써도 됨
      if (options.url.indexOf(this.URL.API) === -1) {
        options.url = this.URL.API + options.url;
      }
      options.lockUrl = options.lockUrl || options.url.replace(/\/\d+$/, '').replace(this.URL.API, '');

      options.scope = options.scope || this.$rootScope;
      if (typeof options.scope.lock === 'undefined') {
        options.scope.lock = {};
      }
      if (options.scope.lock[options.lockUrl]) {
        if (options.force) {
          options.scope.lock[options.lockUrl].resolve();
        } else {
          throw new Error('url endpoint locked');
        }
      }

      var canceler = this.$q.defer();
      options.scope.lock[options.lockUrl] = canceler;
      options.timeout = canceler.promise;

      var self = this;

      //TODO: 언제 실행되는지 구체적으로 확인 필요. 사용할 때 api.request().then(...) 으로 쓸건데...
      return this.$http(options)
        .then(function (response) {
          delete options.scope.lock[options.lockUrl];
          self.defaultSuccessHandler(response.data);
          return self.$q.resolve(response.data);
        }, function (response) {
          delete options.scope.lock[options.lockUrl];
          self.defaultErrorHandler(response.data);
          return self.$q.reject(response.data);
        });
    }

    private defaultSuccessHandler(res) {

    }


    private defaultErrorHandler(res) {
      // TODO: 기본 에러 메시지 추가
      var userMessage:string = '';
      if (res && res.userMessage) {
        userMessage = res.userMessage;
      }
      this.message.show(userMessage);
    }

  }
  getModule().service('api', ApiService);
}
