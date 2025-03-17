import vtkLight from 'vtk.js/Sources/Rendering/Core/Light'
import {
  VOLUME_AMBIENT_DEFAULT,
  VOLUME_DIFFUSE_DEFAULT,
} from '../vtk/ItkVtkViewProxy'

export function applyCinematicChanged(context, { actorContext }) {
  if (!context.images.representationProxy) return

  const {
    cinematicParameters: {
      isCinematicPossible,
      scatteringBlend,
      diffuse,
      ambient,
    },
  } = actorContext
  const renderer = context.itkVtkView.getRenderer()
  const mapper = context.images.representationProxy.getMapper()

  renderer.removeAllLights()

  const isCinematicOn = isCinematicPossible && scatteringBlend > 0

  if (isCinematicOn) {
    const light = vtkLight.newInstance()
    light.setLightTypeToSceneLight()
    light.setColor(1, 1, 1)
    light.setIntensity(1)
    light.setDirection([1, 1, 1])
    renderer.addLight(light)
  } else {
    renderer.createLight() // headlight
  }
  renderer.setTwoSidedLighting(!isCinematicOn)

  mapper.setVolumetricScatteringBlending(scatteringBlend)

  const volumeProps = context.images.representationProxy.getVolumes()
  volumeProps.forEach(volume => {
    const vProperty = volume.getProperty()
    if (isCinematicOn) {
      vProperty.setDiffuse(diffuse)
      vProperty.setAmbient(ambient)
    } else {
      vProperty.setDiffuse(VOLUME_DIFFUSE_DEFAULT)
      vProperty.setAmbient(VOLUME_AMBIENT_DEFAULT)
    }
  })

  context.service.send('RENDER')
}
