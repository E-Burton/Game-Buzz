function drawBackground() {
    context.strokeStyle = '#001900';
    for (let i = 0; i <= canvas.width / unit + 2; i += 2) {
      for (let j = 0; j <= canvas.height / unit + 2; j += 2) {
        context.strokeRect(0, 0, unit * i, unit * j);
      };
    };
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    for (let i = 1; i <= canvas.width / unit; i += 2) {
      for (let j = 1; j <= canvas.height / unit; j += 2) {
        context.strokeRect(0, 0, unit * i, unit * j);
      };
    };
    context.lineWidth = 1;
  };
  drawBackground();