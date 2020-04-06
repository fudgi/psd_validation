LayerInfo = require '../layer_info.coffee'
Descriptor = require '../descriptor.coffee'

module.exports = class SmartObjectLayerData extends LayerInfo
  @shouldParse: (key) -> key is 'SoLd'

  parse: ->
    @file.seek 8, true
    @data = new Descriptor(@file).parse()
