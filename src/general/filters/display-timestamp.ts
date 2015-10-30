module Blog {
  getModule().filter('displayTimestamp', function() {
    /**
     *
     * @param input - 초 단위 timestamp
     * @returns {string} - *초 전, 분 전, 시간 전, 일 전, yyyy-mm-dd hh:mm
     */
    return function(input) {
      var now = parseInt(new Date().getTime() / 1000);
      var secondsDiff = now - input;
      if (secondsDiff < 60) {
        return secondsDiff + '초 전';
      }
      if (secondsDiff < 3600) {
        return parseInt(secondsDiff / 60) + '분 전';
      } else if (secondsDiff < 86400) {
        return parseInt(secondsDiff / 3600) + '시간 전';
      } else if (secondsDiff < 604800) {
        return parseInt(secondsDiff / 86400) + '일 전';
      } else {
        var date = new Date(input * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var mins = date.getMinutes();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        if (hours < 10) hours = '0' + hours;
        if (mins < 10) mins = '0' + mins;

        return '' + year + '-' + month + '-' + day + ' ' + hours + ':' + mins;
      }
    }
  });
}
