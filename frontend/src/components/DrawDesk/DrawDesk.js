import "./DrawDesk.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core";

const colors = ["red", "blue", "green", "yellow", "pink", "brown", "white"];

export function DrawDesk() {
  const [brushMode, setBrushMode] = useState("");
  const [brushSize, setBrushSize] = useState(20);
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [color, setColor] = useState(colors[0]);
  const canvas = useRef(null);
  const image = useRef(null);
  let lastMouseX = 0;
  let lastMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let mousedown = false;

  useEffect(() => {
    const { width, height } = getComputedStyle(image.current);
    setWidth(width);
    setHeight(height);
  });

  const BootstrapSlider = withStyles({
    thumb: {
      width: brushSize,
      height: brushSize,
      marginLeft: -brushSize / 2,
      marginTop: -brushSize / 2,
    },
  })(Slider);

  function changeThumbSize(value) {
    const thumb = document.querySelector(".MuiSlider-thumb");
    thumb.style.width = value + "px";
    thumb.style.height = value + "px";
    thumb.style.marginLeft = -value / 2 + "px";
    thumb.style.marginTop = -value / 2 + "px";
  }

  function onCanvasMouseDown(e) {
    const canvasX = canvas.current.getBoundingClientRect().left;
    const canvasY = canvas.current.getBoundingClientRect().top;
    lastMouseX = mouseX = e.clientX - canvasX;
    lastMouseY = mouseY = e.clientY - canvasY;
    mousedown = true;
  }

  function onCanvasMouseUp() {
    mousedown = false;
  }

  function onCanvasMouseMove(e) {
    const canvasX = canvas.current.getBoundingClientRect().left;
    const canvasY = canvas.current.getBoundingClientRect().top;
    const ctx = canvas.current.getContext("2d");
    mouseX = e.clientX - canvasX;
    mouseY = e.clientY - canvasY;
    if (mousedown) {
      ctx.beginPath();
      if (brushMode === "draw") {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      } else {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = brushSize;
      }
      ctx.moveTo(lastMouseX, lastMouseY);
      ctx.lineTo(mouseX, mouseY);
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.stroke();
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  return (
    <div className="draw">
      <div className="draw__desk">
        <img ref={image} src="./img/example.jpg" className="draw__image" alt="" />
        <canvas
          width={width}
          height={height}
          ref={canvas}
          className="draw__canvas"
          onMouseDown={onCanvasMouseDown}
          onMouseUp={onCanvasMouseUp}
          onMouseMove={onCanvasMouseMove}
        />
      </div>

      <ButtonGroup color="primary">
        <Button
          variant={brushMode === "draw" ? "contained" : ""}
          onClick={() => setBrushMode("draw")}
        >
          Draw
        </Button>
        <Button
          variant={brushMode === "erase" ? "contained" : ""}
          onClick={() => setBrushMode("erase")}
        >
          Erase
        </Button>
      </ButtonGroup>

      <BootstrapSlider
        className="draw__slider"
        defaultValue={brushSize}
        valueLabelDisplay="off"
        min={5}
        max={50}
        onChange={(_, value) => changeThumbSize(value)}
        onChangeCommitted={(_, value) => setBrushSize(value)}
      />

      {colors.map(clr => {
        const BootstrapButton = withStyles({
          root: {
            backgroundColor: clr,
            height: 40,
            width: 40,
            borderRadius: 20,
            marginRight: 20,
            opacity: color === clr ? 0.4 : 1,
          },
        })(Button);
        return <BootstrapButton key={clr} variant="contained" onClick={() => setColor(clr)} />;
      })}
    </div>
  );
}
