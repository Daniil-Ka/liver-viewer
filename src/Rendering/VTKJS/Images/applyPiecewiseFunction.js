function applyPiecewiseFunction(context, event) {
  const name = event.data.name
  const component = event.data.component
  // const range = event.data.range
  const nodes = event.data.nodes

  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  const pwf = context.images.piecewiseFunctions?.get(component)
  if (pwf && image) {
    const slicePiecewiseFunction = pwf.slice
    const volumePiecewiseFunction = pwf.volume

    let newNodes = [
        {
          "x": -643.78106689453125,
          "y": 0.0,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": -584.65887451171875,
          "y": 0.26931655406951904,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": -382.65924072265625,
          "y": 0.46969130635261536,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": -237.65838623046875,
          "y": 0.51899993419647217,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": -75.40606689453125,
          "y": 0.0,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": 114.5941162109375,
          "y": 0.27931660413742065,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": 316.5936279296875,
          "y": 0.28899994492530823,
          "midpoint": 0.5,
          "sharpness": 0
        },
        {
          "x": 461.59375,
          "y": 0.28899994492530823,
          "midpoint": 0.5,
          "sharpness": 0
        },
        // {
        //   "x": -713.843994140625,
        //   "y": 0.0,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": -653.980712890625,
        //   "y": 0.2089998424053192,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": -640.249267578125,
        //   "y": 0.28999966382980347,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": -590.3348388671875,
        //   "y": 0.2089998424053192,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": -544.6475830078125,
        //   "y": 0.2089998424053192,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": 66.7259521484375,
        //   "y": 0.0,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": 84.34326171875,
        //   "y": 0.18899966776371002,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": 366.8341064453125,
        //   "y": 0.6449999213218689,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // },
        // {
        //   "x": 1585.4342041015625,
        //   "y": 0.7889997959136963,
        //   "midpoint": 0.5,
        //   "sharpness": 0
        // }
      ]
    console.log(12)
    volumePiecewiseFunction.setNodes(nodes)

    let sliceNodes = newNodes.length > 2 ? newNodes.slice(1, -1) : newNodes  // if more than 2, remove "window" nodes with y = 0

    slicePiecewiseFunction.setNodes(sliceNodes)

    context.service.send('RENDER')
  }
}

export default applyPiecewiseFunction
