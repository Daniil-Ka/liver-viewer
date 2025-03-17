import macro from 'vtk.js/Sources/macros'
import vtkAbstractWidgetFactory from 'vtk.js/Sources/Widgets/Core/AbstractWidgetFactory'
import vtkPolyLineRepresentation from 'vtk.js/Sources/Widgets/Representations/PolyLineRepresentation'
import vtkSVGMarkerTextRepresentation from '../SVGMarkerTextRepresentation'

import widgetBehavior from './behavior'
import stateGenerator from './state'

import { ViewTypes } from 'vtk.js/Sources/Widgets/Core/WidgetManager/Constants'

// ----------------------------------------------------------------------------
// Factory
// ----------------------------------------------------------------------------

function vtkAxesLabelsWidget(publicAPI, model) {
  model.classHierarchy.push('vtkAxesLabelsWidget')

  // --- Widget Requirement ---------------------------------------------------

  model.methodsToLink = ['circleProps', 'textProps', 'closePolyLine']
  model.behavior = widgetBehavior
  model.widgetState = stateGenerator()

  publicAPI.getRepresentationsForViewType = viewType => {
    switch (viewType) {
      case ViewTypes.DEFAULT:
      case ViewTypes.GEOMETRY:
      case ViewTypes.SLICE:
      case ViewTypes.VOLUME:
      default:
        return [
          { builder: vtkSVGMarkerTextRepresentation, labels: ['handles'] },
          {
            builder: vtkPolyLineRepresentation,
            labels: ['handles'],
          },
        ]
    }
  }

  // --------------------------------------------------------------------------
  // initialization
  // --------------------------------------------------------------------------

  model.widgetState.onBoundsChange(bounds => {
    const center = [
      (bounds[0] + bounds[1]) * 0.5,
      (bounds[2] + bounds[3]) * 0.5,
      (bounds[4] + bounds[5]) * 0.5,
    ]
  })
}

// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  manipulator: null,
}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  vtkAbstractWidgetFactory.extend(publicAPI, model, initialValues)

  vtkAxesLabelsWidget(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkAxesLabelsWidget')

// ----------------------------------------------------------------------------

export default { newInstance, extend }
