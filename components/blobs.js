import Sketch from 'react-p5'
import toxi from 'toxiclibsjs'

export default () => {
  const Polygon2D = toxi.geom.Polygon2D,
    Vec2D = toxi.geom.Vec2D,
    ColorRange = toxi.color.ColorRange,
    MathUtils = toxi.math.MathUtils
  var polygons = []
  const numVertices = 30

  const canHover = !(matchMedia('(hover: none)').matches)

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    p5.noStroke()
  }

  const draw = p5 => {
    p5.clear()

    polygons.forEach((p) => {
      p5.fill(p.col.toRGBACSS())
      p.smooth(0.05, 0)
      p5.beginShape()
      p.vertices.forEach((v) => {
        p5.vertex(v.x, v.y)
      })
      p5.endShape(toxi.CLOSE)
    })
  }

  const mousePressed = p5 => {
    createPolyAt(p5.mouseX, p5.mouseY)
  }

  const windowResized = p5 => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  const createPolyAt = (x, y) => {
    const col = ColorRange.BRIGHT.getColor().setAlpha(MathUtils.random(0.5, 0.8))
    const poly = new ColoredPolygon(col)
    const radius = canHover ? MathUtils.random(30, 300) : MathUtils.random(30, 100)

    for (var i = 0; i < numVertices; i++) {
      poly.add(
        Vec2D.fromTheta((i / numVertices) * MathUtils.TWO_PI)
          .scaleSelf(MathUtils.random(0.2, 1) * radius)
          .addSelf(x, y)
      )
    }

    polygons.push(poly)
  }

  function ColoredPolygon(tcolor) {
    Polygon2D.call(this)
    this.col = tcolor
  }

  ColoredPolygon.prototype = Object.create(Polygon2D.prototype)

  return (
    <Sketch setup={setup} draw={draw} mousePressed={mousePressed} windowResized={windowResized} />
  )
}