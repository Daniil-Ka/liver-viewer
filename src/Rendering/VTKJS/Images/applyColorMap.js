import { getColorMap } from 'itk-viewer-color-maps'

// We want an offset so there is contrast with label image colors
const COLOR_OFFSET = 146

function applyColorMap(context, { data: { name, colorMap, component } }) {
  const actorContext = context.images.actorContext.get(name)

  // Optional chain on colorTransferFunctions in case compare set in createViewer
  const colorTransferFunction = context.images.colorTransferFunctions?.get(
    component
  )

  // if number of components increased after compare set and applyRenderedImage has not happened yet
  if (!colorTransferFunction) return

  console.log(colorMap)

  colorMap = getColorMap(colorMap, component + COLOR_OFFSET)

  colorMap = {
    "ColorSpace":"Diverging",
    "Name":"TestMap",
    "NanColor":[1,0,0],
    "License":"CC0",
    "Creator":"Eric Firing",
    "RGBPoints":[
      0.0,
      0.07197680324316025,
      0.9942016005516052,
      1.0,
      0.02603568428377473,
      0.07197680324316025,
      0.9942016005516052,
      1.0,
      0.032007752093141065,
      0.07197680324316025,
      0.9942016005516052,
      1.0,
      0.053716490404623944,
      0.07197680324316025,
      0.9942016005516052,
      1.0,
      0.07358675051247135,
      0.07197680324316025,
      0.9942016005516052,
      1.0,
      0.3394847769555737,
      0.0,
      0.0,
      0.0,
      0.3471468813428467,
      1.0,
      0.0,
      0.0,
      0.470007544720827,
      1.0,
      0.99920654296875,
      0.0,
      1.0,
      1.0,
      1.0,
      1.0
    ]
  }
  //
  // console.log(colorMap)

  colorTransferFunction.applyColorMap(colorMap)
  colorTransferFunction.modified() // applyColorMap does not always trigger modified()

  if (actorContext.colorRanges.has(component)) {
    const range = actorContext.colorRanges.get(component)
    colorTransferFunction.setMappingRange(range[0], range[1])
    colorTransferFunction.updateRange()
    // ползунки начало, конец по чб
    console.log(range)
  }

  // update UI
  context.service.send('IMAGE_COLOR_MAP_DEPENDENCIES_UPDATE', {
    data: {
      name,
      component,
    },
  })
  context.service.send('RENDER')
}

export default applyColorMap
