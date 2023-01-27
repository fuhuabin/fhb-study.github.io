class MultiRetanglePainter {
  paint(ctx, geom, properties) {
    // Use `ctx` as if it was a normal canvas
    const lineColor = 'red'
    console.log(geom.height, geom.width)
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(geom.width, geom.height);
    ctx.stroke();
    console.log(ctx);
  }
}

// Register our class under a specific name
registerPaint('multiRetangle', MultiRetanglePainter);