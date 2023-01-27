class MouseReactiveCirclePainter {
  static get inputProperties() {
    // 只读取默认的几个属性
    return ['--mouseX', '--mouseY', '--xCount', '--yCount'];
  }

  paint(ctx, geom, properties) {
    let mouseX = Number(properties.get('--mouseX').toString());
    let mouseY = Number(properties.get('--mouseY').toString());
    let xCount = Number(properties.get('--xCount').toString());
    let yCount = Number(properties.get('--yCount').toString());

    const CIRCLE_DEFAULT_RADIUS = 2;
    
    let containerWidth = geom.width;
    let containerHeight = geom.height;
    let xStepSize = containerWidth / xCount;
    let yStepSize = containerHeight / yCount;

    let startX = xStepSize / 2;
    let startY = yStepSize / 2;
    for(let i = 0; i < xCount; i++) {
      for(let j = 0; j < yCount; j++) {
        // 当前圆的x y坐标值
        let circleX = startX + i * xStepSize;
        let circleY = startY + j * yStepSize;
        // 当前圆的半径
        let circleRadius = CIRCLE_DEFAULT_RADIUS;

        // 如果鼠标在dom节点上
        if (mouseX != -1 && mouseY != -1) {
          let circleMousePointDistance = Math.sqrt(Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2));
          // 当鼠标和圆的距离小于400时，则修改圆的半径
          if (circleMousePointDistance < 400) {
            circleRadius = 400 / circleMousePointDistance;
          }
          // 控制圆半径不能太大
          if (circleRadius > CIRCLE_DEFAULT_RADIUS * 5) {
            circleRadius = CIRCLE_DEFAULT_RADIUS * 5;
          }
          // 控制圆半径不能小于默认的半径
          if (circleRadius < CIRCLE_DEFAULT_RADIUS) {
            circleRadius = CIRCLE_DEFAULT_RADIUS;
          }
        }

        // 调用canvas api画圆
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

// Register our class under a specific name
registerPaint('mouseReactiveCircle', MouseReactiveCirclePainter);