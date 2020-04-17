// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    setGreyscaleChannels: function() {
      this.channelsInfo = [
        {
          id: 0
        }
      ];
      if (this.channels() === 2) {
        return this.channelsInfo.push({
          id: -1
        });
      }
    },
    combineGreyscaleChannel: function() {
      var alpha, grey, i, j, ref, results;
      results = [];
      for (i = j = 0, ref = this.numPixels; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        grey = this.channelData[i];
        alpha = this.channels() === 2 ? this.channelData[this.channelLength + i] : 255;
        results.push(this.pixelData.set([grey, grey, grey, alpha], i * 4));
      }
      return results;
    }
  };

}).call(this);
