function applySlicingPlanes(context, event) {
  const slicingPlanes = event.data

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    const outlineActors = context.itkVtkView.getSliceOutlineActors()
    if (context.use2D) {
      volumeRep.getActors()[0].setVisibility(false)
      volumeRep.getActors()[1].setVisibility(false)
      volumeRep.getActors()[2].setVisibility(true)
      outlineActors[0].setVisibility(false)
      outlineActors[1].setVisibility(false)
      outlineActors[2].setVisibility(false)
      return
    }

    const name = context.images.selectedName
    const imageVisible = context.layers.actorContext.get(name).visible
    if (imageVisible) {
      const annotations = context.main.annotationsEnabled
      switch (context.main.viewMode) {
        case 'Volume':
          volumeRep.setXSliceVisibility(slicingPlanes.x.visible)
          volumeRep.setYSliceVisibility(slicingPlanes.y.visible)
          volumeRep.setZSliceVisibility(slicingPlanes.z.visible)
          if (annotations) {
            outlineActors[0].setVisibility(slicingPlanes.x.visible)
            outlineActors[1].setVisibility(slicingPlanes.y.visible)
            outlineActors[2].setVisibility(slicingPlanes.z.visible)
          }
          break
        case 'XPlane':
          volumeRep.getActors()[0].setVisibility(true)
          volumeRep.getActors()[1].setVisibility(false)
          volumeRep.getActors()[2].setVisibility(false)
          if (annotations) {
            outlineActors[0].setVisibility(true)
            outlineActors[1].setVisibility(false)
            outlineActors[2].setVisibility(false)
          }
          break
        case 'YPlane':
          volumeRep.getActors()[0].setVisibility(false)
          volumeRep.getActors()[1].setVisibility(true)
          volumeRep.getActors()[2].setVisibility(false)
          if (annotations) {
            outlineActors[0].setVisibility(false)
            outlineActors[1].setVisibility(true)
            outlineActors[2].setVisibility(false)
          }
          break
        case 'ZPlane':
          volumeRep.getActors()[0].setVisibility(false)
          volumeRep.getActors()[1].setVisibility(false)
          volumeRep.getActors()[2].setVisibility(true)
          if (annotations) {
            outlineActors[0].setVisibility(false)
            outlineActors[1].setVisibility(false)
            outlineActors[2].setVisibility(true)
          }
          break
      }
    } else {
      volumeRep.setXSliceVisibility(false)
      volumeRep.setYSliceVisibility(false)
      volumeRep.setZSliceVisibility(false)
      outlineActors.forEach(a => a.setVisibility(false))
    }
    if (
      slicingPlanes.x.visible ||
      slicingPlanes.y.visible ||
      slicingPlanes.z.visible
    ) {
      context.itkVtkView.setViewPlanes(true)
    } else {
      context.itkVtkView.setViewPlanes(false)
    }

    if (slicingPlanes.x.scroll) {
      if (!context.main.xPlaneAnimation) {
        context.itkVtkView.getInteractor().requestAnimation('xPlaneScroll')
        context.main.xPlaneAnimation = context.itkVtkView
          .getInteractor()
          .onAnimation(() => {
            let xSlice =
              context.main.xSlice +
              slicingPlanes.x.step * slicingPlanes.x.scrollDirection
            if (xSlice > slicingPlanes.x.max) {
              xSlice = slicingPlanes.x.max
              slicingPlanes.x.scrollDirection *= -1
            }
            if (xSlice < slicingPlanes.x.min) {
              xSlice = slicingPlanes.x.min
              slicingPlanes.x.scrollDirection *= -1
            }
            context.service.send({
              type: 'X_SLICE_CHANGED',
              data: xSlice,
            })
          })
      }
    } else if (context.main.xPlaneAnimation) {
      context.main.xPlaneAnimation.unsubscribe()
      context.itkVtkView.getInteractor().cancelAnimation('xPlaneScroll')
      context.main.xPlaneAnimation = null
    }

    if (slicingPlanes.y.scroll) {
      if (!context.main.yPlaneAnimation) {
        context.itkVtkView.getInteractor().requestAnimation('yPlaneScroll')
        context.main.yPlaneAnimation = context.itkVtkView
          .getInteractor()
          .onAnimation(() => {
            let ySlice =
              context.main.ySlice +
              slicingPlanes.y.step * slicingPlanes.y.scrollDirection
            if (ySlice > slicingPlanes.y.max) {
              ySlice = slicingPlanes.y.max
              slicingPlanes.y.scrollDirection *= -1
            }
            if (ySlice < slicingPlanes.y.min) {
              ySlice = slicingPlanes.y.min
              slicingPlanes.y.scrollDirection *= -1
            }
            context.service.send({
              type: 'Y_SLICE_CHANGED',
              data: ySlice,
            })
          })
      }
    } else if (context.main.yPlaneAnimation) {
      context.main.yPlaneAnimation.unsubscribe()
      context.itkVtkView.getInteractor().cancelAnimation('yPlaneScroll')
      context.main.yPlaneAnimation = null
    }

    if (slicingPlanes.z.scroll) {
      if (!context.main.zPlaneAnimation) {
        context.itkVtkView.getInteractor().requestAnimation('zPlaneScroll')
        context.main.zPlaneAnimation = context.itkVtkView
          .getInteractor()
          .onAnimation(() => {
            let zSlice =
              context.main.zSlice +
              slicingPlanes.z.step * slicingPlanes.z.scrollDirection
            if (zSlice > slicingPlanes.z.max) {
              zSlice = slicingPlanes.z.max
              slicingPlanes.z.scrollDirection *= -1
            }
            if (zSlice < slicingPlanes.z.min) {
              zSlice = slicingPlanes.z.min
              slicingPlanes.z.scrollDirection *= -1
            }
            context.service.send({
              type: 'Z_SLICE_CHANGED',
              data: zSlice,
            })
          })
      }
    } else if (context.main.zPlaneAnimation) {
      context.main.zPlaneAnimation.unsubscribe()
      context.itkVtkView.getInteractor().cancelAnimation('zPlaneScroll')
      context.main.zPlaneAnimation = null
    }
  }

  context.service.send('RENDER')
}

export default applySlicingPlanes
