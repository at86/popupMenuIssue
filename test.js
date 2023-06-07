const { app, BrowserWindow, Menu } = require("electron");
const gui = require("gui");

let win;
const guiWin = (broWin) => {
  win = gui.Window.create({ frame: false, transparent: true });
  win.setAlwaysOnTop(true);
  win.setFullscreen(true);
  win.onClose = () => gui.MessageLoop?.quit();
  win.activate();

  const contentviewWrap = gui.Container.create();
  win.setContentView(contentviewWrap);
  contentviewWrap.setStyle({
    flex: 1,
  });

  const contentview = gui.Container.create();
  contentviewWrap.addChildView(contentview);
  contentview.setStyle({
    flex: 1,
    position: "absolute",
    top: 200,
    left: 300,
    width: 400,
    height: 230,
  });

  contentview.onMouseDown = (s, e) => {
    if (e.button === 2) {
      Menu.buildFromTemplate([
        {
          label: "pop menu item",
          click: () => {
            broWin.close();
          },
        },
      ]).popup({
        window: broWin,
      });
      return;
    }
  };

  function drawHeart(painter, tx) {
    painter.beginPath();
    painter.moveTo({ x: 75, y: 40 });
    painter.bezierCurveTo({ x: 75, y: 37 }, { x: 70, y: 25 }, { x: 50, y: 25 });
    painter.bezierCurveTo(
      { x: 20, y: 25 },
      { x: 20, y: 62.5 },
      { x: 20, y: 62.5 }
    );
    painter.bezierCurveTo(
      { x: 20, y: 80 },
      { x: 40, y: 102 },
      { x: 75, y: 120 }
    );
    painter.bezierCurveTo(
      { x: 110, y: 102 },
      { x: 130, y: 80 },
      { x: 130, y: 62.5 }
    );
    painter.bezierCurveTo(
      { x: 130, y: 62.5 },
      { x: 130, y: 25 },
      { x: 100, y: 25 }
    );
    painter.bezierCurveTo({ x: 85, y: 25 }, { x: 75, y: 37 }, { x: 75, y: 40 });
    painter.fill();
    painter.closePath();

    const r = { x: 40, y: 60, width: 200, height: 60 };
    const ca = gui.Canvas.create({ width: 50, height: 30 }, 2);
    const cap = ca.getPainter();
    cap.rect({ x: 0, y: 0, width: 100, height: 60 });
    cap.setFillColor("#8fff");
    cap.fill();
    cap.beginPath();
    cap.rect({ x: 10, y: 10, width: 20, height: 20 });
    cap.setFillColor("#9000");
    cap.fill();
    cap.closePath();
    painter.drawCanvas(ca, r);
    painter.drawText(tx, r, { color: "#ffff00" });
  }
  contentview.onDraw = (self, painter) => {
    const b = contentview.getBounds();
    const tx = JSON.stringify(b);
    painter.fill();
    painter.save();
    painter.translate({ x: 0, y: 15 });
    painter.setFillColor("#52ff00ff");
    drawHeart(painter, tx);
    painter.restore();
    painter.translate({ x: 65, y: 0 });
    painter.setFillColor("#bbD46A6A");
    drawHeart(painter, tx);
  };

  return win;
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    width: 0,
    height: 0,
  });
  mainWindow.setPosition(0, 0);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.hide();

  setTimeout(() => {
    guiWin(mainWindow);
  }, 1000);
}

app.whenReady().then(() => {
  createWindow();
});
